import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../types/types'
require('dotenv').config()

const saltRounds = 10

export const createToken = (user: User, type: string) => {
    switch (type) {
        case 'ACCESS_TOKEN':
            return jwt.sign({ email: user.email }, process.env.SECRET_KEY!, { algorithm: 'HS256', expiresIn: '7d' })
        case 'REFRESH_TOKEN':
            break
        default:
            break
    }
}

export const comparePassword = async (hashedPassword: string, plainPassword: string) => await bcrypt.compare(plainPassword, hashedPassword)

export const encryptPassword = async (plainPassword: string) => await bcrypt.hash(plainPassword, saltRounds)
