import path from 'path';
import { readFile, writeFile } from 'node:fs/promises';

export const updatePackageJson = async ({ 
  targetDir, 
  projectName, 
}: { 
  targetDir: string;
  projectName: string;
}) => {
  const pathToPackageJson = path.resolve(targetDir, 'package.json'); 

  let content;

  try {
    content = await readFile(
      pathToPackageJson, 
      { encoding: 'utf8' },
    );
  } catch(error) {
    console.error("Failed to load package.json.");
    console.error(error);
  }

  try {
    await writeFile(
      pathToPackageJson, 
      content.replaceAll('%projectName%', projectName),
    );
  } catch(error) {
    console.error("Failed to update package.json.");
    console.error(error);
  }
}
