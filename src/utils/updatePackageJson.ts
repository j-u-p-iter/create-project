import path from 'path';
import { readFile, writeFile } from 'node:fs/promises';
import { readPackageJson } from './readPackageJson';

export const updatePackageJson = async ({ 
  targetDir, 
  projectName, 
}: { 
  targetDir: string;
  projectName: string;
}) => {
  const pathToPackageJson = path.resolve(targetDir, 'package.json'); 

  const packageJsonContent = await readPackageJson({ targetDir });

  try {
    await writeFile(
      pathToPackageJson, 
      packageJsonContent.replaceAll('%projectName%', projectName),
    );
  } catch(error) {
    console.error("Failed to update package.json.");
    console.error(error);
  };
}
