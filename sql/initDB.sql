create database if not exists ExamDB;
use ExamDB;

create or replace table WordTab(
    Id integer not null auto_increment primary key,
    Word TEXT(500) not null,
    Translation TEXT(500) not null,
    Procent FLOAT null,
    TotalTest integer not null default 0,
    TotalWin integer not null default 0
);

create user if not exists 'UserExamDB'@localhost identified by '1234';

grant all
    on WordTab
    to 'UserExamDB'@localhost;


FLUSH PRIVILEGES;

insert into WordTab(Word,Translation) values("Hello","Bonjour");
insert into WordTab(Word,Translation) values("Plant","Plante");