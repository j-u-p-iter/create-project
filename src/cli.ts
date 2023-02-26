import inquirer from 'inquirer';
import path from 'path';

import { createProject } from './main';

import { parseArgumentsIntoOptions } from './utils/parseArgumentsIntoOptions';
import { promptForMissingOptions } from './utils/promptForMissingOptions';

import { RawOptions, Args, Options } from './types';

export const cli = async (args: Args) => {
  const cliOptions = parseArgumentsIntoOptions(args);

  const preparedOptions = await promptForMissingOptions(cliOptions);

  await createProject(preparedOptions);
}
