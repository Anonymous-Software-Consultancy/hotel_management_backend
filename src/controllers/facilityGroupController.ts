import { sendOnFormat } from "./../utils/responseFormat";
import { dbHandler } from "./../database/index";
import { ResultSetHeader } from "mysql2";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { hotelQueries } from "../utils/sqlQueries/hotelQueries";
import { errorMessages, successMessages } from "../utils/messages";
import { FacilityGroup } from "../types/types";
import { facilityGroupQueries } from "../utils/sqlQueries/facilityGroupQueries";

export const addFacilityGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
    } = req.body;

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
    ];
    const results: ResultSetHeader[] = await dbHandler<ResultSetHeader>(
      facilityGroupQueries.addFacilityGroup,
      [values]
    );
    console.log("💛results:", results);
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
