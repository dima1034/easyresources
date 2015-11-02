var Defer = require('./../infrastructure/defer'),
    GoogleSpreadsheet = require("google-spreadsheet"),
    stringUtils = require('./../infrastructure/stringUtils'),
    logger = require('./../infrastructure/logger');

var reader = function () {
    return {
        readWorksheet: readWorksheet
    }
    
    function readWorksheet(resourceFileId, worksheetName) {
        logger.log('Read data from google spreadsheet...');
        var defer = new Defer();
        
        if (!worksheetName) {
            defer.addError('Worksheet name is not specified');
        }
        if (!resourceFileId) {
            defer.addError('Google spreadsheet resource file id is not specified');
        }
        
        if (defer.hasErrors()) {
            defer.finalize();
            return defer.promise;
        }
        
        return getWorksheet(resourceFileId, worksheetName)
            .then(function (worksheet) {
            return buildWorksheetData(worksheet);
        });
        
        function getWorksheet(resourceFileId, worksheetName) {
            var defer = new Defer();
            var spreadsheet = new GoogleSpreadsheet(resourceFileId);
            spreadsheet.getInfo(function (error, info) {
                if (error) {
                    defer.rejectWithError(error);
                    return;
                }
                
                var worksheet = info.worksheets.filter(function (item) {
                    return item.title.trim() === worksheetName.trim();
                })[0];
                
                defer.resolve(worksheet);
            });
            
            return defer.promise;
        }
        
        function buildWorksheetData(worksheet) {
            var defer = new Defer();
            if (!worksheet) {
                defer.rejectWithError('Worksheet "' + worksheetName.trim() + '" is not found in the spreadsheet');
                return defer.promise;
            }
            
            return getWorksheetCells(worksheet).then(function (cells) {
                return parseWorksheet(cells);
            });
        }
        
        function parseWorksheet(cells) {
            var defer = new Defer();
            try {
                var parsedData = [];
                cells.forEach(function (cell) {
                    var row = cell.row - 1,
                        col = cell.col - 1;
                    
                    if (!parsedData[row]) {
                        parsedData[row] = [];
                    }
                    
                    parsedData[row][col] = stringUtils.getStringValue(cell.value);
                });
                
                defer.resolve(parsedData);
            } catch (e) {
                defer.rejectWithError(e);
            }
            
            return defer.promise;
        }
        
        function getWorksheetCells(worksheet) {
            var defer = new Defer();
            worksheet.getCells({}, function (err, cells) {
                if (err) {
                    defer.rejectWithError(err);
                    return;
                }
                
                defer.resolve(cells);
            });
            
            return defer.promise;
        }
    }
}

module.exports = reader();


