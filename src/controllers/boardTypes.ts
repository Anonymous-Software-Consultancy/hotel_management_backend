import { sendOnFormat } from './../utils/responseFormat'
import { dbHandler, dbHandlerPost } from './../database/index'
import { ResultSetHeader } from 'mysql2'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../errorHandler/errorResponse'
import { errorMessages, successMessages } from '../utils/messages'
import { BoardType } from '../types/types'

export const addBoardType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, code, description } = req.body
        const existingBoardType: BoardType[] = await dbHandler<BoardType>(`SELECT * FROM board_types WHERE name = ?`, [name])
        if (existingBoardType.length > 0) res.status(403).json(errorMessages.board_type.isExistFacilityGroup)
        const values = [name, code, description]
        const sql = `INSERT INTO board_types (name, code, description) VALUES (?, ?, ?)`
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(sql, values)
        if (results) res.send(sendOnFormat({ ...req.body, id: results?.insertId }, true, 200, successMessages.board_type.addBoardTypep))
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
