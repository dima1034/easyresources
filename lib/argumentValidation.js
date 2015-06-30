var fs = require('fs');

var validation = function () {
    return {
        throwIfNotAnArray: throwIfNotAnArray,
        throwIfNotDefined: throwIfNotDefined,
        throwIfFileDoesNotExist: throwIfFileDoesNotExist
    };
    
    function throwIfNotAnArray(array, msg) {
        if (!array || array.length < 1) {
            throw new Error(msg);
        }
    }
    
    function throwIfFileDoesNotExist(fileName) {
        if (!fs.existsSync(fileName)) {
            throw new Error('File ' + fileName + ' does not exist');
        }
    }
    
    function throwIfNotDefined(val, msg) {
        if (!val) {
            throw new Error(msg);
        }
    }
};

module.exports = validation();