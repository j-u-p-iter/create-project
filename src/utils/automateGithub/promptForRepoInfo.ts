import inquirer from 'inquirer';

export const promptForRepoInfo = async ({ 
  projectName 
}: {
  projectName: string;
}): Promise<{ 
  name: string; 
  description: string; 
  private: boolean; 
}> => {
  const questions = [{
    name: 'name',
    type: 'input',
    message: 'Enter new repo name',
    default: projectName,
    validate(value: string) {
      if (value.length) { return true; }

      return 'Please, enter a valid repo name';
    }
  }, {
    name: 'description',
    type: 'input',
    message: 'Enter new repo description (optional)',
  }, {
    name: 'visibility',
    type: 'input',
    message: 'Set repo to public or private?',
    choices: ['public', 'private'],
    default: 'private',
  }];

  try {
    const { name, description, visibility } = await inquirer.prompt(questions);

    return { name, description, private: visibility === 'private',  };
  } catch(error) {
    throw new Error('Failed to prompt for repo info.');
  }
};
