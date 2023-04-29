import { simpleGit } from 'simple-git';

export const pushProjectToRemoteRepo = async ({ 
  repoUrl,
  targetDir, 
}: {
  repoUrl: string;
  targetDir: string;
}) => {
  const git = simpleGit({ baseDir: targetDir });

  try {
    await git.init()
      .add('./*')
      .commit('Initial commit')
      .addRemote('origin', repoUrl)
      .push(repoUrl, 'master', ['--set-upstream']);

    return true;
  } catch(error) {
    console.log("ERROR:", error);
    throw new Error('Failed pushing project to remote repo.');
  }
};
