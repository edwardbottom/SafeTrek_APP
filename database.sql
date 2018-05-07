create database SafeTrek;

create table users(username varchar(50) not null,
 password_hash varchar(70) not null,
 account_type varchar(10) not null, 
 home_address varchar(100) not null,
 phone_number varchar(20) not null,
 primary key(username));

create table children(child varchar(50) not null,
 parent varchar(50) not null);

alter table children ADD constraint foreign key(child) references users(username);

alter table children ADD constraint foreign key(parent) references users(username);

create table location(child varchar(50) not null, 
	latitude Decimal(8,4), 
	longitude Decimal(8,4),
	location varchar(50), 
	foreign key(child) references users(username));
