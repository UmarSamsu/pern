import bcrypt from 'bcrypt'
import { usersPool } from '../../db'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

const env = dotenv.config().parsed

export const createUser = async (req, res) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt()

    const hashedPW = await bcrypt.hash(password, salt)
    const newUser = await usersPool.query(
        'INSERT INTO users(email, hashedPW) VALUES($1, $2) RETURNING *',
        [email, hashedPW]
    )
    res.send(newUser.rows[0])
}

export const handleLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const userData = await usersPool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        const user = userData.rows[0]

        console.log('user', user)
        if (!user) {
            res.status(400).send('user not found')
        }
        const compare = await bcrypt.compare(password, user.hashedpw)

        if (compare) {
            const token = jwt.sign(user, env.ACCESS_TOKEN_SECRET)
            res.send({ token })
        } else {
            res.status(400).send('password incorrect')
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).send(error.message)
    }
}

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) res.sendStatus(401) //unauthorized
        const parsedData = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
        req.userRole = parsedData.userrole
        next()
        console.log('parsedData', parsedData)
    } catch (error) {
        res.sendStatus(403)// forbidden
        console.log('error', error)
    }
}

export const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) res.sendStatus(401) //unauthorized
        const parsedData = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
        if (parsedData.userrole === 'admin') {
            next()
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(403)// forbidden
    }

}