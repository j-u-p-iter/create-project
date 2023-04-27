import inquirer from 'inquirer';

const VALID_TOKEN_LENGTH = 40;

export const promptAuthToken = async () => {
  const question = {
    name: 'token',
    type: 'input',
    message: 'Enter your Github personal access token',
    validate: (value: string) => {
      if (value.length === VALID_TOKEN_LENGTH) {
        return true;
      } else {
        return 'Please enter a valid token.';
      }
    }
  };

  let answer;

  try {
    answer = await inquirer.prompt([question]);
  } catch(error) {
    throw error;
  }

  return answer.token;
};
