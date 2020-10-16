import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Home from "../components/home";
import Discover from "../components/discover";
import Direct from "../components/layout/direct";
import Reels from "../components/reels";
import Profile from "../components/profile";
import Logout from "../components/logout";


const Routes = props => {
    return(
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/discover" component={Discover} />

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/direct" component={Direct} />
            <Route exact path="/reels" component={Reels} />
            <Route exact path="/logout" component={Logout} />
        </Switch>

    )
}


export default Routes;
