import arg from 'arg';

import { Args, RawOptions } from '../types';

export const parseArgumentsIntoOptions = (rawArgs: Args): RawOptions => {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,

      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2), 
    }
  );

  return {
    skipPrompts: Boolean(args['--yes']),
    initializeGit: Boolean(args['--git']),
    installPackages: Boolean(args['--install']),
    template: args._[0],
  } 
};

