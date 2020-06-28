// JS classes for utilizing WEB AUDIO API

class Sound {
  constructor(context, buffer, volume = 1) {
    this.context = context;
    this.buffer = buffer;
    this.gainNode = null;
    this.source = null;
    this.gainValue = volume;
  }

  initialize() {
    this.gainNode = this.context.createGain();

    this.source = this.context.createBufferSource();

    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);

    this.gainNode.gain.value = this.gainValue;
    this.gainNode.connect(this.context.destination);
  }

  play(time = 0) {
    this.initialize();
    this.source.start(this.context.currentTime + time);
  }

  stop(time = 0) {
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.context.currentTime + time + 0.5
    );
    this.source.stop(this.context.currentTime + time + 0.5);
  }

  adjustVolume(newValue) {
    this.gainValue = newValue;
  }
}

export default Sound;
