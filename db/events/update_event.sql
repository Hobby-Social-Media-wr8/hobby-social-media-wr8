update cal_event set cal_event_title = ${cal_event_title} OR ${cal_event_location} where cal_event_id = ${id};
select * form cal_event;