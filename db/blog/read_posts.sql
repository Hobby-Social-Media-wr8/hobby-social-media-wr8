select title, content, img, username as author from posts p 
join users u on u.user_id = p.author_id
where post_id = $1;