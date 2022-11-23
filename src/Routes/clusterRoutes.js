import { Router } from 'express'
import { bigTask, killCurrentWorker } from '../Handlers/clusterHanlder'

export const clusterRoutes = () => {
    const router = Router()
    router.get('/bigTask', bigTask)
    router.delete('/kill', killCurrentWorker)

    return router
}