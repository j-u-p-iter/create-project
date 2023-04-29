import { Octokit } from '@octokit/rest';
import Configstore from 'configstore';

import { promptForAuthToken } from './promptForAuthToken';
import { name as packageName } from '../../../package.json';

export const authenticate = async () => {
  const config = new Configstore(packageName);

  let authToken = config.get('githubToken');

  if (!authToken) {
    authToken = await promptForAuthToken();

    config.set('githubToken', authToken);
  }

  try {
    const result = new Octokit({ auth: authToken });

    return result;
  } catch(error) {
    throw new Error('Failed to authenticate to github.')
  }
};
