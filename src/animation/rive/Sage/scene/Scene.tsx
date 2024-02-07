import { AudioPool } from '../../../../shared/audio/AudioPool';

export class Scene {
  private audioPool: AudioPool;

  constructor(
    private riveUrl: string,
    sampleUrls: string[],
    audioConfig: Record<string, string>
  ) {
    this.audioPool = new AudioPool(sampleUrls);
  }

  public async load(): Promise<void> {
    await this.audioPool.setup();
  }
}
