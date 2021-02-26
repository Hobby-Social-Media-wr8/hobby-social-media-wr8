insert into needed_band_members(users_id, instrument, number)
values ($1, $2, $3)

-- create table needed_band_members(id serial primary key, users_id refercences user(users_id), instrument text, number int);