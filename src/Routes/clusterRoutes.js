import { Router } from 'express'
import { bigTask } from '../Handlers/clusterHanlder'

export const clusterRoutes = () => {
    const router = Router()
    router.get('/', bigTask)

    return router
}