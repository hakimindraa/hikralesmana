-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: portofolio
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about_settings`
--

DROP TABLE IF EXISTS `about_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ABOUT ME',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Visual Artist',
  `description_1` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Saya adalah seorang photographer dan videographer yang passionate dalam menangkap momen-momen berharga dan mengubahnya menjadi karya visual yang bercerita.',
  `description_2` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Dengan keahlian dalam photo editing dan video editing, saya menciptakan konten visual yang tidak hanya indah dipandang, tetapi juga menyampaikan emosi dan pesan yang mendalam.',
  `stat_projects` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '200+',
  `stat_projects_label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Projects Completed',
  `stat_clients` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '50+',
  `stat_clients_label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Happy Clients',
  `stat_experience` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '5+',
  `stat_experience_label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Years Experience',
  `stat_awards` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '12',
  `stat_awards_label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Awards Won',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_settings`
--

LOCK TABLES `about_settings` WRITE;
/*!40000 ALTER TABLE `about_settings` DISABLE KEYS */;
INSERT INTO `about_settings` VALUES (1,'ABOUT ME','Visual Artist','Saya adalah seorang photographer dan videographer yang passionate dalam menangkap momen-momen berharga dan mengubahnya menjadi karya visual yang bercerita','Dengan keahlian dalam photo editing dan video editing, saya menciptakan konten visual yang tidak hanya indah dipandang, tetapi juga menyampaikan emosi dan pesan yang mendalam','2+','Projects Completed','5+','Happy Clients','5+','Years Experience','12','Awards Won','2026-02-12 15:46:49','2026-02-12 15:47:32');
/*!40000 ALTER TABLE `about_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `before_after`
--

DROP TABLE IF EXISTS `before_after`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `before_after` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `before_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `after_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portrait',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `before_after`
--

LOCK TABLES `before_after` WRITE;
/*!40000 ALTER TABLE `before_after` DISABLE KEYS */;
INSERT INTO `before_after` VALUES (1,'Nature','Eksplorasi fotografi natural setelah hujan dengan fokus pada detail bunga dan tekstur daun','https://i.ibb.co.com/MDyPyMg1/Whats-App-Image-2026-02-12-at-19-38-08.jpg','https://i.ibb.co.com/B5WDvJ7T/Whats-App-Image-2026-02-12-at-17-30-29.jpg','Portrait',1,'2026-02-12 12:33:00','2026-02-12 12:40:08'),(2,'Nature','Butiran air yang tersisa di dedaunan menghadirkan suasana hening setelah hujan','https://i.ibb.co.com/BKYGtZ5t/Whats-App-Image-2026-02-12-at-19-42-57.jpg','https://i.ibb.co.com/bgQhYDHG/Whats-App-Image-2026-02-12-at-17-30-27.jpg','Portrait',3,'2026-02-12 12:44:25','2026-02-12 12:55:10'),(3,'Warisan dalam Gerak','Dokumentasi pertunjukan tari tradisional dalam rangka perayaan Dies Natalis. Menggunakan pencahayaan panggung alami untuk menangkap ekspresi, gerakan, dan kekayaan budaya dalam satu frame','https://i.ibb.co.com/PGppFmg1/Whats-App-Image-2026-02-12-at-19-46-41.jpg','https://i.ibb.co.com/60LbMg19/Whats-App-Image-2026-02-12-at-19-52-24.jpg','Event',2,'2026-02-12 12:55:03','2026-02-12 12:55:03');
/*!40000 ALTER TABLE `before_after` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'as','akunlaptoplenovo8@gmail.com',NULL,'as','2026-02-12 14:49:42','2026-02-12 14:49:42'),(2,'d','praugood@gmail.com',NULL,'adfff\n','2026-02-12 14:56:55','2026-02-12 14:56:55'),(6,'v','hak@gmail.com','083137412551','ffds','2026-02-12 15:33:42','2026-02-12 15:33:42');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Photography',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,'Nature After Rain','https://i.ibb.co.com/bgQhYDHG/Whats-App-Image-2026-02-12-at-17-30-27.jpg','Portrait',1,'2026-02-12 11:52:12','2026-02-12 11:52:12'),(2,'Warisan dalam Gerak','https://i.ibb.co.com/60LbMg19/Whats-App-Image-2026-02-12-at-19-52-24.jpg','Event',2,'2026-02-12 11:52:47','2026-02-12 12:57:20'),(3,'Jembatan','https://i.ibb.co.com/1G25GVz4/Whats-App-Image-2026-02-12-at-17-30-28-2.jpg','Photography',3,'2026-02-12 11:53:42','2026-02-12 11:53:42'),(4,'Still Water','https://i.ibb.co.com/Gv1SVwGY/Whats-App-Image-2026-02-12-at-17-30-28.jpg','Portrait',4,'2026-02-12 11:54:15','2026-02-12 11:54:15'),(5,'Nature','https://i.ibb.co.com/B5WDvJ7T/Whats-App-Image-2026-02-12-at-17-30-29.jpg','Photography',6,'2026-02-12 11:54:49','2026-02-12 11:54:49'),(6,'Water','https://i.ibb.co.com/DHVZnGv8/Whats-App-Image-2026-02-12-at-17-30-29-1.jpg','Photography',7,'2026-02-12 11:55:16','2026-02-12 11:55:16'),(8,'Belajar','https://i.ibb.co.com/sv9ZnJB8/Whats-App-Image-2026-02-12-at-17-30-27-2.jpg','Landscape',7,'2026-02-12 12:03:59','2026-02-12 12:03:59');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_settings`
--

DROP TABLE IF EXISTS `hero_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VISUAL STORYTELLER',
  `title_line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Photography',
  `title_line2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '& Videography',
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Capturing moments, crafting stories through the lens',
  `button1_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VIEW WORK',
  `button1_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/#projects',
  `button2_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GET IN TOUCH',
  `button2_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/#contact',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_settings`
--

LOCK TABLES `hero_settings` WRITE;
/*!40000 ALTER TABLE `hero_settings` DISABLE KEYS */;
INSERT INTO `hero_settings` VALUES (1,'HAKIM INDRA LESMANA','Photography','& Videography','Capturing moments, crafting stories through the lens','VIEW WORK','/#projects','GET IN TOUCH','/#contact','2026-02-12 14:23:44','2026-02-12 15:53:58');
/*!40000 ALTER TABLE `hero_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2024_01_01_000001_create_projects_table',1),(2,'2024_01_01_000002_create_skills_table',1),(3,'2024_01_01_000003_create_contacts_table',1),(4,'2026_02_12_141046_create_testimonials_table',1),(5,'2026_02_12_141047_create_users_table',1),(6,'2026_02_12_184350_create_gallery_table',2),(7,'2026_02_12_191812_create_before_after_table',3),(8,'2026_02_12_200236_add_video_url_to_projects_table',4),(9,'2026_02_12_211622_create_hero_settings_table',5),(10,'2026_02_12_222225_add_phone_to_contacts_table',6),(11,'2026_02_12_223623_create_about_settings_table',7);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'After the Rain','Eksplorasi fotografi natural setelah hujan dengan fokus pada detail bunga dan tekstur daun. Menggunakan pendekatan depth layering untuk menciptakan kesan intimate dan cinematic','https://i.ibb.co.com/bgQhYDHG/Whats-App-Image-2026-02-12-at-17-30-27.jpg',NULL,'Photography','Personal','2026-02-12','2026-02-12 11:18:07','2026-02-12 11:18:07'),(2,'After Rain Silence','Butiran air yang tersisa di dedaunan menghadirkan suasana hening setelah hujan. Komposisi vertikal dan pencahayaan natural menciptakan kesan intim dan dramatis dalam ruang hijau yang lembut','https://i.ibb.co.com/B5WDvJ7T/Whats-App-Image-2026-02-12-at-17-30-29.jpg',NULL,'Photography','Personal','2026-02-12','2026-02-12 11:30:49','2026-02-12 11:30:49'),(3,'Potrait Photography','Perspektif perjalanan yang menghubungkan kota dan alam dalam satu garis lurus visual','https://i.ibb.co.com/1G25GVz4/Whats-App-Image-2026-02-12-at-17-30-28-2.jpg',NULL,'photography','Personal','2026-02-12','2026-02-12 11:35:34','2026-02-12 11:36:20'),(5,'Warisan dalam Gerak','Momen puncak perayaan Dies Natalis yang menampilkan kekayaan budaya melalui pertunjukan tari tradisional dengan pencahayaan dramatis','https://i.ibb.co.com/60LbMg19/Whats-App-Image-2026-02-12-at-19-52-24.jpg',NULL,'photography','Event Dies Natalis','2026-02-12','2026-02-12 11:38:58','2026-02-12 12:56:37'),(6,'Where Water Meets Stone','Pertemuan elemen alam dalam ritme yang konstan dan tak terhenti','https://i.ibb.co.com/DHVZnGv8/Whats-App-Image-2026-02-12-at-17-30-29-1.jpg',NULL,'photography','Personal','2026-02-12','2026-02-12 11:40:20','2026-02-12 11:40:40'),(7,'Still Waters','Ketenangan perairan dengan elemen garis horizontal yang menciptakan ruang dan kedalaman visual','https://i.ibb.co.com/Gv1SVwGY/Whats-App-Image-2026-02-12-at-17-30-28.jpg',NULL,'photography','Personal','2026-02-12','2026-02-12 11:42:04','2026-02-12 11:42:04'),(8,'Storytelling','30 detik storytelling','https://i.ibb.co.com/8ghdHVCS/Whats-App-Image-2026-02-12-at-20-17-39.jpg','https://youtu.be/WZowrQR3pYI?si=n4kE0FajaAhX3kU3','Videography','Personal','2026-02-12','2026-02-12 13:18:51','2026-02-12 13:27:47'),(9,'Malam Puncak Dieas Natalis','Malam Puncak Dieas Natalis HIMK ke-13 TH 2026','https://i.ibb.co.com/1JBtdJpR/Whats-App-Image-2026-02-12-at-20-43-08.jpg','https://youtu.be/IKkEFi-NGJM?si=idvQwgSPIUVi6Xgp','videography','Event HIMK','2026-02-12','2026-02-12 13:44:58','2026-02-12 13:44:58');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Photo Editing',97,'Photography','2026-02-12 11:31:37','2026-02-12 11:31:37'),(2,'Color Grading',98,'Photography','2026-02-12 11:31:49','2026-02-12 11:33:01'),(3,'Portrait Photography',98,'Photography','2026-02-12 11:32:05','2026-02-12 11:32:05'),(4,'Landscape Photography',98,'Photography','2026-02-12 11:32:19','2026-02-12 11:32:19'),(5,'Video Editing',90,'Videography','2026-02-12 11:32:37','2026-02-12 11:32:37'),(6,'VSCO',99,'Software','2026-02-12 11:32:53','2026-02-12 11:32:53');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Rian','Groom','','Hasil fotonya sangat memuaskan. Setiap momen tertangkap dengan detail dan emosional. Editingnya clean dan elegan. Sangat direkomendasikan','',5,'2026-02-12 11:24:26','2026-02-12 11:24:26'),(2,'Budi','Mahasiswa','','Prosesnya cepat, komunikatif, dan hasil video dokumentasinya sangat rapi. Sangat puas dengan hasil akhirnya','',5,'2026-02-12 11:28:33','2026-02-12 11:28:33');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@visual.com','$2y$10$zBOxpdzmpeqEvXJ5oqJBiOKFC/IqjzzbKlxiucfQZYWcwz3BpZHRi',NULL,'2026-02-12 11:14:43','2026-02-12 11:14:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-13  0:46:44
