var resourceGenerator = require('./resourceGenerator.js'),
    logger = require('./infrastructure/logger'),
    dataReceiver = require('./dataReceiver');

var service = function () {
    var defaults = {
        worksheetName: 'Resources',
        resourceFile: '1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58',
        output: '_output'
    };
    
    function generateResources(options) {
        var worksheetName = options.worksheetName || defaults.worksheetName,
            resourceFile = options.resourceFile || defaults.resourceFile,
            outputPath = options.outputPath || defaults.output,
            useDefaultLocalizationWhenNoTranslation = useDefaultLocalizationWhenNoTranslation == 1,
            excludeLocalizations = options.excludeLocalizations;

        return dataReceiver.receive(resourceFile, worksheetName, excludeLocalizations, useDefaultLocalizationWhenNoTranslation)
            .then(function (data) {
            return resourceGenerator.generate(data, outputPath).then(function () {
                logger.logSuccess('Resource generation finished successfully!');
            });
        })
            .fail(function (errors) {
            logger.logWarn('Failed to generate resources due to following errors:');
            if (errors && errors.length) {
                errors.forEach(function (error) {
                    logger.logError(error);
                });
            } else {
                logger.logError(errors);
            }
        });
    }
    
    return {
        generateResources: generateResources
    };

};

module.exports = service();