USE magicpost;

INSERT INTO province_municipality (province_municipality_id,province_municipality) 
VALUES ("1","Thành phố Hà Nội")
,("2","Tỉnh Hà Giang")
,("4","Tỉnh Cao Bằng")
,("6","Tỉnh Bắc Kạn")
,("8","Tỉnh Tuyên Quang")
,("10","Tỉnh Lào Cai")
,("11","Tỉnh Điện Biên")
,("12","Tỉnh Lai Châu")
,("14","Tỉnh Sơn La")
,("15","Tỉnh Yên Bái")
,("17","Tỉnh Hoà Bình")
,("19","Tỉnh Thái Nguyên")
,("20","Tỉnh Lạng Sơn")
,("22","Tỉnh Quảng Ninh")
,("24","Tỉnh Bắc Giang")
,("25","Tỉnh Phú Thọ")
,("26","Tỉnh Vĩnh Phúc")
,("27","Tỉnh Bắc Ninh")
,("30","Tỉnh Hải Dương")
,("31","Thành phố Hải Phòng")
,("33","Tỉnh Hưng Yên")
,("34","Tỉnh Thái Bình")
,("35","Tỉnh Hà Nam")
,("36","Tỉnh Nam Định")
,("37","Tỉnh Ninh Bình")
,("38","Tỉnh Thanh Hóa")
,("40","Tỉnh Nghệ An")
,("42","Tỉnh Hà Tĩnh")
,("44","Tỉnh Quảng Bình")
,("45","Tỉnh Quảng Trị")
,("46","Tỉnh Thừa Thiên Huế")
,("48","Thành phố Đà Nẵng")
,("49","Tỉnh Quảng Nam")
,("51","Tỉnh Quảng Ngãi")
,("52","Tỉnh Bình Định")
,("54","Tỉnh Phú Yên")
,("56","Tỉnh Khánh Hòa")
,("58","Tỉnh Ninh Thuận")
,("60","Tỉnh Bình Thuận")
,("62","Tỉnh Kon Tum")
,("64","Tỉnh Gia Lai")
,("66","Tỉnh Đắk Lắk")
,("67","Tỉnh Đắk Nông")
,("68","Tỉnh Lâm Đồng")
,("70","Tỉnh Bình Phước")
,("72","Tỉnh Tây Ninh")
,("74","Tỉnh Bình Dương")
,("75","Tỉnh Đồng Nai")
,("77","Tỉnh Bà Rịa - Vũng Tàu")
,("79","Thành phố Hồ Chí Minh")
,("80","Tỉnh Long An")
,("82","Tỉnh Tiền Giang")
,("83","Tỉnh Bến Tre")
,("84","Tỉnh Trà Vinh")
,("86","Tỉnh Vĩnh Long")
,("87","Tỉnh Đồng Tháp")
,("89","Tỉnh An Giang")
,("91","Tỉnh Kiên Giang")
,("92","Thành phố Cần Thơ")
,("93","Tỉnh Hậu Giang")
,("94","Tỉnh Sóc Trăng")
,("95","Tỉnh Bạc Liêu")
,("96","Tỉnh Cà Mau");


