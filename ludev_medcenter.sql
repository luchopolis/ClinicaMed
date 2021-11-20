-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2021 at 11:00 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ludev_medcenter`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `load_expediente_pacient` (IN `idPaciente` INT)  BEGIN
	SELECT CONCAT_ws(' ',P.Nombres,P.Apellidos) as NombrePaciente,
            P.Edad,PD.Padecimientos,
            A.Alergias,
            Exp.Ocupacion,
            Exp.Peso,
            TS.Nombre as Tipo_Sangre,
            Exp.FechaCreacion
            FROM expedientes as Exp
            INNER JOIN grupossanguineos as TS
            ON TS.id_TipoSangre = Exp.id_TipoSangre
            INNER JOIN pacientes AS P
            ON Exp.id_Paciente = P.id_Paciente
            INNER JOIN padecimientos as PD
            ON Exp.id_Expediente = PD.id_Expediente
            INNER JOIN alergias as A
            ON Exp.id_Expediente = A.id_Expediente
            WHERE P.id_Paciente = idPaciente;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `alergias`
--

CREATE TABLE `alergias` (
  `id_Expediente` int(11) NOT NULL,
  `Alergias` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alergias`
--

INSERT INTO `alergias` (`id_Expediente`, `Alergias`) VALUES
(14, 'SADF,ASDF,ASDF,ASDF'),
(15, 'Ibuprofeno'),
(17, 'acetaminofen'),
(18, 'cangrejo,acetaminofen'),
(22, 'a,b,c'),
(23, 'Tapcin,Al cangrejo,camarones'),
(24, 'Alergia1,Alergia2');

-- --------------------------------------------------------

--
-- Table structure for table `cargos`
--

