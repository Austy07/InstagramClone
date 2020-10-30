import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


// Redux
import {Provider} from 'react-redux';
import store from './store/store';


import Header from "./components/layout/header";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./components/theme";

import Routes from './routing/Routes';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route component={Routes}/>
                        </Switch>
                    </div>
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

export default App;
