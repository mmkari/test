// @flow
import * as React from 'react';
import styled from 'styled-components';
import NewWindow from 'react-new-window';
import Modal from '@material-ui/core/Modal';
import withSoundContext from './withSoundContext';

import { Timer, TimerView, ThemedTimerView } from './Timer';

import Button from './Button';
// import CardDeck from './CardDeck';
// import useContainerDimensions from './hooks';

import TeamButtons from './TeamButtons';

import GameCardComps from './GameCardComps';

import GameDropArea from './GameDropArea';

import GameTurnBanner from './GameTurnBanner';
import GameScoreBoard from './GameScoreBoard';
import Scores from './Scores';
import GameInfoWindow from './GameInfoWindow';

import Header from './helperComponents';

import GameScoreBoardWords from './GameScoreBoardWords';

import { getMoveAnimations } from './GameBoardSvg';

const SkipButton = styled(Button)`
  // position:absolute;
  width: 50%;
  height: 80px;
  left: 0;
  bottom: 0;
  // border: none;
`;

const AllGuessContainer = styled.div`
  // font-size: 34px;

  position: absolute;
  // height: 50%;
  // min-height: 200px;
  width: 100%;
  left: 0;
  bottom: 0;
  // height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
`;

const ActionButtons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 0;
`;

const CardArea = styled.div`
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalContent = styled.div`
  position: 'absolute';
  width: 500px;
  background: white;
  border: '2px solid #000';

  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
`;

const TimerWordContainer = styled.div`
    position: relative;
    height: 100%;
  width: 100%;

  .Timer {
    position: absolute
    height: 100%;
  width: 100%;
  }
  .WordLists {
    position: absolute
    height: 100%
    opacity: 0.8
  }
`;

const GameStateMachine = {
  initial: 'game', // 'welcome'
  transition: {
    game: {
      timeout: 'allGuess', // last word, all guess
    },
    allGuess: {
      showSummary: 'summary', // round summary
      endGame: 'gameOver',
    },
    summary: {
      nextPlayer: 'game', // next turn
    },
    gameOver: {
      newGame: 'game',
    },
  },
};

const playSomeSounds = (soundEffects) => {
  const { thumpSound, dramaticSound } = soundEffects;
  thumpSound.play(2);
  thumpSound.play(3);
  thumpSound.play(4);
  thumpSound.play(5);
  thumpSound.play(6);
  thumpSound.play(7);
  for (let i = 8; i < 10; i += 0.2) {
    thumpSound.play(i);
  }
  dramaticSound.play();
};

