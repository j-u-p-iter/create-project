import { mkdir } from 'node:fs/promises';
import path from 'path';

export const createProjectsFolder = async ({ 
  projectName 
}: {
  projectName: string;
}) => {
  const projectDir = path.resolve(process.cwd(), projectName); 

  try {
    const result = await mkdir(projectDir)
  } catch(error) {
    throw new Error('Failed to create project\'s folder.');
  }
};
