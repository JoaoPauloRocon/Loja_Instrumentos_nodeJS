/*
SQLyog Community Edition- MySQL GUI v6.54
MySQL - 5.5.5-10.4.24-MariaDB : Database - lojainstrumentos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`lojainstrumentos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `lojainstrumentos`;

/*Table structure for table `adm` */

DROP TABLE IF EXISTS `adm`;

CREATE TABLE `adm` (
  `IDAdm` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `senha` int(11) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`IDAdm`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `adm` */

insert  into `adm`(`IDAdm`,`email`,`senha`,`nome`) values (1,'paulo@email.com',3521,'Paulo Cezar');

/*Table structure for table `carrinho` */

DROP TABLE IF EXISTS `carrinho`;

CREATE TABLE `carrinho` (
  `IDCliente` int(11) DEFAULT NULL,
  `IDProduto` int(11) DEFAULT NULL,
  `quantidade` int(255) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `carrinho` */

insert  into `carrinho`(`IDCliente`,`IDProduto`,`quantidade`) values (0,3,1),(0,2,1),(1,3,1),(1,1,1),(6,9,1),(2,12,1);

/*Table structure for table `clientes` */

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `IDCliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Sobrenome` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Senha` varchar(100) CHARACTER SET macce COLLATE macce_bin DEFAULT NULL,
  PRIMARY KEY (`IDCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `clientes` */

insert  into `clientes`(`IDCliente`,`Nome`,`Sobrenome`,`Email`,`Senha`) values (2,'João','Silva','joao@email.com','123456'),(3,'Luiza','Klug','luizao@email.com','123456'),(4,'Giulia','Lopes','giulia@email.com','123456'),(5,'Jovani','Rocon','jovanirocon@gmail.com','123456'),(6,'rick','gutler','rick@gmail.com','123456'),(7,'maycon','guedes','maycon@gmail.com','123456');

/*Table structure for table `itenspedidos` */

DROP TABLE IF EXISTS `itenspedidos`;

CREATE TABLE `itenspedidos` (
  `IDPedido` int(11) NOT NULL,
  `IDProduto` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `itenspedidos` */

insert  into `itenspedidos`(`IDPedido`,`IDProduto`,`quantidade`) values (75,1,1),(75,5,1),(76,2,1),(76,1,1),(77,2,1),(78,2,1),(79,2,1),(80,3,1),(81,6,3),(81,2,1),(82,1,1),(82,9,1),(83,1,1),(83,10,1),(84,8,1),(84,10,2),(85,10,1),(85,11,1);

/*Table structure for table `pedidos` */

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `IDPedido` int(11) NOT NULL AUTO_INCREMENT,
  `IDCliente` int(11) NOT NULL,
  `data_pedido` date DEFAULT NULL,
  `valor_total` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pedidos` */

insert  into `pedidos`(`IDPedido`,`IDCliente`,`data_pedido`,`valor_total`) values (75,5,'2023-12-10',4200),(76,2,'2023-12-10',1200),(77,2,'2023-12-10',1000),(78,2,'2023-12-10',1000),(79,2,'2023-12-10',1000),(80,2,'2023-12-10',2000),(81,3,'2023-12-10',19000),(82,6,'2023-12-11',6200),(83,2,'2023-12-11',1200),(84,7,'2023-12-11',8000),(85,2,'2023-12-11',1200);

/*Table structure for table `produtos` */

DROP TABLE IF EXISTS `produtos`;

CREATE TABLE `produtos` (
  `IDProduto` int(11) NOT NULL AUTO_INCREMENT,
  `NomeProduto` varchar(100) DEFAULT NULL,
  `TipoInstrumento` varchar(100) DEFAULT NULL,
  `Marca` varchar(100) DEFAULT NULL,
  `Preco` decimal(10,2) DEFAULT NULL,
  `QuantidadeEstoque` int(11) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`IDProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `produtos` */

insert  into `produtos`(`IDProduto`,`NomeProduto`,`TipoInstrumento`,`Marca`,`Preco`,`QuantidadeEstoque`,`img`) values (1,'Pandeiro','Percurssão','Mrv','200.00',2,NULL),(10,'Violao Gianini','corda','rozini','1000.00',7,NULL),(11,'Salgado','Sopro','Yamaha','200.00',7,NULL),(12,'Guitarra','corda','Gibson','50000.00',3,'1702299186295-guitarra.jpeg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
