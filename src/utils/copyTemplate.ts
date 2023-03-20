import ncp from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

export const copyTemplate = ({ 
  templateDir, 
  targetDir 
}: {
  templateDir: string;
  targetDir: string;
}) => {
  return copy(templateDir, targetDir, {
    clobber: false,
  })
}
