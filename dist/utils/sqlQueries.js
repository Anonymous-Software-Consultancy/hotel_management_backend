"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlQuery = void 0;
exports.sqlQuery = {
    addHotel: `INSERT INTO hotels(id, created_at, updated_at, name, tax, service_charge, partnership_discount, discount_promo_code, discount_description, rating_value) VALUES (?,?,?,?,?,?,?,?,?,?)`,
};
