import { sendOnFormat } from './../utils/responseFormat'
import { dbHandler, dbHandlerPost } from './../database/index'
import { ResultSetHeader } from 'mysql2'
import { OkPacket, RowDataPacket } from 'mysql2'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../errorHandler/errorResponse'
import { hotelQueries } from '../utils/sqlQueries/hotelQueries'
import { errorMessages, successMessages } from '../utils/messages'
import { FacilityGroup } from '../types/types'
import { facilityGroupQueries } from '../utils/sqlQueries/facilityGroupQueries'

export const addFacilityGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            breakfast,
            restaurant,
            parking,
            two_four_security,
            business,
            swimming_pool,
            room_service,
            indoor_games,
            outdoor_activities,
            fitness_centre,
            airport_shuttle,
            early_checkin,
            late_checkout,
            kid_friendly,
            couple_friendly,
            disability_friendly,
            hotel_id,
        } = req.body

        const values = [
            breakfast,
            restaurant,
            parking,
            two_four_security,
            business,
            swimming_pool,
            room_service,
            indoor_games,
            outdoor_activities,
            fitness_centre,
            airport_shuttle,
            early_checkin,
            late_checkout,
            kid_friendly,
            couple_friendly,
            disability_friendly,
            hotel_id,
        ]
        const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(facilityGroupQueries.addFacilityGroup, values)
       
        if (results?.insertId > 0) {
            res.send(sendOnFormat({ ...req.body, id: results?.insertId }, true, 200, successMessages.facility_group.addFacilityGroup))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getAllFacilityGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const results: FacilityGroup[] = await dbHandler<FacilityGroup>(facilityGroupQueries.getAllFacilityGroup, [])
        console.log('💛results:', results)
        if (results.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.facility_group.getAllFacilityGroup))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const getFacilityGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const targetId = req.params.id
        const results: FacilityGroup[] = await dbHandler<FacilityGroup>(facilityGroupQueries.getFacilityGroupById, [targetId])
        console.log('💛results:', results, results.length)
        if (results.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.facility_group.getFacilityGroupById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const updateFacilityGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            breakfast,
            restaurant,
            parking,
            two_four_security,
            business,
            swimming_pool,
            room_service,
            indoor_games,
            outdoor_activities,
            fitness_centre,
            airport_shuttle,
            early_checkin,
            late_checkout,
            kid_friendly,
            couple_friendly,
            disability_friendly,
            hotel_id,
        } = req.body

        const targetId = req.params.id
        console.log("💛targetId:", targetId)
        const results: FacilityGroup[] = await dbHandler<FacilityGroup>(facilityGroupQueries.updateFacilityGroupById, [req.body, targetId])
        console.log('💛results:', results)
        if (results.length > 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.facility_group.updateFacilityGroupById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}

export const deleteFacilityGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const targetId = req.params.id
        const results: OkPacket[] = await dbHandler<OkPacket>(facilityGroupQueries.deleteFacilityGroupById, [targetId])
        console.log('💛results:', results)
        if (results.length !== 0) {
            res.send(sendOnFormat(results, true, 200, successMessages.facility_group.deleteFacilityGroupById))
        }
    } catch (error) {
        return next(new ErrorResponse(error, 500))
    }
}
