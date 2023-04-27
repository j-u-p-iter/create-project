import { Octokit } from '@octokit/rest';

import { promptAuthToken } from './promptAuthToken';
import { name as packageName } from '../../../package.json';

export const authenticate = async () => {
  const config = new Configstore(packageName);

  let authToken = config.get('githubToken');

  if (!authToken) {
    authToken = await promptAuthToken();

    config.set('githubToken', authToken);
  }

  try {
    const result = new Octokit({ auth: authToken });

    return result;
  } catch(error) {
    console.error(error);
  }
};
