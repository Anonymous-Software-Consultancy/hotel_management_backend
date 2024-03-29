type facilityGroupQueryType = {
  [key: string]: string;
};

export const facilityGroupQueries = {
  addFacilityGroup: `INSERT INTO facility_group (
        breakfast,
        restaurant,
        parking,
        two_four_security,
        business,
        swimming_pool,
        room_service,
        indoor_games,
        outdoor_activities,
        fitness_centre,
        airport_shuttle,
        early_checkin,
        late_checkout,
        kid_friendly,
        couple_friendly,
        disability_friendly,
        hotel_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

  getAllFacilityGroup: `SELECT * FROM facility_group`,

  getFacilityGroupById: `SELECT * FROM facility_group WHERE id = ?`,

  updateFacilityGroupById: `UPDATE facility_group SET 
    breakfast=?,
    restaurant=?,
    parking=?,
    two_four_security=?,
    business=?,
    swimming_pool=?,
    room_service=?,
    indoor_games=?,
    outdoor_activities=?,
    fitness_centre=?,
    airport_shuttle=?,
    early_checkin=?,
    late_checkout=?,
    kid_friendly=?,
    couple_friendly=?,
    disability_friendly=?,
    hotel_id=? WHERE id = ?`,

  deleteFacilityGroupById: `DELETE FROM facility_group WHERE id = ?`,

  isExistFacilityGroup: `SELECT * FROM facility_group WHERE id = ?`,
};
