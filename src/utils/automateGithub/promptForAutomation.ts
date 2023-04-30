import inquirer from 'inquirer';
import chalk from 'chalk';

export const promptForAutomation = async () => {
  const question = {
    type: 'confirm',
    name: 'automation',
    message: 'Proceed to push this project to Github repo?',
    default: true,
  };

  const answer = await inquirer.prompt([question]);

  return answer.automation === true;
};
