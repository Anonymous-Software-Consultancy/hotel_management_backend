"use strict";
// import { objectType } from "../types/types"
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = exports.successMessages = void 0;
exports.successMessages = {
    hotels: {
        addHotel: 'Added New Hotel Successfully.',
        getAllHotels: 'Showing All Hotels Successfully.',
        getSingleHotelById: 'Found Hotel Successfully.',
        updateSingleHotelById: 'Hotel Updated Successfully.',
        deleteHotelById: 'Deleted Hotel Successfully.'
    },
};
exports.errorMessages = {
    hotels: {
        isExistHotelName: 'This Hotel Name Is Already Exists.'
    },
};
