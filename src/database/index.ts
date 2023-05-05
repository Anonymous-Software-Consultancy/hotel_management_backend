import * as mysql from 'mysql2/promise'
require('dotenv').config()

export const dbHandler = async <T>(sql: string, values: any[]): Promise<T[]> => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root123',
        database: process.env.DB_NAME || 'hotel_management',
    })

    try {
        const [rows] = await connection.execute(sql, values)
        return rows as T[]
    } catch (error) {
        console.error(`database error >> ${error}`)
        return []
    } finally {
        await connection.end()
    }
}
