import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Blog from './Components/Blog/Blog'
import Chat from './Components/Chat/Chat'
import Message from './Components/Chat/Message'
import Event from './Components/Event/Event'
import Group from './Components/Group/Group'
import Profile from './Components/Profile/Profile'


export default (
    <Switch>
        <Route exact path= '/' component={Auth}/>
        <Route path= '/blog' component={Blog}/>
        <Route path='/events' component={Event}/>
        <Route path='/chat' component={Chat}/>
        <Route path='/message' component={Message}/>
        <Route path='/groups' component={Group}/>
        <Route path= '/profile' component={Profile}/>
    </Switch>
)
