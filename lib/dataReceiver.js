var logger = require('./infrastructure/logger'),
    Defer = require('./infrastructure/defer.js'),
    stringUtils = require('./infrastructure/stringUtils');

var reader = function () {
    return {
        receive: receive
    }
    
    function receive(data, useDefaultLocalizationWhenNoTranslation) {
        logger.log('Localization data formatting...');

        var defer = new Defer();

        if (!data) {
            defer.rejectWithError('Worksheet data is not specified');
            return defer.promise;
        }

        defer.setDataSafeExecution(createJsonData);

        function createJsonData() {
            var jsonData = {},
                keyIndex = getKeyIndex(),
                defaultLocale = stringUtils.getStringValue(data[0][keyIndex + 1]);
            
            if (keyIndex === -1) {
                defer.rejectWithError('Key column has not been found');
                return null;
            }
            
            if (!defaultLocale) {
                defer.rejectWithError('Default localization has not been found');
                return null;
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
                    defer.addError('Dulpicate localization key "' + key + '"');
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
                            defer.addError('Localization entry with key "' + key + '" does not have value in default (' + defaultLocale.toUpperCase() + ') localization');
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
        
        return defer.promise;
    }
}

module.exports = reader();


