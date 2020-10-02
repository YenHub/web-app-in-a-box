import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  success: {
      backgroundColor: '#00ff00',
  }
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
            setAPIStatus(0);
            log(testAPI);
            log(payLoad.status);
            window.apiPayload = JSON.stringify(payLoad);
        }).catch(err => {
            log('API CALL HAS FAILED');
            setPayloadResult({status: 'THE API IS A ☕ POT'});
            setApiResult('FETCH FAILED');
            setAPIStatus(-1);
        });

    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    function getClasses() {

        return classNames('App-logo', {
            spin: payloadResult.status === 'THE API IS NOT A TEAPOT ☕'  ? true : false,
        })
    }

    const handleApiReset = () => {
            resetAPI().then( (res) => {
                console.log(res);
                if (res.status !== 200) {
                    setAPIStatus(-1);
                    return false;
                };
                setApiResult(`0 Successful API Calls`);
            }).catch( () => setAPIStatus(-1) );
    }

    function handleApiCall() {
        return createAPICall()
            .then( async ( res ) => {
                console.log(res);
                setAPIStatus(-1);
                if (res.status !== 200) {
                    setAPIStatus(-1);
                    return false;
                };
                const apiResult = await res.text();
                setApiResult(`0 Successful API Calls`);
                setApiResult(apiResult);
                setAPIStatus(0);
            }).catch( () => setAPIStatus(-1) );
    }

    function mapButtons() {
        return [
            {cB: handleApiCall, text: 'CALL API', type: 'default', contained: true},
            {cB: handleApiReset, text: apiStatus !== -1 ? 'RESET API' : 'RESET FAILED', type: 'primary'},
        ].map( (button, ind) => {
            return (
                <Button key={ind} variant={apiStatus !== -1 && !button.contained ? 'outlined' : 'contained'} color={apiStatus !== -1 ? button.type : 'secondary'} onClick={button.cB}>
                    {button.text}
                </Button>
            )
        })
    }

    return (
        <div>
            <img src={teapot} className={getClasses()} alt="logo" />
            <p className="tea-pot-font">
                API STATUS: {apiResult}
            </p>
            <div className={classes.root}>
                {mapButtons()}
            </div>
        </div>
    );
}

export default TestAPI;