CREATE TABLE IF NOT EXISTS hotels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE NOW(),
    name VARCHAR(100) NOT NULL UNIQUE,
    tax INT,
    service_charge INT,
    partnership_discount FLOAT,
    discount_promo_code VARCHAR(20),
    discount_description VARCHAR(150),
    rating_value FLOAT,
    INDEX idx_hotels_name (name)
);
