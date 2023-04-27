import { promptForAutomation } from './promptForAutomation';
import { authenticate } from './authenticate';

export const automateGithub = async () => {
  const automateGithub = await promptForAutomation();

  if (automateGithub) {
    const authResult = await authenticate(); 
  }
};
