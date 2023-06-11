import { Hotel } from '../types/types';
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { dbHandler, dbHandlerPost } from '../database';
import { OkPacket, ResultSetHeader } from 'mysql2';
import { sendOnFormat } from './responseFormat';
import { errorMessages, successMessages } from './messages';
import { searchQueries } from './sqlQueries/searchQueries';


export const paginatedApi = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const results:Hotel[] = await dbHandler<Hotel>(`SELECT count(*) FROM hotels`,[]); 
        const currentPage:number = Number(req.query.page || 1);
        const limit:number = 10;
        const totalDataLength:number = Object.values(results[0])[0];
        const numberOfPages:number = Math.ceil(totalDataLength/limit);
        const startIndex:number = (currentPage - 1) * limit;
        const endIndex:number = currentPage * limit;

        const paginatedResults:Hotel[] = await dbHandler<Hotel>(`SELECT id, name FROM hotels LIMIT ${startIndex},${endIndex}`,[])
        if (paginatedResults?.length > 0) {
            res.send(sendOnFormat(paginatedResults, true, 200, successMessages?.searchHotelByName?.searchSuccess)).end()
        }else{
            res.send(sendOnFormat(paginatedResults, true, 404, errorMessages?.searchHotelByName?.searchFailure)).end()
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
}