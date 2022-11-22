import { Router } from 'express'
import multer from 'multer'
import * as fs from 'fs';
import * as path from 'path';
import { authenticateToken, isAdmin } from '../Handlers/authHandler'
import { downloadFile, uploadFile } from '../Handlers/fileHandler'

const __dirname = path.resolve();

const storeFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets')
    },
    filename: (req, file, cb) => {
        const assetFolder = path.join(__dirname, 'assets');
        const files = fs.readdirSync(assetFolder)
        console.log('files', files)
        // cb(null, Date.now() + '_' + file.originalname)
        cb(null, files.includes(file.originalname) ? Date.now() + '_' + file.originalname : file.originalname)
    },
})

const upload = multer({ storage: storeFile })

export const fileRoutes = () => {
    const router = Router()
    // router.use(authenticateToken)
    router.post('/', isAdmin, upload.single('file'), uploadFile)
    router.get('/:fileName', downloadFile)

    return router
}