type GameProps = {|
  changeWordIndex: () => void,
  words: Array<any>,
  wordIndex: number,
  // state: string,
  appSettings: Object,
  settings: Object,
  scores: Array<number>,
  setScores: (score) => void,
|};
const Game = ({
  changeWordIndex,
  words,
  wordIndex,
  // state,
  appSettings,
  settings,
  scores,
  setScores,
  devMode,
  backToMenu,
  sounds,
}: GameProps) => {
  // const BeepAudio = new Audio('src/beep.wav');
  // const BeepAudio = new Audio(beepFile);
  // BeepAudio.volume = appSettings.volume;

  const cardWidth = 202;
  const cardHeight = 300;

  const [gameState, setGameState] = React.useState(GameStateMachine.initial);

  const [currentPosition, setCurrentPosition] = React.useState({ x: 0, y: 0 });

  const [dropPosition, setDropPosition] = React.useState({ x: null, y: null });
  const [dropAnimation, setDropAnimation] = React.useState(false);

  const [wordsGuessed, setWordsGuessed] = React.useState([]);
  const [wordsSkipped, setWordsSkipped] = React.useState([]);

  const [teamTurn, setTeamTurn] = React.useState(0);
  const [round, setRound] = React.useState(1);

  const timerRef = React.useRef(null);
  const [showScore, setShowScore] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(null);

  const [pageOpen, setPageOpen] = React.useState(false);

  const [moveAnimationComponents, setMoveAnimationComponents] = React.useState(
    null
  );

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // set time off to clear
    let interval;
    if (dropAnimation === true) {
      interval = setInterval(() => {
        // setDropPosition(null);
        setDropAnimation(false);
      }, 200);
    }

    return () => dropAnimation && clearInterval(interval);
  }, [dropAnimation]);

  React.useEffect(() => {
    // team in turn changes, clear things...
    // clear previous guessed/skipped words
    setWordsGuessed([]);
    setWordsSkipped([]);
  }, [teamTurn]);

  const onTimeout = () => {
    if (GameStateMachine.transition[gameState].timeout) {
      sounds.timeupSound.play();

      setGameState(GameStateMachine.transition[gameState].timeout);
    }
  };

  const getCurrentScores = (updatedWords) => {
    const updatedScores = [...scores];
    for (let i = 0; i < updatedWords.length; i += 1) {
      const word = updatedWords[i];
      updatedScores[word.teamIndex] += 1;
    }
    return updatedScores;
  };

  const endTurn = (index = null) => {
    let updatedWords = wordsGuessed;
    if (typeof index === 'number') {
      updatedWords = [
        ...wordsGuessed,
        { wordIndex, teamIndex: index }, // add word to team index
      ];
      setWordsGuessed(updatedWords);
    }

    // compute current scores
    const updatedScore = getCurrentScores(updatedWords);
    setCurrentScore(updatedScore);

    // determine if game over
    let gameEnded = false;
    if (updatedScore.some((score: number) => score > settings.endScore)) {
      // game over! Show scores
      gameEnded = true;
    }

    // calculate movements...
    const bobAnimations = getMoveAnimations(updatedWords, scores);
    setMoveAnimationComponents(bobAnimations);

    if (gameEnded && GameStateMachine.transition[gameState].endGame) {
      setGameState(GameStateMachine.transition[gameState].endGame);
    } else if (GameStateMachine.transition[gameState].showSummary) {
      // update gameState
      setGameState(GameStateMachine.transition[gameState].showSummary);
    }
  };
  const handleAccept = () => {
    if (GameStateMachine.transition[gameState].nextPlayer) {
      // add previous rounds points to scores

      setScores(currentScore);

      // change team index
      const nextTeam = (teamTurn + 1) % settings.teams.length;
      setTeamTurn(nextTeam);
      if (nextTeam === 0) {
        // new round
        setRound((r) => r + 1);
      }
      // update gameState
      setGameState(GameStateMachine.transition[gameState].nextPlayer);
      // change card
      changeWordIndex();

      // RESTART TIMER
      if (timerRef.current) {
        timerRef.current.restartTimer();
      } else {
        console.log('Game: Timer reset failed!');
      }
    } else if (GameStateMachine.transition[gameState].newGame) {
      // start a new game instead, go to main menu
      // keep settings but change App state...
      backToMenu();
      setGameState(GameStateMachine.transition[gameState].newGame);
    }
  };

  const startRound = () => {
    if (timerRef.current) {
      timerRef.current.startTimer();
      // StartAudio.play();
      sounds.startSound.play();
    } else {
      console.log('Game: Timer start failed!');
    }
  };

  const addWord = () => {
    // BeepAudio.play();
    sounds.beepSound.play();
    setWordsGuessed((previousWords) => [
      ...previousWords,
      { wordIndex, teamIndex: teamTurn }, // add word to current team
    ]);
    changeWordIndex();
  };
  const skipWord = () => {
    // SkipAudio.play();
    sounds.skipSound.play();

    setWordsSkipped((previousWords) => [...previousWords, wordIndex]);
    changeWordIndex();
  };

  // set drop coordinates and start drop transition
  const setDropAt = (dat) => {
    const { x, y } = dat;
    setDropPosition({ x, y });
    setDropAnimation(true);
  };

  const onDrag = (e, dat) => {
    if (gameState === 'game') {
      setCurrentPosition({ x: dat.x, y: dat.y });
    }
  };
  const onStopDrag = (e, dat) => {
    // compute differences
    if (gameState === 'game') {
      const difX = dat.x;
      if (difX > 100) {
        setDropAt(dat);
        addWord();
      } else if (difX < -100) {
        setDropAt(dat);
        skipWord();
      }
    }
    // return card to center
    setCurrentPosition({ x: 0, y: 0 });
  };

  const skipLastPoint = () => {
    // just return score for current team
    endTurn();
  };
  const awardLastPointTo = (index) => {
    // add word to guessed words

    endTurn(index);
  };

  const showScores = () => {
    //
    setShowScore(true);
    // pause timer
    if (timerRef.current) {
      timerRef.current.pauseTimer();
    } else {
      console.log('Game: Timer pausing failed!');
    }
  };

  const hideScore = () => {
    //
    setShowScore(false);
    // resume timer
    if (timerRef.current) {
      timerRef.current.resumeTimer();
    } else {
      console.log('Game: Timer resuming failed!');
    }
  };

  const toggleSecondScreen = () => {
    setPageOpen((v) => !v)
  }

  const onBackClick = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  // cardWidth
  return (
    <div className="Game">

      <Timer
        ref={timerRef}
        onTimeout={onTimeout}
        countdownMs={settings.timeLimit * 1000}
      >
        {({
          // className,
          togglePause,
          timerState,
          // updateTime,
          remainingFraction,
          minutes,
          seconds,
          startTimer,
        }) => (
          <div>
            {pageOpen && (
              <NewWindow
                title="New window 2"
                onUnload={() => setPageOpen(false)}
              >
                <div>
                  {/* <span>TODO:</span>
                  <span>1. Add card drop animation (use Tarot example)</span> */}
                  <TimerWordContainer>
                    <TimerView
                      timerState={timerState}
                      remainingFraction={remainingFraction}
                      minutes={minutes}
                      seconds={seconds}
                      large
                    />
                    <GameScoreBoardWords
                      wordsGuessed={wordsGuessed.map(
                        ({ wordIndex }) => words[wordIndex]
                      )}
                      wordsSkipped={wordsSkipped.map((index) => words[index])}
                    />
                  </TimerWordContainer>
                  {gameState === 'summary' && (
                    <Scores
                      scores={scores}
                      teams={settings.teams}
                      teamTurn={teamTurn}
                      showBoard
                      wordsGuessed={wordsGuessed}
                      entered
                      isActive
                      dimension={{ width: '300px' }}
                      moveAnimationComponents={moveAnimationComponents}
                      noSound
                    />
                  )}
                </div>
              </NewWindow>
            )}

            {devMode && <Header state={gameState} />}

            <GameTurnBanner
              teamName={settings.teams[teamTurn]}
              onBackClick={onBackClick}
              showScores={showScores}
              toggleSecondScreen={toggleSecondScreen}
            />

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={onCloseModal}
            >
              <ModalContent>
                <h2 id="simple-modal-title">Leave game</h2>
                <p id="simple-modal-description">Are you sure?</p>

                <Button onClick={backToMenu}>Accept</Button>
                <Button onClick={onCloseModal}>Cancel</Button>
              </ModalContent>
            </Modal>

            <CardArea>
              <ActionButtons>
                <GameDropArea
                  animationIn={dropAnimation && dropPosition.x < 0}
                  highlight={currentPosition.x < -100}
                  dropCount={wordsSkipped.length}
                  type="cross"
                />
                <DropArea className="DropArea">
                  <ThemedTimerView
                    togglePause={togglePause}
                    timerState={timerState}
                    remainingFraction={remainingFraction}
                    minutes={minutes}
                    seconds={seconds}
                  />
                  <GameCardComps
                    currentPosition={currentPosition}
                    onDrag={onDrag}
                    onStopDrag={onStopDrag}
                    timerState={timerState}
                    dropAnimation={dropAnimation}
                    dropPosition={dropPosition}
                    cardHeight={cardHeight}
                    droppedWord={words[wordIndex - 1]}
                    cardWidth={cardWidth}
                    word={words[wordIndex]}
                    startRound={startRound}
                  />
                </DropArea>

                <GameDropArea
                  animationIn={dropAnimation && dropPosition.x > 0}
                  highlight={currentPosition.x > 100}
                  dropCount={wordsGuessed.length}
                  type="check"
                />

                {gameState === 'allGuess' && (
                  <AllGuessContainer>
                    <TeamButtons
                      teams={settings.teams}
                      onClick={awardLastPointTo}
                    />
                    <SkipButton onClick={skipLastPoint}>Skip last</SkipButton>
                  </AllGuessContainer>
                )}
              </ActionButtons>
            </CardArea>

            <GameScoreBoard
              handleAccept={hideScore}
              boardAnimation={showScore}
              buttonTitle="Resume"
            >
              <Scores scores={scores} teams={settings.teams} />
            </GameScoreBoard>

            <GameInfoWindow
              handleAccept={handleAccept}
              gameState={gameState}
              scores={scores}
              settings={settings}
              wordsGuessed={wordsGuessed}
              wordsSkipped={wordsSkipped}
              round={round}
              words={words}
              teamTurn={teamTurn}
              moveAnimationComponents={moveAnimationComponents}
            />
          </div>
        )}
      </Timer>
    </div>
  );
};

const GameWithSound = withSoundContext(Game);

export default GameWithSound;
