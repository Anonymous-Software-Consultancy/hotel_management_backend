import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { hotelImagesQueries } from "../utils/sqlQueries/hotelImagesQueries";
import { successMessages } from "../utils/messages";
import { HotelImages } from "../types/types";


export const addHotelImage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addHotelImage } = hotelImagesQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addHotelImage,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages.hotelImages.addHotelImage
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllHotelImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllHotelImages } = hotelImagesQueries;
    try {
        const results: HotelImages[] = await dbHandler<HotelImages>(getAllHotelImages, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.hotelImages.getAllHotelImages))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleHotelImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleHotelImageById } = hotelImagesQueries;
    const targetId = req.params.id
    try {
        const results: HotelImages[] = await dbHandler<HotelImages>(getSingleHotelImageById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.hotelImages.getSingleHotelImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleHotelImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleHotelImageById } = hotelImagesQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: HotelImages = await dbHandlerPost<HotelImages>(updateSingleHotelImageById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.hotelImages.updateSingleHotelImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleHotelImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleHotelImageById } = hotelImagesQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleHotelImageById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.hotelImages.deleteSingleHotelImageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
