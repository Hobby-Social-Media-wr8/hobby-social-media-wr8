INSERT INTO users (
  username,
  email,
  password
) VALUES (
  ${username},
  ${email},
  ${hash}
)
RETURNING user_id, username, email;
