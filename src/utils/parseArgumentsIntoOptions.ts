import arg from 'arg';

import { Args, RawOptions } from '../types';

export const parseArgumentsIntoOptions = (rawArgs: Args): RawOptions => {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--template': String,

      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-t': '--template',
    },
    {
      argv: rawArgs.slice(2), 
    }
  );

  return {
    skipPrompts: Boolean(args['--yes']),
    initializeGit: Boolean(args['--git']),
    installPackages: Boolean(args['--install']),
    template: args['--template'],
    projectName: args._[0],
  } 
};

