import React, {useState} from 'react'
import axios from 'axios'

const SearchEvents = props => {
    let [eventTitle, setEventTitle] = useState(''),
        [eventLocation, setEventLocation] = useState(''),
        [group, setGroup] = useState('')

    const handleSearch = (event) => {
       axios.get('/api/search-events', {eventTitle, eventLocation, group})
       
    
    //    .catch(err => console.log(err))
    }

        return(
            <div>Search</div>
        )
}
export default SearchEvents;