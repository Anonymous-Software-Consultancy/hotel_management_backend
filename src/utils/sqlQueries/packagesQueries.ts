// type packagesQueryType = {
//     [key: string]: string;
// };

export const packagesQueries = {
    addPackage: `INSERT INTO packages( package_class, description, for_days, is_tax_included, location, place, price_for_child_3_t_6, price_for_child_7_t_12, price_for_double, price_for_infant, price_for_single, price_for_triple, valid_from, valid_to) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

    getAllPackages: `SELECT * FROM packages`,

    getSinglePackageById: `SELECT * FROM packages WHERE id = ?`,

    updateSinglePackageById: `UPDATE packages SET package_class = ?, 
    description = ?, 
    for_days = ?, 
    is_tax_included = ?, 
    location = ?, 
    place = ?, 
    price_for_child_3_t_6 = ?, 
    price_for_child_7_t_12 = ?, 
    price_for_double = ?, 
    price_for_infant = ?, 
    price_for_single = ?, 
    price_for_triple = ?, 
    valid_from = ?, 
    valid_to = ? WHERE id = ?`,

    deletePackageById: `DELETE FROM packages WHERE id = ?`,
};
