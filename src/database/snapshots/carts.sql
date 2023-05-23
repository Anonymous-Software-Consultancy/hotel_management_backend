CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE
);
