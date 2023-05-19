// import { objectType } from "../types/types"

export const successMessages = {
    hotels: {
        addHotel: 'Added New Hotel Successfully.',
        getAllHotels: 'Showing All Hotels Successfully.',
        getSingleHotelById: 'Found Hotel Successfully.',
        updateSingleHotelById: 'Hotel Updated Successfully.',
        deleteHotelById: 'Deleted Hotel Successfully.',
    },
    facility_group: {
        addFacilityGroup: 'Added Facilities Successfully.',
        getAllFacilityGroup: 'Showing All Facility Group Successfully.',
        getFacilityGroupById: 'Found Facility Group Successfully.',
        updateFacilityGroupById: 'Facility Group Updated Successfully.',
        deleteFacilityGroupById: 'Deleted Facility Group Successfully.',
    },
    board_type: {
        addBoardTypep: 'Added Board Type Successfully.',
        getBoardTypepById: 'Found Board Type Successfully.',
        updateBoardTypeById: 'Board Type Updated Successfully.',
        deleteBoardTypepById: 'Deleted Board Type Successfully.',
    },
}

export const errorMessages = {
    hotels: {
        isExistHotelName: 'This Hotel Name Is Already Exists.',
    },
    facility_group: {
        isExistFacilityGroup: 'This Facility Group Is Already Exists.',
    },
    board_type: {
        isExistFacilityGroup: 'This Board Type Is Already Exists.',
    },
}
