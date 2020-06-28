// JS classes for utilizing WEB AUDIO API

class Buffer {
  constructor(context, sources) {
    this.context = context;
    this.sources = sources;
    this.buffer = null;
  }

  loadSingleFile(source) {
    return fetch(source)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => this.context.decodeAudioData(arrayBuffer));
  }

  // loads file to buffer at given index
  loadAllFiles() {
    return Promise.all(
      this.sources.map((source) => this.loadSingleFile(source))
    )
      .then((results) => {
        this.buffer = results;
        return results; // return the buffer for easier handling
      })
      .catch(() => {
        // something went wrong loading sound files
        console.log('Failed to load sound file(s)!');
      });
  }

  getSoundFile(index) {
    return this.buffer[index];
  }
}

export default Buffer;
