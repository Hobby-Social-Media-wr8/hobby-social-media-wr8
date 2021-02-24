insert into cal_event(
    cal_event_type_id ,
    cal_event_title,
    cal_event_description,
    cal_event_location,
    cal_event_start_time,
    cal_event_end_time)
    values($1, $2, $3, $4, $5, $6);