var worksheetReader = require("./worksheetReader"),
    argumentValidation = require('./../argumentValidation'),
    Q = require('q');

var receiver = function () {
    return {
        receive: receive
    }
    
    function receive(resourceFileId, templateName) {
        argumentValidation.throwIfNotDefined(templateName, 'Template name is not specified');
        argumentValidation.throwIfNotDefined(resourceFileId, 'Google spreadsheet resource file id is not specified');
        
        var defer = Q.defer();

        console.log('Receive data from google spreadsheet with id "' + resourceFileId + '"');
        worksheetReader.read(resourceFileId, templateName)
            .then(function (data) {
            var json = createJsonData(data);
            defer.resolve(json);
            
            function createJsonData() {
                var jsonData = {};
                for (var i = 1; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    
                    var key = data[i][0];
                    if (!key) {
                        continue;
                    }
                    
                    for (var j = 1; j < data[0].length; j++) {
                        var locale = data[0][j];
                        var val = data[i][j];
                        
                        if (!jsonData[locale]) {
                            jsonData[locale] = {};
                        }
                        
                        if (val) {
                            jsonData[locale][key] = val;
                        }
                    }
                }
                
                return jsonData;
            }
        });
        
        return defer.promise;
    }
}

module.exports = receiver();


