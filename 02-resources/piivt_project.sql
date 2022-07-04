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
  `PIO` decimal(10,2) unsigned NOT NULL,
  `health_care` decimal(10,2) unsigned NOT NULL,
  `social_care` decimal(10,2) unsigned NOT NULL,
  `tax` decimal(10,2) unsigned NOT NULL,
  `net_worth` decimal(10,2) unsigned NOT NULL,
  `gross_worth` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`calculation_id`),
  KEY `fk_calculation_month_id` (`month_id`),
  CONSTRAINT `fk_calculation_month_id` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt_project.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `hourly_price` int(10) unsigned NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt_project.employee
DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `employment` int(10) unsigned NOT NULL DEFAULT 100,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `fk_employee_category_id` (`category_id`),
  CONSTRAINT `fk_employee_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt_project.month
DROP TABLE IF EXISTS `month`;
CREATE TABLE IF NOT EXISTS `month` (
  `month_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`month_id`),
  UNIQUE KEY `uq_month_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt_project.salary
DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `salary_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) unsigned NOT NULL,
  `work_hours` int(10) unsigned NOT NULL,
  `month_id` int(10) unsigned NOT NULL,
  `gross_worth` decimal(10,2) unsigned NOT NULL,
  `health_care` decimal(10,2) unsigned NOT NULL,
  `social_care` decimal(10,2) unsigned NOT NULL,
  `pio` decimal(10,2) unsigned NOT NULL,
  `tax` decimal(10,2) unsigned NOT NULL,
  `net_worth` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`salary_id`),
  KEY `fk_salary_employee_id` (`employee_id`),
  KEY `fk_salary_month_id` (`month_id`),
  CONSTRAINT `fk_salary_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_salary_month_id` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt_project.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
