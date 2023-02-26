import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';

import { createProject } from './main';

import { Options, Argv } from './types';

const parseArgumentsIntoOptions = (rawArgs: Argv) => {
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
    skipPrompts: args['--yes'] || false,
    initializeGit: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  } 
};

const promptForMissingOptions = async (options: Options) => {
  const defaultTemplate =  'JavaScript';

  if (options.skipPrompts) {
    return {
      ...options,
      template: defaultTemplate,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate,
    });
  }

  if (!options.initializeGit) {
    questions.push({
      type: 'confirm',
      name: 'initializeGit',
      message: 'Initialize a git repository',
      default: false,
    }); 
  }

  const answers = await inquirer.prompt(questions); 

  return {
    ...options,
    template: options.template || answers.template, 
    initializeGit: options.initializeGit || answers.initializeGit,
  };
};

export const cli = async (args: Argv) => {
  const cliOptions = parseArgumentsIntoOptions(args);

  const preparedOptions = await promptForMissingOptions(cliOptions);

  await createProject(preparedOptions);
}
