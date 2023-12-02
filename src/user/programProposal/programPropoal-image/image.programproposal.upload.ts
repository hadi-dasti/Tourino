import multer from 'multer';
import path from 'path';


const storageImage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null,path.join(process.cwd(),'./upload-image'))
    },
    filename(_req, file, callback) {
        callback(null,Date.now()+file.originalname)
    },
})

const fileFilter = (_req: any, file:{ mimetype: string}, callback: (arg0: null, arg1: boolean) => void) => {

    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowedMimeTypes.includes(file.mimetype)){
        callback(null, true);
    } else {
        callback(null, false);
    }        
}


export const uploadImageProgramPropoal = multer({
   storage: storageImage,
    fileFilter: fileFilter,
})

