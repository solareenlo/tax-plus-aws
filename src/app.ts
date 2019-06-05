import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import * as apiController from './controllers/api';

import multer from 'multer';

interface IMIME {
  'image/png': string;
  'image/jpeg': string;
  'image/jpg': string;
  [key: string]: string;
}

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
} as IMIME;

const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('無効なファイル形式です.');
    // if (isValid) {
    //   error = null;
    // }
    cb(null, 'dist/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('dist/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/api/v1', apiController.home);
app.post(
  '/api/v1',
  multer({ storage: storage }).single('image'),
  apiController.calculate
);

export default app;
