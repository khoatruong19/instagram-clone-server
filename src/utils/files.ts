import { unlink } from 'fs';
import { join } from 'path';

export const deleteUploadFile = async (fileName: string) : Promise<boolean> => {
    unlink(join(process.cwd(), 'upload/' + fileName), (err) => {
    if (err) {
      return false;
    } else true;
  });
  return true
};
