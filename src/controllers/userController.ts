import { Request, Response } from 'express'
import { ResultSetHeader } from 'mysql2'

import { dbHandler, dbHandlerPost } from '../database'
import { User } from '../types/types'
import { comparePassword, createToken, encryptPassword } from '../utils/auth'

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, first_name, last_name, email, birth_date, phone, password } = req.body
        const existingUserEmail: User[] = await dbHandler<User>(`SELECT * FROM users WHERE email = ?`, [email])
        const existingUserUsername: User[] = await dbHandler<User>(`SELECT * FROM users WHERE username = ?`, [username])
        if (existingUserEmail.length > 0) res.status(403).json('Email already in use')
        else if (existingUserUsername.length > 0) res.status(403).json('Username already in use')
        else {
            const hashedPassword = await encryptPassword(password)
            const sql = `
                INSERT INTO users
                (username, first_name, last_name, email, phone, birth_date, password, is_superuser)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `
            const values = [username, first_name, last_name, email, phone, birth_date, hashedPassword, false]
            const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(sql, values)
            console.log("💛results:", results?.insertId)
            res.status(201).json({
                username,
                first_name,
                last_name,
                email,
                phone,
                birth_date,
                id: results?.insertId,
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(403).json('Fields required for email and password')
            return
        }
        const user: User[] = await dbHandler<User>(`SELECT * FROM users WHERE email = ?`, [email])
        if (user.length == 0) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        const isVerified = await comparePassword(user[0].password, password)
        if (!isVerified) {
            res.status(403).json({ message: 'Incorrect password' })
            return
        } else {
            const jwt = createToken(user[0], 'ACCESS_TOKEN')
            res.status(200)
                .cookie('token', jwt, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                })
                .json({
                    id: user[0].id,
                    email: user[0].email,
                })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const user: User[] = await dbHandler<User>(`SELECT * FROM users WHERE id = ?`, [id])
        const { is_superuser, password, ...updatedUser } = user[0] // excluded sensitive two fields
        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
