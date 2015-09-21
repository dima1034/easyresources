var 
    colors = require('colors');

var logger = function () {
    function log(text) {
        console.log(colors.data(text));
    }
    
    function logSuccess(text) {
        console.log(colors.info(text));
    }
    
    function logWarn(text) {
        console.log(colors.warn(text));
    }
    
    function logError(text) {
        console.log(colors.error(text));
    }
    
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });
    
    return {
        log: log,
        logSuccess: logSuccess,
        logWarn: logWarn,
        logError: logError
    };
};

module.exports = logger();

