import { Router } from 'express'
import { downloadVideo, generateStreamLink, streamVideo } from '../Handlers/videoHandler'


export const videoRoutes = () => {
    const router = Router()
    router.get('/', generateStreamLink)
    router.get('/stream/:token', streamVideo)
    router.get('/download', downloadVideo)

    return router
}