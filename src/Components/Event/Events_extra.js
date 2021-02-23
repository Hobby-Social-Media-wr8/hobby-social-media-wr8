import React, {Component} from 'react';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import Calendar from './components/Calendar/Calendar';
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

class Event extends Component {
      render() {
      return(
      <div>
            <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}/>
    </div>
      ) 
  }
}
export default Event;