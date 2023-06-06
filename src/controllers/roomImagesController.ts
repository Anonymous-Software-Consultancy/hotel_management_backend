import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { roomImagesQueries } from "../utils/sqlQueries/roomImagesQueries";
import { successMessages } from "../utils/messages";
import { RoomImages } from "../types/types";


export const addRoomImage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addRoomImage } = roomImagesQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addRoomImage,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages.roomImages.addRoomImage
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllRoomImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllRoomImages } = roomImagesQueries;
    try {
        const results: RoomImages[] = await dbHandler<RoomImages>(getAllRoomImages, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.roomImages.getAllRoomImages))
        }else if(results?.length === 0){
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        }else{return}
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleRoomImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleRoomImageById } = roomImagesQueries;
    const targetId = req.params.id
    try {
        const results: RoomImages[] = await dbHandler<RoomImages>(getSingleRoomImageById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.roomImages.getSingleRoomImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleRoomImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleRoomImageById } = roomImagesQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: RoomImages = await dbHandlerPost<RoomImages>(updateSingleRoomImageById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.roomImages.updateSingleRoomImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleRoomImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleRoomImageById } = roomImagesQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleRoomImageById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.roomImages.deleteSingleRoomImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
