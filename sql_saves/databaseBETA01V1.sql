-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 26 sep. 2021 à 16:56
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `facility_service`
--

-- --------------------------------------------------------

--
-- Structure de la table `history`
--

CREATE TABLE `history` (
  `id` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `completer_id` int(11) DEFAULT NULL,
  `completion_date` date NOT NULL,
  `completion_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `parent_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` varchar(250) NOT NULL,
  `archived` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `date`, `parent_id`, `user_id`, `note`, `archived`) VALUES
(6, '2020-10-15', 70, 3, 'dada', 1),
(7, '2020-10-15', 70, 3, 'DdiDIADA', 0),
(8, '2020-10-15', 70, 3, 'Hello World', 0),
(9, '2020-10-16', 82, 3, 'Admin profile', 1),
(10, '2020-10-16', 71, 3, 'admin\r\n', 1),
(11, '2020-10-16', 71, 3, 'test admin', 0),
(12, '2020-10-17', 70, 3, 'add', 0),
(13, '2020-10-17', 70, 3, 'Controllers work fine now', 1),
(14, '2020-10-17', 81, 3, 'Hello World', 1),
(15, '2020-10-17', 81, 3, 'Hello World', 1),
(16, '2020-10-17', 81, 3, 'Hello World', 1),
(17, '2020-10-17', 81, 3, 'Hello World', 1),
(18, '2020-10-17', 81, 3, 'Hello World', 1),
(19, '2020-10-17', 81, 3, 'Hello World', 1),
(20, '2020-10-17', 81, 3, 'Hello World', 1),
(21, '2020-10-17', 81, 3, 'Hello World', 1),
(22, '2020-10-17', 81, 3, 'Hello World', 1),
(23, '2020-10-17', 81, 3, 'Hello World', 1),
(24, '2020-10-17', 81, 3, 'Hello World', 1),
(25, '2020-10-17', 81, 3, 'Hello World', 1),
(26, '2020-10-17', 81, 3, 'Hello World', 1),
(27, '2020-10-17', 81, 3, 'Hello World', 1),
(28, '2020-10-17', 81, 3, 'Hello World', 1),
(29, '2020-10-17', 81, 3, 'Hello World', 1),
(30, '2020-10-17', 81, 3, 'Hello World', 1),
(31, '2020-10-17', 81, 3, 'Hello World', 1),
(32, '2020-10-17', 81, 3, 'Hello World', 1),
(33, '2020-10-17', 81, 3, 'Hello World', 1),
(34, '2020-10-17', 81, 3, 'Hello World', 1),
(35, '2020-10-17', 81, 3, 'Hello World', 1),
(36, '2020-10-17', 81, 3, 'Hello World', 1),
(37, '2020-10-17', 81, 3, 'Hello World', 1),
(38, '2020-10-17', 81, 3, 'Hello World', 1),
(39, '2020-10-17', 81, 3, 'Hello World', 1),
(40, '2020-10-17', 81, 3, 'Hello World', 1),
(41, '2020-10-17', 81, 3, 'Hello World', 1),
(42, '2020-10-17', 81, 3, 'Hello World', 1),
(43, '2020-10-18', 87, 3, 'Adding\r\nSubtasks', 1),
(44, '2020-10-18', 87, 3, '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', 0),
(45, '2020-10-22', 90, 3, 'Testing the tasks here and it works well', 0),
(46, '2020-10-22', 97, 3, 'Note test', 0),
(47, '2020-10-22', 97, 3, 'Test 2', 0),
(48, '2020-10-22', 106, 3, 'not clean ..schpigel a nettoyer', 0),
(49, '2020-10-22', 106, 3, 'boden not ckean', 0),
(50, '2020-10-22', 106, 3, 'note kais', 1),
(51, '2020-10-22', 106, 9, ' fate complète', 0),
(52, '2020-10-23', 106, 9, 'Test', 0),
(53, '2020-11-01', 174, 3, 'Doing it rn', 0),
(54, '2020-11-01', 186, 47, 'Hello', 0),
(55, '2020-11-01', 186, 48, 'dadada', 0),
(56, '2020-11-02', 188, 51, 'cant\r\ntoo tired \r\n', 1),
(57, '2020-11-02', 188, 51, '', 0),
(58, '2020-11-02', 188, 51, 'a', 0),
(59, '2020-11-02', 188, 51, 'a', 0),
(60, '2020-11-02', 188, 51, 'شصيبشلصبصبشيфцвафпафвыйц', 0),
(61, '2020-11-03', 224, 3, 'Hello World', 0),
(62, '2020-11-03', 224, 52, 'Hello World\'nt', 0),
(63, '2020-11-04', 231, 3, 'Learn the basics first', 0),
(64, '2020-11-04', 231, 53, 'I learned the basics and servers', 0),
(65, '2020-11-12', 248, 3, 'Not one its two', 0),
(66, '2021-09-25', 267, 57, 'it worked fine here and i can test it', 1),
(67, '2021-09-25', 267, 57, 'now this needs admin verification', 1),
(68, '2021-09-25', 267, 3, 'dadadadada', 1),
(69, '2021-09-25', 267, 3, 'ezrgzfezfezf', 1),
(70, '2021-09-25', 267, 3, 'gzefezfdzqefgez', 1),
(71, '2021-09-25', 267, 3, 'fzefezfzgfggzefzaefeza', 1),
(72, '2021-09-25', 267, 3, 'fefzfggergergzgzefgez', 1),
(73, '2021-09-25', 267, 3, 'ezrgzefgzfrzaefzeqfgffgzeg', 1),
(74, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(75, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(76, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(77, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(78, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 0),
(79, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 0),
(80, '2021-09-25', 267, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 0),
(81, '2021-09-25', 268, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(82, '2021-09-25', 268, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(83, '2021-09-25', 268, 3, 'zedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeffzedfzeffezzeff', 1),
(84, '2021-09-25', 269, 3, 'nice', 0);

-- --------------------------------------------------------

--
-- Structure de la table `subtasks`
--

CREATE TABLE `subtasks` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `completer_id` int(11) DEFAULT NULL,
  `completion_date` date NOT NULL DEFAULT current_timestamp(),
  `completion_time` time NOT NULL DEFAULT current_timestamp(),
  `period` varchar(10) NOT NULL DEFAULT 'day'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `subtasks`
--

INSERT INTO `subtasks` (`id`, `parent_id`, `title`, `completer_id`, `completion_date`, `completion_time`, `period`) VALUES
(286, 283, 'dadadada', 3, '2021-09-26', '15:45:09', 'day'),
(287, 284, 'gergergergre', NULL, '2021-09-26', '15:45:02', 'week');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `period` varchar(15) NOT NULL DEFAULT 'day'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `created_at`, `period`) VALUES
(283, 'fzfezfzefezfez', '2021-09-26 15:42:53', 'day'),
(284, 'fzgfzefezfzefezezffezfez', '2021-09-26 15:44:59', 'week');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`) VALUES
(3, 'admin', '$2b$08$HrrhD5uuFaFC8cOPtXuHhuv8C.4wJ6b5K1qC71kthOKv9grmGp6R.', 1),
(53, 'username', '$2b$08$g0O9nHJkt3PdRLTVl8wZK.RG3Q6O10z/2LEYy5Mo5jKr7I8qsXQhS', 0),
(57, 'user1', '$2b$08$t/SJhAqF45SOm1mpT1q42uJIqY4ITOtNeDyv4ruqwkNncHpDeYPDq', 0),
(58, 'user2', '$2b$08$WnXmGwfV/kwyURnqWW5SWu7nFXYHuZTe1Y5S1s3HsmpH3zxREQcw6', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subtasks`
--
ALTER TABLE `subtasks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pour la table `subtasks`
--
ALTER TABLE `subtasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=288;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=285;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
