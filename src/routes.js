import React from "react";
import {Switch, Route} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Blog from "./Components/Blog/Blog";
import Home from "./Components/Home/Home";
import Chat from "./Components/Chat/Chat";
import Message from "./Components/Chat/Message";
import MyCalendar from "./Components/Calendar/MyCalendar";
import AddPost from './Components/Blog/AddPost'
import GroupPage from "./Components/Group/GroupPage";
import Profile from "./Components/Profile/Profile";
import GroupsPage from "./Components/Groups/GroupsPage"

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={Auth}/>
    <Route path="/blog" component={Blog} />
    <Route exact path="/add-post" component={AddPost} />
    <Route path="/events" component={MyCalendar} />
    <Route path="/chat/:id" component={Chat} />
    <Route path="/message" component={Message} />
    <Route path="/groups" component={GroupPage} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
