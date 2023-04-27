import chalk from 'chalk';
import { access, constants } from 'node:fs/promises';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import Listr from 'listr';

import { copyTemplate } from './utils/copyTemplate';
import { initGitRepo } from './utils/initGitRepo';
import { installPackages } from './utils/installPackages';
import { createProjectsFolder } from './utils/createProjectsFolder';
import { updatePackageJson } from './utils/updatePackageJson';
import { Options } from './types';
import { automateGithub } from './utils/automateGithub/automateGithub';

export const createProject = async (options: Options): Promise<boolean> => {
  const targetDir = path.join(process.cwd(), options.projectName);

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
      title: 'Create project\'s folder',
      task: () => createProjectsFolder({ 
        projectName: options.projectName,
      }),
    },
    {
      title: 'Copy project files',
      task: () => copyTemplate({
        templateDir,
        targetDir,
      }),
    },
    {
      title: 'Update package.json',
      task: () => updatePackageJson({ 
        targetDir, 
        projectName: options.projectName,
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

  try {
    await tasks.run();
  } catch(error) {
    console.error('Failed to setup the project.')
    console.error(error);
  }

  await automateGithub();

  console.log('%s Project is ready', chalk.green.bold('DONE'));

  return true;
}
