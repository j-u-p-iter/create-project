import chalk from 'chalk';
import { access, constants } from 'node:fs/promises';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import Listr from 'listr';

import { copyTemplate } from './utils/copyTemplate';
import { initGitRepo } from './utils/initGitRepo';
import { installPackages } from './utils/installPackages';
import { Options } from './types';

export const createProject = async (options: Options) => {
  const targetDir = process.cwd();

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url), 
    '../../templates',
    options.template.toLowerCase(),
  );

  try {
    await access(templateDir, constants.R_OK)
  } catch(error) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplate({
        templateDir,
        targetDir,
      }),
    },
    {
      title: 'Initialize git',
      task: () => initGitRepo({ targetDir }),
      enabled: () => options.initializeGit
    },
    {
      title: 'Install dependencies',
      task: () => installPackages({ targetDir }),
      skip: () => !options.installPackages 
        ? 'Pass --install to automatically install dependencies' 
        : undefined,
    }
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));

  return true;
}
