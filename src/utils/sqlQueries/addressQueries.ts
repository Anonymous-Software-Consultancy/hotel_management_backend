// type roomsQueryType = {
//     [key: string]: string;
// };

export const addressQueries = {
    addAddress: `INSERT INTO addresses(
        area,
        street_address,
        city,
        country,
        hotel_id
        ) VALUES (?,?,?,?,?)`,

    getAllAddresses: `SELECT * FROM addresses`,

    getSingleAddressById: `SELECT * FROM addresses WHERE id = ?`,

    updateSingleAddressById: `UPDATE addresses SET 
    area = ?,
    street_address = ?,
    city = ?,
    country = ?,
    hotel_id = ? WHERE id = ?`,

    deleteSingleAddressById: `DELETE FROM addresses WHERE id = ?`,
};
