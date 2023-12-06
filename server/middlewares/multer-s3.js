import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import fs from 'fs';
import { v1 as uuidv1 } from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/tiff': 'tiff',
  'image/svg+xml': 'svg',
};

const UPLOAD_PATH = 'uploads/images';

if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'potz-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error('mime 유형이 잘못됨💥');
    cb(error, isValid);
  },
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
