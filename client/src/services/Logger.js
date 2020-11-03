class Logger {
    constructor(service) {
        this.service = service;
    }
    log(msg) {
        console.log(`

    ${this.service}

    ${msg}

        `);
    }
}

export default Logger;