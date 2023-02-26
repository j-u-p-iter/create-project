import chalk from 'chalk';
import { access, constants } from 'node:fs/promises';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

import { Options } from './types';

const copy = promisify(ncp);

const installDependencies = ({ targetDir }: { targetDir: string; }) => {
  return projectInstall({
    cwd: targetDir,
  });
};

const initGit = async ({ targetDir }: { targetDir: string; }) => {
  const result = await execa('git', ['init'], {
    cwd: targetDir,
  });

  if (result.failed) {
    throw new Error('Failed to initialize git');
  }
}

const copyTemplate = ({ 
  templateDir, 
  targetDir 
}: {
  templateDir: string;
  targetDir: string;
}) => {
  return copy(templateDir, targetDir, {
    clobber: false,
  })
}

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
      task: () => initGit({ targetDir }),
      enabled: () => options.initializeGit
    },
    {
      title: 'Install dependencies',
      task: () => installDependencies({ targetDir }),
      skip: () => !options.runInstall 
        ? 'Pass --install to automatically install dependencies' 
        : undefined,
    }
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));

  return true;
}
