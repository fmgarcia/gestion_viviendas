-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2025 a las 15:55:32
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_viviendas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios`
--

CREATE TABLE `propietarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `propietarios`
--

INSERT INTO `propietarios` (`id`, `nombre`, `email`, `telefono`, `direccion`, `created_at`, `updated_at`) VALUES
(1, 'Inmobiliaria Sol SL', 'contacto@sol.com', '600111222', 'Calle Mayor 1, Ciudad', '2025-10-29 14:47:20', NULL),
(2, 'Particular García', 'fran.garcia@example.com', '600999888', 'Av. Central 10', '2025-10-29 14:47:20', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viviendas`
--

CREATE TABLE `viviendas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `referencia` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Código de referencia interno / externa (opcional)',
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo_postal` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` enum('piso','chalet','adosado','estudio','atico','local') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'piso',
  `habitaciones` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `banos` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `metros_cuadrados` int(10) UNSIGNED DEFAULT NULL COMMENT 'Superficie útil aproximada (m²)',
  `ano_construccion` year(4) DEFAULT NULL,
  `planta` smallint(6) DEFAULT NULL COMMENT 'Planta en caso de edificio (ej. 0 = planta baja)',
  `piscina` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=no, 1=si',
  `garaje` tinyint(1) NOT NULL DEFAULT 0,
  `trastero` tinyint(1) NOT NULL DEFAULT 0,
  `terraza` tinyint(1) NOT NULL DEFAULT 0,
  `ascensor` tinyint(1) NOT NULL DEFAULT 0,
  `calefaccion` enum('ninguna','central','individual_gas','individual_electrica','otro') COLLATE utf8mb4_unicode_ci DEFAULT 'ninguna',
  `precio` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'En la moneda indicada',
  `moneda` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EUR',
  `tipo_operacion` enum('venta','alquiler','venta/alquiler') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'venta',
  `estado` enum('disponible','reservado','vendido','alquilado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disponible',
  `lat` decimal(10,7) DEFAULT NULL,
  `lng` decimal(10,7) DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen_principal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ruta o URL a imagen principal',
  `propietario_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `modification_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `viviendas`
--

INSERT INTO `viviendas` (`id`, `referencia`, `direccion`, `ciudad`, `provincia`, `codigo_postal`, `tipo`, `habitaciones`, `banos`, `metros_cuadrados`, `ano_construccion`, `planta`, `piscina`, `garaje`, `trastero`, `terraza`, `ascensor`, `calefaccion`, `precio`, `moneda`, `tipo_operacion`, `estado`, `lat`, `lng`, `descripcion`, `imagen_principal`, `propietario_id`, `created_at`, `updated_at`, `modification_note`) VALUES
(1, 'REF-0001', 'C/ Gran Vía 12, 3ºA', 'Alicante', 'Alicante', '03001', 'piso', 3, 2, 95, 2005, 3, 0, 1, 1, 1, 1, 'individual_gas', '220000.00', 'EUR', 'venta', 'disponible', '38.3452000', '-0.4810000', 'Piso luminoso, cerca del centro, buenas comunicaciones.', NULL, 2, '2025-10-29 14:47:21', NULL, NULL),
(2, 'REF-0002', 'Urb. Las Palmeras, Calle Lago 5', 'Benidorm', 'Alicante', '03501', 'chalet', 4, 3, 180, 1998, NULL, 1, 1, 1, 0, 0, 'central', '480000.00', 'EUR', 'venta', 'disponible', '38.5406000', '-0.1223000', 'Chalet independiente con jardín y piscina privada.', NULL, 1, '2025-10-29 14:47:21', NULL, NULL),
(3, 'REF-0003', 'C/ Puerto, 6, 1º', 'Alicante', 'Alicante', '03002', 'estudio', 0, 1, 30, 2010, 1, 0, 0, 0, 1, 1, 'individual_electrica', '650.00', 'EUR', 'alquiler', 'disponible', '38.3459000', '-0.4816000', 'Estudio reformado, amueblado, ideal para estudiante.', NULL, 2, '2025-10-29 14:47:21', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propietario_id` (`propietario_id`),
  ADD KEY `idx_ciudad` (`ciudad`),
  ADD KEY `idx_provincia` (`provincia`),
  ADD KEY `idx_tipo_operacion` (`tipo_operacion`),
  ADD KEY `idx_precio` (`precio`),
  ADD KEY `idx_habitaciones` (`habitaciones`),
  ADD KEY `idx_estado` (`estado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `viviendas`
--
ALTER TABLE `viviendas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `viviendas`
--
ALTER TABLE `viviendas`
  ADD CONSTRAINT `viviendas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
