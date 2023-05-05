export const hotelQueries = {
  addHotel: `INSERT INTO hotels( name, tax, service_charge, partnership_discount, discount_promo_code, discount_description, rating_value) VALUES (?,?,?,?,?,?,?)`,

  getAllHotels: `SELECT * FROM hotels`,

  getSingleHotelById: `SELECT * FROM hotels WHERE id = ?`,

  updateSingleHotelById: `UPDATE hotels SET name=?, tax=?, service_charge=?, partnership_discount=?, discount_promo_code=?, discount_description=?, rating_value=? WHERE id = ?`,

  deleteHotelById: `DELETE FROM hotels WHERE id = ?`,

  isExistHotelName: `SELECT * FROM hotels WHERE name = ?`
};
