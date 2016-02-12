create database reddit;
use reddit;
create table users(`id` int auto_increment primary key, `email` varchar(255), `screenName` varchar(255), `password` varchar(40), `createdAt` timestamp, `updatedAt` timestamp);
create table posts(`id` int auto_increment primary key, `url` varchar(255), `title` varchar(100), `userId` int, `createdAt` timestamp, `updatedAt` timestamp);
create table votes(`id` int auto_increment primary key, `userId` int, `postsId` int, `upDown` boolean, `createdAt timestamp, `updatedAt` timestamp);