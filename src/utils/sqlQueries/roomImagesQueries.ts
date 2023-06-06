// type roomsQueryType = {
//     [key: string]: string;
// };

export const roomImagesQueries = {
    addRoomImage: `INSERT INTO room_images(
        name,
        description,
        source_url,
        room_id
        ) VALUES (?,?,?,?)`,

    getAllRoomImages: `SELECT * FROM room_images`,

    getSingleRoomImageById: `SELECT * FROM room_images WHERE id = ?`,

    updateSingleRoomImageById: `UPDATE room_images SET 
    name = ?,
    description = ?,
    source_url = ?,
    room_id = ? WHERE id = ?`,

    deleteSingleRoomImageById: `DELETE FROM room_images WHERE id = ?`,
};
