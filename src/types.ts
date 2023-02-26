export type RawOptions = {
  skipPrompts: boolean;
  initializeGit: boolean;
  template?: string;
  runInstall: boolean;
}

export type Options = Omit<RawOptions, 'skipPrompts'> & {
  template: string;
}

export type Args = string[];
