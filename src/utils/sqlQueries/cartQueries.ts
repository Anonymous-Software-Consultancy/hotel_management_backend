// type roomsQueryType = {
//     [key: string]: string;
// };

export const cartQueries = {
    addCart: `INSERT INTO carts(
        user_id,
        room_id,
        hotel_id
        ) VALUES (?,?,?)`,

    isExistCart: `SELECT user_id, room_id, hotel_id FROM carts WHERE user_id = ? AND room_id = ? AND hotel_id = ?`,

    getAllCarts: `SELECT * FROM carts`,

    getSingleCartById: `SELECT * FROM carts WHERE user_id = ?`,

    updateSingleCartById: `UPDATE carts SET 
    user_id = ?,
    room_id = ?,
    hotel_id = ? WHERE user_id = ?`,

    deleteSingleCartById: `DELETE FROM carts WHERE id = ?`,
};
