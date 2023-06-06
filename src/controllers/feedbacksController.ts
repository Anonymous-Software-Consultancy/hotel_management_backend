import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { feedBacksQueries } from "../utils/sqlQueries/feedBacksQueries";
import { successMessages } from "../utils/messages";
import { FeedBacks } from "../types/types";


export const addFeedBacks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addFeedBack } = feedBacksQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addFeedBack,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages?.feedBacks?.addFeedBacks
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllFeedBacks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllFeedBacks } = feedBacksQueries;
    try {
        const results: FeedBacks[] = await dbHandler<FeedBacks>(getAllFeedBacks, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.feedBacks?.getAllFeedBacks))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleFeedBackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleFeedBackById } = feedBacksQueries;
    const targetId = req.params.id
    try {
        const results: FeedBacks[] = await dbHandler<FeedBacks>(getSingleFeedBackById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.feedBacks?.getSingleFeedBackById))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleFeedBackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleFeedBackById } = feedBacksQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: FeedBacks = await dbHandlerPost<FeedBacks>(updateSingleFeedBackById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.feedBacks?.updateSingleFeedBackById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleFeedBackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleFeedBackById } = feedBacksQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleFeedBackById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.feedBacks?.deleteSingleFeedBackById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
