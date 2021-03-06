import React, { useState, useEffect } from 'react';
import teapot from '../../assets/tea-pot.svg';
import robot from '../../assets/robot.svg';
import classNames from 'classnames';
import Logger from '../../services/Logger';
import { numberWithCommas } from '../../tools/Formatter';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const logger = new Logger('[TestAPI]');

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

        logger.log('Calling the API');
        logger.log(`API Uri: ${APIuri}`);

        setTimeout(() => {
            return Promise.all([
                    createAPICall(),
                    apiPayloadTest()
                ]).then(async ([testAPI, payLoad]) => {
                    logger.log('API Call successful, setting state');
                    const TestAPI = await testAPI.text();
                    const PayLoad = await payLoad.json();
                    return [TestAPI, PayLoad];
                })
                .then(([testAPI, payLoad]) => {
                    setApiResult(numberWithCommas(testAPI));
                    setPayloadResult(payLoad);
                    setAPIStatus(APIStatus[1]);
                    logger.log(testAPI);
                    logger.log(payLoad.status);
                    window.apiPayload = JSON.stringify(payLoad);
                }).catch(err => {
                    logger.log('API CALL HAS FAILED');
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
        });
    }

    const successStatus = [200, 201];

    // API Utils
    const handleApiReset = () => {
        resetAPI().then((res) => {
            console.log(res);
            if (!successStatus.includes(res.status)) {
                setAPIStatus(0);
                return false;
            };
            setAPIStatus(APIStatus[1]);
            setApiResult(`0 Successful API Calls`);
        }).catch(() => setAPIStatus(0));
    };

    function handleApiCall(_timeout = 500) {
        return createAPICall()
            .then(async (res) => {
                if (!successStatus.includes(res.status)) {
                    setAPIStatus(0);
                    return false;
                };
                const apiResult = await res.text();
                setApiResult(numberWithCommas(apiResult));
            })
            .then(() => setAPIStatus(APIStatus[1]))
            .catch(() => setAPIStatus(0));
    }

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

    var spamCalls = 0;

    async function spamApiCall() {

        if (spamCalls === 0) {
            createAPICall();
            setAPIStatus(APIStatus[2]);
            spamCalls++
            setTimeout(spamApiCall, 50);
        } else {
            createAPICall()
                .then( () => {
                    if (spamCalls < 498) {
                        spamCalls++
                        setTimeout(spamApiCall, 50);
                    } else {
                        spamCalls = 0;
                        handleApiCall(0);
                        setTimeout(onlineCheck, 1500);
                    }
                });
        }

    };

    async function spamApiCallLive() {

        if (spamCalls === 0) {
            createAPICall();
            setAPIStatus(APIStatus[2]);
            spamCalls++
            setTimeout(spamApiCallLive, 50);
        } else {
            createAPICall()
                .then( () => {
                    if (spamCalls < 48) {
                        spamCalls++
                        setTimeout(spamApiCallLive, 50);
                    } else {
                        spamCalls = 0;
                        handleApiCall(0);
                        setTimeout(onlineCheck, 1500);
                    }
                });
        }

    };

    // UI Helpers
    function mapButtons() {

        return [
            { cB: handleApiCall, text: 'CALL API', type: 'primary'},
            { cB: handleApiReset, text: 'RESET API', type: 'secondary' },
            { cB: spamApiCall, text: 'SPAM API', type: 'default', hide: process.env.NODE_ENV === 'production', contained: true },
            { cB: spamApiCallLive, text: 'TURBO CALL', type: 'default', hide: process.env.NODE_ENV === 'production', contained: true },
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
                );
            }
        });
    }

    function getStatusText() {

        return `API STATUS: ${apiStatus ? apiResult : 'THE API IS A ☕ POT'}`;
    }

    function showTeapot() {

        /**************************************************************
         * Note, you won't see the benefit of this in Dev             *
         * Using npm run start-sw will activate local Service Workers *
         * SW which will cache the image as it would in production    *
         **************************************************************/

        return (
            <img src={apiStatus ? robot : teapot } className={getClasses()} alt="logo" />
        );
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