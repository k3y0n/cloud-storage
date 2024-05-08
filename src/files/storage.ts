import { diskStorage } from 'multer';

const generateId = () =>
  Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

const normalizeFileName = (req, file, cb) => {
  const fileExistName = file.originalname.split('.').pop();

  cb(null, `${generateId()}.${fileExistName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
