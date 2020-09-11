import React, { useState } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
// import App from '../src/App';

import SettingsIcon from '@material-ui/icons/Settings';
import App from '../src/App';
import SwipeMenu from '../src/SwipeMenu';
import VolumeInput from '../src/VolumeInput';
import ColorPalette from '../src/ColorPalette';

import RadioButtonGroup, { RadioButton } from '../src/RadioButtons';

import { ThemeContext } from '../src/withThemeContext';
import { SoundContext, SoundProvider } from '../src/withSoundContext';

import Authorization from './Authorization';

// Context for passing down the colors

import StyledGameBoard from '../src/GameBoardSvg';
import Sound from './Sound';
import SoundBuffer from './Buffer';

import thumpFile from '../src/thump.wav';
import dramaticFile from '../src/dramatic.wav';
// Game sounds:
import beepFile from '../src/beep.wav';
import skipFile from '../src/skip.wav';
import timeupFile from '../src/timeup.wav';
import startFile from '../src/start.wav';

const StyledButton = styled.button`
  height: 40px;
  width: 100%;
  font-size: 24px;
  margin: 5px 0;
`;

const AnimationArea = styled.div.attrs({ className: 'AnimationArea' })`
  filter: ${({ blur }) => (blur ? 'blur(1px)' : 'none')};
  background: ${({ color }) => color};
  width: 100%;
  // min-width: 400px;
  // padding: 20px;

  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const FlexContainer = styled.div.attrs({ className: 'FlexContainer' })`
  height: 100%;
  // display: flex;
  align-items: center;
  justify-content: center;
`;

const colorPalettes = [
  // default:
  {
    id: 'defCp',
    main: '#f8dd74  ', // "#eee8aa"
    background: '#fdf5e6',
    foreground: 'mediumseagreen',
    highlight: '#ffd700',
    button: '#7fffd4', // "#4fc5b5"
    buttonHighlight: '#c4ffeb',
    text: '#000000',
    border: '#F0F0F0',
  },
  {
    id: 'cp100',
    main: '#AED6F1',
    background: '#D1F2EB',
    foreground: '#f4e7e7',
    highlight: '#00b400',
    button: '#90ee90',
    buttonHighlight: '#bdffbd',
    text: '#000000',
    border: '#40e0d0',
  },
];

const initialAppSettings = {
  volume: 0.4,
  colorPaletteIndex: 0,
  // font: 0,
};

// import {rgba} from 'polished';
// background: rgba(color, alpha);

const devMode = false;

const files = {
  thumpSound: thumpFile,
  dramaticSound: dramaticFile,
  beepSound: beepFile,
  skipSound: skipFile,
  timeupSound: timeupFile,
  startSound: startFile,
};

const Examples = ({ className, useAuthorization }) => {
  const [authorized, setAuthorized] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [appSettings, setAppSettings] = React.useState(initialAppSettings);
  const updateSettings = (name, value) => {
    setAppSettings((s) => ({ ...s, [name]: value }));
  };
  const adjustVolume = (decimal: number) => {
    updateSettings('volume', decimal);
  };
  const changePalette = (index: number) => {
    updateSettings('colorPaletteIndex', index);
  };

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  if (useAuthorization && !authorized) {
    return (
      <>
        {/* <StyledGameBoard /> */}
        <Authorization setAuthorized={setAuthorized} />
      </>
    );
  }

  // const now = soundContext ? soundContext.currentTime : null;

  // const gainNode = soundContext.createGain();
  // const oscillator = soundContext.createOscillator();

  // oscillator.type = 'sine';
  // oscillator.frequency.value = 440;

  // gainNode.gain.setValueAtTime(0.01, soundContext.currentTime);
  // // oscillator.connect(soundContext.destination);
  // oscillator.connect(gainNode);
  // gainNode.connect(soundContext.destination);

  // oscillator.start();
  // oscillator.stop(3);

  const currentTheme = colorPalettes[appSettings.colorPaletteIndex];

  return (
    <div className={classnames('Examples', className)}>
      <button onClick={toggleMenu}>
        <SettingsIcon color="error" />
      </button>
      <FlexContainer>
        <AnimationArea blur={menuOpen} color={currentTheme.background}>
          <ThemeContext.Provider value={currentTheme}>
            {/* <SoundContext.Provider value={soundEffects}> */}
            <SoundProvider volume={appSettings.volume} files={files}>
              <App appSettings={appSettings} devMode={devMode} />
            </SoundProvider>
            {/* </SoundContext.Provider> */}
          </ThemeContext.Provider>
        </AnimationArea>
        <SwipeMenu open={menuOpen} rightSide closeMenu={closeMenu}>
          <VolumeInput onChange={adjustVolume} value={appSettings.volume} />

          <RadioButtonGroup
            name="colorPaletteIndex"
            onChange={changePalette}
            value={appSettings.colorPaletteIndex}
          >
            {colorPalettes.map((palette, index) => (
              <RadioButton value={index}>
                <ColorPalette
                  colors={palette}
                  onChange={changePalette}
                  colorPalettes={colorPalettes}
                />
              </RadioButton>
            ))}
          </RadioButtonGroup>
        </SwipeMenu>
      </FlexContainer>
    </div>
  );
};

const StyledExamples = styled(Examples)`
  // display: flex;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export default StyledExamples;
