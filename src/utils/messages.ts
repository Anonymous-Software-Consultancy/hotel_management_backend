import { objectType } from "../types/types"


export const successMessages:objectType = {
    hotels:{
        addHotel: 'Added New Hotel Successfully.',
        getAllHotels: 'Showing All Hotels Successfully.',
        getSingleHotelById: 'Found Hotel Successfully.',
        updateSingleHotelById: 'Hotel Updated Successfully.',
        deleteHotelById: 'Deleted Hotel Successfully.'
    },
}

export const errorMessages:objectType = {
    hotels:{
        isExistHotelName: 'This Hotel Name Is Already Exists.'
    },
}