var xlsx = require('node-xlsx'),
    argumentValidation = require('./argumentValidation'),
    fs = require('fs'),
    stringUtils = require('./stringUtils'),
    Q = require('q');

var receiver = function () {
    return {
        receive: receive
    };
    
    function receive(templateName, fileName) {
        argumentValidation.throwIfNotDefined(templateName, 'Template name is not specified');
        argumentValidation.throwIfFileDoesNotExist(fileName);
                
        var defer = Q.defer();
        var json = {};
        xlsx.parse(fileName).forEach(function (sheet) {
            if (sheet.name != templateName)
                return;
            
            var columnNames = getColumnNames();
            
            columnNames.forEach(function (columnName) {
                json[columnName] = {};
            });
            
            sheet.data.forEach(parseRow);
            
            defer.resolve(json);

            function parseRow(row) {
                var key = stringUtils.getStringValue(row.shift());
                if (!key)
                    return;
                
                row.forEach(function (cellValue, index) {
                    var value = stringUtils.getStringValue(cellValue);
                    var columnName = columnNames[index];
                    
                    if (value && columnName) {
                        var locale = json[columnName];
                        locale[key] = value;
                    }
                });
            }
            
            function getColumnNames() {
                var columns = (sheet.data || []).shift() || [];
                columns.shift();
                return columns;
            }
        });

        return defer.promise;
    }
};

module.exports = receiver();