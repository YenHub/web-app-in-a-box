import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const [apiResult, setApiResult] = useState('No API Result Yet');
    const [payloadResult, setPayloadResult] = useState({status: 'No API Results Yet'});

    useEffect( () => {
        console.log('Calling the API');
        setTimeout(()=>{
            fetch("http://localhost:9000/testAPI")
                .then(res => res.text())
                .then(res => setApiResult(res))
                .catch(err => setApiResult('FETCH FAILED'));
        }, 1500);
        setTimeout(()=>{
            fetch("http://localhost:9000/testAPI/payload")
                .then(res => res.json())
                .then(res => {
                    setPayloadResult(res);
                    window.apiPayload = JSON.stringify(res);
                })
                .catch(err => setPayloadResult({status: 'FETCH FAILED'}));
        }, 1500);
    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Current API Result: {apiResult}
                </p>
          </header>
      </div>
  );
}

export default App;
