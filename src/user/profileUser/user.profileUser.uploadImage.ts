import multer from 'multer';
import path from 'path';


// Setup Multer storage engine
const storage = multer.diskStorage({
    destination: (req:any, file:any, callback) => {
        callback(null, path.join(process.cwd(), './image'))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname)
    }
});

// Create Multer instance
// Create Multer instance with file filter
const fileFilter = (_req: any, file: { mimetype: string}, callback: (arg0: null, arg1: boolean) => void) => {

    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;