var 
    googleSpreadsheetReader = require('./googleSpreadsheetReader'),
    excelReader = require('./excelReader'),
    Defer = require('./../infrastructure/defer'),
    logger = require('./../infrastructure/logger');

var reader = function () {
    
    function readWorksheet(resourceFile, worksheetName) {
        logger.log('Data reading...');
        
        if (!resourceFile) {
            var defer = new Defer();
            defer.rejectWithError('Resource file name is not specified');
            return defer.promise;
        }
        
        var extension = '.xlsx';
        if (resourceFile.indexOf(extension, resourceFile.length - extension.length) !== -1) {
            return excelReader.readWorksheet(resourceFile, worksheetName);
        } else {
            return googleSpreadsheetReader.readWorksheet(resourceFile, worksheetName);
        }
    }
    
    return {
        readWorksheet: readWorksheet
    };
};

module.exports = reader();