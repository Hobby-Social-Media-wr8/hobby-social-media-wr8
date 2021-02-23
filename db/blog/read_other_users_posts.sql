select post_id, title, content, img, username as author_username, date_created from posts p
join users u on u.user_id = p.author_id
where author_id != $1
order by date_created desc;