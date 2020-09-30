import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import TestAPI from './pages/Utils/TestAPI'

function App() {

    return (
        <Router>
          <Switch>
            <Route path="/TestAPI">
              <TestAPI />
            </Route>
          </Switch>

      </Router>
    );
}

export default App;
