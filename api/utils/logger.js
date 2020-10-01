const log = (msgSource) => {
    return (msg) => {
        console.log(`${msgSource} ${msg}`);
    };
};

exports.apiLog = log('[TestAPI]');