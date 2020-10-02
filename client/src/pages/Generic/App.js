import React from 'react';
import '../../App.css';

function Wrapper(app) {

    return (
        <div className="App">
            <div className="App-header">
                {app}
            </div>
      </div>
    );
}

export default Wrapper;