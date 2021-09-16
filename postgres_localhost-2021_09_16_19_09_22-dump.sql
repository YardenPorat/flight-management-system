--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: sp_delete_airline(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM airlines
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_airline(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_all(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_all()
    LANGUAGE plpgsql
    AS $$
BEGIN
            TRUNCATE airlines RESTART IDENTITY CASCADE;
            TRUNCATE countries RESTART IDENTITY CASCADE;
            TRUNCATE customers RESTART IDENTITY CASCADE;
            TRUNCATE flights RESTART IDENTITY CASCADE;
            TRUNCATE tickets RESTART IDENTITY CASCADE;
            TRUNCATE users RESTART IDENTITY CASCADE;
        END;
$$;


ALTER PROCEDURE public.sp_delete_all() OWNER TO postgres;

--
-- Name: sp_delete_country(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_country(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM countries
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_country(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customer(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM customers
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_customer(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flight(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flight(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM flights
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_flight(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_ticket(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_ticket(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_ticket(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_user(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM users
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_user(_id bigint) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airlines (
    id bigint NOT NULL,
    name text,
    country_id integer,
    user_id bigint
);


ALTER TABLE public.airlines OWNER TO postgres;

--
-- Name: sp_get_airline_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_id(_id bigint) RETURNS SETOF public.airlines
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_airline_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_airline_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_username(_username text) RETURNS TABLE(airline_name text)
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
         SELECT a.name from airlines a
            left join users u on (a.user_id = u.id)
            where _username = u.name ;
    end;
    $$;


ALTER FUNCTION public.sp_get_airline_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_all_airlines(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_airlines() RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_airlines() OWNER TO postgres;

--
-- Name: sp_get_all_countries(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_countries() RETURNS TABLE(id integer, name text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_countries() OWNER TO postgres;

--
-- Name: sp_get_all_customers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_customers() RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card_no text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_customers() OWNER TO postgres;

--
-- Name: sp_get_all_flights(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_flights() RETURNS TABLE(id bigint, airline_id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_flights() OWNER TO postgres;

--
-- Name: sp_get_all_tickets(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_tickets() RETURNS TABLE(id bigint, flight_id bigint, customer_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_tickets() OWNER TO postgres;

--
-- Name: sp_get_all_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_users() RETURNS TABLE(id bigint, name text, password text, email text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_users() OWNER TO postgres;

--
-- Name: flights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flights (
    id bigint NOT NULL,
    airline_id bigint,
    origin_country_id integer,
    destination_country_id integer,
    departure_time timestamp without time zone,
    landing_time timestamp without time zone,
    remaining_tickets integer
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- Name: sp_get_arrival_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_arrival_flights(_country_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
begin
        RETURN QUERY
        SELECT * from flights f
            where _country_id = f.destination_country_id
            AND f.landing_time > now()::timestamp
            AND f.landing_time < now()::timestamp + INTERVAL '12' HOUR;
    end;
$$;


ALTER FUNCTION public.sp_get_arrival_flights(_country_id bigint) OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: sp_get_country_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_country_by_id(_id bigint) RETURNS SETOF public.countries
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_country_by_id(_id bigint) OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    first_name text,
    last_name text,
    address text,
    phone_no text,
    credit_card_no text,
    user_id bigint
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: sp_get_customer_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_id(_id bigint) RETURNS SETOF public.customers
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_customer_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_customer_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_username(_username text) RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card_no text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
         SELECT c.id, c.first_name, c.last_name, c.address,
                c.phone_no, c.credit_card_no, c.user_id from customers c
            left join users u on (c.user_id = u.id)
            where _username = u.name ;
    end;
    $$;


ALTER FUNCTION public.sp_get_customer_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_departure_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_departure_flights(_country_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
begin
        RETURN QUERY
        SELECT * from flights f
            where _country_id = f.origin_country_id
            AND f.departure_time > now()::timestamp
            AND f.departure_time < now()::timestamp + INTERVAL '12' HOUR;
    end;
$$;


ALTER FUNCTION public.sp_get_departure_flights(_country_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flight_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flight_by_id(_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_flight_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_airline_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
        SELECT * from flights f
            where _airline_id = f.airline_id;
    end;
    $$;


ALTER FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_parameters(integer, integer, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date date) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
        SELECT *  from flights f
            where _origin_country_id = f.origin_country_id
            AND _destination_country_id = f.destination_country_id
            AND CAST(_date AS DATE) = CAST(f.departure_time AS DATE);
    end;
    $$;


ALTER FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date date) OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    flight_id bigint,
    customer_id bigint
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: sp_get_ticket_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_ticket_by_id(_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_ticket_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_tickets_by_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
        SELECT * from tickets t
            where _customer_id = t.customer_id;
    end;
    $$;


ALTER FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name text,
    password text,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: sp_get_user_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_id(_id bigint) RETURNS SETOF public.users
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users
            where id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_user_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_user_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_username(_username text) RETURNS TABLE(id bigint, name text, password text, email text)
    LANGUAGE plpgsql
    AS $$
    begin
        RETURN QUERY
        SELECT *  from users u
            where _username = u.name ;
    end;
    $$;


ALTER FUNCTION public.sp_get_user_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_insert_airline(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_airline(_name text, _country_id integer, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO airlines(name, country_id, user_id)
            VALUES (_name, _country_id, _user_id)
            returning id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_airline(_name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_country(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_country(_name text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO countries(name)
            VALUES (_name)
            returning id into new_id;
            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_country(_name text) OWNER TO postgres;

--
-- Name: sp_insert_customer(text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO customers(first_name, last_name, address, phone_no, credit_card_no, user_id)
            VALUES (_first_name , _last_name , _address , _phone_no , _credit_card_no, _user_id )
            returning id into new_id;
            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_flight(bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO flights(airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets)
            VALUES (_airline_id, _origin_country_id, _destination_country_id, _departure_time, _landing_time, _remaining_tickets)
            returning id into new_id;
            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_insert_ticket(bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_ticket(_flight_id bigint, _customer_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO tickets(flight_id, customer_id )
            VALUES (_flight_id , _customer_id )
            returning id into new_id;
            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_ticket(_flight_id bigint, _customer_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_user(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_user(_name text, _password text, _email text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO users(name, password, email)
            VALUES (_name , _password , _email)
            returning id into new_id;
            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_user(_name text, _password text, _email text) OWNER TO postgres;

--
-- Name: sp_update_airline(bigint, text, integer, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            UPDATE airlines
            SET name = _name, country_id = _country_id, user_id = _user_id
            WHERE id = _id;
        END;
    $$;


ALTER PROCEDURE public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_country(bigint, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_country(_id bigint, _name text)
    LANGUAGE plpgsql
    AS $$
BEGIN
            UPDATE countries
            SET name = _name
            WHERE id = _id;
        END;
$$;


ALTER PROCEDURE public.sp_update_country(_id bigint, _name text) OWNER TO postgres;

--
-- Name: sp_update_customer(bigint, text, text, text, text, text, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            UPDATE customers
            SET
                first_name = _first_name,
                last_name = _last_name,
                address = _address,
                phone_no = _phone_no,
                credit_card_no = _credit_card_no,
                user_id = _user_id
            WHERE id = _id;
        END;
    $$;


ALTER PROCEDURE public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_flight(bigint, bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            UPDATE flights
            SET
                airline_id = _airline_id,
                origin_country_id = _origin_country_id,
                destination_country_id = _destination_country_id,
                departure_time = _departure_time,
                landing_time = _landing_time,
                remaining_tickets = _remaining_tickets
            WHERE id = _id;
        END;
    $$;


ALTER PROCEDURE public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_update_ticket(bigint, bigint, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_ticket(_id bigint, _flight_id bigint, _customer_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            UPDATE tickets
            SET
                flight_id = _flight_id,
                customer_id = _customer_id
            WHERE id = _id;
        END;
    $$;


ALTER PROCEDURE public.sp_update_ticket(_id bigint, _flight_id bigint, _customer_id bigint) OWNER TO postgres;

--
-- Name: sp_update_user(bigint, text, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_update_user(_id bigint, _name text, _password text, _email text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            UPDATE users
            SET
                name = _name,
                password = _password,
                email = _email
            WHERE id = _id;
        END;
    $$;


ALTER PROCEDURE public.sp_update_user(_id bigint, _name text, _password text, _email text) OWNER TO postgres;

--
-- Name: sp_upsert_airline(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_upsert_airline(_name text, _country_id integer, _user_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint := 0;
    begin
        if not exists(select 1 from airlines where name = _name) then
            insert into airlines (name, country_id, user_id)
            values (_name, _country_id, _user_id)
            returning id into new_id;
            return new_id;
        else
            update airlines
            set name = _name, country_id = _country_id, user_id = _user_id
            where name = _name;
            return 0;
        end if;
    end;
    $$;


ALTER FUNCTION public.sp_upsert_airline(_name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_upsert_customer(text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint := 0;
    begin
        if not exists(select 1 from customers where user_id = _user_id) then
            insert into customers (first_name, last_name, address, phone_no, credit_card_no, user_id)
            values (_first_name, _last_name, _address, _phone_no, _credit_card_no, _user_id)
            returning id into new_id;
            return new_id;
        else
            update customers
            set first_name = _first_name, last_name = _last_name, address = _address, phone_no = _phone_no, credit_card_no = _credit_card_no
            where user_id = _user_id;
            return 0;
        end if;
    end;
    $$;


ALTER FUNCTION public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_upsert_user(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_upsert_user(_name text, _password text, _email text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint := 0;
    begin
        if not exists(select 1 from users where email = _email) then
            insert into users (name, password, email)
            values (_name, _password, _email)
            returning id into new_id;
            return new_id;
        else
            update users
            set name = _name, password = _password
            where email = _email;
            return 0;
        end if;
    end;
    $$;


ALTER FUNCTION public.sp_upsert_user(_name text, _password text, _email text) OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.airlines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.airlines_id_seq OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.airlines_id_seq OWNED BY public.airlines.id;


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: flight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.flight_id_seq OWNER TO postgres;

--
-- Name: flight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_id_seq OWNED BY public.flights.id;


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: airlines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines ALTER COLUMN id SET DEFAULT nextval('public.airlines_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: flights id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights ALTER COLUMN id SET DEFAULT nextval('public.flight_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airlines (id, name, country_id, user_id) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, address, phone_no, credit_card_no, user_id) FROM stdin;
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flights (id, airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, flight_id, customer_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, email) FROM stdin;
\.


--
-- Name: airlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airlines_id_seq', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, false);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- Name: flight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_id_seq', 1, false);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: airlines airlines_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_pk PRIMARY KEY (id);


--
-- Name: countries countries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pk PRIMARY KEY (id);


--
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pk PRIMARY KEY (id);


--
-- Name: flights flight_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flight_pk PRIMARY KEY (id);


--
-- Name: tickets tickets_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: airlines_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX airlines_name_uindex ON public.airlines USING btree (name);


--
-- Name: airlines_user_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX airlines_user_id_uindex ON public.airlines USING btree (user_id);


--
-- Name: countries_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX countries_name_uindex ON public.countries USING btree (name);


--
-- Name: customers_credit_card_no_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_credit_card_no_uindex ON public.customers USING btree (credit_card_no);


--
-- Name: customers_phone_no_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_phone_no_uindex ON public.customers USING btree (phone_no);


--
-- Name: customers_user_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_user_id_uindex ON public.customers USING btree (user_id);


--
-- Name: tickets_customer_id_flight_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tickets_customer_id_flight_id_uindex ON public.tickets USING btree (customer_id, flight_id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_uindex ON public.users USING btree (email);


--
-- Name: users_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_name_uindex ON public.users USING btree (name);


--
-- Name: airlines airlines_countries_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_countries_id_fk FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: airlines airlines_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: customers customers_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: flights flight_airlines_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flight_airlines_id_fk FOREIGN KEY (airline_id) REFERENCES public.airlines(id);


--
-- Name: flights flight_countries_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flight_countries_id_fk FOREIGN KEY (origin_country_id) REFERENCES public.countries(id);


--
-- Name: flights flight_countries_id_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flight_countries_id_fk_2 FOREIGN KEY (destination_country_id) REFERENCES public.countries(id);


--
-- Name: tickets tickets_customers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_customers_id_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: tickets tickets_flight_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_flight_id_fk FOREIGN KEY (flight_id) REFERENCES public.flights(id);


--
-- PostgreSQL database dump complete
--

