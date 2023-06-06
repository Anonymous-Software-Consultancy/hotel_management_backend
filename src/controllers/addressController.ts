import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { addressQueries } from "../utils/sqlQueries/addressQueries";
import { successMessages } from "../utils/messages";
import { Addresses, FeedBacks } from "../types/types";


export const addAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addAddress } = addressQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addAddress,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages?.addresses?.addAddress
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllAddresses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllAddresses } = addressQueries;
    try {
        const results: Addresses[] = await dbHandler<Addresses>(getAllAddresses, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.addresses?.getAllAddresses))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleAddressById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleAddressById } = addressQueries;
    const targetId = req.params.id
    try {
        const results: Addresses[] = await dbHandler<Addresses>(getSingleAddressById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.addresses?.getSingleAddressById))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleAddressById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleAddressById } = addressQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: Addresses = await dbHandlerPost<Addresses>(updateSingleAddressById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.addresses?.updateSingleAddressById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleAddressById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleAddressById } = addressQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleAddressById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.addresses?.deleteSingleAddressById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
