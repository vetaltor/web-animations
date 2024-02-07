import { AnimationEngineInterface } from '../AnimationEngineInterface';

export class RiveEngine implements AnimationEngineInterface {
  public setup(): Promise<void> {
    return Promise.resolve();
  }

  public play(): void {}

  public translate(translations: Record<string, string>): void {}
}
