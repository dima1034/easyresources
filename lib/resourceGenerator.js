var fileUtils = require('./fileUtils'),
    argumentValidation = require('./argumentValidation'),
    logger = require('./logger');

var generator = function () {
    return {
        generate: generate
    };
    
    function generate(json, outputDir) {
        argumentValidation.throwIfNotDefined(json, 'Json data is undefined');
        argumentValidation.throwIfNotDefined(outputDir, 'Output dir path is undefined');
        
        fileUtils.createDirectory(outputDir);
        createResourceFiles();

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
    }
};

module.exports = generator();