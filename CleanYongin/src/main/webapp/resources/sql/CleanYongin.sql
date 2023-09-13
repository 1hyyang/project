-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.car
(
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL,
    car_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    car_area character varying(15) NOT NULL,
    CONSTRAINT car_pkey PRIMARY KEY (car_num)
);

CREATE TABLE IF NOT EXISTS public.course
(
    geom geometry NOT NULL,
    date character varying(20) COLLATE pg_catalog."default" NOT NULL,
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS public.points
(
    lon character varying(100) COLLATE pg_catalog."default" NOT NULL,
    lat character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "time" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    geom geometry NOT NULL,
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL,
    noise integer NOT NULL,
    rpm integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.temp_gps
(
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL,
    date character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "time" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    longitude character varying(100) COLLATE pg_catalog."default" NOT NULL,
    latitude character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT gps_pkey PRIMARY KEY (date, "time")
);

CREATE TABLE IF NOT EXISTS public.temp_noise
(
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL,
    date character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "time" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    noise integer NOT NULL,
    CONSTRAINT noise_pkey PRIMARY KEY (date, "time")
);

CREATE TABLE IF NOT EXISTS public.temp_rpm
(
    car_num character varying(15) COLLATE pg_catalog."default" NOT NULL,
    date character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "time" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    rpm integer NOT NULL,
    CONSTRAINT rpm_pkey PRIMARY KEY (date, "time")
);

CREATE TABLE IF NOT EXISTS public.tbl_user
(
    id character varying(20) NOT NULL,
    pw character varying(20) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.course
    ADD CONSTRAINT course_fkey FOREIGN KEY (car_num)
    REFERENCES public.car (car_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.points
    ADD CONSTRAINT points_fkey FOREIGN KEY (car_num)
    REFERENCES public.car (car_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.temp_gps
    ADD CONSTRAINT gps_fkey FOREIGN KEY (car_num)
    REFERENCES public.car (car_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.temp_noise
    ADD CONSTRAINT noise_fkey FOREIGN KEY (car_num)
    REFERENCES public.car (car_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.temp_rpm
    ADD CONSTRAINT rpm_fkey FOREIGN KEY (car_num)
    REFERENCES public.car (car_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

END;