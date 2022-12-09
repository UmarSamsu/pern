import multer from 'multer'
import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve();

const storeFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets')
    },
    filename: (req, file, cb) => {
        const assetFolder = path.join(__dirname, 'assets');
        const files = fs.readdirSync(assetFolder)
        // cb(null, Date.now() + '_' + file.originalname)
        cb(null, files.includes(file.originalname) ? Date.now() + '_' + file.originalname : file.originalname)
    },
})

export const littleUploads = multer({ storage: storeFile })