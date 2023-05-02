CREATE TABLE IF NOT EXISTS facility_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    breakfast BOOLEAN DEFAULT false,
    restaurant BOOLEAN DEFAULT false,
    parking BOOLEAN DEFAULT false,
    two_four_security BOOLEAN DEFAULT false,
    business BOOLEAN DEFAULT false,
    swimming_pool BOOLEAN DEFAULT false,
    room_service BOOLEAN DEFAULT false,
    indoor_games BOOLEAN DEFAULT false,
    outdoor_activities BOOLEAN DEFAULT false,
    fitness_centre BOOLEAN DEFAULT false,
    airport_shuttle BOOLEAN DEFAULT false,
    early_checkin BOOLEAN DEFAULT false,
    late_checkout BOOLEAN DEFAULT false,
    kid_friendly BOOLEAN DEFAULT false,
    couple_friendly BOOLEAN DEFAULT false,
    disability_friendly BOOLEAN DEFAULT false,
    hotel_id INT,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);
