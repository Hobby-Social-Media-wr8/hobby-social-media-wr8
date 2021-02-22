import React, {Component} from 'react';
import Calendar from '../Calendar/Calendar';

class Event extends Component {
    render() {
        return (
            <div>
                <main>
                    <Calendar />
                </main>
            </div>
        );
    }
}
export default Event;