import { projectInstall } from 'pkg-install';

export const installPackages = ({ targetDir }: { targetDir: string; }) => {
  return projectInstall({
    prefer: 'yarn',
    cwd: targetDir,
  });
};
