var fs = require('fs'),
    logger = require('./logger');

var validation = function () {
    return {
        throwIfNotAnArray: throwIfNotAnArray,
        throwIfNotDefined: throwIfNotDefined,
        throwIfFileDoesNotExist: throwIfFileDoesNotExist
    };
    
    function throwIfNotAnArray(array, msg) {
        if (!array || array.length < 1) {
            logger.logError(msg);
            throw new Error(msg);
        }
    }
    
    function throwIfFileDoesNotExist(fileName) {
        if (!fs.existsSync(fileName)) {
            var msg = 'File ' + fileName + ' does not exist';
            logger.logError(msg);
            throw new Error(msg);
        }
    }
    
    function throwIfNotDefined(val, msg) {
        if (!val) {
            logger.logError(msg);
            throw new Error(msg);
        }
    }
};

module.exports = validation();