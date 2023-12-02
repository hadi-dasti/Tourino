import multer from 'multer';
import path from 'path';


const storageMovie = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,path.join(process.cwd(),'./upload-movie'))
    },
    filename: (req,file,callback) => {
        callback(null,Date.now()+file.originalname)
    }
})

// Create Multer instance
const fileFilter = (req: any, file: any, callback: any) => {
  if (
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/avi' ||
    file.mimetype === 'video/mkv'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadMovie = multer({
  storage: storageMovie,
  fileFilter: fileFilter
});

export { uploadMovie };