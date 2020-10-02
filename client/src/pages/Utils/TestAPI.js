import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import '../../App.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const log = (msg) => {
    console.log(`[TestAPI] ${msg}`);
}

function TestAPI() {

    const classes = useStyles();
    const [apiResult, setApiResult] = useState('Attempting to call API ...');
    const [payloadResult, setPayloadResult] = useState({status: 'No API Results Yet'});
    const [apiStatus, setAPIStatus] = useState(0);

    const createAPICall =  () => fetch('http://localhost:9000/testAPI');
    const apiPayloadTest = () => fetch('http://localhost:9000/testAPI/payload');
    const resetAPI = () => fetch('http://localhost:9000/testAPI/reset');

    useEffect(() => {
        log('Calling the API');
        Promise.all([
            createAPICall(),
            apiPayloadTest()
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

    const handleApiReset = () => {
            resetAPI().then( (res) => {
                if (res.status !== 200) {
                    setAPIStatus(-1);
                    return false;
                };
                setApiResult(`0 Successful API Calls`);
            });
    }

    function handleApiCall() {
        return createAPICall()
            .then( async ( res ) => {
                setAPIStatus(-1);
                if (res.status !== 200) {
                    setAPIStatus(-1);
                    return false;
                };
                const apiResult = await res.text();
                setApiResult(`0 Successful API Calls`);
                setApiResult(apiResult);
                setAPIStatus(0);
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={teapot} className={getClasses()} alt="logo" />
                <p className="tea-pot-font">
                    API STATUS: {apiResult}
                </p>
                <div className={classes.root}>
                    <Button variant="contained" color={apiStatus !== -1 ? 'default' : 'secondary'} onClick={handleApiCall}>
                        CALL API
                    </Button>
                    <Button variant="contained" color={apiStatus !== -1 ? 'primary' : 'secondary'} onClick={handleApiReset}>
                        {apiStatus !== -1 ? 'RESET API' : 'RESET FAILED'}
                    </Button>
                </div>
          </header>
      </div>
    );
}

export default TestAPI;