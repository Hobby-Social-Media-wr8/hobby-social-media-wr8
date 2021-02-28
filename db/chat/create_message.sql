insert into messages (room_id, message, sender_id)
values (${room_id}, ${message}, ${sender_id});

select * from messages where room_id = ${room_id}