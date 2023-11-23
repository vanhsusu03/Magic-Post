DROP SCHEMA IF EXISTS magicpost;
CREATE SCHEMA magicpost;
USE magicpost;

CREATE TABLE province_municipality (
	province_municipality_id TINYINT UNSIGNED NOT NULL,
    province_municipality VARCHAR(100) NOT NULL,
    PRIMARY KEY (province_municipality_id),
    UNIQUE(province_municipality)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE district (
	district_id SMALLINT UNSIGNED NOT NULL,
    province_municipality_id TINYINT UNSIGNED NOT NULL,
    district VARCHAR(100) NOT NULL,
    PRIMARY KEY (district_id),
    CONSTRAINT fk_district_province_municipality FOREIGN KEY (province_municipality_id) REFERENCES province_municipality (province_municipality_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE warehouse (
	warehouse_id TINYINT UNSIGNED NOT NULL,
    address VARCHAR(500) NOT NULL,
    PRIMARY KEY (warehouse_id),
    CONSTRAINT fk_warehouse_province_municipality FOREIGN KEY (warehouse_id) REFERENCES province_municipality (province_municipality_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE delivery_center (
	delivery_center_id SMALLINT UNSIGNED NOT NULL,
    warehouse_id TINYINT UNSIGNED NOT NULL,
    address VARCHAR(500) NOT NULL,
    PRIMARY KEY (delivery_center_id),
    CONSTRAINT fk_delivery_center_district FOREIGN KEY (delivery_center_id) REFERENCES district (district_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_delivery_center_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse (warehouse_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package_type (
	type_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    package_type VARCHAR(50) NOT NULL,
    PRIMARY KEY (type_id),
    UNIQUE(package_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package (
	package_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    package_type_id TINYINT UNSIGNED NOT NULL,
    delivery_center_send_id SMALLINT UNSIGNED NOT NULL,
    delivery_center_receive_id SMALLINT UNSIGNED NOT NULL,
    weight_gram BIGINT UNSIGNED NOT NULL,
    cost SMALLINT UNSIGNED NOT NULL,
    COD_amount SMALLINT UNSIGNED DEFAULT 0,
    sender_address VARCHAR(600) NOT NULL,
    receiver_address VARCHAR(600) NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(20) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    PRIMARY KEY (package_id),
    CONSTRAINT fk_package_type FOREIGN KEY (package_type_id) REFERENCES package_type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_package_delivery_center_send FOREIGN KEY (delivery_center_send_id) REFERENCES delivery_center (delivery_center_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_package_delivery_center_receive FOREIGN KEY (delivery_center_receive_id) REFERENCES delivery_center (delivery_center_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package_collection_type (
	type_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    package_collection_type VARCHAR(100) NOT NULL,
    PRIMARY KEY (type_id),
    UNIQUE(package_collection_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package_collection (
	package_collection_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    package_collection_type_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (package_collection_id),
    CONSTRAINT fk_package_collection_type FOREIGN KEY (package_collection_type_id) REFERENCES package_collection_type (type_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package_pkg_collection (
	package_id INT UNSIGNED NOT NULL,
    package_collection_id MEDIUMINT UNSIGNED NOT NULL,
    PRIMARY KEY (package_id, package_collection_id),
    CONSTRAINT fk_package_pkg_collection_package FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_package_pkg_collection_package_collection FOREIGN KEY (package_collection_id) REFERENCES package_collection (package_collection_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE package_status (
	status_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    package_status VARCHAR(700) NOT NULL,
	PRIMARY KEY (status_id),
    UNIQUE(package_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE status_detail (
	status_id TINYINT UNSIGNED NOT NULL,
    `time` DATETIME NOT NULL,
    location VARCHAR(500) NOT NULL,
    package_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (status_id, package_id),
    CONSTRAINT fk_status_detail_package_status FOREIGN KEY (status_id) REFERENCES package_status (status_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_status_detail_package FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE account_type (
	type_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_type VARCHAR(128) NOT NULL,
    PRIMARY KEY (type_id),
    UNIQUE(account_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `account` (
	account_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_type_id TINYINT UNSIGNED NOT NULL,
    username VARCHAR(50) NOT NULL,
    `password` TEXT NOT NULL,
    delivery_center_id SMALLINT UNSIGNED DEFAULT NULL,
    warehouse_id TINYINT UNSIGNED DEFAULT NULL,
    first_name VARCHAR(75) NOT NULL,
    last_name VARCHAR(75) NOT NULL,
    email VARCHAR(60) DEFAULT NULL,
    phone VARCHAR(20) NOT NULL,
    citizen_identity_card_image VARCHAR(300) NOT NULL,
    registration_time DATETIME NOT NULL,
    PRIMARY KEY (account_id),
    CONSTRAINT fk_account_delivery_center FOREIGN KEY (delivery_center_id) REFERENCES delivery_center (delivery_center_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_account_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse (warehouse_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_account_account_type FOREIGN KEY (account_type_id) REFERENCES account_type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(username),
    UNIQUE(phone),
    UNIQUE(citizen_identity_card_image)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `token` (
	token_id MEDIUMINT UNSIGNED NOT NULL,
    token VARCHAR(300) NOT NULL,
    `type` ENUM('Bearer', 'Google') DEFAULT 'Bearer',
    expires BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (token_id),
    CONSTRAINT fk_token_account FOREIGN KEY (token_id) REFERENCES account (account_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;