import React, { Component } from 'react' 
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
import timeGridPlugin from "@fullcalendar/timegrid";  
import '../Calendar/Calendar.css';
import interactionPlugin from '@fullcalendar/interaction'

// import "@fullcalendar/core/main.css";  
// import "@fullcalendar/daygrid/main.css";  
// import "@fullcalendar/timegrid/main.css";  

const events = [{ title: '', date: new Date() }];  

export class MyCalendar extends Component {  

   
    render() {  
        return (  
            <div className="container">  
                  <div className="row title" style={{ marginTop: "20px" }} >  
                    
                </div> 
                <section className='sizing'>
                 <FullCalendar 
                    
                    defaultView="dayGridMonth"  
                    header={{  
                    left: "prev,next",  
                    center: "title",  
                    right: "dayGridMonth,timeGridWeek,timeGridDay"  
                    }} 
                    dateClick ={this.handleDateClick} 
                    plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}  
                    events={events}  
                /> 
                </section>  
            </div>  
        )  
    }  
}  

export default MyCalendar