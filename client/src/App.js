import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Wrapper from './views/Generic/Wrapper';

import TestAPI from './views/Utils/TestAPI';
import Lander from './views/Lander';

function App() {

    return Wrapper(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Lander />
                </Route>
                <Route exact path="/TestAPI">
                    <TestAPI />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;