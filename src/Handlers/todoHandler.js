import { todoPool } from "../../db"

export const getAllTodos = async (req, res) => {
    const allTodos = await todoPool.query(
        'SELECT * FROM todo'
    )
    res.send(allTodos.rows)
}

export const getTodo = async (req, res) => {
    const { id } = req.params
    console.log('id', id)
    const todo = await todoPool.query(
        "SELECT * FROM todo WHERE todo_id = $1",
        [id],
    )

    res.send(todo.rows[0])
}

export const createTodo = async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await todoPool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )

        res.json(newTodo.rows[0])
    } catch (error) {
        console.log('error', error.message)
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    console.log('description', description)

    const updatedTodo = await todoPool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2  RETURNING *",
        [description, id]
    )

    res.json(updatedTodo.rows[0])
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params

    await todoPool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
    )

    res.json('Deleted successfully')
}