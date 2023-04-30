import inquirer from 'inquirer';

import { RawOptions, Options, Template } from '../types';

const defaultTemplate =  Template.TypeScript;

const defaultOptions = {
  initializeGit: true,
  installPackages: true,
  template: defaultTemplate,
};

/**
 * If some required options are missing we are asking to add them here.
 *   As result the raw options came from the command line become fully ready
 *   for further use by the tool.
 *
 */
export const promptForMissingOptions = async (options: RawOptions): Promise<Options> => {
  if (options.skipPrompts) {
    options = {
      ...defaultOptions,
      ...options,
    };
  }

  const questions = [];

  if (!options.projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Please type project\'s name (can not be empty)',
      validate: (value: string) => value.length > 0,
    });
  }

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: [Template.React, Template.TypeScript],
      default: defaultTemplate,
    });
  }

  if (!options.initializeGit) {
    questions.push({
      type: 'confirm',
      name: 'initializeGit',
      message: 'Initialize a git repository?',
      default: true,
    }); 
  }

  if (!options.installPackages) {
    questions.push({
      type: 'confirm',
      name: 'installPackages',
      message: 'Install packages?',
      default: true,
    }); 
  }

  const answers = await inquirer.prompt(questions); 

  return {
    template: options.template || answers.template, 
    projectName: options.projectName || answers.projectName,
    initializeGit: options.initializeGit || answers.initializeGit,
    installPackages: options.installPackages || answers.installPackages,
  };
};
