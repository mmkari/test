import * as React from 'react';
// import classnames from 'classnames';
import styled from 'styled-components';
import GameScoreBoardWords from './GameScoreBoardWords';
import GameScoreBoardInfo from './GameScoreBoardInfo';
import SwipeableTabs from './SwipeableTabs';
import GameScoreBoard from './GameScoreBoard';
import Scores from './Scores';

const GameInfoWindow = ({
  handleAccept,
  gameState,
  scores,
  settings,
  wordsGuessed,
  wordsSkipped,
  round,
  words,
  teamTurn,
  moveAnimationComponents,
}) => {
  const [entered, setEntered] = React.useState(false);

  const onEntered = () => {
    setEntered(true);
  };
  const onExited = () => {
    setEntered(false);
  };

  return (
    <GameScoreBoard
      handleAccept={handleAccept}
      boardAnimation={gameState === 'summary' || gameState === 'gameOver'}
      buttonTitle={gameState === 'gameOver' ? 'Back to Menu' : 'Next Team'}
      onEntered={onEntered}
      onExited={onExited}
    >
      {/* <Info round={round} /> */}

      <SwipeableTabs
        keys={['scores', 'words', 'other']}
        tabs={['Scores', 'Words', 'Other']}
      >
        <Scores
          scores={scores}
          teams={settings.teams}
          teamTurn={teamTurn}
          showBoard
          wordsGuessed={wordsGuessed}
          entered={entered}
          moveAnimationComponents={moveAnimationComponents}
        />
        <GameScoreBoardWords
          wordsGuessed={wordsGuessed.map(({ wordIndex }) => words[wordIndex])}
          wordsSkipped={wordsSkipped.map((index) => words[index])}
        />
        <GameScoreBoardInfo winningScore={settings.endScore} />
      </SwipeableTabs>
    </GameScoreBoard>
  );
};

export default GameInfoWindow;
