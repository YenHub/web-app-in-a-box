import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import '../../App.css';
import classNames from 'classnames';

const log = (msg) => {
    console.log(`[TestAPI] ${msg}`);
}

function TestAPI() {

    const [apiResult, setApiResult] = useState('Attempting to call API ...');
    const [payloadResult, setPayloadResult] = useState({status: 'No API Results Yet'});

    useEffect(() => {
        log('Calling the API');
        Promise.all([
            fetch('http://localhost:9000/testAPI'),
            fetch('http://localhost:9000/testAPI/payload')
        ]).then(async ([testAPI, payLoad]) => {
            log('API Call successful, setting state');
            const TestAPI = await testAPI.text();
            const PayLoad = await payLoad.json();
            return [TestAPI, PayLoad];
        })
        .then(([testAPI, payLoad]) => {
            setApiResult(testAPI);
            setPayloadResult(payLoad);
            log(testAPI);
            log(payLoad.status);
            window.apiPayload = JSON.stringify(payLoad);
        }).catch(err => {
            log('API CALL HAS FAILED');
            setPayloadResult({status: 'THE API IS A ☕ POT'});
            setApiResult('FETCH FAILED');
            throw err;
        });

    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    function getClasses() {

        return classNames('App-logo', {
            spin: payloadResult.status === 'THE API IS NOT A TEAPOT ☕'  ? true : false,
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