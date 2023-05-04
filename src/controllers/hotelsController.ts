import {Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../errorHandler/errorResponse';

export const addHotel = async(req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}