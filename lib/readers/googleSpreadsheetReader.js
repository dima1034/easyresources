var Defer = require('./../infrastructure/defer'),
    GoogleSpreadsheet = require("google-spreadsheet"),
    stringUtils = require('./../infrastructure/stringUtils'),
    logger = require('./../infrastructure/logger');

var reader = function () {
    
    function readWorksheet(resourceFileId, worksheetName) {
        logger.log('Read data from google spreadsheet "' + resourceFileId + '"...');
        var defer = new Defer();
        
        if (!worksheetName) {
            defer.addError('Worksheet name is not specified');
        }
        if (!resourceFileId) {
            defer.addError('Google spreadsheet resource file id is not specified');
        }
        
        if (defer.hasErrors()) {
            defer.complete();
            return defer.promise;
        }
        
        var spreadsheet = new GoogleSpreadsheet(resourceFileId);
        
        spreadsheet.getInfo(function (error, info) {
            if (error) {
                defer.rejectWithError(error);
                return;
            }
            
            var worksheet = info.worksheets.filter(function (item) {
                return item.title.trim() === worksheetName.trim();
            })[0];
            
            if (!worksheet) {
                defer.rejectWithError('Worksheet "' + worksheetName.trim() + '" is not found in the spreadsheet');
                return;
            }
            
            worksheet.getCells({}, function (err, cells) {
                defer.setDataSafeExecution(parseWorksheet);
                
                function parseWorksheet() {
                    var parsedData = [];
                    cells.forEach(function (cell) {
                        var row = cell.row - 1,
                            col = cell.col - 1;
                        
                        if (!parsedData[row]) {
                            parsedData[row] = [];
                        }
                        
                        parsedData[row][col] = stringUtils.getStringValue(cell.value);
                    });
                    
                    return parsedData;
                }
               
            });
        });
        
        return defer.promise;
    }
    
    return {
        readWorksheet: readWorksheet
    }
}

module.exports = reader();


