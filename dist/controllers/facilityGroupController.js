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
exports.getFacilityGroupById = exports.addFacilityGroup = void 0;
const responseFormat_1 = require("./../utils/responseFormat");
const index_1 = require("./../database/index");
const errorResponse_1 = require("../errorHandler/errorResponse");
const messages_1 = require("../utils/messages");
const facilityGroupQueries_1 = require("../utils/sqlQueries/facilityGroupQueries");
const addFacilityGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { breakfast, restaurant, parking, two_four_security, business, swimming_pool, room_service, indoor_games, outdoor_activities, fitness_centre, airport_shuttle, early_checkin, late_checkout, kid_friendly, couple_friendly, disability_friendly, hotel_id, } = req.body;
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
        const results = yield (0, index_1.dbHandler)(facilityGroupQueries_1.facilityGroupQueries.addFacilityGroup, [values]);
        console.log("💛results:", results);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(Object.assign(Object.assign({}, req.body), { id: (_a = results[0]) === null || _a === void 0 ? void 0 : _a.insertId }), true, 200, messages_1.successMessages.facility_group.addFacilityGroup));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.addFacilityGroup = addFacilityGroup;
const getFacilityGroupById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetId = req.params.id;
        const results = yield (0, index_1.dbHandler)(facilityGroupQueries_1.facilityGroupQueries.getFacilityGroupById, [targetId]);
        console.log("💛results:", results);
        if (results.length !== 0) {
            res.send((0, responseFormat_1.sendOnFormat)(Object.assign({}, req.body), true, 200, messages_1.successMessages.facility_group.getFacilityGroupById));
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse(error, 500));
    }
});
exports.getFacilityGroupById = getFacilityGroupById;
