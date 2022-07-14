-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for piivt_project
DROP DATABASE IF EXISTS `piivt_project`;
CREATE DATABASE IF NOT EXISTS `piivt_project` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `piivt_project`;

-- Dumping structure for table piivt_project.calculation
DROP TABLE IF EXISTS `calculation`;
CREATE TABLE IF NOT EXISTS `calculation` (
  `calculation_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `month_id` int(10) unsigned NOT NULL,
  `year` year(4) NOT NULL,
  `pio` decimal(10,2) unsigned NOT NULL,
  `health_care` decimal(10,2) unsigned NOT NULL,
  `social_care` decimal(10,2) unsigned NOT NULL,
  `tax` decimal(10,2) unsigned NOT NULL,
  `net_worth` decimal(10,2) unsigned NOT NULL,
  `gross_worth` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`calculation_id`),
  UNIQUE KEY `month_id_year` (`month_id`,`year`),
  CONSTRAINT `fk_calculation_month_id` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.calculation: ~4 rows (approximately)
INSERT INTO `calculation` (`calculation_id`, `month_id`, `year`, `pio`, `health_care`, `social_care`, `tax`, `net_worth`, `gross_worth`) VALUES
	(1, 1, '2022', 100000.00, 45000.00, 20500.00, 70000.00, 500000.00, 800500.00),
	(2, 2, '2022', 120000.00, 56000.00, 36745.00, 100000.00, 790000.00, 1020000.00),
	(3, 2, '2021', 40000.00, 10000.00, 13000.00, 49000.00, 10000.00, 32000.00),
	(10, 3, '2022', 42560.00, 15656.00, 2280.00, 24610.00, 218894.00, 304000.00),
	(14, 4, '2021', 32323.00, 111.00, 111212.00, 3025.00, 27372.00, 100000.00);

-- Dumping structure for table piivt_project.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `hourly_price` int(10) unsigned NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.category: ~9 rows (approximately)
INSERT INTO `category` (`category_id`, `name`, `hourly_price`) VALUES
	(1, 'Manager', 800),
	(2, 'HR', 700),
	(3, 'Retailer', 400),
	(4, 'Chief marketing officer', 1000),
	(5, 'Accountant', 600),
	(6, 'Lawyer', 750),
	(7, 'Security', 300),
	(9, 'CEO', 2000),
	(12, 'Consultant', 550);

-- Dumping structure for table piivt_project.employee
DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `jmbg` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `employment` int(10) unsigned NOT NULL DEFAULT 100,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `jmbg` (`jmbg`),
  KEY `fk_employee_category_id` (`category_id`),
  CONSTRAINT `fk_employee_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.employee: ~11 rows (approximately)
INSERT INTO `employee` (`employee_id`, `name`, `jmbg`, `is_active`, `employment`, `category_id`) VALUES
	(1, 'Pera Peric', '0208999710123', 1, 100, 1),
	(2, 'Mika Mikic', '4364634636434', 1, 100, 3),
	(3, 'Laki Lakic', '7463764366463', 1, 100, 2),
	(4, 'Milica Milic', '0123002309203', 1, 100, 5),
	(5, 'Milan Milicic', '9382838328033', 1, 100, 1),
	(6, 'Laza Lazic', '9473748283563', 1, 50, 7),
	(9, 'Iva Ivic', '6983748283563', 1, 90, 3),
	(10, 'Petar Petrovic', '6983111283563', 1, 100, 3),
	(11, 'Marko Markovic', '0384903849312', 1, 100, 2),
	(12, 'Marko Jovanovic', '6983111841563', 1, 100, 9),
	(13, 'Milos Milosevic', '6983111841000', 0, 100, 12),
	(15, 'Milos Milosevic', '6983111841001', 1, 100, 12),
	(16, 'Dejan Ilic', '6983121841001', 1, 100, 12);

-- Dumping structure for table piivt_project.month
DROP TABLE IF EXISTS `month`;
CREATE TABLE IF NOT EXISTS `month` (
  `month_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`month_id`),
  UNIQUE KEY `uq_month_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.month: ~12 rows (approximately)
INSERT INTO `month` (`month_id`, `name`) VALUES
	(4, 'April'),
	(8, 'August'),
	(12, 'December'),
	(2, 'February'),
	(1, 'January'),
	(7, 'July'),
	(6, 'June'),
	(3, 'March'),
	(5, 'May'),
	(11, 'November'),
	(10, 'October'),
	(9, 'September');

-- Dumping structure for table piivt_project.salary
DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `salary_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) unsigned NOT NULL,
  `work_hours` int(10) unsigned NOT NULL,
  `month_id` int(10) unsigned NOT NULL,
  `year` year(4) NOT NULL,
  `gross_worth` decimal(10,2) unsigned NOT NULL,
  `health_care` decimal(10,2) unsigned NOT NULL,
  `social_care` decimal(10,2) unsigned NOT NULL,
  `pio` decimal(10,2) unsigned NOT NULL,
  `tax` decimal(10,2) unsigned NOT NULL,
  `net_worth` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`salary_id`),
  UNIQUE KEY `employee_id_month_id_year` (`employee_id`,`month_id`,`year`),
  KEY `fk_salary_month_id` (`month_id`),
  CONSTRAINT `fk_salary_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_salary_month_id` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.salary: ~19 rows (approximately)
INSERT INTO `salary` (`salary_id`, `employee_id`, `work_hours`, `month_id`, `year`, `gross_worth`, `health_care`, `social_care`, `pio`, `tax`, `net_worth`) VALUES
	(3, 1, 40, 1, '2022', 100000.00, 5150.00, 750.00, 14000.00, 8070.00, 72030.00),
	(4, 2, 35, 1, '2022', 70000.00, 2500.00, 400.00, 10000.00, 6800.00, 56000.00),
	(5, 1, 28, 2, '2022', 40000.00, 1000.00, 3788.00, 2700.00, 4000.00, 22000.00),
	(6, 3, 224, 1, '2022', 212800.00, 10959.20, 1596.00, 29792.00, 19350.00, 151102.80),
	(7, 6, 168, 1, '2022', 67200.00, 3460.80, 504.00, 9408.00, 4790.00, 49037.20),
	(8, 12, 176, 1, '2022', 123200.00, 6344.80, 924.00, 17248.00, 10390.00, 88293.20),
	(9, 10, 168, 1, '2022', 38640.00, 1989.96, 289.80, 5409.60, 1934.00, 29016.64),
	(10, 9, 184, 1, '2022', 38088.00, 1961.53, 285.66, 5332.32, 1878.80, 28629.69),
	(14, 9, 170, 2, '2022', 32222.00, 10000.00, 1000.00, 110.00, 11000.00, 110.00),
	(15, 4, 160, 1, '2022', 96000.00, 4944.00, 720.00, 13440.00, 7670.00, 69226.00),
	(17, 4, 160, 2, '2022', 96000.00, 4944.00, 720.00, 13440.00, 7670.00, 69226.00),
	(19, 1, 160, 3, '2022', 128000.00, 6592.00, 960.00, 17920.00, 10870.00, 91658.00),
	(20, 2, 160, 3, '2022', 64000.00, 3296.00, 480.00, 8960.00, 4470.00, 46794.00),
	(22, 3, 160, 3, '2022', 112000.00, 5768.00, 840.00, 15680.00, 9270.00, 80442.00),
	(23, 13, 160, 3, '2022', 88000.00, 4532.00, 660.00, 12320.00, 6870.00, 63618.00),
	(24, 16, 160, 3, '2022', 52800.00, 2719.20, 396.00, 7392.00, 3350.00, 38942.80),
	(25, 1, 147, 4, '2021', 100000.00, 111.00, 111212.00, 32323.00, 3025.00, 27372.00),
	(26, 13, 160, 5, '2022', 88000.00, 4532.00, 660.00, 12320.00, 6870.00, 63618.00),
	(27, 13, 160, 5, '2021', 88000.00, 4532.00, 660.00, 12320.00, 6870.00, 63618.00);

-- Dumping structure for table piivt_project.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_project.user: ~4 rows (approximately)
INSERT INTO `user` (`user_id`, `username`, `password_hash`) VALUES
	(1, 'administrator-1', '$2b$10$9Yb6HYGVfoH1k92oTBowgO7.dF.yvSfpGsldRq9qpmRn1fQ5ZC/6W'),
	(2, 'user-', '$2b$10$3MkYqgX586XYgUoxfb8tHO0s7BAf4N.6ksm5OFLfwCJH04JH2cG.S'),
	(5, 'user1-', '$2b$10$XZc.8C3IgbN63fTqFYYuYuj.2CkmYXa7Z4aDbBKPw5icYS.HHxXqW'),
	(6, 'user1-2', '$2b$10$oW7cOyy/ig3jr6hePbCI/.1lWs24eoavGPxu2eoOPQxKj9pUcguxO'),
	(7, 'noviuser', '$2b$10$iAadAUEmM61nJ.nBos2ekugqy.68kztgXMmNeBt9Z4af6gf5vaNju'),
	(9, 'noviuser1', '$2b$10$rgPBjzfb9JuZdrIwFAxkg.q./LMaMDSAkLvd.mozQAdKMJTiF98IG'),
	(10, 'noviusername1', '$2b$10$Edi8Ymotk8GXOnnQYxJNHe7BlY6e9gwjskQcU9HZmqqKsTxc3tmAa'),
	(11, 'admin1', '$2b$10$B6YmloTUkcYLX4Z6Qrhoh.mx2KJ2QWzG5MEcrFodnsMobbVpGS90C');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
