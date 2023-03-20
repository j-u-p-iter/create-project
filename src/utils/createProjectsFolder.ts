import { execa } from 'execa';

export const createProjectsFolder = async ({ 
  projectName 
}: {
  projectName: string;
}) => {
  const result = await execa('mkdir', [projectName], {
    cwd: process.cwd(),
  });

  if (result.failed) {
    throw new Error('Failed to create project\'s folder.');
  }
};
