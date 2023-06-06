CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE NOW(),
    adult INT,
    child INT,
    extra_bed INT,
    max_occupancies INT,
    available_room INT,
    rate INT,
    is_booked BOOLEAN DEFAULT FALSE,
    board_type_id INT,
    hotel_id INT,
    FOREIGN KEY (board_type_id) REFERENCES board_types(id) ON DELETE SET NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);
