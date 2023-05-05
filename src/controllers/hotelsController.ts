import { sendOnFormat } from "./../utils/responseFormat";
import { dbHandler } from "./../database/index";
import { ResultSetHeader } from "mysql2";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../errorHandler/errorResponse";
import { hotelQueries } from "../utils/sqlQueries/hotelQueries";
import { Hotel } from "../types/types";
import { errorMessages, successMessages } from "../utils/messages";

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
      return next(
        new ErrorResponse(errorMessages.hotels.isExistHotelName, 403)
      );
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
          successMessages.hotels.addHotel
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
      sendOnFormat(results, true, 200, successMessages.hotels.getAllHotels)
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
    res.send(
      sendOnFormat(
        results,
        true,
        200,
        successMessages.hotels.getSingleHotelById
      )
    );
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
      sendOnFormat(
        { ...req.body },
        true,
        200,
        successMessages.hotels.updateSingleHotelById
      )
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
    res.send(
      sendOnFormat(results, true, 200, successMessages.hotels.deleteHotelById)
    );
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
