create function sp_get_all_airlines()
    returns TABLE
            (
                id         bigint,
                name       text,
                country_id integer,
                user_id    bigint
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from airlines;
END;
$$;

alter function sp_get_all_airlines() owner to postgres;

create function sp_insert_airline(_name text, _country_id integer, _user_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO airlines(name, country_id, user_id)
    VALUES (_name, _country_id, _user_id)
    returning id into new_id;

    return new_id;
END;
$$;

alter function sp_insert_airline(text, integer, bigint) owner to postgres;

create function sp_insert_country(_name text) returns integer
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO countries(name)
    VALUES (_name)
    returning id into new_id;
    return new_id;
END;
$$;

alter function sp_insert_country(text) owner to postgres;

create function sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text,
                                   _credit_card_no text, _user_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO customers(first_name, last_name, address, phone_no, credit_card_no, user_id)
    VALUES (_first_name, _last_name, _address, _phone_no, _credit_card_no, _user_id)
    returning id into new_id;
    return new_id;
END;
$$;

alter function sp_insert_customer(text, text, text, text, text, bigint) owner to postgres;

create function sp_insert_user(_name text, _password text, _email text) returns bigint
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO users(name, password, email)
    VALUES (_name, _password, _email)
    returning id into new_id;
    return new_id;
END;
$$;

alter function sp_insert_user(text, text, text) owner to postgres;

create function sp_get_all_countries()
    returns TABLE
            (
                id   integer,
                name text
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from countries;
END;
$$;

alter function sp_get_all_countries() owner to postgres;

create function sp_get_all_customers()
    returns TABLE
            (
                id             bigint,
                first_name     text,
                last_name      text,
                address        text,
                phone_no       text,
                credit_card_no text,
                user_id        bigint
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from customers;
END;
$$;

alter function sp_get_all_customers() owner to postgres;

create function sp_get_all_flights()
    returns TABLE
            (
                id                     bigint,
                airline_id             bigint,
                origin_country_id      integer,
                destination_country_id integer,
                departure_time         timestamp without time zone,
                landing_time           timestamp without time zone,
                remaining_tickets      integer
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from flights;
END;
$$;

alter function sp_get_all_flights() owner to postgres;

create function sp_get_all_tickets()
    returns TABLE
            (
                id          bigint,
                flight_id   bigint,
                customer_id bigint
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from tickets;
END;
$$;

alter function sp_get_all_tickets() owner to postgres;

create function sp_get_all_users()
    returns TABLE
            (
                id       bigint,
                name     text,
                password text,
                email    text
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT * from users;
END;
$$;

alter function sp_get_all_users() owner to postgres;

create function sp_get_airline_by_id(_id bigint) returns SETOF airlines
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from airlines
        where id = _id;
END;
$$;

alter function sp_get_airline_by_id(bigint) owner to postgres;

create function sp_get_country_by_id(_id bigint) returns SETOF countries
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from countries
        where id = _id;
END;
$$;

alter function sp_get_country_by_id(bigint) owner to postgres;

create function sp_get_customer_by_id(_id bigint) returns SETOF customers
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from customers
        where id = _id;
END;
$$;

alter function sp_get_customer_by_id(bigint) owner to postgres;

create function sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer,
                                 _departure_time timestamp without time zone, _landing_time timestamp without time zone,
                                 _remaining_tickets integer) returns bigint
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO flights(airline_id, origin_country_id, destination_country_id, departure_time, landing_time,
                        remaining_tickets)
    VALUES (_airline_id, _origin_country_id, _destination_country_id, _departure_time, _landing_time,
            _remaining_tickets)
    returning id into new_id;
    return new_id;
END;
$$;

alter function sp_insert_flight(bigint, integer, integer, timestamp, timestamp, integer) owner to postgres;

create function sp_get_flight_by_id(_id bigint) returns SETOF flights
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from flights
        where id = _id;
END;
$$;

alter function sp_get_flight_by_id(bigint) owner to postgres;

create function sp_get_ticket_by_id(_id bigint) returns SETOF tickets
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from tickets
        where id = _id;
END;
$$;

alter function sp_get_ticket_by_id(bigint) owner to postgres;

create function sp_get_user_by_id(_id bigint) returns SETOF users
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        from users
        where id = _id;
END;
$$;

alter function sp_get_user_by_id(bigint) owner to postgres;

create procedure sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint)
    language plpgsql
as
$$
BEGIN
    UPDATE airlines
    SET name       = _name,
        country_id = _country_id,
        user_id    = _user_id
    WHERE id = _id;
END;
$$;

alter procedure sp_update_airline(bigint, text, integer, bigint) owner to postgres;

create procedure sp_update_country(_id bigint, _name text)
    language plpgsql
as
$$
BEGIN
    UPDATE airlines
    SET name = _name
    WHERE id = _id;
END;
$$;

alter procedure sp_update_country(bigint, text) owner to postgres;

create procedure sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text,
                                    _credit_card_no text, _user_id bigint)
    language plpgsql
as
$$
BEGIN
    UPDATE customers
    SET first_name     = _first_name,
        last_name      = _last_name,
        address        = _address,
        phone_no       = _phone_no,
        credit_card_no = _credit_card_no,
        user_id        = _user_id
    WHERE id = _id;
END;
$$;

alter procedure sp_update_customer(bigint, text, text, text, text, text, bigint) owner to postgres;

create procedure sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer,
                                  _destination_country_id integer, _departure_time timestamp without time zone,
                                  _landing_time timestamp without time zone, _remaining_tickets integer)
    language plpgsql
as
$$
BEGIN
    UPDATE flights
    SET airline_id             = _airline_id,
        origin_country_id      = _origin_country_id,
        destination_country_id = _destination_country_id,
        departure_time         = _departure_time,
        landing_time           = _landing_time,
        remaining_tickets      = _remaining_tickets
    WHERE id = _id;
END;
$$;

alter procedure sp_update_flight(bigint, bigint, integer, integer, timestamp, timestamp, integer) owner to postgres;

create function sp_insert_ticket(_flight_id bigint, _customer_id bigint) returns integer
    language plpgsql
as
$$
DECLARE
    new_id bigint;
BEGIN
    INSERT INTO tickets(flight_id, customer_id)
    VALUES (_flight_id, _customer_id)
    returning id into new_id;
    return new_id;
END;
$$;

alter function sp_insert_ticket(bigint, bigint) owner to postgres;

create procedure sp_update_ticket(_id bigint, _flight_id bigint, _customer_id bigint)
    language plpgsql
as
$$
BEGIN
    UPDATE tickets
    SET flight_id   = _flight_id,
        customer_id = _customer_id
    WHERE id = _id;
END;
$$;

alter procedure sp_update_ticket(bigint, bigint, bigint) owner to postgres;

create procedure sp_update_user(_id bigint, _name text, _password text, _email text)
    language plpgsql
as
$$
BEGIN
    UPDATE users
    SET name     = _name,
        password = _password,
        email    = _email
    WHERE id = _id;
END;
$$;

alter procedure sp_update_user(bigint, text, text, text) owner to postgres;

create function sp_delete_airline(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM airlines
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_airline(bigint) owner to postgres;

create function sp_delete_country(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM countries
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_country(bigint) owner to postgres;

create function sp_delete_customer(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM customers
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_customer(bigint) owner to postgres;

create function sp_delete_flight(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM flights
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_flight(bigint) owner to postgres;

create function sp_delete_ticket(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM tickets
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_ticket(bigint) owner to postgres;

create function sp_delete_user(_id bigint) returns bigint
    language plpgsql
as
$$
DECLARE
    rows_count int := 0;
BEGIN
    WITH rows AS (
        DELETE FROM users
            WHERE id = _id
            RETURNING 1)
    select count(*)
    into rows_count
    from rows;
    return rows_count;
END;
$$;

alter function sp_delete_user(bigint) owner to postgres;

create function sp_upsert_airline(_name text, _country_id integer, _user_id bigint) returns integer
    language plpgsql
as
$$
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
        set name       = _name,
            country_id = _country_id,
            user_id    = _user_id
        where name = _name;
        return 0;
    end if;
end;
$$;

alter function sp_upsert_airline(text, integer, bigint) owner to postgres;

create function sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text,
                                   _credit_card_no text, _user_id bigint) returns integer
    language plpgsql
as
$$
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
        set first_name     = _first_name,
            last_name      = _last_name,
            address        = _address,
            phone_no       = _phone_no,
            credit_card_no = _credit_card_no
        where user_id = _user_id;
        return 0;
    end if;
end;
$$;

alter function sp_upsert_customer(text, text, text, text, text, bigint) owner to postgres;

create function sp_upsert_user(_name text, _password text, _email text) returns bigint
    language plpgsql
as
$$
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
        set name     = _name,
            password = _password
        where email = _email;
        return 0;
    end if;
end;
$$;

alter function sp_upsert_user(text, text, text) owner to postgres;

