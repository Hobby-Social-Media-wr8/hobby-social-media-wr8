import React, {useState} from 'react';
import {BigCalendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import Calendar from './components/Calendar/Calendar';

function MyCalendar() {
    const locales = {
        'en-US': require('date-fns/locale/en-US'),
      }
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })
    const [eventsList, setEventsList] = useState([]);
    
handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
        if (title) {
            var newEvent = {
                start: start,
                end: end,
                title: title 
                }
            let updateEventsList = eventsList;
                updateEventsList.push(newEvent);
                setEventsList(updateEventsList);
            }
            setEventsList([...eventsList, newEvent]);
    };
    
        return (
            <div>
            <Calendar
            selectable
            defaultView="week"
            defaultDate={new Date()}
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectSlot={handleSelect}
            />
            </div>
        )
    }
export default MyCalendar