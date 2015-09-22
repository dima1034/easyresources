var fileUtils = require('./infrastructure/fileUtils'),
    Defer = require('./infrastructure/defer'),
    logger = require('./infrastructure/logger');

var generator = function () {
    
    function doGenerate(defer, json, outputDir) {
        function createResourceFiles() {
            for (var locale in json) {
                var jsonData = JSON.stringify(json[locale], null, 4),
                    localeFileName = generateLocaleName(locale) + ".json",
                    filePath = outputDir + '/' + localeFileName;
                
                fileUtils.writeToFile(filePath, jsonData);
                logger.logSuccess(filePath);
            }
        }
        
        function generateLocaleName(locale) {
            var localeName = locale;
            var index = localeName.indexOf("#");
            if (index > 1) {
                localeName = localeName.substr(0, index);
            }
            
            return localeName.trim().toLowerCase();
        }

        fileUtils.createDirectory(outputDir);
        createResourceFiles();
    }
    
    function generate(json, outputDir) {
        logger.log('Files generation...');
        var defer = new Defer();
        
        if (!json) {
            defer.addError('Json data is undefined');
        }
        if (!outputDir) {
            defer.addError('Output dir path is undefined');
        }
        
        if (defer.hasErrors()) {
            defer.complete();
            return defer.promise;
        }
        
        defer.setDataSafeExecution(function () {
            return doGenerate(defer, json, outputDir);
        });

        return defer.promise;
    }
    
    return {
        generate: generate
    };
}

module.exports = generator();