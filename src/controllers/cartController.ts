import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { errorMessages, successMessages } from "../utils/messages";
import { Carts } from "../types/types";
import { cartQueries } from "../utils/sqlQueries/cartQueries";



export const addCart = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addCart, isExistCart } = cartQueries;

    const values = [...Object.values(req.body)];
    try {
        const checkingExistingCarts: Carts[] = await dbHandler<Carts>(isExistCart, values)
        const isExist = checkingExistingCarts?.length === 1 ? true : false;

        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addCart,
            values
        );

        if (isExist === false) {
            if (results?.insertId > 0) {
                res.send(
                    sendOnFormat(
                        { ...req?.body, id: results?.insertId },
                        true,
                        200,
                        successMessages?.carts?.addCart
                    )
                );
            }
        } else {
            return next(new ErrorResponse(errorMessages?.carts?.isExistCart, 500));
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllCarts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllCarts } = cartQueries;
    try {
        const results: Carts[] = await dbHandler<Carts>(getAllCarts, [])

        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.carts?.getAllCarts))
        }else if(results?.length === 0){
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        }else{return}
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleCartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleCartById } = cartQueries;
    const targetId = req.params.id
    try {
        const results: Carts[] = await dbHandler<Carts>(getSingleCartById, [targetId])

        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.carts?.getSingleCartById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleCartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleCartById } = cartQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleCartById, [targetId])

        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.carts?.deleteSingleCartById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}