CREATE TABLE `cargos` (
  `id_Cargo` int(11) NOT NULL,
  `Nombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cargosempleados`
--

CREATE TABLE `cargosempleados` (
  `id_Cargo` int(11) NOT NULL,
  `id_Empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `citas`
--

CREATE TABLE `citas` (
  `id_Cita` int(11) NOT NULL,
  `FechaCita` date NOT NULL,
  `Hora` time NOT NULL,
  `Estado` varchar(11) NOT NULL,
  `id_Paciente` int(11) NOT NULL,
  `id_Medico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `citas`
--

INSERT INTO `citas` (`id_Cita`, `FechaCita`, `Hora`, `Estado`, `id_Paciente`, `id_Medico`) VALUES
(1, '2021-02-17', '17:37:12', 'Pendiente', 2, 1),
(2, '2021-03-11', '10:43:57', 'Pendiente', 1, 1),
(3, '2021-02-17', '16:30:08', 'Pendiente', 3, 1),
(4, '2021-02-17', '16:38:13', 'Pendiente', 1, 2),
(5, '2021-02-18', '16:24:45', 'Pendiente', 3, 1),
(6, '2021-01-21', '12:55:30', 'Completado', 2, 1),
(7, '2021-03-02', '10:43:00', 'Pendiente', 3, 1),
(8, '2021-03-02', '15:43:00', 'Pendiente', 3, 1),
(9, '2021-03-02', '15:43:00', 'Pendiente', 2, 1),
(10, '2021-03-02', '15:43:00', 'Pendiente', 2, 1),
(11, '2021-03-02', '15:43:00', 'Pendiente', 2, 1),
(12, '2021-03-02', '15:43:00', 'Pendiente', 2, 1),
(13, '2021-03-02', '15:43:00', 'Pendiente', 3, 1),
(14, '2021-05-11', '18:43:00', 'Completado', 3, 1),
(15, '2021-03-23', '15:43:00', 'Completado', 2, 1),
(16, '2021-03-23', '15:43:00', 'Completado', 2, 1),
(17, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(18, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(19, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(20, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(21, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(22, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(23, '2021-04-22', '15:43:00', 'Completado', 2, 1),
(24, '2021-04-22', '15:43:00', 'Pendiente', 2, 1),
(25, '0000-00-00', '00:00:00', 'Pendiente', 1, 1),
(26, '2021-05-27', '08:00:00', 'Pendiente', 13, 1),
(27, '0000-00-00', '19:31:00', 'Pendiente', 12, 1),
(28, '2021-05-11', '14:12:00', 'Completado', 4, 1),
(29, '0000-00-00', '16:00:00', 'Pendiente', 12, 1),
(30, '2021-05-07', '14:40:00', 'Pendiente', 13, 2),
(31, '2021-05-07', '19:19:00', 'Completado', 4, 1),
(32, '0000-00-00', '00:00:00', 'Pendiente', 1, 1),
(33, '2021-05-08', '10:54:00', 'Pendiente', 1, 2),
(34, '2021-05-11', '15:22:00', 'Completado', 1, 2),
(35, '2021-05-11', '18:18:00', 'Completado', 3, 1),
(36, '2021-05-11', '17:30:00', 'Completado', 13, 2),
(37, '2021-05-17', '06:47:00', 'Completado', 14, 1),
(38, '2021-05-17', '07:18:00', 'Pendiente', 14, 1),
(39, '2021-05-18', '15:26:00', 'Completado', 12, 1),
(40, '2021-05-18', '15:48:00', 'Completado', 4, 1),
(41, '2021-05-18', '15:53:00', 'Completado', 13, 1),
(42, '2021-05-18', '15:57:00', 'Completado', 13, 1),
(43, '2021-05-18', '18:05:00', 'Completado', 13, 1),
(44, '2021-05-18', '19:05:00', 'Completado', 12, 1),
(45, '2021-05-18', '20:05:00', 'Pendiente', 14, 1),
(46, '2021-05-22', '07:50:00', 'Completado', 13, 1),
(47, '2021-05-26', '11:25:00', 'Completado', 1, 1),
(48, '2021-05-26', '11:35:00', 'Pendiente', 1, 1),
(49, '2021-05-31', '16:53:00', 'Pendiente', 1, 1),
(50, '2021-05-31', '19:57:00', 'Pendiente', 12, 1),
(51, '2021-05-31', '19:57:00', 'Pendiente', 14, 1),
(52, '2021-06-01', '16:55:00', 'Pendiente', 12, 1),
(53, '2021-05-31', '18:57:00', 'Pendiente', 12, 2),
(54, '2021-06-02', '09:11:00', 'Pendiente', 4, 2),
(55, '2021-06-02', '09:11:00', 'Pendiente', 4, 1),
(56, '2021-05-11', '17:14:00', 'Pendiente', 3, 2),
(57, '2021-06-01', '22:12:00', 'Pendiente', 4, 1),
(58, '2021-06-02', '08:13:00', 'Pendiente', 12, 2),
(59, '2021-06-17', '19:14:00', 'Pendiente', 3, 2),
(60, '2021-06-03', '09:16:00', 'Pendiente', 14, 1),
(61, '2021-06-03', '09:16:00', 'Pendiente', 14, 1),
(62, '2021-05-31', '20:17:00', 'Pendiente', 12, 1),
(63, '2021-05-31', '21:17:00', 'Pendiente', 4, 2),
(64, '2021-05-31', '19:18:00', 'Pendiente', 14, 1),
(65, '2021-06-04', '21:24:00', 'Pendiente', 1, 2),
(66, '2021-05-31', '07:26:00', 'Pendiente', 13, 2),
(67, '2021-06-02', '19:28:00', 'Pendiente', 3, 2),
(68, '2021-05-31', '18:29:00', 'Pendiente', 1, 1),
(69, '2021-05-31', '19:33:00', 'Pendiente', 1, 1),
(70, '2021-05-31', '21:34:00', 'Pendiente', 13, 2),
(71, '2021-05-31', '17:40:00', 'Pendiente', 1, 1),
(72, '2021-05-31', '21:42:00', 'Pendiente', 1, 1),
(73, '2021-05-31', '17:44:00', 'Pendiente', 1, 1),
(74, '2021-05-31', '17:45:00', 'Pendiente', 1, 1),
(75, '2021-05-31', '17:47:00', 'Pendiente', 1, 1),
(76, '2021-05-31', '18:48:00', 'Pendiente', 1, 1),
(77, '2021-05-31', '17:49:00', 'Pendiente', 1, 1),
(78, '2021-05-31', '17:50:00', 'Pendiente', 1, 1),
(79, '2021-05-31', '17:51:00', 'Pendiente', 1, 1),
(80, '2021-05-31', '17:55:00', 'Pendiente', 1, 1),
(81, '2021-05-31', '18:56:00', 'Pendiente', 1, 1),
(82, '2021-05-31', '17:58:00', 'Pendiente', 1, 1),
(83, '2021-05-31', '17:59:00', 'Pendiente', 1, 1),
(84, '2021-05-31', '19:00:00', 'Pendiente', 1, 1),
(85, '2021-05-31', '18:02:00', 'Pendiente', 13, 2),
(86, '2021-06-01', '15:23:00', 'Pendiente', 1, 1),
(87, '2021-06-01', '15:23:00', 'Pendiente', 1, 1),
(88, '2021-06-01', '16:23:00', 'Pendiente', 1, 1),
(89, '2021-06-01', '17:27:00', 'Pendiente', 1, 1),
(90, '2021-06-01', '18:27:00', 'Pendiente', 1, 1),
(91, '2021-06-01', '19:27:00', 'Pendiente', 1, 1),
(92, '2021-06-01', '20:27:00', 'Pendiente', 1, 1),
(93, '2021-06-01', '21:27:00', 'Pendiente', 1, 1),
(94, '2021-06-01', '21:27:00', 'Pendiente', 12, 2),
(95, '2021-06-01', '21:27:00', 'Pendiente', 13, 2),
(96, '2021-06-01', '15:32:00', 'Pendiente', 1, 1),
(97, '2021-06-01', '15:32:00', 'Pendiente', 13, 2),
(98, '2021-06-01', '15:32:00', 'Pendiente', 12, 2),
(99, '2021-08-01', '14:10:00', 'Completado', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `controlhorariosempleado`
--

CREATE TABLE `controlhorariosempleado` (
  `id_Empleado` int(11) NOT NULL,
  `id_Horario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `controlhorariosmedico`
--

CREATE TABLE `controlhorariosmedico` (
  `id_Medico` int(11) NOT NULL,
  `id_Horario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `controlhorariosmedico`
--

INSERT INTO `controlhorariosmedico` (`id_Medico`, `id_Horario`) VALUES
(1, 4),
(2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `id_Diagnostico` int(11) NOT NULL,
  `id_Cita` int(11) NOT NULL,
  `Detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diagnosticos`
--

INSERT INTO `diagnosticos` (`id_Diagnostico`, `id_Cita`, `Detalle`) VALUES
(1, 6, 'Que siga adelante no hay pedo'),
(2, 15, 'Sigue bueno'),
(8, 14, 'FFF'),
(13, 14, 'El paciente presenta un mejoría con respecto a la cita pasada hace 15 días'),
(14, 14, 'Aiuda'),
(15, 16, ''),
(16, 17, 'XD'),
(17, 18, 'xdd'),
(18, 28, 'Tiene demasiada azucar'),
(19, 31, 'Hay una mejoria en su problema'),
(20, 37, 'Todo bien con respecto a la cita anterior'),
(21, 39, 'Todo bien por el momento'),
(22, 40, 'buena reaccion al tratamiento'),
(23, 41, 'Va muy bien'),
(24, 42, 'Buenardo'),
(25, 42, 'Buenardo'),
(26, 43, 'dsafasdf'),
(27, 44, 'gsfd'),
(28, 46, 'bgcgfbgfj'),
(29, 47, 'Todo normal por el momento'),
(30, 99, 'Excelente');

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id_Empleado` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Edad` varchar(5) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `TelefonoSecundario` varchar(15) DEFAULT NULL,
  `DUI` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `id_Especialidad` int(11) NOT NULL,
  `Nombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `expedientes`
--

CREATE TABLE `expedientes` (
  `id_Expediente` int(11) NOT NULL,
  `id_TipoSangre` int(11) NOT NULL,
  `FechaCreacion` date NOT NULL,
  `Peso` varchar(10) NOT NULL,
  `Ocupacion` varchar(20) DEFAULT NULL,
  `id_Paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expedientes`
--

INSERT INTO `expedientes` (`id_Expediente`, `id_TipoSangre`, `FechaCreacion`, `Peso`, `Ocupacion`, `id_Paciente`) VALUES
(14, 2, '2021-03-16', '160', 'motorista', 1),
(15, 1, '2021-03-16', '150', 'Policia', 2),
(17, 4, '2021-03-16', '120', 'Profesor', 3),
(18, 6, '2021-03-16', '120', 'trailera', 4),
(22, 1, '2021-05-04', '25', 'Nini', 12),
(23, 1, '2021-05-04', '120', 'Call center', 13),
(24, 2, '2021-05-17', '150', 'Docente', 14);

-- --------------------------------------------------------

--
-- Table structure for table `grupossanguineos`
--

CREATE TABLE `grupossanguineos` (
  `id_TipoSangre` int(11) NOT NULL,
  `Nombre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grupossanguineos`
--

INSERT INTO `grupossanguineos` (`id_TipoSangre`, `Nombre`) VALUES
(1, 'O-'),
(2, 'O+'),
(3, 'A-'),
(4, 'A+'),
(5, 'B-'),
(6, 'B+'),
(7, 'AB-'),
(8, 'AB+');

-- --------------------------------------------------------

--
-- Table structure for table `horarios`
--

CREATE TABLE `horarios` (
  `id_Horario` int(11) NOT NULL,
  `Jornada` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `horarios`
--

INSERT INTO `horarios` (`id_Horario`, `Jornada`) VALUES
(4, '[{\"day\":0,\"periods\":[{\"start\":\"00:00\",\"end\":\"07:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":1,\"periods\":[{\"start\":\"07:30\",\"end\":\"14:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":2,\"periods\":[{\"start\":\"16:00\",\"end\":\"21:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"},{\"start\":\"00:00\",\"end\":\"08:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":3,\"periods\":[{\"start\":\"03:00\",\"end\":\"07:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"},{\"start\":\"18:30\",\"end\":\"22:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":4,\"periods\":[{\"start\":\"10:00\",\"end\":\"16:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":5,\"periods\":[{\"start\":\"17:30\",\"end\":\"00:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"},{\"start\":\"06:00\",\"end\":\"11:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":6,\"periods\":[{\"start\":\"01:30\",\"end\":\"07:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"},{\"start\":\"10:00\",\"end\":\"16:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]}]'),
(5, '{ \"mode\":\"read\", \"daysList\": [\n    \"Monday\",\n    \"Tuesday\",\n    \"Wednesday\",\n    \"Thursday\",\n    \"Friday\",\n    \"Saturday\",\n    \"Sunday\"\n  ], \"data\": [\n  {\n    \"day\": 0,\n    \"periods\": [\n      [\"00:00\", \"03:00\"]\n    ]\n  },\n  {\n    \"day\": 3,\n    \"periods\": [\n      {\n        \"start\": \"10:00\",\n        \"end\": \"12:00\",\n        \"title\": \"A black period\",\n        \"backgroundColor\": \"rgba(0, 0, 0, 0.5)\",\n        \"borderColor\":\"#000\",\n        \"textColor\": \"#fff\"\n      }\n    ]\n  }\n] }'),
(8, '[{\"day\":0,\"periods\":[{\"start\":\"00:00\",\"end\":\"03:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":1,\"periods\":[{\"start\":\"03:00\",\"end\":\"08:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":2,\"periods\":[]},{\"day\":3,\"periods\":[{\"start\":\"07:30\",\"end\":\"15:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":4,\"periods\":[]},{\"day\":5,\"periods\":[{\"start\":\"18:30\",\"end\":\"20:00\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]},{\"day\":6,\"periods\":[{\"start\":\"10:00\",\"end\":\"19:30\",\"title\":\"\",\"backgroundColor\":\"rgba(82, 155, 255, 0.5)\",\"borderColor\":\"rgb(42, 60, 255)\",\"textColor\":\"rgb(0, 0, 0)\"}]}]');

-- --------------------------------------------------------

--
-- Table structure for table `medicoespecialidad`
--

CREATE TABLE `medicoespecialidad` (
  `id_Medico` int(11) NOT NULL,
  `id_Especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicos`
--

CREATE TABLE `medicos` (
  `id_Medico` int(11) NOT NULL,
  `id_TipoSangre` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `DUI` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `TelefonoSecundario` varchar(15) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicos`
--

INSERT INTO `medicos` (`id_Medico`, `id_TipoSangre`, `Nombres`, `Apellidos`, `Direccion`, `DUI`, `Telefono`, `TelefonoSecundario`, `email`, `image`) VALUES
(1, 2, 'Juliano', 'Candray', 'Colonia miramonte', '057452365', '75121212', NULL, NULL, NULL),
(2, 6, 'Scarlett', 'johansson', 'San Miguel, Colonia Palacios', '65456131', '7977852', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id_Paciente` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Edad` varchar(5) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `TelefonoSecundario` varchar(15) DEFAULT NULL,
  `DUI` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`id_Paciente`, `Nombres`, `Apellidos`, `Edad`, `FechaNacimiento`, `Direccion`, `Telefono`, `TelefonoSecundario`, `DUI`) VALUES
(1, 'Luis Alfredo', 'Caballero Gonzalez', '22', '1998-05-22', 'Santiago de maria', '76501035', '26631043', '057100429'),
(2, 'Luis Alfredo', 'Caballero Gonzalez', '22', '1998-05-22', 'Santiago de marias', '76501035', '26631043', '057100429'),
(3, 'Roberto Arturo', 'Jimenez Jimenez', '22', '1998-04-05', 'Santiago de maria', '76501035', '26631043', '032153251'),
(4, 'Maria de los Angeles', 'Caballero Gonzalez', '15', '2005-09-04', 'Santiago de maria', '70251911', '26631043', '057100429'),
(12, 'Leonela', 'Candray', '22', '1998-05-05', 'Col montesori', '55555555', '555555', '55555555'),
(13, 'Georgina', 'Aguilares', '20', '2021-05-21', 'Col escalon', '7777777', '7777777', '77777777'),
(14, 'Lidia Concepcion ', 'Gonzalez de Caballero', '50', '1971-03-04', 'Col nueve de noviembre ', '8888888', '898792323', '057100428');

-- --------------------------------------------------------

--
-- Table structure for table `padecimientos`
--

CREATE TABLE `padecimientos` (
  `id_Expediente` int(11) NOT NULL,
  `Padecimientos` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `padecimientos`
--

INSERT INTO `padecimientos` (`id_Expediente`, `Padecimientos`) VALUES
(14, 'diabetes,hipertension,gastritis'),
(15, 'diabetes,hipertension'),
(17, 'dolor de cabeza,hipertension,gastritis'),
(18, 'dolor de cabeza,hipertension,gastritis'),
(22, 'a,b,c'),
(23, 'Hipertiroidismo,Ansiedad'),
(24, 'Padecimiento1,Padecimiento2');

-- --------------------------------------------------------

--
-- Table structure for table `personalauxiliar`
--

CREATE TABLE `personalauxiliar` (
  `id_auxiliar` int(11) NOT NULL,
  `id_TipoSangre` int(11) NOT NULL,
  `Nombres` varchar(150) NOT NULL,
  `Apellidos` varchar(150) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `DUI` varchar(14) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `TelefonoSecundario` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personalauxiliar`
--

INSERT INTO `personalauxiliar` (`id_auxiliar`, `id_TipoSangre`, `Nombres`, `Apellidos`, `Direccion`, `DUI`, `Telefono`, `TelefonoSecundario`, `email`) VALUES
(1, 1, 'Marcela Guadalupe', 'Santos', 'Col. el guarumal pasaje 1', '052189628', '71717171', '', 'mguadalupe@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tratamientomedico`
--

CREATE TABLE `tratamientomedico` (
  `id_TratamientoMedico` int(11) NOT NULL,
  `id_Diagnostico` int(11) NOT NULL,
  `Medicamentos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DuracionTratamiento` varchar(10) NOT NULL,
  `id_Paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tratamientomedico`
--

INSERT INTO `tratamientomedico` (`id_TratamientoMedico`, `id_Diagnostico`, `Medicamentos`, `DuracionTratamiento`, `id_Paciente`) VALUES
(3, 1, '[{\"nombre\":\"Chaparro\"},{\"nombre\":\"Omeprazole\"}]', 'Permanente', 2),
(4, 8, '[{\"nombre\":\"Acetaminofen\"},{\"nombre\":\"Omeprazol\"}]', '15 dias', 3),
(5, 18, '[{\"nombre\":\"med 1 80mg\"},{\"nombre\":\" med2 100mg\"}]', 'permanente', 4),
(6, 20, '[{\"nombre\":\"medicamento1\"},{\"nombre\":\"Medicamento 2\"}]', '30 dias', 14),
(7, 21, '[{\"nombre\":\"Medicamento 1 80mg\"},{\"nombre\":\" Medicamento 2 100mg\"}]', '15 dias', 12),
(8, 23, '[{\"nombre\":\"med1 80mg\"},{\"nombre\":\"med 2 80mg\"}]', '2 meses', 13),
(9, 29, '[{\"nombre\":\"Medicamento 1 80MG por la noche\"},{\"nombre\":\" Medicamento 2 80mg por el día\"}]', '30 Dias', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_Usuario` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Rol` varchar(10) NOT NULL,
  `Permisos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_Usuario`, `Username`, `Password`, `Rol`, `Permisos`) VALUES
(1, 'caballero', '$2b$12$0YVoMERJs4TLqAge/cAgCOWjXQgXHgC6/GfMXKjWUsVMTAKPV9Tmi', 'Medico', 'R,W,C,U'),
(4, 'MarcelaG', '$2b$12$zFPTxLEnfDs3kWX/gI3ZXO4J4WCdx9mtkNl.Rzbn74TQoWN.SI8lm', 'Recepcion', 'R,C,U,D'),
(5, 'Scarlett', '$2b$12$IYWQMuGNap.f4z9UiqeK2.la/jJE.djpSAq4pSd0QuapdTGSZV7PS', 'Medico', 'R,C,U,D');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios_auxiliar`
--

CREATE TABLE `usuarios_auxiliar` (
  `id_auxiliar` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios_auxiliar`
--

INSERT INTO `usuarios_auxiliar` (`id_auxiliar`, `id_usuario`) VALUES
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios_medicos`
--

CREATE TABLE `usuarios_medicos` (
  `id_Medico` int(11) NOT NULL,
  `id_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios_medicos`
--

INSERT INTO `usuarios_medicos` (`id_Medico`, `id_Usuario`) VALUES
(1, 1),
(2, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alergias`
--
ALTER TABLE `alergias`
  ADD KEY `id_Expediente` (`id_Expediente`);

--
-- Indexes for table `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id_Cargo`);

--
-- Indexes for table `cargosempleados`
--
ALTER TABLE `cargosempleados`
  ADD PRIMARY KEY (`id_Cargo`),
  ADD KEY `id_Empleado` (`id_Empleado`);

--
-- Indexes for table `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_Cita`),
  ADD KEY `id_Paciente` (`id_Paciente`),
  ADD KEY `id_Medico` (`id_Medico`);

--
-- Indexes for table `controlhorariosempleado`
--
ALTER TABLE `controlhorariosempleado`
  ADD PRIMARY KEY (`id_Empleado`),
  ADD KEY `id_Horario` (`id_Horario`);

--
-- Indexes for table `controlhorariosmedico`
--
ALTER TABLE `controlhorariosmedico`
  ADD PRIMARY KEY (`id_Medico`),
  ADD KEY `id_Horario` (`id_Horario`);

--
-- Indexes for table `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD PRIMARY KEY (`id_Diagnostico`),
  ADD KEY `id_Cita` (`id_Cita`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_Empleado`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_Especialidad`);

--
-- Indexes for table `expedientes`
--
ALTER TABLE `expedientes`
  ADD PRIMARY KEY (`id_Expediente`),
  ADD KEY `id_Paciente` (`id_Paciente`),
  ADD KEY `fk_tiposangre_exp` (`id_TipoSangre`);

--
-- Indexes for table `grupossanguineos`
--
ALTER TABLE `grupossanguineos`
  ADD PRIMARY KEY (`id_TipoSangre`);

--
-- Indexes for table `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_Horario`);

--
-- Indexes for table `medicoespecialidad`
--
ALTER TABLE `medicoespecialidad`
  ADD PRIMARY KEY (`id_Medico`),
  ADD KEY `id_Especialidad` (`id_Especialidad`);

--
-- Indexes for table `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_Medico`),
  ADD KEY `fk_tiposangre` (`id_TipoSangre`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_Paciente`);

--
-- Indexes for table `padecimientos`
--
ALTER TABLE `padecimientos`
  ADD KEY `id_Expediente` (`id_Expediente`);

--
-- Indexes for table `personalauxiliar`
--
ALTER TABLE `personalauxiliar`
  ADD PRIMARY KEY (`id_auxiliar`),
  ADD KEY `id_TipoSangre` (`id_TipoSangre`);

--
-- Indexes for table `tratamientomedico`
--
ALTER TABLE `tratamientomedico`
  ADD PRIMARY KEY (`id_TratamientoMedico`),
  ADD KEY `id_Diagnostico` (`id_Diagnostico`),
  ADD KEY `id_Paciente` (`id_Paciente`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_Usuario`);

--
-- Indexes for table `usuarios_auxiliar`
--
ALTER TABLE `usuarios_auxiliar`
  ADD KEY `id_auxiliar` (`id_auxiliar`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `usuarios_medicos`
--
ALTER TABLE `usuarios_medicos`
  ADD KEY `id_Medico` (`id_Medico`),
  ADD KEY `id_Usuario` (`id_Usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id_Cargo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citas`
--
ALTER TABLE `citas`
  MODIFY `id_Cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `diagnosticos`
--
ALTER TABLE `diagnosticos`
  MODIFY `id_Diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_Empleado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_Especialidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expedientes`
--
ALTER TABLE `expedientes`
  MODIFY `id_Expediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `grupossanguineos`
--
ALTER TABLE `grupossanguineos`
  MODIFY `id_TipoSangre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_Horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_Medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_Paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personalauxiliar`
--
ALTER TABLE `personalauxiliar`
  MODIFY `id_auxiliar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tratamientomedico`
--
ALTER TABLE `tratamientomedico`
  MODIFY `id_TratamientoMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alergias`
--
ALTER TABLE `alergias`
  ADD CONSTRAINT `alergias_ibfk_1` FOREIGN KEY (`id_Expediente`) REFERENCES `expedientes` (`id_Expediente`);

--
-- Constraints for table `cargosempleados`
--
ALTER TABLE `cargosempleados`
  ADD CONSTRAINT `cargosempleados_ibfk_1` FOREIGN KEY (`id_Empleado`) REFERENCES `empleados` (`id_Empleado`),
  ADD CONSTRAINT `cargosempleados_ibfk_2` FOREIGN KEY (`id_Cargo`) REFERENCES `cargos` (`id_Cargo`);

--
-- Constraints for table `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_Medico`) REFERENCES `medicos` (`id_Medico`);

--
-- Constraints for table `controlhorariosempleado`
--
ALTER TABLE `controlhorariosempleado`
  ADD CONSTRAINT `controlhorariosempleado_ibfk_1` FOREIGN KEY (`id_Empleado`) REFERENCES `empleados` (`id_Empleado`),
  ADD CONSTRAINT `controlhorariosempleado_ibfk_2` FOREIGN KEY (`id_Horario`) REFERENCES `horarios` (`id_Horario`);

--
-- Constraints for table `controlhorariosmedico`
--
ALTER TABLE `controlhorariosmedico`
  ADD CONSTRAINT `controlhorariosmedico_ibfk_1` FOREIGN KEY (`id_Medico`) REFERENCES `medicos` (`id_Medico`),
  ADD CONSTRAINT `controlhorariosmedico_ibfk_2` FOREIGN KEY (`id_Horario`) REFERENCES `horarios` (`id_Horario`);

--
-- Constraints for table `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD CONSTRAINT `diagnosticos_ibfk_1` FOREIGN KEY (`id_Cita`) REFERENCES `citas` (`id_Cita`);

--
-- Constraints for table `expedientes`
--
ALTER TABLE `expedientes`
  ADD CONSTRAINT `expedientes_ibfk_1` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`),
  ADD CONSTRAINT `fk_tiposangre_exp` FOREIGN KEY (`id_TipoSangre`) REFERENCES `grupossanguineos` (`id_TipoSangre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medicoespecialidad`
--
ALTER TABLE `medicoespecialidad`
  ADD CONSTRAINT `medicoespecialidad_ibfk_1` FOREIGN KEY (`id_Medico`) REFERENCES `medicos` (`id_Medico`),
  ADD CONSTRAINT `medicoespecialidad_ibfk_2` FOREIGN KEY (`id_Especialidad`) REFERENCES `especialidades` (`id_Especialidad`);

--
-- Constraints for table `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `fk_tiposangre` FOREIGN KEY (`id_TipoSangre`) REFERENCES `grupossanguineos` (`id_TipoSangre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `padecimientos`
--
ALTER TABLE `padecimientos`
  ADD CONSTRAINT `padecimientos_ibfk_1` FOREIGN KEY (`id_Expediente`) REFERENCES `expedientes` (`id_Expediente`);

--
-- Constraints for table `personalauxiliar`
--
ALTER TABLE `personalauxiliar`
  ADD CONSTRAINT `personalAuxiliar_ibfk_1` FOREIGN KEY (`id_TipoSangre`) REFERENCES `grupossanguineos` (`id_TipoSangre`);

--
-- Constraints for table `tratamientomedico`
--
ALTER TABLE `tratamientomedico`
  ADD CONSTRAINT `tratamientomedico_ibfk_1` FOREIGN KEY (`id_Diagnostico`) REFERENCES `diagnosticos` (`id_Diagnostico`),
  ADD CONSTRAINT `tratamientomedico_ibfk_2` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`);

--
-- Constraints for table `usuarios_auxiliar`
--
ALTER TABLE `usuarios_auxiliar`
  ADD CONSTRAINT `usuarios_auxiliar_ibfk_1` FOREIGN KEY (`id_auxiliar`) REFERENCES `personalauxiliar` (`id_auxiliar`),
  ADD CONSTRAINT `usuarios_auxiliar_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`);

--
-- Constraints for table `usuarios_medicos`
--
ALTER TABLE `usuarios_medicos`
  ADD CONSTRAINT `usuarios_medicos_ibfk_1` FOREIGN KEY (`id_Medico`) REFERENCES `medicos` (`id_Medico`),
  ADD CONSTRAINT `usuarios_medicos_ibfk_2` FOREIGN KEY (`id_Usuario`) REFERENCES `usuarios` (`id_Usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
