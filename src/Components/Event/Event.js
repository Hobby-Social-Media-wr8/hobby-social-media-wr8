import React, {Component} from 'react';
import MyCalendar from './MyCalendar'

class Event extends Component {
    render() {
        return (
            <div>
                <main>
                    <MyCalendar />
                </main>
            </div>
        );
    }
}
export default Event;
