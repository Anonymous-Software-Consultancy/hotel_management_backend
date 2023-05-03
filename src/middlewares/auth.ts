import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
require('dotenv').config()

import { User } from '../typings/user'
import { dbHandler } from '../database'

export interface AuthenticatedRequest extends Request {
    user: User
}

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest
    const token = authenticatedReq.headers['authorization']?.split('Bearer ')[1]?.trim()
    if (!token) {
        return res.status(403).json({
            message: 'Could not validate credentials',
        })
    } else {
        try {
            const tokenData = jwt.verify(token, process.env.SECRET_KEY!)
            if (typeof tokenData === 'string') {
            } else {
                const { email } = tokenData
                const user: User[] = await dbHandler<User>(`SELECT * FROM users WHERE email = ?`, [email])
                if (user.length == 0) {
                    return res.status(404).json({
                        message: 'User not found',
                    })
                } else {
                    authenticatedReq.user = user[0]
                    next()
                }
            }
        } catch (error) {
            return res.status(403).json({
                message: 'Could not validate credentials',
            })
        }
    }
}

export const getAuthenticatedSuperUser = async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest
    const token = authenticatedReq.headers['authorization']?.split('Bearer ')[1]?.trim()
    if (!token) {
        return res.status(403).json({
            message: 'Could not validate credentials',
        })
    } else {
        try {
            const tokenData = jwt.verify(token, process.env.SECRET_KEY!)
            if (typeof tokenData === 'string') {
            } else {
                const { email } = tokenData
                const user: User[] = await dbHandler<User>(`SELECT * FROM users WHERE email = ?`, [email])
                if (user.length == 0) {
                    return res.status(404).json({
                        message: 'User not found',
                    })
                } else {
                    if (user[0].is_superuser === false)
                        return res.status(403).json({
                            message: 'User does not have enough priviledges',
                        })
                    authenticatedReq.user = user[0]
                    next()
                }
            }
        } catch (error) {
            return res.status(403).json({
                message: 'Could not validate credentials',
            })
        }
    }
}
