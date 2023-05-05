import { sendOnFormat } from "./../utils/responseFormat";
import { dbHandler } from "./../database/index";
import { ResultSetHeader } from "mysql2";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { hotelQueries } from "../utils/sqlQueries/hotelQueries";
import { Hotel } from "../types/types";

export const addHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      tax,
      service_charge,
      partnership_discount,
      discount_promo_code,
      discount_description,
      rating_value,
    } = req.body;

    const values = [
      name,
      tax,
      service_charge,
      partnership_discount,
      discount_promo_code,
      discount_description,
      rating_value,
    ];

    const isExistHotelName: Hotel[] = await dbHandler(
      hotelQueries.isExistHotelName,
      [name]
    );

    if (isExistHotelName.length > 0) {
      // throw new ErrorResponse("This Hotel Name is already exist.", 403)
      return next(new ErrorResponse("This Hotel Name is already exists.", 403));
    } else {
      const results: RowDataPacket[] = await dbHandler<RowDataPacket>(
        hotelQueries.addHotel,
        values
      );
      console.log("💛results:", results);
      res.send(
        sendOnFormat(
          { ...req.body, id: results[0]?.insertId },
          true,
          200,
          "Added new hotel successfully."
        )
      );
    }
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results: Hotel[] = await dbHandler<Hotel>(
      hotelQueries.getAllHotels,
      []
    );
    res.send(
      sendOnFormat(results, true, 200, "Showing all hotels successfully.")
    );
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getSingleHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const targetHotelId = req.params.id;
    const results: Hotel[] = await dbHandler<Hotel>(
      hotelQueries.getSingleHotelById,
      [targetHotelId]
    );
    res.send(sendOnFormat(results, true, 200, "Found Hotel Successfully."));
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const updateSingleHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const targetHotelId = req.params.id;
    const {
      name,
      tax,
      service_charge,
      partnership_discount,
      discount_promo_code,
      discount_description,
      rating_value,
    } = req.body;

    const values = [
      name,
      tax,
      service_charge,
      partnership_discount,
      discount_promo_code,
      discount_description,
      rating_value,
    ];
    const results: Hotel[] = await dbHandler<Hotel>(
      hotelQueries.updateSingleHotelById,
      [values, targetHotelId]
    );
    console.log("💛results:", results);
    res.send(
      sendOnFormat({ ...req.body }, true, 200, "Hotel updated Successfully.")
    );
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const deleteHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const targetHotelId = req.params.id;
    const results: OkPacket[] = await dbHandler<OkPacket>(
      hotelQueries.deleteHotelById,
      [targetHotelId]
    );
    console.log("💛results:", results);
    res.send(sendOnFormat(results, true, 200, "Deleted Hotel Successfully."));
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
