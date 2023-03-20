import inquirer from 'inquirer';

import { RawOptions, Options, Template } from '../types';

export const promptForMissingOptions = async (options: RawOptions): Promise<Options> => {
  const defaultTemplate =  Template.JavaScript;

  if (options.skipPrompts) {
    return {
      initializeGit: true,
      installPackages: true,
      template: defaultTemplate,
    };
  }

  const questions = [];

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
    initializeGit: options.initializeGit || answers.initializeGit,
    installPackages: options.installPackages || answers.installPackages,
  };
};
