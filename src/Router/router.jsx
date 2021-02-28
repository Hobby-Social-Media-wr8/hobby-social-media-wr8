import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../Auth/Login'
import SignUp from '../Auth/Signup'
import ChatPage from '../components/ChatPage'
import GroupPage from '../components/GroupPage'

export default function AppRouter() {
    return (
            <Router>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/group" component={GroupPage} />
                    <Route exact path="/chat" component={ChatPage} />
            </Router>
    )
}