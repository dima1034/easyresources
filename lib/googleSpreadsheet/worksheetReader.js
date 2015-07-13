var Q = require('q'),
    GoogleSpreadsheet = require("google-spreadsheet"),
    stringUtils = require('./../stringUtils'),
    argumentValidation = require('./../argumentValidation');

var reader = function () {
    return {
        read: read
    }
    
    function read(resourceFileId, worksheetName) {
        argumentValidation.throwIfNotDefined(worksheetName, 'Worksheet name is not specified');
        argumentValidation.throwIfNotDefined(resourceFileId, 'Google spreadsheet resource file id is not specified');
        
        var defer = Q.defer();
        var spreadsheet = new GoogleSpreadsheet(resourceFileId);
        spreadsheet.getInfo(function (error, info) {
            if (error) {
                console.log(error);
            }
            
            var worksheet = info.worksheets.filter(function (item) {
                return item.title.trim() === worksheetName.trim();
            })[0];
            
            argumentValidation.throwIfNotDefined(worksheet, 'Worksheet "' + worksheetName.trim() + '" is not found in the spreadsheet');
            
            worksheet.getCells({}, function (err, cells) {
                var data = parseWorksheet();
                defer.resolve(data);
                
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
        }
        );
        
        return defer.promise;
    }
}

module.exports = reader();


