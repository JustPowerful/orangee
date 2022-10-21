-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 15 oct. 2020 à 16:13
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
  `completer_id` int(11) NOT NULL,
  `completion_date` date NOT NULL,
  `completion_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `history`
--

INSERT INTO `history` (`id`, `parent_id`, `title`, `completer_id`, `completion_date`, `completion_time`) VALUES
(57, 150, 'Kitchen', 0, '2020-10-10', '00:00:00'),
(59, 150, 'Bathroom', 0, '2020-10-10', '00:00:00'),
(60, 150, 'Bedroom', 0, '2020-10-10', '00:00:00'),
(61, 151, 'Windows', 0, '2020-10-10', '00:00:00'),
(57, 150, 'Kitchen', 3, '2020-10-10', '19:04:10'),
(59, 150, 'Bathroom', 0, '2020-10-10', '00:00:00'),
(60, 150, 'Bedroom', 3, '2020-10-10', '19:04:11'),
(61, 151, 'Windows', 3, '2020-10-10', '19:04:12'),
(57, 150, 'Kitchen', 0, '2020-10-11', '00:00:00'),
(59, 150, 'Bathroom', 0, '2020-10-11', '00:00:00'),
(60, 150, 'Bedroom', 0, '2020-10-11', '00:00:00'),
(61, 151, 'Windows', 0, '2020-10-11', '00:00:00'),
(57, 150, 'Kitchen', 5, '2020-10-11', '16:02:26'),
(59, 150, 'Bathroom', 5, '2020-10-11', '16:02:26'),
(60, 150, 'Bedroom', 5, '2020-10-11', '16:02:27'),
(61, 151, 'Windows', 5, '2020-10-11', '16:02:28');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `parent_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `date`, `parent_id`, `user_id`, `note`) VALUES
(6, '2020-10-15', 70, 3, 'dada'),
(7, '2020-10-15', 70, 3, 'DdiDIADA'),
(8, '2020-10-15', 70, 3, 'Hello World');

-- --------------------------------------------------------

--
-- Structure de la table `subtasks`
--

CREATE TABLE `subtasks` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `completer_id` int(11) DEFAULT NULL,
  `completion_date` date NOT NULL,
  `completion_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `subtasks`
--

INSERT INTO `subtasks` (`id`, `parent_id`, `title`, `completer_id`, `completion_date`, `completion_time`) VALUES
(70, 156, 'Bathroom', NULL, '0000-00-00', '00:00:00'),
(71, 156, 'Living room', NULL, '0000-00-00', '00:00:00'),
(73, 157, 'Cats', NULL, '0000-00-00', '00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `created_at`) VALUES
(156, 'Rooms', '2020-10-15 14:25:37'),
(157, 'Other', '2020-10-15 14:25:45');

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
(4, 'username', '$2b$08$HA4dKA1rHTyHfMxCWZ3CbePMFRtX.iML39SbEJSXji5XFh71V41T6', 0),
(5, 'admer', '$2b$08$Yf2l/kJUy2NhP1mRLYdRCeUk1UuKOzLTBTWx74A04xcckMBA7PxgG', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `subtasks`
--
ALTER TABLE `subtasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
