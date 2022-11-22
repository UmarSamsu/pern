import { Router } from 'express'
import { createUser, handleLogin } from '../Handlers/authHandler'

export const authRoutes = () => {
    const router = Router()

    router.post('/register', createUser)
    router.post('/', handleLogin)

    return router
}