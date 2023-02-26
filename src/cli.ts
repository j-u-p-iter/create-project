import inquirer from 'inquirer';
import path from 'path';

import { createProject } from './main';

import { parseArgumentsIntoOptions } from './utils/parseArgumentsIntoOptions';

import { RawOptions, Args } from './types';

const promptForMissingOptions = async (options: RawOptions) => {
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

export const cli = async (args: Args) => {
  const cliOptions = parseArgumentsIntoOptions(args);

  const preparedOptions = await promptForMissingOptions(cliOptions);

  await createProject(preparedOptions);
}
