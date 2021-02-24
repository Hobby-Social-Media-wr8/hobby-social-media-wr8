import React from "react";
import {Switch, Route} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Blog from "./Components/Blog/Blog";
import Home from "./Components/Home/Home";
import Chat from "./Components/Chat/Chat";
import Message from "./Components/Chat/Message";
import Events from "./Components/Events/Events";
import AddPost from './Components/Blog/AddPost'
import Group from "./Components/Group/Group";
import Profile from "./Components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={Auth}/>
    <Route path="/blog" component={Blog} />
    <Route exact path="/add-post" component={AddPost} />
    <Route path="/events" component={Events} />
    <Route path="/chat" component={Chat} />
    <Route path="/message" component={Message} />
    <Route path="/groups" component={Group} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
