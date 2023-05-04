export const sqlQuery = {
  addHotel: `INSERT INTO hotels(id, created_at, updated_at, name, tax, service_charge, partnership_discount, discount_promo_code, discount_description, rating_value) VALUES (?,?,?,?,?,?,?,?,?,?)`,
};
