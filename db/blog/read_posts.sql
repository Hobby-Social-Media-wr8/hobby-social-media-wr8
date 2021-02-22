select title, content, img, profile_pic, username as author from posts p 
join users u on u.user_id = p.author_id
where p.id = $1;