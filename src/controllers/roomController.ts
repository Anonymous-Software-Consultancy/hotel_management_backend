import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { roomQueries } from "../utils/sqlQueries/roomQueries";
import { successMessages } from "../utils/messages";
import { Rooms } from "../types/types";

export const addRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addRoom } = roomQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addRoom,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages.rooms.addRoom
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllRooms } = roomQueries;
    try {
        const results: Rooms[] = await dbHandler<Rooms>(getAllRooms, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.rooms.getAllRooms))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleRoomById } = roomQueries;
    const targetId = req.params.id
    try {
        const results: Rooms[] = await dbHandler<Rooms>(getSingleRoomById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.rooms.getSingleRoomById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleRoomById } = roomQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: Rooms = await dbHandlerPost<Rooms>(updateSingleRoomById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.rooms.updateSingleRoomById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleRoomById } = roomQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleRoomById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.rooms.deleteSingleRoomById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
