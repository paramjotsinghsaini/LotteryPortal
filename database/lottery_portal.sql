/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - lottery_portal
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`lottery_portal` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `lottery_portal`;

/*Table structure for table `credits` */

DROP TABLE IF EXISTS `credits`;

CREATE TABLE `credits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

/*Data for the table `credits` */

insert  into `credits`(`id`,`userId`,`amount`,`createdAt`,`updatedAt`) values 
(22,3,100,'2021-04-16 22:58:21','2021-04-22 13:45:43'),
(23,4,1100,'2021-04-18 16:02:19','2021-04-22 13:48:34'),
(24,5,1000,'2021-04-18 23:47:35','2021-04-18 23:47:35'),
(25,6,1100,'2021-04-18 23:48:07','2021-04-21 20:41:48'),
(26,7,990,NULL,'2021-04-21 21:53:56');

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `entryFee` bigint(20) DEFAULT NULL,
  `timer` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `maxParticipants` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `events` */

insert  into `events`(`id`,`name`,`entryFee`,`timer`,`img`,`maxParticipants`,`createdAt`,`updatedAt`) values 
(1,'Beginner',10,5,'http://127.0.0.1:5000/img/Beginner.png',5,NULL,NULL);

/*Table structure for table `result` */

DROP TABLE IF EXISTS `result`;

CREATE TABLE `result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `winner` int(11) NOT NULL,
  `event_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `result` */

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tickets` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `lastLogin` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`username`,`password`,`active`,`lastLogin`,`createdAt`,`updatedAt`) values 
(3,'test8','test8','$2b$10$zKToa5bqb5F3QBKq7hlQ0OfH9KX9yKWByi2IlofBDnV.HFF9NV6eC',1,NULL,'2021-04-16 22:58:21','2021-04-16 22:58:21'),
(4,'test7','test7','$2b$10$/B7iS0SQIgOaI8.eS7XsXOdbeEj1gHv46QSlpbxrTrk5fCKJkTPXm',1,NULL,'2021-04-18 16:02:18','2021-04-18 16:02:18'),
(5,'test 10','test10','$2b$10$1n.aMuKVshIy3Ip4YuOD3ONWJqGSA922iWimowo8aRu7Eu0mWWJjK',1,NULL,'2021-04-18 23:47:35','2021-04-18 23:47:35'),
(6,'test 1','test1','$2b$10$KuzZlWZXqsmJyRvtaL6E/uv89ev2cI6Xqee0HKfS2Z8jDShZe/m8i',1,NULL,'2021-04-18 23:48:07','2021-04-18 23:48:07'),
(7,'test5','test5','$2b$10$KuzZlWZXqsmJyRvtaL6E/uv89ev2cI6Xqee0HKfS2Z8jDShZe/m8i',1,'2021-04-21 17:06:34',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
