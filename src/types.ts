export type Args = string[];

// Original options, parsed from the process.argv
export type RawOptions = {
  projectName: string;
  skipPrompts: boolean;
  initializeGit: boolean;
  template?: string;
  installPackages: boolean;
}

// Processed original options which will be used by the CLI 
// (final prepared version of options)
export type Options = Omit<RawOptions, 'skipPrompts'> & {
  template: string;
}

export enum Template {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript'
}
