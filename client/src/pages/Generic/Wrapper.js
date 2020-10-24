import React from 'react';
import '../../App.css';
import Snowfall from 'react-snowfall';

function Wrapper(app) {

    return (
        <div className="App">
            <Snowfall />
            <div className="App-header">
                {app}
            </div>
      </div>
    );
}

export default Wrapper;