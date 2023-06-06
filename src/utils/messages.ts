import { FeedBacks } from './../types/types';
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
    },
    roomImages: {
        addRoomImage: 'Added Room Image Successfully.',
        getAllRoomImages: 'Found All Room Images Successfully.',
        getSingleRoomImageById: 'Found Room Image Successfully.',
        updateSingleRoomImageById: 'Updated Room Image Successfully.',
        deleteSingleRoomImageById: 'Deleted Room Image Successfully.'
    },
    hotelImages: {
        addHotelImage: 'Added Hotel Image Successfully.',
        getAllHotelImages: 'Found All Hotel Images Successfully.',
        getSingleHotelImageById: 'Found Hotel Image Successfully.',
        updateSingleHotelImageById: 'Updated Hotel Image Successfully.',
        deleteSingleHotelImageById: 'Deleted Hotel Image Successfully.'
    },
    carts: {
        addCart: 'Added Cart Successfully.',
        getAllCarts: 'Found All Carts Successfully.',
        getSingleCartById: 'Found Cart Successfully.',
        deleteSingleCartById: 'Deleted Cart Successfully.'
    },
    feedBacks: {
        addFeedBacks: 'Added Feed Back Successfully.',
        getAllFeedBacks: 'Found All Feed Backs Successfully.',
        getSingleFeedBackById: 'Found Feed Back Successfully.',
        updateSingleFeedBackById: 'Updated Feed Back Successfully.',
        deleteSingleFeedBackById: 'Deleted Feed Back Successfully.'
    },
    addresses: {
        addAddress: 'Added Address Successfully.',
        getAllAddresses: 'Found All Addresses Successfully.',
        getSingleAddressById: 'Found Address Successfully.',
        updateSingleAddressById: 'Updated Address Successfully.',
        deleteSingleAddressById: 'Deleted Address Successfully.'
    },
    amenities: {
        addAmenities: 'Added Amenities Successfully.',
        getAllAmenities: 'Found All Amenities Successfully.',
        getSingleAmenitiesById: 'Found Amenities Successfully.',
        updateSingleAmenitiesById: 'Updated Amenities Successfully.',
        deleteSingleAmenitiesById: 'Deleted Amenities Successfully.'
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

    carts: {
        isExistCart: 'Already added to your cart.'
    },

    amenities: {
        isExistAmenities: 'Already added this amenities.'
    }
}
