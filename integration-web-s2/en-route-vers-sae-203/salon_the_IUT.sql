-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 09, 2022 at 06:13 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salon_the_IUT`
--

-- --------------------------------------------------------

--
-- Table structure for table `CATEGORIES`
--

CREATE TABLE `CATEGORIES` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CLIENTS_EN_ATTENTE`
--

CREATE TABLE `CLIENTS_EN_ATTENTE` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `NOTIFICATIONS`
--

CREATE TABLE `NOTIFICATIONS` (
  `id_prod` int NOT NULL,
  `id_client` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PRODUITS`
--

CREATE TABLE `PRODUITS` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `quantite` int NOT NULL,
  `prix` int NOT NULL,
  `description` text NOT NULL,
  `saison_id` int NOT NULL,
  `categorie_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SAISONS`
--

CREATE TABLE `SAISONS` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CATEGORIES`
--
ALTER TABLE `CATEGORIES`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CLIENTS_EN_ATTENTE`
--
ALTER TABLE `CLIENTS_EN_ATTENTE`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `NOTIFICATIONS`
--
ALTER TABLE `NOTIFICATIONS`
  ADD KEY `id_prod` (`id_prod`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `PRODUITS`
--
ALTER TABLE `PRODUITS`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saison_id` (`saison_id`),
  ADD KEY `categorie_id` (`categorie_id`);

--
-- Indexes for table `SAISONS`
--
ALTER TABLE `SAISONS`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CATEGORIES`
--
ALTER TABLE `CATEGORIES`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CLIENTS_EN_ATTENTE`
--
ALTER TABLE `CLIENTS_EN_ATTENTE`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PRODUITS`
--
ALTER TABLE `PRODUITS`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SAISONS`
--
ALTER TABLE `SAISONS`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `NOTIFICATIONS`
--
ALTER TABLE `NOTIFICATIONS`
  ADD CONSTRAINT `id_client_fk` FOREIGN KEY (`id_client`) REFERENCES `CLIENTS_EN_ATTENTE` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_prod_fk` FOREIGN KEY (`id_prod`) REFERENCES `PRODUITS` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `PRODUITS`
--
ALTER TABLE `PRODUITS`
  ADD CONSTRAINT `categorie_id_fk` FOREIGN KEY (`categorie_id`) REFERENCES `CATEGORIES` (`id`),
  ADD CONSTRAINT `saison_id_fk` FOREIGN KEY (`saison_id`) REFERENCES `SAISONS` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
