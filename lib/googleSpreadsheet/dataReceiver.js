var worksheetReader = require("./worksheetReader"),
    argumentValidation = require('./../argumentValidation'),
    logger = require('./../logger'),
    Q = require('q'),
    stringUtils = require('./../stringUtils');

var receiver = function () {
    return {
        receive: receive
    }
    
    function receive(resourceFileId, worksheetName, useDefaultLocalizationWhenNoTranslation) {
        argumentValidation.throwIfNotDefined(worksheetName, 'Worksheet name is not specified');
        argumentValidation.throwIfNotDefined(resourceFileId, 'Google spreadsheet resource file id is not specified');
        
        var defer = Q.defer();
        
        logger.log('Receive data from google spreadsheet with id "' + resourceFileId + '"');
        worksheetReader.read(resourceFileId, worksheetName)
            .then(function (data) {
            var errors = [],
                json;
            
            try {
                json = createJsonData(data);
            } catch (e) {

            }
            
            defer.resolve({
                data: json,
                errors: errors
            });
            
            function createJsonData() {
                var jsonData = {},
                    keyIndex = getKeyIndex(),
                    defaultLocale = stringUtils.getStringValue(data[0][keyIndex + 1]);
                
                if (keyIndex === -1) {
                    errors.push('Key column has not been found');
                    return jsonData;
                }
                
                if (!defaultLocale) {
                    errors.push('Default localization has not been found');
                    return jsonData;
                }
                
                for (var i = 1; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    
                    var key = stringUtils.getStringValue(data[i][keyIndex]);
                    if (!key) {
                        continue;
                    }
                    
                    if (jsonData[defaultLocale] && jsonData[defaultLocale][key]) {
                        errors.push('Dulpicate localization key "' + key + '"');
                    }
                    
                    for (var j = keyIndex + 1; j < data[0].length; j++) {
                        var locale = stringUtils.getStringValue(data[0][j]);
                        var val = stringUtils.getStringValue(data[i][j]);
                        
                        if (!jsonData[locale]) {
                            jsonData[locale] = {};
                        }
                        
                        if (val) {
                            jsonData[locale][key] = val;
                        } else {
                            var isDefaultLocalization = j === keyIndex + 1;
                            if (isDefaultLocalization) {
                                errors.push('Localization entry with key "' + key + '" does not have value in default (' + defaultLocale.toUpperCase() + ') localization');
                            }
                            
                            if (useDefaultLocalizationWhenNoTranslation) {
                                jsonData[locale][key] = stringUtils.getStringValue(data[i][keyIndex + 1]);
                            }
                        }
                    }
                }
                
                return jsonData;
            }
            
            function getKeyIndex() {
                var titles = data[0],
                    keyIndex = -1;
                
                titles.forEach(function (val, index) {
                    var title = stringUtils.getStringValue(val);
                    if (title && title.toLowerCase() === 'key') {
                        keyIndex = index;
                        return;
                    }
                });
                
                return keyIndex;
            }
        });
        
        return defer.promise;
    }
}

module.exports = receiver();


