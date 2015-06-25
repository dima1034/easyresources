'use strict';

var xlsx = require('node-xlsx');

var parser = function() {
    return {
        parseTemplateResources: parseTemplateResources
    };
    
    function parseTemplateResources(fileName, templateName) {
        var json = {};
        
        xlsx.parse(fileName).forEach(function (sheet) {
            if (sheet.name != templateName)
                return;
            
            var columnNames = getColumnNames();
            
            columnNames.forEach(function (columnName) {
                json[columnName] = {};
            });
            
            sheet.data.forEach(parseRow);
            
            function parseRow(row) {
                var key = getStringValue(row.shift());
                if (!key)
                    return;
                
                row.forEach(function (cellValue, index) {
                    var value = getStringValue(cellValue);
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
            
            function getStringValue(str) {
                var value = String(str).trim();
                return (str == null || !value.length) ? null : value;
            }            
        });

        return json;
    }
};

module.exports = parser();