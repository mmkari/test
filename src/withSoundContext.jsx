import * as React from 'react';
import Sound from '../examples/Sound';
import SoundBuffer from '../examples/Buffer';

const SoundContext = React.createContext(null);

const SoundProvider = ({ children, volume, files }) => {
  const [soundEffects, setSoundEffects] = React.useState(null);

  React.useEffect(() => {
    // react to changing master volume level
    Object.values(soundEffects || {}).forEach((soundObject) => {
      // changes value immediately
      soundObject.adjustVolume(volume);
    });
  }, [volume]);

  React.useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    // setSoundContext(context);

    const keys = Object.keys(files);
    const values = Object.values(files);

    const buffer = new SoundBuffer(context, values);
    const soundFiles = {};
    buffer.loadAllFiles().then((bufferedFiles) => {
      bufferedFiles.forEach((bufferFile, index) => {
        //
        soundFiles[keys[index]] = new Sound(context, bufferFile, volume);
      });

      setSoundEffects(soundFiles);
    });
  }, []);

  //
  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
};

const withSoundContext = (Component) => (props) => {
  return (
    <SoundContext.Consumer>
      {(sounds) => <Component {...props} sounds={sounds} />}
    </SoundContext.Consumer>
  );
};

export default withSoundContext;
export { SoundContext, SoundProvider };
