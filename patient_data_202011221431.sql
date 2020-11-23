-- "AmbulanceDB".patient_data definition

-- Drop table

-- DROP TABLE "AmbulanceDB".patient_data;

CREATE TABLE "AmbulanceDB".patient_data (
	id int4 NOT NULL,
	lastname varchar(50) NOT NULL,
	firstname varchar(30) NOT NULL,
	date_of_birth date NOT NULL,
	phone_number varchar NULL,
	email varchar NOT NULL,
	illness_desc varchar(100) NULL,
	time_of_arrival date NOT NULL,
	CONSTRAINT patient_id PRIMARY KEY (id)
);

INSERT INTO "AmbulanceDB".patient_data (id,lastname,firstname,date_of_birth,phone_number,email,illness_desc,time_of_arrival) VALUES
	 (1,'Lancaric','Peter','1996-09-02',NULL,'pet.lancaric@gmail.com','headache','2020-11-21');