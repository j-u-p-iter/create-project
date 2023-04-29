import { promptForAutomation } from './promptForAutomation';
import { authenticate } from './authenticate';
import { promptForRepoInfo } from './promptForRepoInfo';
import { createRepo } from './createRepo';
import { pushProjectToRemoteRepo } from './pushProjectToRemoteRepo';

export const automateGithub = async ({ 
  targetDir,
  projectName,
}: {
  targetDir: string;
  projectName: string;
}) => {
  const automateGithub = await promptForAutomation();

  if (!automateGithub) { return; }

  const authResult = await authenticate(); 

  const repoInfo = await promptForRepoInfo({ projectName });

  const repoUrl = await createRepo({ authResult, repoInfo });

  await pushProjectToRemoteRepo({ repoUrl, targetDir });
};
