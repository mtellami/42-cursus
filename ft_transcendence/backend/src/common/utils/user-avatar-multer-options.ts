import { diskStorage } from 'multer';
import * as path from 'path';
import { Request } from 'express';

export const userAvatarMulterOptions = {
  storage: diskStorage({
    destination: '/home/node/avatar-images',
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const userid = req['user']['id'];
      const filename: string = userid.replace(/-/g, '').concat('.jpg');

      file.fieldname = `${process.env.CDN_HOST_URI}/avatar-images/${filename}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 4 , // limit file size at 4MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const ext: string = path.extname(file.originalname);
    if (file.mimetype.match(/^image\/(jpg|jpeg|png)$/) && ext.match(/.(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
