var fileUtils = require('./infrastructure/fileUtils'),
    Defer = require('./infrastructure/defer'),
    logger = require('./infrastructure/logger');

var generator = function () {
    
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
            defer.finalize();
            return defer.promise;
        }
        
        return fileUtils.createDirectory(outputDir)
        .then(function () {
            return createResourceFiles(json, outputDir);
        });
    }
    
    function createResourceFiles(json, outputDir) {
        var defer = new Defer();
        try {
            for (var locale in json) {
                createLocaleResourceFile(locale, json[locale], outputDir);
            }
            
            defer.resolve();
        } catch (e) {
            defer.rejectWithError(e);
        }
        
        return defer.promise;
    }
    
    function createLocaleResourceFile(locale, data, outputDir) {
        var jsonData = JSON.stringify(data, null, 4),
            filePath = getFilePath(locale, outputDir);
        
        fileUtils.writeToFile(filePath, jsonData);
        logger.logSuccess(filePath);
    }
    
    function getFilePath(locale, outputDir) {
        var filePath = outputDir, separator = "/";
        if (outputDir.indexOf(separator, outputDir.length - separator.length) === -1) {
            filePath += separator;
        }
        
        filePath += locale + ".json";
        return filePath;
    }
    
    return {
        generate: generate
    };
}

module.exports = generator();