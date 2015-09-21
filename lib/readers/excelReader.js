var
    Defer = require('./../infrastructure/defer'),
    fileUtils = require('./../infrastructure/fileUtils'),
    logger = require('./../infrastructure/logger'),
    xlsx = require('node-xlsx');

var receiver = function () {
    function read(defer, fileName, worksheetName) {
        logger.log('Receive data from excel workbook "' + fileName + '"');
        var data;
        xlsx.parse(fileName).forEach(function (worksheet) {
            if (worksheet.name !== worksheetName)
                return;
            
            if (data) {
                defer.addError('Duplicate worksheet name "' + worksheetName + '"');
            }
            
            data = worksheet.data;
        });
        
        if (!data) {
            defer.addError('Worksheet with name "' + worksheetName + '" has not been found');
        }
        
        return data;
    }
    
    function readWorksheet(fileName, worksheetName) {
        var defer = new Defer();
        
        if (!worksheetName) {
            defer.addError('Worksheet name is not specified');
        }
        if (!fileUtils.fileExists(fileName)) {
            defer.addError('File ' + fileName + ' does not exist');
        }
        
        if (defer.hasErrors()) {
            defer.complete();
            return defer.promise;
        }
        
        defer.setDataSafeExecution(function () {
            return read(defer, fileName, worksheetName);
        });
        
        return defer.promise;
    }
    
    return {
        readWorksheet: readWorksheet
    };
};

module.exports = receiver();