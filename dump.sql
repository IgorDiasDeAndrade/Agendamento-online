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

CREATE TABLE backoffice (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE clients (
  id serial primary key,
  cnpj text not null,
  legal_name text not null,
  trade_name text,
  type text,
  establishment_date date,
  registration_status text,
  share_capital numeric,
  legal_nature text,
  is_mei boolean,
  phone text,
  email text,
  password text not null,
  shareholder_structure text,
  main_activity text,
  secondary_activities text[]
);

create table "users" (
  id serial primary key,
  name text not null,
  username text not null UNIQUE,
  password text not null,
  email text not null UNIQUE,
  phone text not null,
  account_type_id integer references account_types(id)
  client_id integer references clients(id)
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
  number text,
  uf char(2),
  patient_id integer unique references patients(id)
  client_id integer unique references clients(id)
)

CREATE TABLE "agendas" (
  agenda_id SERIAL PRIMARY KEY,
  agenda_name VARCHAR(20),
  agenda_type integer,
  procedure_type VARCHAR(50),
  start_time TIME,
  end_time TIME,
  date DATE,
  slots_available integer not null,
  additional_slots integer not null,
  is_active boolean
  user_id integer references users(id)
);

CREATE TABLE agenda_patient (
  id SERIAL PRIMARY KEY,
  agenda_id INT REFERENCES agendas(agenda_id),
  patient_id INT REFERENCES patients(id),
  appointment_time TIME,
  presence BOOLEAN DEFAULT FALSE
);
