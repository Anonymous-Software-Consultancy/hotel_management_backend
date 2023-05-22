// type roomsQueryType = {
//     [key: string]: string;
// };

export const roomQueries = {
    addRoom: `INSERT INTO rooms(
        adult,
        child,
        extra_bed,
        max_occupancies,
        available_room,
        rate,
        is_booked,
        board_type_id,
        hotel_id) VALUES (?,?,?,?,?,?,?,?,?)`,

    getAllRooms: `SELECT * FROM rooms`,

    getSingleRoomById: `SELECT * FROM rooms WHERE id = ?`,

    updateSingleRoomById: `UPDATE rooms SET 
        adult = ?,
        child = ?,
        extra_bed = ?,
        max_occupancies = ?,
        available_room = ?,
        rate = ?,
        is_booked = ?,
        board_type_id = ?,
        hotel_id = ? WHERE id = ?`,

    deleteSingleRoomById: `DELETE FROM rooms WHERE id = ?`,
};
