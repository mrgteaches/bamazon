DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT not null,
    product_name VARCHAR(100) not null,
    department_name VARCHAR(100) not null,
    price DECIMAL(10, 2) not null,
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
    );
    
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "French Dictionary", "Romance Languages", 29.99, 35);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Spanish Dictionary", "Romance Languages", 19.99, 25),
	(3, "Italian Grammar", "Romance Languages", 15.49, 13),
    (4, "Russian Vocabulary", "Slavic Languages", 19.79, 27),
    (5, "Polish Grammar Made Simple", "Slavic Languages", 8.99, 32),
    (6, "German For Beginners", "Germanic Languages", 27.99, 41),
    (7, "Icelandic Tongue Twisters", "Germanic Languages", 6.99, 15),
    (8, "Chinese Characters", "Asian Languages", 14.99, 31),
    (9, "Japanese Grammar", "Asian Languages", 16.99, 18),
    (10, "Korean Verbs", "Asian Languages", 17.59, 9);

