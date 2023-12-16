USE magicpost;

insert into account(account_type_id,username, password, first_name, last_name, email, phone, citizen_identity_card_image, registration_time) 
values (2,'headcomp', '$2a$10$fuFupZhT4ZPzYdTjQFQ5Xu/iTLj.P.Tcze9D.oLXvl5yZ8tOYIFSy', 'Công ty chuyển phát', 'Magic Post', 'magicpost.vn@gmail.com','0333544588','eee',"2023-01-01T12:00:00");

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
('Item out for physical delivery 1'),
('Delivered'),
('Fail 1'),
('Fail 2'),
('Fail 3'),
('Transport departure from Delivery center 3'),
('Arrival at Warehouse 3'),
('Transport departure from Warehouse 3'),
('Arrival at Warehouse 4'),
('Transport departure from Warehouse 4'),
('Arrival at Delivery center 4'),
('Item out for physical delivery 2'),
('Item out for physical delivery 3');

INSERT INTO account_type (account_type) VALUES
('Admin'),
('Leadership'),
('Delivery center Manager'),
('Teller'),
('Warehouse Manager'),
('Staff at Warehouse');

INSERT INTO warehouse(warehouse_id, province_municipality_id,address) 
VALUES ('1','1','215 Liễu Giai, Phường Liễu Giai, Quận Ba Đình, Thành phố Hà Nội')
,('2','2','Số 47 đường Lâm Đồng, phường Phương Thiện, Thành phố Hà Giang, Tỉnh Hà Giang')
,('3','4','15 Phố Thầu, phường Hợp Giang, Thành phố Cao Bằng, Tỉnh Cao Bằng')
,('4','6','15 Nguyễn Văn Tố, xã Dương Quang, Thành Phố Bắc Kạn, Tỉnh Bắc Kạn')
,('5','8','15 Đường Trần Hưng Đạo, Phường Minh Xuân, Thành phố Tuyên Quang, Tỉnh Tuyên Quang')
,('6','10','34 Bùi Hữu Nghĩa, Phường Nam Cường, Thành phố Lào Cai, Tỉnh Lào Cai')
,('7','11','47 Đường 7/5, phường Him Lam, Thành phố Điện Biên Phủ, Tỉnh Điện Biên')
,('8','12','123 Đường 10/10, phường Quyết Thắng, Thành phố Lai Châu, Tỉnh Lai Châu')
,('9','14','75 Chu Văn Thịnh, phường Tô Hiệu, Thành phố Sơn La, Tỉnh Sơn La')
,('10','15','46 Bảo Lương, phường Yên Ninh, Thành phố Yên Bái, Tỉnh Yên Bái')
,('11','17','322 Đ.Hoàng Văn Thụ, phường Hữu Nghị, Thành phố Hòa Bình, Tỉnh Hoà Bình')
,('12','19','39, ngõ 12, đường Phủ Liễn, phường Phủ Liễn, Thành phố Thái Nguyên, Tỉnh Thái Nguyên')
,('13','20','4 Đường Quang Trung, Phường Chi Lăng, Thành phố Lạng Sơn, Tỉnh Lạng Sơn')
,('14','22','28 Nguyễn Lương Bằng, phường Hồng Hải, Thành phố Hạ Long, Tỉnh Quảng Ninh')
,('15','24','Số 620 Lê Lợi, phường Hoàng Văn Thụ, Thành phố Bắc Giang, Tỉnh Bắc Giang')
,('16','25','215 Đường Nguyễn Tất Thành, Phường Vân Phú, Thành phố Việt Trì, Tỉnh Phú Thọ')
,('17','26','134 Trần Quốc Toản, phường Ngô Quyền, Thành phố Vĩnh Yên, Tỉnh Vĩnh Phúc')
,('18','27','6 Phố Yên Mẫn, phường Kinh Bắc, Thành phố Bắc Ninh, Tỉnh Bắc Ninh')
,('19','30','189 Phố Bà Triệu, phường Thanh Trung, Thành phố Hải Dương, Tỉnh Hải Dương')
,('20','31','57 Đường Lê Quang Đạo, phường Đông Khê, Quận Ngô Quyền, Thành phố Hải Phòng')
,('21','33','207 Chùa Chuông, phường Hiền Nam, Thành phố Hưng Yên, Tỉnh Hưng Yên')
,('22','34','150 Phan Bá Vành, Phường Quan Trung, Thành phố Thái Bình, Tỉnh Thái Bình')
,('23','35','35 Lý Thường Kiệt, phường Lê Hồng Phong, Thành phố Phủ Lý, Tỉnh Hà Nam')
,('24','36','16 Tiền Phong, Trần Quang Khải, Thành phố Nam Định, Tỉnh Nam Định')
,('25','37','23-5 Ngõ 60 Đường Lê Thái Tổ, phường Tân Thành, Thành phố Ninh Bình, Tỉnh Ninh Bình')
,('26','38','54 Đường Trịnh Kiểm, phường Quảng Thắng, Thành phố Thanh Hóa, Tỉnh Thanh Hóa')
,('27','40','28 Hồ Tông Thốc, phường Nghi Phan, Thành phố Vinh, Tỉnh Nghệ An')
,('28','42','70 Phan Đình Phùng, Phường Nam Hà, Thành phố Hà Tĩnh, Tỉnh Hà Tĩnh')
,('29','44','304 Nguyễn Văn Cừ, phường Đức Ninh Đông, Thành Phố Đồng Hới, Tỉnh Quảng Bình')
,('30','45','184 Lý Thường Kiệt, Phường 5, Thành phố Đông Hà, Tỉnh Quảng Trị')
,('31','46','18 Tôn Thất Tùng, phường Đúc, Thành phố Huế, Tỉnh Thừa Thiên Huế')
,('32','48','735 Trần Cao Văn, phường Thanh Khê Đông, Quận Thanh Khê, Thành phố Đà Nẵng')
,('33','49','181 Lý Thường Kiệt, phường An Mỹ, Thành phố Tam Kỳ, Tỉnh Quảng Nam')
,('34','51','176 Nguyễn Công Phương, Nghĩa Lộ, Thành phố Quảng Ngãi, Tỉnh Quảng Ngãi')
,('35','52','21-1 Nguyễn Đình Hoàng, phường Nhơn Bình, Thành phố Quy Nhơn, Tỉnh Bình Định')
,('36','54','14 Nguyễn Hữu Thọ, phường Bình Kiến, Thành phố Tuy Hoà, Tỉnh Phú Yên')
,('37','56','683 Lê Hồng Phong, phường Phước Hải, Thành phố Nha Trang, Tỉnh Khánh Hòa')
,('38','96','248 Lê Vĩnh Hòa, phường 8, Thành phố Cà Mau, Tỉnh Cà Mau')
,('39','95','3-1 Nguyễn Trung Trực, phường 5, Thành phố Bạc Liêu, Tỉnh Bạc Liêu')
,('40','94','180 Phú Lợi, Phường 2, Thành phố Sóc Trăng, Tỉnh Sóc Trăng')
,('41','93','2 Lý Thường Kiệt, phường 4, Thành phố Vị Thanh, Tỉnh Hậu Giang')
,('42','92','103-95 Đ.Trần Hoàng Na, P.An Khánh, Quận Ninh Kiều, Thành phố Cần Thơ')
,('43','91','16 Ngọc Hân Công Chúa, Vĩnh Thanh, Thành phố Rạch Giá, Tỉnh Kiên Giang')
,('44','89','17 B11 Trần Quốc Tảng, Phường Đông Xuyên, Thành phố Long Xuyên, Tỉnh An Giang')
,('45','87','355 Lê Văn Cử, phường Hòa Thuận, Thành phố Cao Lãnh, Tỉnh Đồng Tháp')
,('46','86','36 Tân Quới Hưng, Trường An, Thành phố Vĩnh Long, Tỉnh Vĩnh Long')
,('47','84','345 Đ.Phan Chu Trinh, phường Đông Hán, Thành phố Trà Vinh, Tỉnh Trà Vinh')
,('48','83','163 Đ.Nguyễn Văn Cử, phường 5, Thành phố Bến Tre, Tỉnh Bến Tre')
,('49','82','34 Đ.Hùng Vương, Phường 7, Thành phố Mỹ Tho, Tỉnh Tiền Giang')
,('50','80','21 Đ.Nguyễn Thái Học, phường Tây An, Thành phố Tân An, Tỉnh Long An')
,('51','79','362 Bà Hạt, Phường 9, Quận 10, Thành phố Hồ Chí Minh')
,('52','77','56 Hàn Thuyên, Phường Rạch Rừa, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu')
,('53','75','124 Đ.Phan Văn Hới, Phường 6, Thành phố Biên Hòa, Tỉnh Đồng Nai')
,('54','74','167 Yersin, Hiệp Thành, Bến Cát, Thành phố Thủ Dầu Một, Tỉnh Bình Dương')
,('55','72','688 Bời Lơi, Ninh Sơn, Thành phố Tây Ninh, Tỉnh Tây Ninh')
,('56','70','68 Đ. Điện Biên Phủ, Phường Trung Thành, Thành phố Đồng Xoài, Tỉnh Bình Phước')
,('57','68','48 Đ.Mạc Đĩnh Chi, Phường 5, Thành phố Đà Lạt, Tỉnh Lâm Đồng')
,('58','67','42 Quang Trung, P.Nghĩa Tân, Thành phố Gia Nghĩa, Tỉnh Đắk Nông')
,('59','66','88 Y Wang, Ea Kao, Thành phố Buôn Ma Thuột, Tỉnh Đắk Lắk')
,('60','64','168 Nguyễn Chí Thanh, Phường Trà Bá, Thành phố Pleiku, Tỉnh Gia Lai')
,('61','62','56 Trường Chinh, Quang Trung, Thành phố Kon Tum, Tỉnh Kon Tum')
,('62','60','220 Thủ Khoa Huân, Phú Thủy, Thành phố Phan Thiết, Tỉnh Bình Thuận')
,('63','58','20 Cao Bá Quát, Thanh Sơn, Thành phố Phan Rang-Tháp Chàm, Tỉnh Ninh Thuận')
,('64','1','266 Đ.Trần Quốc Hoàn, P.Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội')
,('65','79','345 Đ.Bà Triệu, Phường 9, Quận Gò Vấp, Thành phố Hồ Chí Minh');