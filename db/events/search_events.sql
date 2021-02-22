select * from e.event_id, e.event_title, e.event_location, 
join event_template et on e.template_event_location = e.event_location
join groupUsers gu on et.template_users_id = gu.group_users where lower(e.event_title) = $1 order by e.event_title;