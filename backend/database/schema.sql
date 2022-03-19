DROP DATABASE MERAKI_Academy_Project_6;

CREATE DATABASE MERAKI_Academy_Project_6;

USE MERAKI_Academy_Project_6;



CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
role_name VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);


CREATE TABLE users(
id INT AUTO_INCREMENT NOT NULL,
firstName VARCHAR(255),
lastName VARCHAR(255),
country VARCHAR(255),
email VARCHAR(255) UNIQUE,
pass VARCHAR(255),
reservation TINYINT DEFAULT 0,
publishing TINYINT DEFAULT 0,
role_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);


CREATE TABLE Halls(
id INT AUTO_INCREMENT NOT NULL,
hall_image VARCHAR(255),
hall_name VARCHAR(255),
video VARCHAR(255),
hall_description VARCHAR(255),
hall_address VARCHAR(255),
price INT,
discount INT,
PriceBeforeDiscount INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);


CREATE TABLE booking(
id INT AUTO_INCREMENT NOT NULL,
reserver VARCHAR(255),
booking_day VARCHAR(255),
date_booking DATE,
booking_time VARCHAR(255),
phone VARCHAR(255),
Payment INT,
halls_id INT,
FOREIGN KEY (halls_id) REFERENCES halls(id),
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);



CREATE TABLE Rating (
    id INT AUTO_INCREMENT NOT NULL,
    hall_rating INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    halls_id INT,
    FOREIGN KEY (halls_id) REFERENCES halls(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)

);