SELECT p.id as post_id, title, content, img, date_created, username as author_username from posts p join users u on u.user_id = p.author_id
where lower(title) like $1
order by date_created
