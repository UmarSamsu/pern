import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from '../Handlers/todoHandler'

export const todoRoutes = () => {
    const router = Router()

    router.get('/', getAllTodos)
    router.post('/', createTodo)
    router.get('/:id', getTodo)
    router.put('/:id', updateTodo)
    router.delete('/:id', deleteTodo)

    return router
}