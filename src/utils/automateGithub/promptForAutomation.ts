import inquirer from 'inquirer';
import chalk from 'chalk';

export const promptForAutomation = async () => {
  const question = {
    name: 'automation',
    type: 'input',
    message: 'Proceed to push this project to Github repo?',
    choises: ['Yes', 'No'],
    default: 'Yes',
  };

  const answer = await inquirer.prompt([question]);

  return answer.automation === 'Yes';
};
