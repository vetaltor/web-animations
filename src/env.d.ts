declare module '*.css' {
  const classes: {
    [selector: string]: string;
  };

  export default classes;
}

declare module '*.wasm';
declare module '*.riv';
declare module '*.mp3';
