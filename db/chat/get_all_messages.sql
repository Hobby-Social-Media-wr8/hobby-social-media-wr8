select message_id, message, sender_id, date_sent, username from messages 
join users on users.user_id = messages.sender_id
where room_id = ${room_id}