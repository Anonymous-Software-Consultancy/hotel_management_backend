import { NextFunction, Request, Response } from "express";
import { OkPacket, ResultSetHeader } from "mysql2";
import { packagesQueries } from "../utils/sqlQueries/packagesQueries";
import { sendOnFormat } from "../utils/responseFormat";
import { successMessages } from "../utils/messages";
import { dbHandler, dbHandlerPost } from "../database";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { Packages } from "../types/types";

export const addPackage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { addPackage } = packagesQueries;
    const values = [...Object.values(req.body)];
    try {
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
            addPackage,
            values
        );
        console.log("💛results:", results)

        if (results?.insertId > 0) {
            res.send(
                sendOnFormat(
                    { ...req.body, id: results?.insertId },
                    true,
                    200,
                    successMessages.packages.addPackage
                )
            );
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500));
    }
};

export const getAllPackages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getAllPackages } = packagesQueries;
    try {
        const results: Packages[] = await dbHandler<Packages>(getAllPackages, [])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.packages.getAllPackages))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getSinglePackageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { getSinglePackageById } = packagesQueries;
    const targetId = req.params.id
    try {
        const results: Packages[] = await dbHandler<Packages>(getSinglePackageById, [targetId])
        console.log('💛results:', results)
        if (results?.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.packages.getSinglePackageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateSinglePackageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { updateSinglePackageById } = packagesQueries;
    const targetId = req.params.id
    const values = [...Object.values(req.body), targetId]
    try {
        const results: Packages = await dbHandlerPost<Packages>(updateSinglePackageById, values)
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.packages.updateSinglePackageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deletePackageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deletePackageById } = packagesQueries;
    const targetId = req.params.id;
    try {
        const results: OkPacket = await dbHandlerPost<OkPacket>(deletePackageById, [targetId])
        console.log('💛results:', results)
        if (results?.affectedRows > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.packages.deletePackageById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
