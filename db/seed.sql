CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE profile (
	profile_id SERIAL PRIMARY KEY,
	img_url VARCHAR(100),
	interests_list VARCHAR(250), 
	basic_info VARCHAR(250),
	profile_user_id INT REFERENCES users(user_id)
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title varchar(50) NOT NULL,
  content TEXT,
  img TEXT,
  author_id INT references users(user_id),
  date_created TIMESTAMP
);

CREATE TABLE needed_band_members (
  needed_members_id SERIAL PRIMARY KEY,
  needed_member_user_id INT REFERENCES users(user_id),
  needed_instrument TEXT,
  needed_number INT
);

CREATE TABLE event_template (
  template_event_id SERIAL PRIMARY KEY,
  template_user_id INT REFERENCES users(user_id),
  template_event_title VARCHAR(100) UNIQUE,
  template_event_description TEXT UNIQUE,
  template_event_location VARCHAR(250) UNIQUE,
  template_start_time TIMESTAMP UNIQUE,
  template_end_time TIMESTAMP UNIQUE
);

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    event_type_id INT,
    event_title VARCHAR(250),
    event_description TEXT REFERENCES event_template(template_event_description),
    event_location VARCHAR REFERENCES event_template(template_event_location),
    event_start_time TIMESTAMP REFERENCES event_template(template_start_time),
    event_end_time TIMESTAMP REFERENCES event_template(template_end_time)
);
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(250) NOT NULL
);
CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY, 
    group_name VARCHAR(100),
    group_location VARCHAR(250),
    group_type INT,
    group_instruments TEXT,
    img_url VARCHAR(100),
    group_needed_members INT REFERENCES needed_band_members(needed_members_id)

);

create table groupUsers(
group_users_id int references groups(group_id),
group_users int references users(user_id)
);
