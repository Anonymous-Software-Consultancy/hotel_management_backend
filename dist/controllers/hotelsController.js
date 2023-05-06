"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelById = exports.updateSingleHotelById = exports.getSingleHotelById = exports.getAllHotels = exports.addHotel = void 0;
const responseFormat_1 = require("./../utils/responseFormat");
const index_1 = require("./../database/index");
const errorResponse_1 = require("../errorHandler/errorResponse");
const hotelQueries_1 = require("../utils/sqlQueries/hotelQueries");
const messages_1 = require("../utils/messages");
const addHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, tax, service_charge, partnership_discount, discount_promo_code, discount_description, rating_value, } = req.body;
        const values = [
            name,
            tax,
            service_charge,
            partnership_discount,
            discount_promo_code,
            discount_description,
            rating_value,
        ];
        const isExistHotelName = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.isExistHotelName, [name]);
        if (isExistHotelName.length > 0) {
            // throw new ErrorResponse("This Hotel Name is already exist.", 403)
            return next(new errorResponse_1.ErrorResponse(messages_1.errorMessages.hotels.isExistHotelName, 403));
        }
        else {
            const results = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.addHotel, values);
            console.log("💛results:", results);
            if (results.length !== 0) {
                res.send((0, responseFormat_1.sendOnFormat)(Object.assign(Object.assign({}, req.body), { id: (_a = results[0]) === null || _a === void 0 ? void 0 : _a.insertId }), true, 200, messages_1.successMessages.hotels.addHotel));
            }
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.addHotel = addHotel;
const getAllHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.getAllHotels, []);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(results, true, 200, messages_1.successMessages.hotels.getAllHotels));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.getAllHotels = getAllHotels;
const getSingleHotelById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetHotelId = req.params.id;
        const results = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.getSingleHotelById, [targetHotelId]);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(results, true, 200, messages_1.successMessages.hotels.getSingleHotelById));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.getSingleHotelById = getSingleHotelById;
const updateSingleHotelById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetHotelId = req.params.id;
        const { name, tax, service_charge, partnership_discount, discount_promo_code, discount_description, rating_value, } = req.body;
        const values = [
            name,
            tax,
            service_charge,
            partnership_discount,
            discount_promo_code,
            discount_description,
            rating_value,
        ];
        const results = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.updateSingleHotelById, [values, targetHotelId]);
        console.log("💛results:", results);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(Object.assign({}, req.body), true, 200, messages_1.successMessages.hotels.updateSingleHotelById));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.updateSingleHotelById = updateSingleHotelById;
const deleteHotelById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetHotelId = req.params.id;
        const results = yield (0, index_1.dbHandler)(hotelQueries_1.hotelQueries.deleteHotelById, [targetHotelId]);
        console.log("💛results:", results);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(results, true, 200, messages_1.successMessages.hotels.deleteHotelById));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.deleteHotelById = deleteHotelById;
