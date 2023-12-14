USE magicpost;

INSERT INTO package_type (package_type) VALUES
('Document'),
('Merchandise');

INSERT INTO package_collection_type (package_collection_type) VALUES
('Delivery center to Warehouse'),
('Warehouse to Warehouse'),
('Warehouse to Delivery center');

INSERT INTO package_status (package_status) VALUES
('Accept'),
('Transport departure from Delivery center 1'),
('Arrival at Warehouse 1'),
('Transport departure from Warehouse 1'),
('Arrival at Warehouse 2'),
('Transport departure from Warehouse 2'),
('Arrival at Delivery center 2'),
('Item out for physical delivery'),
('Delivered');

INSERT INTO account_type (account_type) VALUES
('Admin'),
('Leadership'),
('Delivery center Manager'),
('Teller'),
('Warehouse Manager'),
('Staff at Warehouse');