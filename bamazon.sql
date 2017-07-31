
CREATE DATABASE bamazon_db;

USE bamazon_db;

create table products (
	item_id int not null auto_increment,
    product_name varchar(30) NULL, 
    department_name varchar(30) NULL,
    price decimal(10,2) NULL, 
    stock_qty int NULL, 
	primary key (item_id)
    );

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Fidget Spinner", "Toys", "10.00", "1000");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Guitar Tuner", "Music Accessories", "15.00", "332");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("iPhone 8", "Electronics", "800.00", "600");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Wrench", "Tools", "6.00", "452");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Men's Watch", "Clothing and Accessories", "70.00", "59");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Funny T-shirt", "Clothing and Accessories", "25.00", "210");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Cutting Board", "Kitchen", "10.00", "576");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Super Mario Bros.", "Toys", "19.00", "42");

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Barcode Scanner", "Electronics", "60.00", "7");

SELECT * FROM products;
