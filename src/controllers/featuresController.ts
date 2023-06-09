import { Hotel, HotelImages, Likes } from './../types/types';
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { likesQueries } from "../utils/sqlQueries/likesQueries";
import { dbHandler, dbHandlerPost } from '../database';
import { OkPacket, ResultSetHeader } from 'mysql2';
import { sendOnFormat } from '../utils/responseFormat';
import { errorMessages, successMessages } from '../utils/messages';
import { searchQueries } from '../utils/sqlQueries/searchQueries';

/* ----------------
    Like & Unlike
------------------- */

export const like = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { like, getLikedUserById } = likesQueries;
        const packageId = req.query.packageId;
        const values = [...Object.values(req.body)]

        const checkIsLiked: Likes[] = await dbHandler<Likes>(getLikedUserById, [true, 3, packageId])
        const isAlreadyLiked = checkIsLiked?.length === 0 ? false : true;

        if (isAlreadyLiked === false) {
            // addLike functionalities
            const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
                like, values
            )
            if (results?.insertId > 0) {
                res.send(sendOnFormat({ ...results, isLiked: true }, true, 200, successMessages?.likes?.like))
            }
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const unLike = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { unLike, getLikedUserById } = likesQueries;
        const packageId = req.query.packageId;

        const checkIsLiked: Likes[] = await dbHandler<Likes>(getLikedUserById, [true, 1, packageId])
        const isAlreadyLiked = checkIsLiked?.length === 0 ? false : true;

        if (isAlreadyLiked === true) {
            // unLiked functionalities
            const results: OkPacket = await dbHandlerPost<OkPacket>(unLike, [1, packageId])
            if (results?.affectedRows > 0) {
                res.send(sendOnFormat({ ...results, isLiked: false }, true, 200, successMessages?.likes?.unLike))
            }
        }

    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllLikesByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { getAllLikesByUserId } = likesQueries;
        const results: Likes[] = await dbHandler<Likes>(getAllLikesByUserId, [req.query.userId])
        console.log("💛results:", results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.likes?.getAllLikesByUserId))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllLikesByPackageId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { getAllLikesByPackageId } = likesQueries;
        const packageId = req.query.packageId
        console.log("💛packageId:", packageId)
        const results: Likes[] = await dbHandler<Likes>(getAllLikesByPackageId, [packageId])
        console.log("💛results:", results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.likes?.getAllLikesByPackageId))
        } else if (results?.length === 0) {
            res.send(sendOnFormat(null, true, 200, 'No data found.'))
        } else { return }

    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};



/* -------------------------------
    Search Filter by Hotel Name
---------------------------------- */

export const searchByHotelName = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const searchedHotel:string | any = req.query.hotelName;
        const results: Hotel[] = await dbHandler<Hotel>(`SELECT id, name FROM hotels WHERE name LIKE '%${(searchedHotel !== '') && searchedHotel}%'`, []);

        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages?.searchHotelByName?.searchSuccess)).end()
        } else {
            res.send(sendOnFormat(results, true, 404, errorMessages?.searchHotelByName?.searchFailure)).end()
        }

    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
}
