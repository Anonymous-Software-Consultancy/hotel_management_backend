// type roomsQueryType = {
//     [key: string]: string;
// };

export const hotelImagesQueries = {
    addHotelImage: `INSERT INTO hotel_images(
        name,
        description,
        source_url,
        hotel_id
        ) VALUES (?,?,?,?)`,

    getAllHotelImages: `SELECT * FROM hotel_images`,

    getSingleHotelImageById: `SELECT * FROM hotel_images WHERE id = ?`,

    updateSingleHotelImageById: `UPDATE hotel_images SET 
    name = ?,
    description = ?,
    source_url = ?,
    hotel_id = ? WHERE id = ?`,

    deleteSingleHotelImageById: `DELETE FROM hotel_images WHERE id = ?`,
};
