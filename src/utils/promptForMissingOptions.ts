import inquirer from 'inquirer';

import { RawOptions, Options, Template } from '../types';

const defaultTemplate =  Template.JavaScript;

const defaultOptions = {
  initializeGit: true,
  installPackages: true,
  template: defaultTemplate,
};

export const promptForMissingOptions = async (options: RawOptions): Promise<Options> => {
  if (options.skipPrompts) {
    options = {
      ...options,
      ...defaultOptions,
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
      choices: [Template.JavaScript, Template.TypeScript],
      default: defaultTemplate,
    });
  }

  if (!options.initializeGit) {
    questions.push({
      type: 'confirm',
      name: 'initializeGit',
      message: 'Initialize a git repository?',
      default: false,
    }); 
  }

  if (!options.installPackages) {
    questions.push({
      type: 'confirm',
      name: 'installPackages',
      message: 'Install packages?',
      default: false,
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
