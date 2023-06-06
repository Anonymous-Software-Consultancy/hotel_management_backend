import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { dbHandler, dbHandlerPost } from "../database";
import { sendOnFormat } from "../utils/responseFormat";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { amenitiesQueries } from "../utils/sqlQueries/amenitiesQueries";
import { successMessages } from "../utils/messages";
import { Amenities } from "../types/types";


export const addAmenities = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addAmenities } = amenitiesQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addAmenities,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages?.amenities?.addAmenities
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllAmenities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllAmenities } = amenitiesQueries;
    try {
        const results: Amenities[] = await dbHandler<Amenities>(getAllAmenities, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.amenities?.getAllAmenities))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSingleAmenitiesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSingleAmenitiesById } = amenitiesQueries;
    const targetId = req.params.id
    try {
        const results: Amenities[] = await dbHandler<Amenities>(getSingleAmenitiesById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.amenities?.getSingleAmenitiesById))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSingleAmenitiesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSingleAmenitiesById } = amenitiesQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: Amenities = await dbHandlerPost<Amenities>(updateSingleAmenitiesById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.amenities?.updateSingleAmenitiesById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteSingleAmenitiesById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteSingleAmenitiesById } = amenitiesQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deleteSingleAmenitiesById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.amenities?.deleteSingleAmenitiesById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
