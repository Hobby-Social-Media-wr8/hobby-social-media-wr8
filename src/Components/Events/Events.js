import React, {Component} from 'react'
import PostEvent from './PostEvent'
import axios from 'axios'
import './Events.css'

class Events extends Component{
    constructor(){
        super()
            this.state = {
                data: []
            }
         }
componentDidMount(){
    axios.get('/api/events')
    .then(res => {
        this.setState({data: res.data})
    })
}
render(){
    return(
        <div>
            <h1>Events</h1>
            <PostEvent/>
        </div>
    )
 }
}
export default Events;