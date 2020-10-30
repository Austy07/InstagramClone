import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Routes from './routing/Routes';


function App() {
    return (
            <Router>
                    <div className="App">
                        <Switch>
                            <Route component={Routes}/>
                        </Switch>
                    </div>
            </Router>
    );
}

export default App;
