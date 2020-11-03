import React from 'react';
import Logger from '../services/Logger';
const logger = new Logger('[Lander]');

function Lander() {

    logger.log(`All systems are go 🚀`);

    return (
        <div>
            <span role="img" aria-label="rocket">🚀</span>
        </div>
    );
}

export default Lander;