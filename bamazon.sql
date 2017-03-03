USE Bamazon;

CREATE TABLE products (
ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
ProductName VARCHAR(30) NOT NULL,
DepartmentName VARCHAR(30) NOT NULL,
Price DECIMAL(10,2) NULL,
StockQuantity INTEGER(10),
PRIMARY KEY (ItemID)
);

INSERT INTO products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES ("3002", "Blue Tie", "Clothing", 12, 150);

SELECT * FROM products;

DELETE FROM products WHERE StockQuantity = 200;

DROP TABLE products;