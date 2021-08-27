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
            UPDATE airlines
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
1	Private flight	172	1
2	135 Airways	151	2
3	1Time Airline	162	3
4	2 Sqn No 1 Elementary Flying Training School	149	4
5	213 Flight Unit	89	5
6	223 Flight Unit State Airline	66	6
7	224th Flight Unit	13	7
8	247 Jet Ltd	52	8
9	3D Aviation	204	9
10	40-Mile Air	12	10
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
1	Afghanistan
2	Åland Islands
3	Albania
4	Algeria
5	American Samoa
6	Andorra
7	Angola
8	Anguilla
9	Antarctica
10	Antigua and Barbuda
11	Argentina
12	Armenia
13	Aruba
14	Australia
15	Austria
16	Azerbaijan
17	Bahamas
18	Bahrain
19	Bangladesh
20	Barbados
21	Belarus
22	Belgium
23	Belize
24	Benin
25	Bermuda
26	Bhutan
27	Bolivia (Plurinational State of)
28	Bonaire, Sint Eustatius and Saba
29	Bosnia and Herzegovina
30	Botswana
31	Bouvet Island
32	Brazil
33	British Indian Ocean Territory
34	United States Minor Outlying Islands
35	Virgin Islands (British)
36	Virgin Islands (U.S.)
37	Brunei Darussalam
38	Bulgaria
39	Burkina Faso
40	Burundi
41	Cambodia
42	Cameroon
43	Canada
44	Cabo Verde
45	Cayman Islands
46	Central African Republic
47	Chad
48	Chile
49	China
50	Christmas Island
51	Cocos (Keeling) Islands
52	Colombia
53	Comoros
54	Congo
55	Congo (Democratic Republic of the)
56	Cook Islands
57	Costa Rica
58	Croatia
59	Cuba
60	Curaçao
61	Cyprus
62	Czech Republic
63	Denmark
64	Djibouti
65	Dominica
66	Dominican Republic
67	Ecuador
68	Egypt
69	El Salvador
70	Equatorial Guinea
71	Eritrea
72	Estonia
73	Ethiopia
74	Falkland Islands (Malvinas)
75	Faroe Islands
76	Fiji
77	Finland
78	France
79	French Guiana
80	French Polynesia
81	French Southern Territories
82	Gabon
83	Gambia
84	Georgia
85	Germany
86	Ghana
87	Gibraltar
88	Greece
89	Greenland
90	Grenada
91	Guadeloupe
92	Guam
93	Guatemala
94	Guernsey
95	Guinea
96	Guinea-Bissau
97	Guyana
98	Haiti
99	Heard Island and McDonald Islands
100	Holy See
101	Honduras
102	Hong Kong
103	Hungary
104	Iceland
105	India
106	Indonesia
107	Côte dIvoire
108	Iran (Islamic Republic of)
109	Iraq
110	Ireland
111	Isle of Man
112	Israel
113	Italy
114	Jamaica
115	Japan
116	Jersey
117	Jordan
118	Kazakhstan
119	Kenya
120	Kiribati
121	Kuwait
122	Kyrgyzstan
123	Lao Peoples Democratic Republic
124	Latvia
125	Lebanon
126	Lesotho
127	Liberia
128	Libya
129	Liechtenstein
130	Lithuania
131	Luxembourg
132	Macao
133	Macedonia (the former Yugoslav Republic of)
134	Madagascar
135	Malawi
136	Malaysia
137	Maldives
138	Mali
139	Malta
140	Marshall Islands
141	Martinique
142	Mauritania
143	Mauritius
144	Mayotte
145	Mexico
146	Micronesia (Federated States of)
147	Moldova (Republic of)
148	Monaco
149	Mongolia
150	Montenegro
151	Montserrat
152	Morocco
153	Mozambique
154	Myanmar
155	Namibia
156	Nauru
157	Nepal
158	Netherlands
159	New Caledonia
160	New Zealand
161	Nicaragua
162	Niger
163	Nigeria
164	Niue
165	Norfolk Island
166	Korea (Democratic Peoples Republic of)
167	Northern Mariana Islands
168	Norway
169	Oman
170	Pakistan
171	Palau
172	Palestine, State of
173	Panama
174	Papua New Guinea
175	Paraguay
176	Peru
177	Philippines
178	Pitcairn
179	Poland
180	Portugal
181	Puerto Rico
182	Qatar
183	Republic of Kosovo
184	Réunion
185	Romania
186	Russian Federation
187	Rwanda
188	Saint Barthélemy
189	Saint Helena, Ascension and Tristan da Cunha
190	Saint Kitts and Nevis
191	Saint Lucia
192	Saint Martin (French part)
193	Saint Pierre and Miquelon
194	Saint Vincent and the Grenadines
195	Samoa
196	San Marino
197	Sao Tome and Principe
198	Saudi Arabia
199	Senegal
200	Serbia
201	Seychelles
202	Sierra Leone
203	Singapore
204	Sint Maarten (Dutch part)
205	Slovakia
206	Slovenia
207	Solomon Islands
208	Somalia
209	South Africa
210	South Georgia and the South Sandwich Islands
211	Korea (Republic of)
212	South Sudan
213	Spain
214	Sri Lanka
215	Sudan
216	Suriname
217	Svalbard and Jan Mayen
218	Swaziland
219	Sweden
220	Switzerland
221	Syrian Arab Republic
222	Taiwan
223	Tajikistan
224	Tanzania, United Republic of
225	Thailand
226	Timor-Leste
227	Togo
228	Tokelau
229	Tonga
230	Trinidad and Tobago
231	Tunisia
232	Turkey
233	Turkmenistan
234	Turks and Caicos Islands
235	Tuvalu
236	Uganda
237	Ukraine
238	United Arab Emirates
239	United Kingdom of Great Britain and Northern Ireland
240	United States of America
241	Uruguay
242	Uzbekistan
243	Vanuatu
244	Venezuela (Bolivarian Republic of)
245	Viet Nam
246	Wallis and Futuna
247	Western Sahara
248	Yemen
249	Zambia
250	Zimbabwe
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, address, phone_no, credit_card_no, user_id) FROM stdin;
1	Mads	Poulsen	Aarhus N	05600123	8c637061-cf93-4dad-bf91-9e4908b01336	1
2	Lucy	Menard	Fort-de-France	05-41-35-85-55	01fb201a-067f-4aa6-baf5-6bbc19fea222	2
3	Sofia	Petersen	Hammel	48431783	a19f7259-d988-4097-bcef-1cea87f69ea4	3
4	Beatrice	Wilson	Sherbrooke	437-232-7680	cf60f49b-cd3f-435f-aff6-6a377d642bd5	4
5	Roger	Murray	Bundaberg	04-4711-0332	840d8d0f-632a-43f6-973b-93c3297ee5e2	5
6	Chris	Brewer	Drogheda	021-060-2780	faf76c45-4c9e-40e4-84e2-1317710b7a06	6
7	Leonardo	Eldevik	Rød	38118467	a823390c-ca46-413c-9fd7-6967b2205549	7
8	Jacques	Rodriguez	Stalden (Vs)	076 945 36 60	6af4e640-e2f9-4de1-9621-09f5e3060c5a	8
9	Malthe	Møller	Nykøbing Sj.	56191691	7a8bdfa3-0a13-4bd0-9863-56a998060cd4	9
10	Alexandra	Phillips	Athenry	061-986-8542	f6da90a3-6166-455d-812f-032e33d69bac	10
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flights (id, airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) FROM stdin;
1	1	113	248	2021-04-20 01:46:24	2021-04-20 04:46:24	55
2	2	48	228	2021-08-14 23:13:19	2021-08-15 05:13:19	200
3	3	181	60	2021-08-06 18:36:16	2021-08-07 02:36:16	85
4	3	202	202	2021-03-15 02:27:05	2021-03-15 10:27:05	61
5	4	168	110	2021-07-15 05:56:16	2021-07-15 13:56:16	153
6	4	4	34	2021-10-06 10:42:20	2021-10-06 14:42:20	53
7	5	77	106	2021-08-12 06:15:17	2021-08-12 09:15:17	78
8	6	39	97	2021-08-20 13:05:13	2021-08-20 14:05:13	121
9	6	61	89	2021-09-14 03:18:13	2021-09-14 04:18:13	183
10	6	152	28	2021-06-03 01:22:04	2021-06-03 12:22:04	65
11	7	152	219	2021-09-02 08:52:08	2021-09-02 13:52:08	42
12	7	97	113	2021-01-22 09:58:13	2021-01-22 16:58:13	212
13	8	98	30	2021-10-03 08:15:12	2021-10-03 15:15:12	186
14	9	174	127	2021-02-25 17:07:24	2021-02-25 21:07:24	97
15	9	111	225	2021-06-09 04:06:09	2021-06-09 14:06:09	206
16	9	162	100	2021-09-18 23:25:21	2021-09-19 05:25:21	206
17	10	26	229	2021-11-24 07:32:03	2021-11-24 08:32:03	191
18	10	14	17	2021-02-04 23:18:07	2021-02-05 05:18:07	191
19	10	191	93	2021-01-20 12:17:20	2021-01-20 20:17:20	89
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, flight_id, customer_id) FROM stdin;
1	4	1
2	19	2
3	16	3
4	16	4
5	18	5
6	7	6
7	19	7
8	17	8
9	10	9
10	13	10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, email) FROM stdin;
1	organicbutterfly627	wage	mads.poulsen@example.com
2	blueelephant935	bryan	lucy.menard@example.com
3	whitegorilla449	volcom	sofia.petersen@example.com
4	bluefish543	testing	beatrice.wilson@example.com
5	goldenzebra874	script	roger.murray@example.com
6	redlion762	jenny	chris.brewer@example.com
7	smallbutterfly250	stayout	leonardo.eldevik@example.com
8	goldenkoala638	jeremiah	jacques.rodriguez@example.com
9	redostrich174	dwayne	malthe.moller@example.com
10	tinykoala317	deanna	alexandra.phillips@example.com
\.


--
-- Name: airlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airlines_id_seq', 10, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 250, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 10, true);


--
-- Name: flight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_id_seq', 19, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


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

