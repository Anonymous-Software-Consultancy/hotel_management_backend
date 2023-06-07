import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { bookedByUserQueries } from "../utils/sqlQueries/bookedByUserQueries";
import { successMessages } from "../utils/messages";
import { BookedByUsers } from "../types/types";


export const addBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addBooking } = bookedByUserQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addBooking,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages?.bookeByuser?.addBooking
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllBookings } = bookedByUserQueries;
    try {
        const results: BookedByUsers[] = await dbHandler<BookedByUsers>(getAllBookings, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.bookeByuser?.getAllBookings))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleBookingById } = bookedByUserQueries;
    const targetId = req.params.id
    try {
        const results: BookedByUsers[] = await dbHandler<BookedByUsers>(getSingleBookingById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.bookeByuser?.getSingleBookingById))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleBookingById } = bookedByUserQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleBookingById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.bookeByuser?.deleteSingleBookingById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
