import path from 'path';
import { readFile } from 'node:fs/promises';

export const readPackageJson = async ({ targetDir }: { targetDir: string }) => {
  const pathToPackageJson = path.resolve(targetDir, 'package.json'); 

  let content;

  try {
    content = await readFile(
      pathToPackageJson, 
      { encoding: 'utf8' },
    );
  } catch(error) {
    console.error("Failed to load package.json.");

    throw error;
  }

  return content;
};
