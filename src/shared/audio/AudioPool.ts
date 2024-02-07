export class AudioPool {
  private audioContext = new AudioContext();
  private audioBuffers: AudioBuffer[] = [];
  private state: 'loading' | 'ready' | 'initial' = 'initial';
  private bufferStates: Record<string, boolean> = {};

  constructor(private audioUrls: string[]) {}

  public async setup(): Promise<void> {
    if (this.state === 'loading') {
      return;
    }

    this.state = 'loading';
    for (const url of this.audioUrls) {
      const audioBuffer = await this.loadFile(url);
      this.audioBuffers.push(audioBuffer);
    }
    this.state = 'ready';
  }

  public playSample(
    sampleIndex: number,
    startTime?: number,
    offset?: number,
    duration?: number
  ) {
    if (this.bufferStates[sampleIndex]) {
      return;
    }

    this.bufferStates[sampleIndex] = true;
    const buffer = this.playBuffer(
      this.audioBuffers[sampleIndex],
      startTime,
      offset,
      duration
    );
    buffer.addEventListener('ended', (evt) => {
      this.bufferStates[sampleIndex] = false;
    });
  }

  public playBuffer(
    audioBuffer: AudioBuffer,
    startTime?: number,
    offset?: number,
    duration?: number
  ): AudioBufferSourceNode {
    const bufferSource = this.audioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this.audioContext.destination);
    bufferSource.start(startTime, offset, duration);
    return bufferSource;
  }

  private async loadFile(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    return await this.audioContext.decodeAudioData(buffer);
  }

  // public isPlaying(sampleIndex: number): boolean {

  // }
}
