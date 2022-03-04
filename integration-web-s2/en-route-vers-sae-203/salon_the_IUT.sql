-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: route_sae203_db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'Tartes'),(2,'Cakes'),(3,'Mignardises'),(4,'Boissons');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_attente`
--

DROP TABLE IF EXISTS `client_attente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_attente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_attente`
--

LOCK TABLES `client_attente` WRITE;
/*!40000 ALTER TABLE `client_attente` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_attente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `saison_id` int DEFAULT NULL,
  `categorie_id` int NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantite` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prix` double NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `IDX_29A5EC27F965414C` (`saison_id`),
  KEY `IDX_29A5EC27BCF5E72D` (`categorie_id`),
  CONSTRAINT `FK_29A5EC27BCF5E72D` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`),
  CONSTRAINT `FK_29A5EC27F965414C` FOREIGN KEY (`saison_id`) REFERENCES `saison` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES (1,NULL,3,'Carolines','les trois',5,'carolines.jpg','<div>Version mini des éclairs. Les Carolines sauront ravir vos papilles par leur fourrage. Vanille, chocolat blanc, chocolat noir, praliné ou thé matcha, il y en a pour tous les goûts.</div>'),(2,NULL,3,'Cookies','l\'unité',2,'cookies.jpg','<div>Idéals pour le goûter, un petit creux ou pour les plus gourmands au petit-déjeuner.</div>'),(3,2,1,'Tartelette aux fraises','l\'unité',4.75,'tartelette-aux-fraises.jpg','<div>Est-il nécessaire de faire les présentations ?</div>'),(4,NULL,1,'Flan au praliné','la part',3,'flan-praline.jpg','<div>Cousin des flans pâtissiers et parisiens. Le Flan praliné reprend la base des deux flans iconiques pour cette fois-ci y adjoindre du praliné à l\'appareil pour les amateurs de noisettes et amandes.</div>'),(5,NULL,1,'Flan Parisien','la part',2.8,'flan-parisien.jpg',NULL),(6,4,1,'Tarte Normande','la part',2.5,'tarte-normande.jpg','<div>Douceur d\'hiver. Notre tarte normande ravira les fans de la pomme. Nous utilisons la variété Jonagold, et elle est cueillie dans le coin.</div>'),(7,NULL,3,'Muffins Bananes Choco','l\'unité',1.8,'muffins-bananes-choco.jpg','<div>On nous reproche souvent que nos muffins banane-choco ne sont pas souvent en magasin. Pourquoi ? Tout simplement car un ingrédient est issu de la récupération : les bananes. En effet, dans notre politique d\'anti-gaspi, nous en partenariat avec les magasins pour récupérer leurs bananes pas faites pour la vente.</div>'),(8,NULL,3,'Dunes Blanches','les 4',7.5,'dunes-blanches.jpg','<div>Les chouquettes, vous connaissez ? Nous avons décidé d\'aller plus loin et d\'y mettre à l\'intérieur da la chantilly au mascarpone. Tout simple dé-li-cieux. Et ce n\'est pas de nous cet avis, il est de vous !</div>'),(9,NULL,1,'Tres Lesches','la part',3.25,'tres-lesches.jpg','<div>En provenance d\'Amérique du Sud, le Tres Lesches est un \"gâteau éponge\" trempé avec trois laits, le tout avec de la chantilly et copeaux de chocolat au dessus.</div>'),(10,NULL,3,'Madeleines','les 6',4.25,'madeleines.jpg',NULL),(11,NULL,3,'Financiers','les 5',6,'financiers.jpg','<div>Alliés idéals de votre café ou votre thé.</div>'),(12,NULL,4,'Thé',NULL,2,NULL,'<div>Parfums variés</div>'),(13,NULL,4,'Café','20 cl',1.8,NULL,NULL),(14,NULL,4,'Mocha',NULL,2.25,NULL,NULL),(15,NULL,4,'Latte','40 cl',3,NULL,'<div>Café long avec du lait.</div>'),(16,NULL,4,'Americano',NULL,2,NULL,'<div>Café court et très serré</div>'),(17,NULL,4,'Soda','33 cl',1.75,NULL,'<div>Plusieurs variétés possibles.</div>'),(18,NULL,4,'Jus de fruits frais','30 cl',2,NULL,'<div>Plusieurs variétés possibles en fonction des saisons et disponibilités.</div>'),(19,NULL,4,'Irish Coffee',NULL,7.5,NULL,'<div>Café, whisky et chantilly au mascapone.</div>'),(20,NULL,4,'Expresso',NULL,2.5,NULL,'<div>Possibilité de le doubler pour en faire un Doppio (supplément de 1 euro).</div>'),(21,NULL,4,'Cappucino',NULL,3,NULL,NULL),(22,NULL,4,'Chocolat Chaud','40 cl',3.5,NULL,NULL),(23,3,1,'Chocolat Chaud épices d\'automne','40 cl',3.5,NULL,'<div>Notre chocolat chaud mais cette fois-ci le lait est infusé dans des épices d\'automne : cardamome, cannelle, clou de girofle et badiane.</div>'),(24,NULL,4,'Café glacé','25cl',3,NULL,NULL),(25,NULL,4,'Affogato',NULL,4.5,NULL,'<div>Boule de crème glacée à la vanille noyée dans un café expresso</div>'),(26,4,1,'Latte au pain d\'épices','40 cl',3.5,NULL,NULL),(27,4,4,'Latte au pain d\'épices','40 cl',3,NULL,NULL),(28,4,4,'Chocolat Chaud blanc',NULL,2,NULL,'<div>Chocolat chaud mais cette fois-ci avec du chocolat blanc. Blanc comme la neige d\'hiver.</div>'),(29,2,4,'Milkshake',NULL,4.75,NULL,'<div>Plusieurs parfums disponibles, crème glacée maison.</div>'),(30,NULL,4,'Smoothie','40 cl',3.5,NULL,'<div>Plusieurs variétés disponibles : fraise / banane, kiwi / fruit de la passion, carotte / orange et mangue, fraise / banane et pomme, myrtille, pêche et pomme</div>'),(31,NULL,4,'Lait végétaux','25 cl',3,NULL,'<div>Plusieurs variétés disponibles : riz, avoine et soja</div>');
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit_client_attente`
--

DROP TABLE IF EXISTS `produit_client_attente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit_client_attente` (
  `produit_id` int NOT NULL,
  `client_attente_id` int NOT NULL,
  PRIMARY KEY (`produit_id`,`client_attente_id`),
  KEY `IDX_270EBCC1F347EFB` (`produit_id`),
  KEY `IDX_270EBCC1BA7467BE` (`client_attente_id`),
  CONSTRAINT `FK_270EBCC1BA7467BE` FOREIGN KEY (`client_attente_id`) REFERENCES `client_attente` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_270EBCC1F347EFB` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit_client_attente`
--

LOCK TABLES `produit_client_attente` WRITE;
/*!40000 ALTER TABLE `produit_client_attente` DISABLE KEYS */;
/*!40000 ALTER TABLE `produit_client_attente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saison`
--

DROP TABLE IF EXISTS `saison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saison` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jour_debut` int NOT NULL,
  `mois_debut` smallint NOT NULL,
  `jour_fin` smallint NOT NULL,
  `mois_fin` smallint NOT NULL,
  `nom` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saison`
--

LOCK TABLES `saison` WRITE;
/*!40000 ALTER TABLE `saison` DISABLE KEYS */;
INSERT INTO `saison` VALUES (1,20,3,20,6,'Printemps'),(2,21,6,22,9,'Été'),(3,23,9,20,12,'Automne'),(4,21,12,19,3,'Hiver');
/*!40000 ALTER TABLE `saison` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-04  9:40:47
