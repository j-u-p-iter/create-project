import { execa } from 'execa';

export const initGitRepo = async ({ targetDir }: { targetDir: string; }) => {
  const result = await execa('git', ['init'], {
    cwd: targetDir,
  });

  if (result.failed) {
    throw new Error('Failed to initialize git');
  }
}
