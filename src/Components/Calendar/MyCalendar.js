import React, {Component} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
moment.locale('en-GB');
import axios from 'axios'
const localizer = BigCalendar.momentLocalizer(moment);

class MyCalendar extends Component{
    constructor(props) {
        super(props)    
        this.state = {
          cal_events: [],
        }
    }

    convertDate = (date) => {
        return moment.utc(date).toDate()
      }

    componentDidMount(){
        axios.get('/api/cal-events')
        .then(response => {
        
        let appointments = response.data;
        
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = moment.utc(appointments[i].start).toDate();
          appointments[i].end = moment.utc(appointments[i].end).toDate();
          
        }        
        self.setState({cal_events: appointments})
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  render(){
      const {cal_events} = this.state;
    return(
        <div>   
        <Calendar
        localizer={localizer}
        events={cal_events}
        step={30}
        defaultView = 'month'
        views={['month', 'week', 'day']}
        defaultDate ={new Date()}
        timeslots= {3}
        startAccessor="start"
        endAccessor="end"
        />
        </div>   
    )
  }
}
export default MyCalendar