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
        updateFacilityGroupById: 'Updated Facility Group Successfully.',
        deleteFacilityGroupById: 'Deleted Facility Group Successfully.',
    },
    board_type: {
        addBoardTypep: 'Added Board Type Successfully.',
        getBoardTypepById: 'Found Board Type Successfully.',
        updateBoardTypeById: 'Updated Board Type Successfully.',
        deleteBoardTypepById: 'Deleted Board Type Successfully.',
    },
    packages: {
        addPackage: 'Added Package Successfully.',
        getAllPackages: 'Found All Packages Successfully.',
        getSinglePackageById: 'Found Package Successfully.',
        updateSinglePackageById: 'Updated Package Successfully.',
        deletePackageById: 'Deleted Package Successfully.'
    },
    rooms: {
        addRoom: 'Added Room Successfully.',
        getAllRooms: 'Found All Rooms Successfully.',
        getSingleRoomById: 'Found Room Successfully.',
        updateSingleRoomById: 'Updated Room Successfully.',
        deleteSingleRoomById: 'Deleted Room Successfully.'
    }
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
