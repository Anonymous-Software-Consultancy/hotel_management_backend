// type roomsQueryType = {
//     [key: string]: string;
// };

export const bookedByUserQueries = {
    addBooking: `INSERT INTO booked_by_users(
        check_in,
        check_out,
        user_id,
        room_id,
        hotel_id
        ) VALUES (?,?,?,?,?)`,

    getAllBookings: `SELECT * FROM booked_by_users`,

    getSingleBookingById: `SELECT * FROM booked_by_users WHERE id = ?`,

    deleteSingleBookingById: `DELETE FROM booked_by_users WHERE id = ?`,
};
