import { Router } from 'express'
import { authenticateToken, isAdmin } from '../Handlers/authHandler'
import { downloadFile, uploadFile } from '../Handlers/fileHandler'
import { littleUploads } from '../Services/storageSvc';

export const fileRoutes = () => {
    const router = Router()
    // router.use(authenticateToken)
    router.post('/single', isAdmin, littleUploads.single('file'), uploadFile)
    router.post('/multi', isAdmin, littleUploads.array('file'), uploadFile)
    // router.post('/big', isAdmin, littleUploads.single('file'), uploadFile)
    router.get('/:fileName', downloadFile)

    return router
}