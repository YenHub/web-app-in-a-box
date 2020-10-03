import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  success: {
      backgroundColor: '#00ff00',
  },
  btnFix: {
      minWidth: '3em',
  }
}));


const log = (msg) => {
    console.log(`[TestAPI] ${msg}`);
}

function TestAPI() {

    const APIStatus = {
        0: 'Dead',
        1: 'Alive',
        2: 'Processing'
    };

    const classes = useStyles();
    const [apiResult, setApiResult] = useState('Attempting to call API ...');
    const [payloadResult, setPayloadResult] = useState({status: 'No API Results Yet'});
    const [apiStatus, setAPIStatus] = useState(APIStatus[2]);

    const createAPICall =  () => fetch('http://localhost:9000/testAPI');
    const apiPayloadTest = () => fetch('http://localhost:9000/testAPI/payload');
    const resetAPI = () => fetch('http://localhost:9000/testAPI/reset');

    useEffect(() => {

        log('Calling the API');

        setTimeout( () => {
            return Promise.all([
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
                setAPIStatus(APIStatus[1]);
                log(testAPI);
                log(payLoad.status);
                window.apiPayload = JSON.stringify(payLoad);
            }).catch(err => {
                log('API CALL HAS FAILED');
                setPayloadResult({status: 'THE API IS A ☕ POT'});
                setApiResult('FETCH FAILED');
                setAPIStatus(0);
            });
        }, 500)


    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    function getClasses() {

        return classNames('App-logo', {
            spin: payloadResult.status === 'THE API IS NOT A TEAPOT ☕'  ? true : false,
        })
    }

    const handleApiReset = () => {
            setAPIStatus(APIStatus[2]);
            resetAPI().then( (res) => {
                console.log(res);
                if (res.status !== 200) {
                    setAPIStatus(0);
                    return false;
                };
                setAPIStatus(APIStatus[1]);
                setApiResult(`0 Successful API Calls`);
            }).catch( () => setAPIStatus(0) );
    }

    function handleApiCall(_timeout = 500) {
        setAPIStatus(APIStatus[2]);
        return setTimeout( () => {
            createAPICall()
                .then( async ( res ) => {
                    console.log(res);
                    setAPIStatus(-1);
                    if (res.status !== 200) {
                        setAPIStatus(0);
                        return false;
                    };
                    const apiResult = await res.text();
                    setApiResult(`0 Successful API Calls`);
                    setApiResult(apiResult);
                    setAPIStatus(1);
                }).catch( () => setAPIStatus(0) );
        }, _timeout)
    }

    let spamCalls = 0;

    function spamApiCall() {
        if(spamCalls === 1) {
            setAPIStatus(APIStatus[2]);
        }
        createAPICall();
        createAPICall();
        createAPICall();
        createAPICall();
        createAPICall();
        if (spamCalls < 99) {
            setTimeout( spamApiCall, 50);
            spamCalls++
        } else {
            handleApiCall(10);
            spamCalls = 0;
        }
    };

    function mapButtons() {

        if(apiStatus === APIStatus[2]) {
            return ( <CircularProgress /> );
        }

        return [
            {cB: handleApiCall, text: 'CALL API', type: 'default', contained: true},
            {cB: spamApiCall, text: 'SPAM API', type: 'secondary'},
            {cB: handleApiReset, text: 'RESET API', type: 'primary'},
        ].map( (button, ind) => {
            return (
                <Button
                    key={ind}
                    variant={apiStatus && !button.contained ? 'outlined' : 'contained'}
                    color={apiStatus ? button.type : 'secondary'}
                    onClick={button.cB}
                >
                    {button.text}
                </Button>
            )
        })
    }

    function getStatusText() {
        if(apiStatus === APIStatus[2]) {
            return null;
        }
        return `API STATUS: ${apiStatus ? apiResult : 'THE API IS A ☕ POT'}`
    }

    function showTeapot() {
        return (
            <img src={teapot} className={getClasses()} alt="logo" />
        )
    }

    if(apiStatus === APIStatus[2]) {
        return ( <CircularProgress /> );
    }

    return (
        <div>
            {showTeapot()}
            <p className="tea-pot-font">
                {getStatusText()}
            </p>
            <div className={classes.root}>
                {mapButtons()}
            </div>
        </div>
    );
}

export default TestAPI;