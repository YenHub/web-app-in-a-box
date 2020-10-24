import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import robot from '../../assets/robot.svg';
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

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const log = (msg) => {
    console.log(`[TestAPI] ${msg}`);
}

const APIuri = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV;

function TestAPI() {

    const classes = useStyles();

    const [apiResult, setApiResult] = useState('Attempting to call API ...');
    const [payloadResult, setPayloadResult] = useState({ status: 'No API Results Yet' });
    const [apiStatus, setAPIStatus] = useState('Processing');

    const APIStatus = {
        0: 'Dead',
        1: 'Alive',
        2: 'Processing'
    };

    const createAPICall = () => fetch(`${APIuri}/testAPI`);
    const apiPayloadTest = () => fetch(`${APIuri}/testAPI/payload`);
    const resetAPI = () => fetch(`${APIuri}/testAPI/reset`);

    useEffect(() => {

        log('Calling the API');
        log(`API Uri: ${APIuri}`);

        setTimeout(() => {
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
                    setApiResult(numberWithCommas(testAPI));
                    setPayloadResult(payLoad);
                    setAPIStatus(APIStatus[1]);
                    log(testAPI);
                    log(payLoad.status);
                    window.apiPayload = JSON.stringify(payLoad);
                }).catch(err => {
                    log('API CALL HAS FAILED');
                    setPayloadResult({ status: 'THE API IS A ☕ POT' });
                    setApiResult('FETCH FAILED');
                    setAPIStatus(0);
                });
        }, 250)

        // eslint-disable-next-line
    }, []); // << DON'T FORGET TO NO DEPS IF YOU DON'T WANT TO SPAM IT...!

    // Utils
    function getClasses() {

        return classNames('App-logo', {
            spin: payloadResult.status === 'THE API IS NOT A TEAPOT ☕' ? true : false,
        })
    }

    // API Utils
    const handleApiReset = () => {
        resetAPI().then((res) => {
            console.log(res);
            if (res.status !== 200) {
                setAPIStatus(0);
                return false;
            };
            setAPIStatus(APIStatus[1]);
            setApiResult(`0 Successful API Calls`);
        }).catch(() => setAPIStatus(0));
    }

    function handleApiCall(_timeout = 500) {
        return createAPICall()
            .then(async (res) => {
                if (res.status !== 200) {
                    setAPIStatus(0);
                    return false;
                };
                const apiResult = await res.text();
                setApiResult(numberWithCommas(apiResult));
            })
            .then(() => setAPIStatus(APIStatus[1]))
            .catch(() => setAPIStatus(0));
    }

    let spamCalls = 0;

    function onlineCheck(promise) {
        return new Promise(function(resolve, reject) {
            const timeout = setTimeout(function() {
                reject(setAPIStatus(0));
            }, 3000);
            fetch(`${APIuri}`)
                .then((res) => {
                    if (res.status !== 403) {
                        return;
                    }
                    clearTimeout(timeout);
                    resolve(setAPIStatus(APIStatus[1]));
                })
                .catch(() => reject(setAPIStatus(0)));
        })
    }

    async function spamApiCall() {
        if (spamCalls === 0) {
            createAPICall();
            setAPIStatus(APIStatus[2]);
        }
        createAPICall();
        createAPICall();
        createAPICall();
        if (spamCalls < 165) {
            setTimeout(spamApiCall, 50);
            spamCalls++
        } else {
            spamCalls = 0;
            handleApiCall(0);
            setTimeout(onlineCheck, 1500);
        }
    };

    // UI Helpers
    function mapButtons() {

        return [
            { cB: handleApiCall, text: 'CALL API', type: 'default', contained: true },
            { cB: spamApiCall, text: 'SPAM API', type: 'secondary', hide: process.env.NODE_ENV === 'production' },
            { cB: handleApiReset, text: 'RESET API', type: 'primary' },
        ].map((button, ind) => {
            if (button.hide) {
                return null;
            } else {
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
            }
        })
    }

    function getStatusText() {

        return `API STATUS: ${apiStatus ? apiResult : 'THE API IS A ☕ POT'}`
    }

    function showTeapot() {

        /**************************************************************
         * Note, you won't see the benefit of this in Dev             *
         * Using npm run start-sw will activate local Service Workers *
         * SW which will cache the image as it would in production    *
         **************************************************************/

        return (
            <img src={apiStatus ? robot : teapot } className={getClasses()} alt="logo" />
        )
    }

    // Loading Spinner
    if (apiStatus === APIStatus[2]) {
        return (<CircularProgress />);
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