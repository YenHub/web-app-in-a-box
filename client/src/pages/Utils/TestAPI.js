import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import '../../App.css';
import classNames from 'classnames';

function TestAPI() {

    const [apiResult, setApiResult] = useState('Attempting to call API ...');
    const [payloadResult, setPayloadResult] = useState({status: 'No API Results Yet'});

    useEffect( () => {
        console.log('Calling the API');
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setApiResult(res))
            .catch(err => setApiResult('FETCH FAILED'));
        fetch("http://localhost:9000/testAPI/payload")
            .then(res => res.json())
            .then(res => {
                setPayloadResult(res);
                window.apiPayload = JSON.stringify(res);
            })
            .catch(err => setPayloadResult({status: 'THE API IS A ☕ POT'}));
    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    function getClasses() {

        console.log(payloadResult);

        return classNames('App-logo', {
            spin: payloadResult.status === 'THE API IS NOT A TEAPOT'  ? true : false,
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={teapot} className={getClasses()} alt="logo" />
                <p className="tea-pot-font">
                    API STATUS: {apiResult}
                </p>
          </header>
      </div>
    );
}

export default TestAPI;