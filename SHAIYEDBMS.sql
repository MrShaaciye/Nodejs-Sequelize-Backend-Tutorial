-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shaiyedbms
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `commentId` int NOT NULL,
  `commentType` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Awesome Image',2,'Image','2022-07-17 13:44:44','2022-07-17 13:47:06',NULL),(2,'Bad Image',1,'Image','2022-07-17 13:46:29','2022-07-17 13:46:29',NULL),(3,'Awesome Video',1,'Video','2022-07-17 13:48:54','2022-07-17 13:48:54',NULL),(4,'Bad Video',2,'Video','2022-07-17 13:49:10','2022-07-17 13:49:10',NULL),(5,'Normal Image',3,'Image','2022-07-17 13:57:05','2022-07-17 13:57:05',NULL),(6,'Normal Video',3,'Video','2022-07-17 13:57:27','2022-07-17 13:57:27',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `job` varchar(50) NOT NULL,
  `salary` decimal(18,2) NOT NULL DEFAULT '0.00',
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Asha Ali Rage','PRESIDENT',5099.99,1,'2022-07-18 08:38:00','2022-07-18 08:47:04',NULL),(2,'Hassan Ahmed Farah','MANAGER',2099.99,7,'2022-07-18 08:41:14','2022-07-18 08:47:40',NULL),(3,'Jamila Alasow Jim\'ale','MANAGER',2099.99,7,'2022-07-18 08:42:34','2022-07-18 08:53:21',NULL),(4,'Hanan Abdirahman Muse','SALESMAN',1099.99,3,'2022-07-18 08:43:05','2022-07-18 08:56:43',NULL),(5,'Jama Ibrahim Ga\'al','SALESMAN',1099.99,3,'2022-07-18 08:45:53','2022-07-18 08:45:53',NULL),(6,'Farah Ma\'ow Mude\'i','SALESMAN',1099.99,3,'2022-07-18 08:57:10','2022-07-18 08:57:10',NULL),(7,'Mohamed Abdullahi Wehelie','SALESMAN',1099.99,3,'2022-07-18 08:58:21','2022-07-18 09:13:49',NULL),(8,'Ali Gafow Mohamud','CLERK',599.99,2,'2022-07-18 09:00:44','2022-07-18 09:00:44',NULL),(9,'Fatima Jinow Hamud','CLERK',599.99,2,'2022-07-18 09:03:10','2022-07-18 09:03:10',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'Joint Photographic Expers Group (JPEG)','Image.jpeg','2022-07-17 12:08:00','2022-07-17 12:08:00',NULL),(2,'Portable Network Graphic (PNG)','Image.png','2022-07-17 12:10:03','2022-07-17 12:10:03',NULL),(3,'Graphics Interchange Format (GIF)','Image.gif','2022-07-17 12:11:02','2022-07-17 12:11:02',NULL),(4,'Tagged Image File (TIFF)','Image.tiff','2022-07-17 12:11:54','2022-07-17 12:11:54',NULL),(5,'Photoshop Document (PSD)','Image.psd','2022-07-17 12:12:38','2022-07-17 12:12:38',NULL),(6,'Portable Document Format (PDF)','Image.pdf','2022-07-17 12:14:56','2022-07-17 12:14:56',NULL),(7,'Encupsulated Postscript (EPS)','Image.eps','2022-07-17 12:16:18','2022-07-17 12:16:18',NULL),(8,'Adobe Illustrator Document (AI)','Image.ai','2022-07-17 12:17:38','2022-07-17 12:17:38',NULL),(9,'Adobe Indesign Document (INDD)','Image.indd','2022-07-17 12:18:26','2022-07-17 12:18:26',NULL),(10,'Raw Image Format (RAW)','Image.raw','2022-07-17 12:19:16','2022-07-17 12:24:16',NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'New Car','Car','Car Details',8,'2022-07-16 10:36:11','2022-07-16 10:36:11',NULL),(2,'New Bike','Bike','Bike Details',7,'2022-07-16 10:38:46','2022-07-16 15:44:18',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posttags`
--

DROP TABLE IF EXISTS `posttags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posttags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `tagId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `posttags_tagId_postId_unique` (`postId`,`tagId`),
  KEY `tagId` (`tagId`),
  CONSTRAINT `posttags_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posttags_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posttags`
--

LOCK TABLES `posttags` WRITE;
/*!40000 ALTER TABLE `posttags` DISABLE KEYS */;
INSERT INTO `posttags` VALUES (1,1,1,'2022-07-16 15:21:38','2022-07-16 15:25:09',NULL),(2,1,2,'2022-07-16 15:22:05','2022-07-16 15:25:37',NULL),(3,2,3,'2022-07-16 15:22:24','2022-07-16 15:25:56',NULL);
/*!40000 ALTER TABLE `posttags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Latest','2022-07-16 13:27:44','2022-07-16 13:27:44',NULL),(2,'Popular','2022-07-16 13:28:04','2022-07-16 13:28:22',NULL),(3,'Sports','2022-07-16 13:30:05','2022-07-16 13:30:05',NULL),(4,'Football','2022-07-16 13:30:19','2022-07-16 13:30:19',NULL),(5,'Article','2022-07-16 13:30:31','2022-07-16 13:30:31',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tagstaggables`
--

DROP TABLE IF EXISTS `tagstaggables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tagstaggables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tagId` int NOT NULL,
  `taggableId` int NOT NULL,
  `taggableType` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `tt_unique_constraint` (`tagId`,`taggableId`,`taggableType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagstaggables`
--

LOCK TABLES `tagstaggables` WRITE;
/*!40000 ALTER TABLE `tagstaggables` DISABLE KEYS */;
INSERT INTO `tagstaggables` VALUES (1,5,1,'Image','2022-07-18 11:12:38','2022-07-18 11:29:13',NULL),(2,4,2,'Video','2022-07-18 11:13:12','2022-07-18 11:13:12',NULL),(3,2,1,'Video','2022-07-18 11:13:32','2022-07-18 11:13:32',NULL),(4,4,2,'Image','2022-07-18 11:14:09','2022-07-18 11:14:09',NULL),(5,3,1,'Image','2022-07-18 11:14:28','2022-07-18 11:14:28',NULL);
/*!40000 ALTER TABLE `tagstaggables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `email_5` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Asha','$2b$08$jFp0e9nFdLRYxxT3KbnOgum7bwiUA4jQn9icBhZIh.xXE5pU.rIwW','asha@gmail.com',1,'2022-07-13 13:39:18','2022-07-13 13:39:18',NULL),(2,'Ali','$2b$08$EBs493N.sCgZWnGDzIoMIeMA.HrOQD4qa32cQDMH6gtUsr26k0cCK','ali@gmail.com',0,'2022-07-13 13:40:01','2022-07-13 13:40:01',NULL),(3,'Jama','$2b$08$80AcrTXPgYGYfBMesL.jzuS.Pi7z5pk9T1calrPklCDQjsZfs2hxO','jama@gmail.com',1,'2022-07-13 13:41:25','2022-07-13 13:41:25',NULL),(4,'Jamila','$2b$08$1CUcs4uwlauWxLHZsmacW.hjwNibJ//x.RFbuh4S7DQzhFlBCgmL2','jamila@gmail.com',0,'2022-07-13 13:42:03','2022-07-13 13:42:03',NULL),(5,'Fatima','$2b$08$G9zNIPewCM409yysSzOkPeQimx3rbjTWNjYHRthvn7g2kSj/OxDVO','fatima@gmail.com',1,'2022-07-13 13:42:26','2022-07-13 13:42:26',NULL),(6,'Farah','$2b$08$2KEUWw587pGUscr36vLV3uZT2v0khVrxuGPr79rgAnrogwc54XVKa','farag@gmail.com',0,'2022-07-13 13:43:01','2022-07-13 13:43:01',NULL),(7,'Hassan','$2b$08$ZRHdpxyW38i.BL/UVj3k4ucM.5aexACyN66Q/7.GYA4CACaMluV6i','hassan@gmail.com',1,'2022-07-13 13:44:10','2022-07-13 13:44:10',NULL),(8,'Hanan','$2b$08$HgJNb7VIl/LrMbSA1XlWa.SX3WHj1XhifTOSkorHIdwnCHnn0.9RS','hanan@gmail.com',0,'2022-07-13 13:44:56','2022-07-13 13:44:56',NULL),(9,'Mohamed','$2b$08$sgeZVBbkmL1BlAAUk6a8pOfoI5/KpBf8XsEFmj1EdR7U6wUXQF1Ve','mohamed@gmail.com',1,'2022-07-18 09:10:53','2022-07-18 09:10:53',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `text` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,'Action','Hollywood','2022-07-17 11:15:54','2022-07-17 11:15:54',NULL),(2,'Adventure','Bollywood','2022-07-17 11:16:39','2022-07-17 11:16:39',NULL),(3,'Comedy','Nollywood','2022-07-17 11:17:19','2022-07-17 11:17:19',NULL),(4,'Drama','Tollywood','2022-07-17 11:17:45','2022-07-17 11:17:45',NULL),(5,'Horror','Sollywood','2022-07-17 11:18:06','2022-07-17 11:18:06',NULL),(6,'Romance','Hollywood','2022-07-17 11:20:16','2022-07-17 11:22:42',NULL),(7,'Science Fiction','Bollywood','2022-07-17 11:20:38','2022-07-17 11:25:19',NULL),(8,'Fantasy','Nollywood','2022-07-17 11:26:04','2022-07-17 11:26:04',NULL),(9,'Historical','Tollywood','2022-07-17 11:27:00','2022-07-17 11:27:00',NULL),(10,'Crime','Sollywood','2022-07-17 11:27:27','2022-07-17 11:27:27',NULL);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-18 14:33:31
