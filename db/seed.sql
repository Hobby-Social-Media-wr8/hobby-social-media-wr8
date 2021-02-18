-- Posts

-CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title varchar(50) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INT references users(users_id),
    date_created TIMESTAMP
)