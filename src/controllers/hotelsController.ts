import { sendOnFormat } from "./../utils/responseFormat";
import { dbHandler, dbHandlerPost } from "./../database/index";
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
      const results: ResultSetHeader = await dbHandlerPost<ResultSetHeader>(
        hotelQueries.addHotel,
        values
      );
      console.log("💛results:", results);
      if (results?.insertId > 0) {
        res.send(
          sendOnFormat(
            { ...req.body, id: results?.insertId },
            true,
            200,
            successMessages.hotels.addHotel
          )
        );
      }
    }
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

// server-side-pagination
export const getHotelsByPageCount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results:Hotel[] = await dbHandler<Hotel>(`SELECT count(*) FROM hotels`,[]); 
    const currentPage:number = Number(req.query.page || 1);
    const limit:number = 10;
    const totalDataLength:number = Object.values(results[0])[0];
    const numberOfPages:number = Math.ceil(totalDataLength/limit);
    const startIndex:number = (currentPage - 1) * limit;
    const endIndex:number = currentPage * limit;

    const paginatedResults:Hotel[] = await dbHandler<Hotel>(`SELECT id, name FROM hotels LIMIT ${startIndex},${endIndex}`,[])
    if (paginatedResults?.length > 0) {
        res.send(sendOnFormat(paginatedResults, true, 200, successMessages?.searchHotelByName?.searchSuccess)).end()
    }else{
        res.send(sendOnFormat(paginatedResults, true, 404, errorMessages?.searchHotelByName?.searchFailure)).end()
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
    if (results.length !== 0) {
      res.send(
        sendOnFormat(results, true, 200, successMessages.hotels.getAllHotels)
      );
    } else if (results?.length === 0) {
      res.send(sendOnFormat(null, true, 200, 'No data found.'))
    } else { return }
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
    if (results.length !== 0) {
      res.send(
        sendOnFormat(
          results,
          true,
          200,
          successMessages.hotels.getSingleHotelById
        )
      );
    }
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
    const targetId = req.params.id;
    const values = [...Object.values(req.body), targetId]
    const results: Hotel = await dbHandlerPost<Hotel>(hotelQueries.updateSingleHotelById, values);
    console.log("💛results:", results);
    if (results?.affectedRows > 0) {
      res.send(
        sendOnFormat(
          { ...req.body },
          true,
          200,
          successMessages.hotels.updateSingleHotelById
        )
      );
    }
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
    const results: OkPacket = await dbHandlerPost<OkPacket>(
      hotelQueries.deleteHotelById,
      [targetHotelId]
    );
    console.log("💛results:", results);
    if (results.affectedRows > 0) {
      res.send(
        sendOnFormat(results, true, 200, successMessages.hotels.deleteHotelById)
      );
    }
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
