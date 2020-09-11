import React from 'react';
import './App.css';
import styled from 'styled-components';
import Settings from './Settings';
import Game from './Game';
import { ThemedButton as Button } from './Button';

import Header from './helperComponents';

import wordListNouns from '../examples/subst';
import wordListAdjectives from '../examples/adjectives';
import wordListVerbs from '../examples/verbs';
import withThemeContext from './withThemeContext';

const AppContent = styled.div`
  position: relative;
`;

const WelcomeMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeMenuButton = styled(Button)`
  height: 60px;
  margin: 2em;
`;

const StateMachine = {
  initial: 'welcome', // 'welcome'
  transition: {
    welcome: {
      configure: 'settings',
      startGame: 'game',
    },
    settings: {
      confirm: 'welcome',
      cancel: 'welcome',
    },
    game: {
      openMenu: 'welcome',
    },
  },
};

const initialSettings = {
  endScore: 50,
  timeLimit: 60,
  teams: ['Team 1', 'Team 2'],
  volume: 0.4,
  wordClass: 'nouns',
};

const initializeScores = (s) => {
  const { teams } = s;
  const initialScores = [];
  for (let i = 0; i < teams.length; i += 1) {
    initialScores.push(0);
  }

  return initialScores;
};

const shuffle = (arr) => {
  const array = [...arr];
  let m = array.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    m -= 1;
  }
  return array;
};

const initializeWords = (wordClass: 'nouns' | 'adjectives' | 'verbs') => {
  switch (wordClass) {
    case 'nouns':
      return shuffle(wordListNouns);
    case 'adjectives':
      return shuffle(wordListAdjectives);
    case 'verbs':
      return shuffle(wordListVerbs);
    default:
      return [];
  }
};

function App({ appSettings, devMode }) {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [state, setState] = React.useState(StateMachine.initial);
  const [settings, setSettings] = React.useState(initialSettings);
  const [scores, setScores] = React.useState(initializeScores(settings));
  const [words, setWords] = React.useState(
    initializeWords(initialSettings.wordClass)
  );

  const openSettings = () => {
    if (StateMachine.transition[state].configure) {
      setState(StateMachine.transition[state].configure);
    }
  };
  const openGame = () => {
    if (StateMachine.transition[state].startGame) {
      setState(StateMachine.transition[state].startGame);
    }
  };

  const confirmSettings = (s) => {
    setSettings(s);

    if (StateMachine.transition[state].confirm) {
      setState(StateMachine.transition[state].confirm);

      const newScores = initializeScores(s);
      setScores(newScores);
      const newWords = initializeWords(s.wordClass);
      setWords(newWords);
    }
  };
  const changeWordIndex = () => {
    setWordIndex((wordIndex + 1) % words.length);
  };

  const receiveScores = (newScores) => {
    // check if any score went over game limit
    // let gameOver = false;
    // if (newScores.some((score: number) => score > settings.endScore)) {
    //   // game over! Show scores
    //   gameOver = true;
    // }
    setScores(newScores);
    // return gameOver;
  };

  const backToMenu = () => {
    if (StateMachine.transition[state].openMenu) {
      setState(StateMachine.transition[state].openMenu);

      // initialize all scores, etc
      const newScores = initializeScores(settings);
      setScores(newScores);
      // reshuffle words
      setWords(shuffle(words));
    }
  };

  return (
    <div className="App">
      {devMode && <Header state={state} />}
      <AppContent>
        {state === 'welcome' && (
          <WelcomeMenu>
            <WelcomeMenuButton onClick={openSettings}>
              Settings
            </WelcomeMenuButton>
            <WelcomeMenuButton onClick={openGame}>Start</WelcomeMenuButton>
          </WelcomeMenu>
        )}
        {state === 'settings' && (
          <Settings
            values={settings}
            onChange={setSettings}
            onConfirm={confirmSettings}
          />
        )}
        {state === 'game' && (
          <Game
            changeWordIndex={changeWordIndex}
            wordIndex={wordIndex}
            words={words}
            state={state}
            settings={settings}
            appSettings={appSettings}
            scores={scores}
            setScores={receiveScores}
            devMode={devMode}
            backToMenu={backToMenu}
          />
        )}
      </AppContent>
    </div>
  );
}

const StyledApp = styled(App)`
  background: ${({ theme }) => theme.background};
`;

export default withThemeContext(StyledApp);
