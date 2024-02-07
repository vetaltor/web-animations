export interface AnimationEngineInterface {
  setup: () => Promise<void>;
  play: () => void;
  translate: (translations: Record<string, string>) => void;
}
