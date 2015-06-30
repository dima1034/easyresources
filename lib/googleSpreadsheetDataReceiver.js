var GoogleSpreadsheet = require("google-spreadsheet"),
    argumentValidation = require('./argumentValidation'),
    stringUtils = require('./stringUtils'),
    Q = require('q');

var receiver = function () {
    return {
        receive: receive
    }
    
    function receive(resourceFileId, templateName) {
        argumentValidation.throwIfNotDefined(templateName, 'Template name is not specified');
        argumentValidation.throwIfNotDefined(resourceFileId, 'Google spreadsheet resource file id is not specified');
        
        var defer = Q.defer();
        var spreadsheet = new GoogleSpreadsheet(resourceFileId);
        spreadsheet.getInfo(function (error, info) {
            if (error) {
                console.log(error);
            }
            
            var worksheet = info.worksheets.filter(function (item) {
                return item.title.trim() === templateName.trim();
            })[0];
            
            argumentValidation.throwIfNotDefined(worksheet, 'Worksheet "' + templateName.trim() + '" is not found in the spreadsheet');
            
            worksheet.getCells({}, function (err, cells) {
                var data = parseWorksheet();
                var json = createJsonData(data);
                
                defer.resolve(json);
                
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
                
                function createJsonData() {
                    var jsonData = {};
                    for (var i = 1; i < data.length; i++) {
                        var key = data[i][0];
                        
                        for (var j = 1; j < data[0].length; j++) {
                            var locale = data[0][j];
                            var val = data[i][j];
                            
                            if (!jsonData[locale]) {
                                jsonData[locale] = {};
                            }
                            
                            if (key && val) {
                                jsonData[locale][key] = val;
                            }
                        }
                    }
                    
                    return jsonData;
                }
            });
        }
        );
        
        return defer.promise;
    }
}

module.exports = receiver();