insert into district(district_id, province_municipality_id, district)
values
("1","1","Quận Ba Đình")
,("2","1","Quận Hoàn Kiếm")
,("3","1","Quận Tây Hồ")
,("4","1","Quận Long Biên")
,("5","1","Quận Cầu Giấy")
,("6","1","Quận Đống Đa")
,("7","1","Quận Hai Bà Trưng")
,("8","1","Quận Hoàng Mai")
,("9","1","Quận Thanh Xuân")
,("16","1","Huyện Sóc Sơn")
,("17","1","Huyện Đông Anh")
,("18","1","Huyện Gia Lâm")
,("19","1","Quận Nam Từ Liêm")
,("20","1","Huyện Thanh Trì")
,("21","1","Quận Bắc Từ Liêm")
,("250","1","Huyện Mê Linh")
,("268","1","Quận Hà Đông")
,("269","1","Thị xã Sơn Tây")
,("271","1","Huyện Ba Vì")
,("272","1","Huyện Phúc Thọ")
,("273","1","Huyện Đan Phượng")
,("274","1","Huyện Hoài Đức")
,("275","1","Huyện Quốc Oai")
,("276","1","Huyện Thạch Thất")
,("277","1","Huyện Chương Mỹ")
,("278","1","Huyện Thanh Oai")
,("279","1","Huyện Thường Tín")
,("280","1","Huyện Phú Xuyên")
,("281","1","Huyện Ứng Hòa")
,("282","1","Huyện Mỹ Đức"),("24","2","Thành phố Hà Giang")
,("26","2","Huyện Đồng Văn")
,("27","2","Huyện Mèo Vạc")
,("28","2","Huyện Yên Minh")
,("29","2","Huyện Quản Bạ")
,("30","2","Huyện Vị Xuyên")
,("31","2","Huyện Bắc Mê")
,("32","2","Huyện Hoàng Su Phì")
,("33","2","Huyện Xín Mần")
,("34","2","Huyện Bắc Quang")
,("35","2","Huyện Quang Bình"),('40','4','Thành phố Cao Bằng
'),('42','4','Huyện Bảo Lâm
'),('43','4','Huyện Bảo Lạc
'),('45','4','Huyện Hà Quảng
'),('47','4','Huyện Trùng Khánh
'),('48','4','Huyện Hạ Lang
'),('49','4','Huyện Quảng Hòa
'),('51','4','Huyện Hoà An
'),('52','4','Huyện Nguyên Bình
'),('53','4','Huyện Thạch An
'),('58','8','Thành Phố Bắc Kạn	
'),('60','8','Huyện Pác Nặm	
'),('61','8','Huyện Ba Bể	
'),('62','8','Huyện Ngân Sơn	
'),('63','8','Huyện Bạch Thông	
'),('64','8','Huyện Chợ Đồn	
'),('65','8','Huyện Chợ Mới	
'),('66','8','Huyện Na Rì	
'),('070','8','Thành phố Tuyên Quang	
'),('071','8','Huyện Lâm Bình	
'),('072','8','Huyện Na Hang	
'),('073','8','Huyện Chiêm Hóa	
'),('074','8','Huyện Hàm Yên	
'),('075','8','Huyện Yên Sơn	
'),('076','8','Huyện Sơn Dương	'),('080','10','Thành phố Lào Cai	
'),('082','10','Huyện Bát Xát	
'),('083','10','Huyện Mường Khương	
'),('084','10','Huyện Si Ma Cai	
'),('085','10','Huyện Bắc Hà	
'),('086','10','Huyện Bảo Thắng	
'),('087','10','Huyện Bảo Yên	
'),('088','10','Thị xã Sa Pa	
'),('089','10','Huyện Văn Bàn	'),('094','11','Thành phố Điện Biên Phủ	
'),('095','11','Thị Xã Mường Lay	
'),('096','11','Huyện Mường Nhé	
'),('097','11','Huyện Mường Chà	
'),('098','11','Huyện Tủa Chùa	
'),('099','11','Huyện Tuần Giáo	
'),('100','11','Huyện Điện Biên	
'),('101','11','Huyện Điện Biên Đông	
'),('102','11','Huyện Mường Ảng	
'),('103','11','Huyện Nậm Pồ	'),('105','12','Thành phố Lai Châu	
'),('106','12','Huyện Tam Đường	
'),('107','12','Huyện Mường Tè	
'),('108','12','Huyện Sìn Hồ	
'),('109','12','Huyện Phong Thổ	
'),('110','12','Huyện Than Uyên	
'),('111','12','Huyện Tân Uyên	
'),('112','12','Huyện Nậm Nhùn	'),('116','14','Thành phố Sơn La	
'),('118','14','Huyện Quỳnh Nhai	
'),('119','14','Huyện Thuận Châu	
'),('120','14','Huyện Mường La	
'),('121','14','Huyện Bắc Yên	
'),('122','14','Huyện Phù Yên	
'),('123','14','Huyện Mộc Châu	
'),('124','14','Huyện Yên Châu	
'),('125','14','Huyện Mai Sơn	
'),('126','14','Huyện Sông Mã	
'),('127','14','Huyện Sốp Cộp	
'),('128','14','Huyện Vân Hồ	'),('132','15','Thành phố Yên Bái	
'),('133','15','Thị xã Nghĩa Lộ	
'),('135','15','Huyện Lục Yên	
'),('136','15','Huyện Văn Yên	
'),('137','15','Huyện Mù Căng Chải	
'),('138','15','Huyện Trấn Yên	
'),('139','15','Huyện Trạm Tấu	
'),('140','15','Huyện Văn Chấn	
'),('141','15','Huyện Yên Bình	'),('148','17','Thành phố Hòa Bình	
'),('150','17','Huyện Đà Bắc	
'),('152','17','Huyện Lương Sơn	
'),('153','17','Huyện Kim Bôi	
'),('154','17','Huyện Cao Phong	
'),('155','17','Huyện Tân Lạc	
'),('156','17','Huyện Mai Châu	
'),('157','17','Huyện Lạc Sơn	
'),('158','17','Huyện Yên Thủy	
'),('159','17','Huyện Lạc Thủy	
'),('164','19','Thành phố Thái Nguyên	
'),('165','19','Thành phố Sông Công	
'),('167','19','Huyện Định Hóa	
'),('168','19','Huyện Phú Lương	
'),('169','19','Huyện Đồng Hỷ	
'),('170','19','Huyện Võ Nhai	
'),('171','19','Huyện Đại Từ	
'),('172','19','Thị xã Phổ Yên	
'),('173','19','Huyện Phú Bình	'),
('178','20','Thành phố Lạng Sơn	
'),('180','20','Huyện Tràng Định	
'),('181','20','Huyện Bình Gia	
'),('182','20','Huyện Văn Lãng	
'),('183','20','Huyện Cao Lộc	
'),('184','20','Huyện Văn Quan	
'),('185','20','Huyện Bắc Sơn	
'),('186','20','Huyện Hữu Lũng	
'),('187','20','Huyện Chi Lăng	
'),('188','20','Huyện Lộc Bình	
'),('189','20','Huyện Đình Lập	'),
('193','22','Thành phố Hạ Long	
'),('194','22','Thành phố Móng Cái	
'),('195','22','Thành phố Cẩm Phả	
'),('196','22','Thành phố Uông Bí	
'),('198','22','Huyện Bình Liêu	
'),('199','22','Huyện Tiên Yên	
'),('200','22','Huyện Đầm Hà	
'),('201','22','Huyện Hải Hà	
'),('202','22','Huyện Ba Chẽ	
'),('203','22','Huyện Vân Đồn	
'),('205','22','Thị xã Đông Triều	
'),('206','22','Thị xã Quảng Yên	
'),('207','22','Huyện Cô Tô	'),('213','24','Thành phố Bắc Giang	
'),('215','24','Huyện Yên Thế	
'),('216','24','Huyện Tân Yên	
'),('217','24','Huyện Lạng Giang	
'),('218','24','Huyện Lục Nam	
'),('219','24','Huyện Lục Ngạn	
'),('220','24','Huyện Sơn Động	
'),('221','24','Huyện Yên Dũng	
'),('222','24','Huyện Việt Yên	
'),('223','24','Huyện Hiệp Hòa	'),('227','25','Thành phố Việt Trì	
'),('228','25','Thị xã Phú Thọ	
'),('230','25','Huyện Đoan Hùng	
'),('231','25','Huyện Hạ Hoà	
'),('232','25','Huyện Thanh Ba	
'),('233','25','Huyện Phù Ninh	
'),('234','25','Huyện Yên Lập	
'),('235','25','Huyện Cẩm Khê	
'),('236','25','Huyện Tam Nông	
'),('237','25','Huyện Lâm Thao	
'),('238','25','Huyện Thanh Sơn	
'),('239','25','Huyện Thanh Thuỷ	
'),('240','25','Huyện Tân Sơn	'),('243','26','Thành phố Vĩnh Yên	
'),('244','26','Thành phố Phúc Yên	
'),('246','26','Huyện Lập Thạch	
'),('247','26','Huyện Tam Dương	
'),('248','26','Huyện Tam Đảo	
'),('249','26','Huyện Bình Xuyên	
'),('251','26','Huyện Yên Lạc	
'),('252','26','Huyện Vĩnh Tường	
'),('253','26','Huyện Sông Lô	'),('256','27','Thành phố Bắc Ninh	
'),('258','27','Huyện Yên Phong	
'),('259','27','Huyện Quế Võ	
'),('260','27','Huyện Tiên Du	
'),('261','27','Thị xã Từ Sơn	
'),('262','27','Huyện Thuận Thành	
'),('263','27','Huyện Gia Bình	
'),('264','27','Huyện Lương Tài	'),('288','30','Thành phố Hải Dương	
'),('290','30','Thành phố Chí Linh	
'),('291','30','Huyện Nam Sách	
'),('292','30','Thị xã Kinh Môn	
'),('293','30','Huyện Kim Thành	
'),('294','30','Huyện Thanh Hà	
'),('295','30','Huyện Cẩm Giàng	
'),('296','30','Huyện Bình Giang	
'),('297','30','Huyện Gia Lộc	
'),('298','30','Huyện Tứ Kỳ	
'),('299','30','Huyện Ninh Giang	
'),('300','30','Huyện Thanh Miện	'),('303','31','Quận Hồng Bàng	
'),('304','31','Quận Ngô Quyền	
'),('305','31','Quận Lê Chân	
'),('306','31','Quận Hải An	
'),('307','31','Quận Kiến An	
'),('308','31','Quận Đồ Sơn	
'),('309','31','Quận Dương Kinh	
'),('311','31','Huyện Thuỷ Nguyên	
'),('312','31','Huyện An Dương	
'),('313','31','Huyện An Lão	
'),('314','31','Huyện Kiến Thuỵ	
'),('315','31','Huyện Tiên Lãng	
'),('316','31','Huyện Vĩnh Bảo	
'),('317','31','Huyện Cát Hải	
'),('318','31','Huyện Bạch Long Vĩ	'),('323','33','Thành phố Hưng Yên	
'),('325','33','Huyện Văn Lâm	
'),('326','33','Huyện Văn Giang	
'),('327','33','Huyện Yên Mỹ	
'),('328','33','Thị xã Mỹ Hào	
'),('329','33','Huyện Ân Thi	
'),('330','33','Huyện Khoái Châu	
'),('331','33','Huyện Kim Động	
'),('332','33','Huyện Tiên Lữ	
'),('333','33','Huyện Phù Cừ	'),('336','34','Thành phố Thái Bình	
'),('338','34','Huyện Quỳnh Phụ	
'),('339','34','Huyện Hưng Hà	
'),('340','34','Huyện Đông Hưng	
'),('341','34','Huyện Thái Thụy	
'),('342','34','Huyện Tiền Hải	
'),('343','34','Huyện Kiến Xương	
'),('344','34','Huyện Vũ Thư	'),('347','35','Thành phố Phủ Lý	
'),('349','35','Thị xã Duy Tiên	
'),('350','35','Huyện Kim Bảng	
'),('351','35','Huyện Thanh Liêm	
'),('352','35','Huyện Bình Lục	
'),('353','35','Huyện Lý Nhân	'),('356','36','Thành phố Nam Định	
'),('358','36','Huyện Mỹ Lộc	
'),('359','36','Huyện Vụ Bản	
'),('360','36','Huyện Ý Yên	
'),('361','36','Huyện Nghĩa Hưng	
'),('362','36','Huyện Nam Trực	
'),('363','36','Huyện Trực Ninh	
'),('364','36','Huyện Xuân Trường	
'),('365','36','Huyện Giao Thủy	
'),('366','36','Huyện Hải Hậu	'),('369','37','Thành phố Ninh Bình	
'),('370','37','Thành phố Tam Điệp	
'),('372','37','Huyện Nho Quan	
'),('373','37','Huyện Gia Viễn	
'),('374','37','Huyện Hoa Lư	
'),('375','37','Huyện Yên Khánh	
'),('376','37','Huyện Kim Sơn	
'),('377','37','Huyện Yên Mô	'),('380','38','Thành phố Thanh Hóa	
'),('381','38','Thị xã Bỉm Sơn	
'),('382','38','Thành phố Sầm Sơn	
'),('384','38','Huyện Mường Lát	
'),('385','38','Huyện Quan Hóa	
'),('386','38','Huyện Bá Thước	
'),('387','38','Huyện Quan Sơn	
'),('388','38','Huyện Lang Chánh	
'),('389','38','Huyện Ngọc Lặc	
'),('390','38','Huyện Cẩm Thủy	
'),('391','38','Huyện Thạch Thành	
'),('392','38','Huyện Hà Trung	
'),('393','38','Huyện Vĩnh Lộc	
'),('394','38','Huyện Yên Định	
'),('395','38','Huyện Thọ Xuân	
'),('396','38','Huyện Thường Xuân	
'),('397','38','Huyện Triệu Sơn	
'),('398','38','Huyện Thiệu Hóa	
'),('399','38','Huyện Hoằng Hóa	
'),('400','38','Huyện Hậu Lộc	
'),('401','38','Huyện Nga Sơn	
'),('402','38','Huyện Như Xuân	
'),('403','38','Huyện Như Thanh	
'),('404','38','Huyện Nông Cống	
'),('405','38','Huyện Đông Sơn	
'),('406','38','Huyện Quảng Xương	
'),('407','38','Thị xã Nghi Sơn	
'),('412','40','Thành phố Vinh	
'),('413','40','Thị xã Cửa Lò	
'),('414','40','Thị xã Thái Hoà	
'),('415','40','Huyện Quế Phong	
'),('416','40','Huyện Quỳ Châu	
'),('417','40','Huyện Kỳ Sơn	
'),('418','40','Huyện Tương Dương	
'),('419','40','Huyện Nghĩa Đàn	
'),('420','40','Huyện Quỳ Hợp	
'),('421','40','Huyện Quỳnh Lưu	
'),('422','40','Huyện Con Cuông	
'),('423','40','Huyện Tân Kỳ	
'),('424','40','Huyện Anh Sơn	
'),('425','40','Huyện Diễn Châu	
'),('426','40','Huyện Yên Thành	
'),('427','40','Huyện Đô Lương	
'),('428','40','Huyện Thanh Chương	
'),('429','40','Huyện Nghi Lộc	
'),('430','40','Huyện Nam Đàn	
'),('431','40','Huyện Hưng Nguyên	
'),('432','40','Thị xã Hoàng Mai	'),('436','42','Thành phố Hà Tĩnh	
'),('437','42','Thị xã Hồng Lĩnh	
'),('439','42','Huyện Hương Sơn	
'),('440','42','Huyện Đức Thọ	
'),('441','42','Huyện Vũ Quang	
'),('442','42','Huyện Nghi Xuân	
'),('443','42','Huyện Can Lộc	
'),('444','42','Huyện Hương Khê	
'),('445','42','Huyện Thạch Hà	
'),('446','42','Huyện Cẩm Xuyên	
'),('447','42','Huyện Kỳ Anh	
'),('448','42','Huyện Lộc Hà	
'),('449','42','Thị xã Kỳ Anh	'),('450','44','Thành Phố Đồng Hới	
'),('452','44','Huyện Minh Hóa	
'),('453','44','Huyện Tuyên Hóa	
'),('454','44','Huyện Quảng Trạch	
'),('455','44','Huyện Bố Trạch	
'),('456','44','Huyện Quảng Ninh	
'),('457','44','Huyện Lệ Thủy	
'),('458','44','Thị xã Ba Đồn	
'),('461','45','Thành phố Đông Hà	
'),('462','45','Thị xã Quảng Trị	
'),('464','45','Huyện Vĩnh Linh	
'),('465','45','Huyện Hướng Hóa	
'),('466','45','Huyện Gio Linh	
'),('467','45','Huyện Đa Krông	
'),('468','45','Huyện Cam Lộ	
'),('469','45','Huyện Triệu Phong	
'),('470','45','Huyện Hải Lăng	
'),('471','45','Huyện Cồn Cỏ	'),('474','46','Thành phố Huế	
'),('476','46','Huyện Phong Điền	
'),('477','46','Huyện Quảng Điền	
'),('478','46','Huyện Phú Vang	
'),('479','46','Thị xã Hương Thủy	
'),('480','46','Thị xã Hương Trà	
'),('481','46','Huyện A Lưới	
'),('482','46','Huyện Phú Lộc	
'),('483','46','Huyện Nam Đông	
'),('490','48','Quận Liên Chiểu	
'),('491','48','Quận Thanh Khê	
'),('492','48','Quận Hải Châu	
'),('493','48','Quận Sơn Trà	
'),('494','48','Quận Ngũ Hành Sơn	
'),('495','48','Quận Cẩm Lệ	
'),('497','48','Huyện Hòa Vang	
'),('498','48','Huyện Hoàng Sa	
'),('502','49','Thành phố Tam Kỳ	
'),('503','49','Thành phố Hội An	
'),('504','49','Huyện Tây Giang	
'),('505','49','Huyện Đông Giang	
'),('506','49','Huyện Đại Lộc	
'),('507','49','Thị xã Điện Bàn	
'),('508','49','Huyện Duy Xuyên	
'),('509','49','Huyện Quế Sơn	
'),('510','49','Huyện Nam Giang	
'),('511','49','Huyện Phước Sơn	
'),('512','49','Huyện Hiệp Đức	
'),('513','49','Huyện Thăng Bình	
'),('514','49','Huyện Tiên Phước	
'),('515','49','Huyện Bắc Trà My	
'),('516','49','Huyện Nam Trà My	
'),('517','49','Huyện Núi Thành	
'),('518','49','Huyện Phú Ninh	
'),('519','49','Huyện Nông Sơn	'),('522','51','Thành phố Quảng Ngãi	
'),('524','51','Huyện Bình Sơn	
'),('525','51','Huyện Trà Bồng	
'),('527','51','Huyện Sơn Tịnh	
'),('528','51','Huyện Tư Nghĩa	
'),('529','51','Huyện Sơn Hà	
'),('530','51','Huyện Sơn Tây	
'),('531','51','Huyện Minh Long	
'),('532','51','Huyện Nghĩa Hành	
'),('533','51','Huyện Mộ Đức	
'),('534','51','Thị xã Đức Phổ	
'),('535','51','Huyện Ba Tơ	
'),('536','51','Huyện Lý Sơn	
'),('540','52','Thành phố Quy Nhơn	
'),('542','52','Huyện An Lão	
'),('543','52','Thị xã Hoài Nhơn	
'),('544','52','Huyện Hoài Ân	
'),('545','52','Huyện Phù Mỹ	
'),('546','52','Huyện Vĩnh Thạnh	
'),('547','52','Huyện Tây Sơn	
'),('548','52','Huyện Phù Cát	
'),('549','52','Thị xã An Nhơn	
'),('550','52','Huyện Tuy Phước	
'),('551','52','Huyện Vân Canh	'),('555','54','Thành phố Tuy Hoà	
'),('557','54','Thị xã Sông Cầu	
'),('558','54','Huyện Đồng Xuân	
'),('559','54','Huyện Tuy An	
'),('560','54','Huyện Sơn Hòa	
'),('561','54','Huyện Sông Hinh	
'),('562','54','Huyện Tây Hoà	
'),('563','54','Huyện Phú Hoà	
'),('564','54','Thị xã Đông Hòa	'),('568','56','Thành phố Nha Trang	
'),('569','56','Thành phố Cam Ranh	
'),('570','56','Huyện Cam Lâm	
'),('571','56','Huyện Vạn Ninh	
'),('572','56','Thị xã Ninh Hòa	
'),('573','56','Huyện Khánh Vĩnh	
'),('574','56','Huyện Diên Khánh	
'),('575','56','Huyện Khánh Sơn	
'),('576','56','Huyện Trường Sa	
'),('582','58','Thành phố Phan Rang-Tháp Chàm	
'),('584','58','Huyện Bác Ái	
'),('585','58','Huyện Ninh Sơn	
'),('586','58','Huyện Ninh Hải	
'),('587','58','Huyện Ninh Phước	
'),('588','58','Huyện Thuận Bắc	
'),('589','58','Huyện Thuận Nam	'),('593','60','Thành phố Phan Thiết	
'),('594','60','Thị xã La Gi	
'),('595','60','Huyện Tuy Phong	
'),('596','60','Huyện Bắc Bình	
'),('597','60','Huyện Hàm Thuận Bắc	
'),('598','60','Huyện Hàm Thuận Nam	
'),('599','60','Huyện Tánh Linh	
'),('600','60','Huyện Đức Linh	
'),('601','60','Huyện Hàm Tân	
'),('602','60','Huyện Phú Quí	'),('608','62','Thành phố Kon Tum	
'),('610','62','Huyện Đắk Glei	
'),('611','62','Huyện Ngọc Hồi	
'),('612','62','Huyện Đắk Tô	
'),('613','62','Huyện Kon Plông	
'),('614','62','Huyện Kon Rẫy	
'),('615','62','Huyện Đắk Hà	
'),('616','62','Huyện Sa Thầy	
'),('617','62','Huyện Tu Mơ Rông	
'),('618','62','Huyện Ia H'' Drai'),
('622','64','Thành phố Pleiku	
'),('623','64','Thị xã An Khê	
'),('624','64','Thị xã Ayun Pa	
'),('625','64','Huyện KBang	
'),('626','64','Huyện Đăk Đoa	
'),('627','64','Huyện Chư Păh	
'),('628','64','Huyện Ia Grai	
'),('629','64','Huyện Mang Yang	
'),('630','64','Huyện Kông Chro	
'),('631','64','Huyện Đức Cơ	
'),('632','64','Huyện Chư Prông	
'),('633','64','Huyện Chư Sê	
'),('634','64','Huyện Đăk Pơ	
'),('635','64','Huyện Ia Pa	
'),('637','64','Huyện Krông Pa	
'),('638','64','Huyện Phú Thiện	
'),('639','64','Huyện Chư Pưh	
'),('643','66','Thành phố Buôn Ma Thuột	
'),('644','66','Thị Xã Buôn Hồ	
'),('645','66','Huyện Ea H''leo	
'),('646','66','Huyện Ea Súp	
'),('647','66','Huyện Buôn Đôn	
'),('648','66','Huyện Cư M''gar	
'),('649','66','Huyện Krông Búk	
'),('650','66','Huyện Krông Năng	
'),('651','66','Huyện Ea Kar	
'),('652','66','Huyện M''Đrắk	
'),('653','66','Huyện Krông Bông	
'),('654','66','Huyện Krông Pắc	
'),('655','66','Huyện Krông A Na	
'),('656','66','Huyện Lắk	
'),('657','66','Huyện Cư Kuin	
'),('660','67','Thành phố Gia Nghĩa	
'),('661','67','Huyện Đăk Glong	
'),('662','67','Huyện Cư Jút	
'),('663','67','Huyện Đắk Mil	
'),('664','67','Huyện Krông Nô	
'),('665','67','Huyện Đắk Song	
'),('666','67','Huyện Đắk R''Lấp	
'),('667','67','Huyện Tuy Đức	'),('672','68','Thành phố Đà Lạt	
'),('673','68','Thành phố Bảo Lộc	
'),('674','68','Huyện Đam Rông	
'),('675','68','Huyện Lạc Dương	
'),('676','68','Huyện Lâm Hà	
'),('677','68','Huyện Đơn Dương	
'),('678','68','Huyện Đức Trọng	
'),('679','68','Huyện Di Linh	
'),('680','68','Huyện Bảo Lâm	
'),('681','68','Huyện Đạ Huoai	
'),('682','68','Huyện Đạ Tẻh	
'),('683','68','Huyện Cát Tiên	'),('688','70','Thị xã Phước Long	
'),('689','70','Thành phố Đồng Xoài	
'),('690','70','Thị xã Bình Long	
'),('691','70','Huyện Bù Gia Mập	
'),('692','70','Huyện Lộc Ninh	
'),('693','70','Huyện Bù Đốp	
'),('694','70','Huyện Hớn Quản	
'),('695','70','Huyện Đồng Phú	
'),('696','70','Huyện Bù Đăng	
'),('697','70','Huyện Chơn Thành	
'),('698','70','Huyện Phú Riềng	'),('703','72','Thành phố Tây Ninh	
'),('705','72','Huyện Tân Biên	
'),('706','72','Huyện Tân Châu	
'),('707','72','Huyện Dương Minh Châu	
'),('708','72','Huyện Châu Thành	
'),('709','72','Thị xã Hòa Thành	
'),('710','72','Huyện Gò Dầu	
'),('711','72','Huyện Bến Cầu	
'),('712','72','Thị xã Trảng Bàng	'),('718','74','Thành phố Thủ Dầu Một	
'),('719','74','Huyện Bàu Bàng	
'),('720','74','Huyện Dầu Tiếng	
'),('721','74','Thị xã Bến Cát	
'),('722','74','Huyện Phú Giáo	
'),('723','74','Thị xã Tân Uyên	
'),('724','74','Thành phố Dĩ An	
'),('725','74','Thành phố Thuận An	
'),('726','74','Huyện Bắc Tân Uyên	'),('731','75','Thành phố Biên Hòa	
'),('732','75','Thành phố Long Khánh	
'),('734','75','Huyện Tân Phú	
'),('735','75','Huyện Vĩnh Cửu	
'),('736','75','Huyện Định Quán	
'),('737','75','Huyện Trảng Bom	
'),('738','75','Huyện Thống Nhất	
'),('739','75','Huyện Cẩm Mỹ	
'),('740','75','Huyện Long Thành	
'),('741','75','Huyện Xuân Lộc	
'),('742','75','Huyện Nhơn Trạch	'),('747','77','Thành phố Vũng Tàu	
'),('748','77','Thành phố Bà Rịa	
'),('750','77','Huyện Châu Đức	
'),('751','77','Huyện Xuyên Mộc	
'),('752','77','Huyện Long Điền	
'),('753','77','Huyện Đất Đỏ	
'),('754','77','Thị xã Phú Mỹ	
'),('755','77','Huyện Côn Đảo	'),('760','79','Quận 1
'),('761','79','Quận 12
'),('762','79','Quận Thủ Đức
'),('763','79','Quận 9
'),('764','79','Quận Gò Vấp
'),('765','79','Quận Bình Thạnh
'),('766','79','Quận Tân Bình
'),('767','79','Quận Tân Phú
'),('768','79','Quận Phú Nhuận
'),('769','79','Quận 2
'),('770','79','Quận 3
'),('771','79','Quận 10
'),('772','79','Quận 11
'),('773','79','Quận 4
'),('774','79','Quận 5
'),('775','79','Quận 6
'),('776','79','Quận 8
'),('777','79','Quận Bình Tân
'),('778','79','Quận 7
'),('783','79','Huyện Củ Chi
'),('784','79','Huyện Hóc Môn
'),('785','79','Huyện Bình Chánh
'),('786','79','Huyện Nhà Bè
'),('787','79','Huyện Cần Giờ'),('794','80','Thành phố Tân An	
'),('795','80','Thị xã Kiến Tường	
'),('796','80','Huyện Tân Hưng	
'),('797','80','Huyện Vĩnh Hưng	
'),('798','80','Huyện Mộc Hóa	
'),('799','80','Huyện Tân Thạnh	
'),('800','80','Huyện Thạnh Hóa	
'),('801','80','Huyện Đức Huệ	
'),('802','80','Huyện Đức Hòa	
'),('803','80','Huyện Bến Lức	
'),('804','80','Huyện Thủ Thừa	
'),('805','80','Huyện Tân Trụ	
'),('806','80','Huyện Cần Đước	
'),('807','80','Huyện Cần Giuộc	
'),('808','80','Huyện Châu Thành	'),('815','82','Thành phố Mỹ Tho	
'),('816','82','Thị xã Gò Công	
'),('817','82','Thị xã Cai Lậy	
'),('818','82','Huyện Tân Phước	
'),('819','82','Huyện Cái Bè	
'),('820','82','Huyện Cai Lậy	
'),('821','82','Huyện Châu Thành	
'),('822','82','Huyện Chợ Gạo	
'),('823','82','Huyện Gò Công Tây	
'),('824','82','Huyện Gò Công Đông	
'),('825','82','Huyện Tân Phú Đông	'),('829','83','Thành phố Bến Tre	
'),('831','83','Huyện Châu Thành	
'),('832','83','Huyện Chợ Lách	
'),('833','83','Huyện Mỏ Cày Nam	
'),('834','83','Huyện Giồng Trôm	
'),('835','83','Huyện Bình Đại	
'),('836','83','Huyện Ba Tri	
'),('837','83','Huyện Thạnh Phú	
'),('838','83','Huyện Mỏ Cày Bắc	'),('842','84','Thành phố Trà Vinh	
'),('844','84','Huyện Càng Long	
'),('845','84','Huyện Cầu Kè	
'),('846','84','Huyện Tiểu Cần	
'),('847','84','Huyện Châu Thành	
'),('848','84','Huyện Cầu Ngang	
'),('849','84','Huyện Trà Cú	
'),('850','84','Huyện Duyên Hải	
'),('851','84','Thị xã Duyên Hải	'),('855','86','Thành phố Vĩnh Long	
'),('857','86','Huyện Long Hồ	
'),('858','86','Huyện Mang Thít	
'),('859','86','Huyện  Vũng Liêm	
'),('860','86','Huyện Tam Bình	
'),('861','86','Thị xã Bình Minh	
'),('862','86','Huyện Trà Ôn	
'),('863','86','Huyện Bình Tân	
'),('866','87','Thành phố Cao Lãnh	
'),('867','87','Thành phố Sa Đéc	
'),('868','87','Thành phố Hồng Ngự	
'),('869','87','Huyện Tân Hồng	
'),('870','87','Huyện Hồng Ngự	
'),('871','87','Huyện Tam Nông	
'),('872','87','Huyện Tháp Mười	
'),('873','87','Huyện Cao Lãnh	
'),('874','87','Huyện Thanh Bình	
'),('875','87','Huyện Lấp Vò	
'),('876','87','Huyện Lai Vung	
'),('877','87','Huyện Châu Thành	
'),('883','89','Thành phố Long Xuyên	
'),('884','89','Thành phố Châu Đốc	
'),('886','89','Huyện An Phú	
'),('887','89','Thị xã Tân Châu	
'),('888','89','Huyện Phú Tân	
'),('889','89','Huyện Châu Phú	
'),('890','89','Huyện Tịnh Biên	
'),('891','89','Huyện Tri Tôn	
'),('892','89','Huyện Châu Thành	
'),('893','89','Huyện Chợ Mới	
'),('894','89','Huyện Thoại Sơn	'),('899','91','Thành phố Rạch Giá	
'),('900','91','Thành phố Hà Tiên	
'),('902','91','Huyện Kiên Lương	
'),('903','91','Huyện Hòn Đất	
'),('904','91','Huyện Tân Hiệp	
'),('905','91','Huyện Châu Thành	
'),('906','91','Huyện Giồng Riềng	
'),('907','91','Huyện Gò Quao	
'),('908','91','Huyện An Biên	
'),('909','91','Huyện An Minh	
'),('910','91','Huyện Vĩnh Thuận	
'),('911','91','Thành phố Phú Quốc	
'),('912','91','Huyện Kiên Hải	
'),('913','91','Huyện U Minh Thượng	
'),('914','91','Huyện Giang Thành	'),('916','92','Quận Ninh Kiều	
'),('917','92','Quận Ô Môn	
'),('918','92','Quận Bình Thuỷ	
'),('919','92','Quận Cái Răng	
'),('923','92','Quận Thốt Nốt	
'),('924','92','Huyện Vĩnh Thạnh	
'),('925','92','Huyện Cờ Đỏ	
'),('926','92','Huyện Phong Điền	
'),('927','92','Huyện Thới Lai	'),('930','93','Thành phố Vị Thanh	
'),('931','93','Thành phố Ngã Bảy	
'),('932','93','Huyện Châu Thành A	
'),('933','93','Huyện Châu Thành	
'),('934','93','Huyện Phụng Hiệp	
'),('935','93','Huyện Vị Thuỷ	
'),('936','93','Huyện Long Mỹ	
'),('937','93','Thị xã Long Mỹ	'),('941','94','Thành phố Sóc Trăng	
'),('942','94','Huyện Châu Thành	
'),('943','94','Huyện Kế Sách	
'),('944','94','Huyện Mỹ Tú	
'),('945','94','Huyện Cù Lao Dung	
'),('946','94','Huyện Long Phú	
'),('947','94','Huyện Mỹ Xuyên	
'),('948','94','Thị xã Ngã Năm	
'),('949','94','Huyện Thạnh Trị	
'),('950','94','Thị xã Vĩnh Châu	
'),('951','94','Huyện Trần Đề	
'),('954','95','Thành phố Bạc Liêu	
'),('956','95','Huyện Hồng Dân	
'),('957','95','Huyện Phước Long	
'),('958','95','Huyện Vĩnh Lợi	
'),('959','95','Thị xã Giá Rai	
'),('960','95','Huyện Đông Hải	
'),('961','95','Huyện Hoà Bình	'),('964','96','Thành phố Cà Mau	
'),('966','96','Huyện U Minh	
'),('967','96','Huyện Thới Bình	
'),('968','96','Huyện Trần Văn Thời	
'),('969','96','Huyện Cái Nước	
'),('970','96','Huyện Đầm Dơi	
'),('971','96','Huyện Năm Căn	
'),('972','96','Huyện Phú Tân	
'),('973','96','Huyện Ngọc Hiển	');