CREATE TABLE IF NOT EXISTS packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME ON UPDATE NOW(),
    package_class VARCHAR(20),
    description VARCHAR(255),
    for_days INT,
    is_tax_included BOOLEAN,
    location VARCHAR(50),
    place VARCHAR(100),
    price_for_child_3_t_6 INT,
    price_for_child_7_t_12 INT,
    price_for_double INT,
    price_for_infant INT,
    price_for_single INT,
    price_for_triple INT,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL
);
