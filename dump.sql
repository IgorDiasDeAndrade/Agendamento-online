create database agendamentoonline

create table "account_types" (
	id serial primary key,
	name text not null
)

INSERT INTO account_types (name) 
VALUES ('Colaborador'),
('Administrador'),
('Visitante'),
('Demanda')

create table "users" (
  id serial primary key,
  name text not null,
  username text not null UNIQUE,
  password text not null,
  email text not null UNIQUE,
  phone text not null,
  account_type_id integer references account_types(id)
)

create table "patients" (
  id serial primary key,
  cpf text not null unique,
  name text not null,
  birthday date not null,
  mothers_name text,
  fathers_name text,
  contact_number_1 text not null,
  contact_number_2 text,
  obs text
  user_id integer references users(id)
)

create table "addresses" (
  id serial primary key,
  zip_code text,
  address text,
  complement text,
  neighborhood text,
  location text,
  uf char(2),
  patient_id integer unique references patients(id)
)

create table "schedules" (
  id serial primary key,
  name text not null,
  schedule_date timestamp not null,
  status boolean not null,
  amount_vacancies integer,
  vacancies_inserts integer,
  patient_id integer references patients(id)
)