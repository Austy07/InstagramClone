import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import ReelsScreen from "../screens/ReelsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Logout from "../components/logout";


const Routes = props => {
    return(
        <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/signup" component={SignupScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/discover" component={DiscoverScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/reels" component={ReelsScreen} />
            <Route exact path="/logout" component={Logout} />
        </Switch>

    )
}


export default Routes;
