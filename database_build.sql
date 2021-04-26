-- public.city_table definition

-- Drop table

-- DROP TABLE public.city_table;

CREATE TABLE public.city_table (
	psc varchar(5) NOT NULL,
	"name" varchar(60) NOT NULL,
	CONSTRAINT city_table_pk PRIMARY KEY (psc)
);


-- public.user_data definition

-- Drop table

-- DROP TABLE public.user_data;

CREATE TABLE public.user_data (
	user_id int4 NOT NULL,
	user_name varchar(60) NOT NULL,
	user_email varchar(100) NOT NULL,
	user_firstname varchar(60) NOT NULL,
	user_lastname varchar(60) NOT NULL,
	user_birthdate date NOT NULL,
	user_password varchar NOT NULL,
	"role" int4 NOT NULL,
	CONSTRAINT user_data_pk PRIMARY KEY (user_id)
);


-- public.doctor_data definition

-- Drop table

-- DROP TABLE public.doctor_data;

CREATE TABLE public.doctor_data (
	doctor_number int4 NOT NULL,
	ambulance_adress_street varchar(30) NOT NULL,
	ambulance_adress_number int4 NOT NULL,
	psc varchar(5) NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT doctor_data_pk PRIMARY KEY (doctor_number),
	CONSTRAINT doctor_data_fk FOREIGN KEY (user_id) REFERENCES user_data(user_id)
);


-- public.employer_data definition

-- Drop table

-- DROP TABLE public.employer_data;

CREATE TABLE public.employer_data (
	company_id int4 NOT NULL,
	"name" varchar(100) NOT NULL,
	adress_street varchar(60) NOT NULL,
	adress_number int4 NOT NULL,
	psc varchar(5) NOT NULL,
	CONSTRAINT employer_data_pk PRIMARY KEY (company_id),
	CONSTRAINT employer_data_fk FOREIGN KEY (psc) REFERENCES city_table(psc)
);


-- public.patient_data definition

-- Drop table

-- DROP TABLE public.patient_data;

CREATE TABLE public.patient_data (
	birth_number varchar NOT NULL,
	date_of_birth date NOT NULL,
	email varchar(255) NOT NULL,
	firstname varchar(255) NOT NULL,
	ins_comp_num int4 NOT NULL,
	lastname varchar(255) NOT NULL,
	phone_number varchar(255) NOT NULL,
	street_name varchar(30) NOT NULL,
	street_number int4 NOT NULL,
	ins_rel varchar(100) NOT NULL,
	psc varchar(5) NOT NULL,
	id_employer int4 NOT NULL,
	CONSTRAINT patient_data_pk PRIMARY KEY (birth_number),
	CONSTRAINT patient_data_fk FOREIGN KEY (psc) REFERENCES city_table(psc),
	CONSTRAINT patient_data_fk_1 FOREIGN KEY (id_employer) REFERENCES employer_data(company_id)
);


-- public.pn_form_table definition

-- Drop table

-- DROP TABLE public.pn_form_table;

CREATE TABLE public.pn_form_table (
	id_form varchar(50) NOT NULL,
	temp_adress_street_name varchar(30) NULL,
	temp_adress_street_num int4 NULL,
	beginning_date date NOT NULL,
	end_date date NULL,
	diagnose_category int4 NOT NULL,
	diagnose_number int4 NOT NULL,
	end_diagnose int4 NULL,
	patient_birth_number varchar(10) NOT NULL,
	doctor_id int4 NOT NULL,
	temp_address_psc varchar(5) NULL,
	status int4 NULL,
	CONSTRAINT pn_form_table_pk PRIMARY KEY (id_form),
	CONSTRAINT pn_form_table_fk FOREIGN KEY (patient_birth_number) REFERENCES patient_data(birth_number)
);


-- public.psp_data definition

-- Drop table

-- DROP TABLE public.psp_data;

CREATE TABLE public.psp_data (
	employee_number varchar(30) NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT psp_data_pk PRIMARY KEY (employee_number),
	CONSTRAINT psp_data_fk FOREIGN KEY (user_id) REFERENCES user_data(user_id)
);


-- public.files_data definition

-- Drop table

-- DROP TABLE public.files_data;

CREATE TABLE public.files_data (
	id varchar(50) NOT NULL,
	"data" bytea NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL,
	id_form varchar(50) NOT NULL,
	patient_birth_number varchar(10) NOT NULL,
	CONSTRAINT files_data_pk PRIMARY KEY (id),
	CONSTRAINT files_data_fk FOREIGN KEY (id_form) REFERENCES pn_form_table(id_form)
);