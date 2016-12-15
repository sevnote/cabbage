/*
 Navicat Premium Data Transfer

 Source Server         : 123.59.150.43
 Source Server Type    : MySQL
 Source Server Version : 50173
 Source Host           : 123.59.150.43
 Source Database       : cabbage

 Target Server Type    : MySQL
 Target Server Version : 50173
 File Encoding         : utf-8

 Date: 12/15/2016 14:43:45 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `crontab`
-- ----------------------------
DROP TABLE IF EXISTS `crontab`;
CREATE TABLE `crontab` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `ip` varchar(30) DEFAULT NULL,
  `command` varchar(255) DEFAULT NULL,
  `schedule` varchar(50) DEFAULT NULL,
  `minute` varchar(50) DEFAULT NULL,
  `hour` varchar(50) DEFAULT NULL,
  `dom` varchar(50) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `dow` varchar(50) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `render` varchar(255) DEFAULT NULL,
  `isValid` varchar(20) DEFAULT NULL,
  `createTime` varchar(30) DEFAULT NULL,
  `updateTime` varchar(30) DEFAULT NULL,
  `owner` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq` (`ip`,`command`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
