var spreadsheetReader = require('./readers/spreadsheetReader'),
    resourceGenerator = require('./resourceGenerator.js'),
    logger = require('./infrastructure/logger'),
    dataReceiver = require('./dataReceiver');

var service = function () {
    var defaults = {
        mode: 'template',
        worksheetName:'Resources',
        resourceFile: '1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58',
        output: '_output'
    };
    
    function generateResources(modeArg, worksheetNameArg, resourceFileArg, outputPathArg) {
        var mode = modeArg || defaults.mode, 
            worksheetName = worksheetNameArg || defaults.worksheetName,
            resourceFile = resourceFileArg || defaults.resourceFile,
            outputPath = outputPathArg || defaults.output;
        
        spreadsheetReader.readWorksheet(resourceFile, worksheetName)
            .then(function (worksheetData) {
                return dataReceiver.receive(worksheetData, mode !== defaults.mode)
                    .then(function (data) {
                            return resourceGenerator.generate(data, outputPath).then(function () {
                                logger.logSuccess('Resource generation finished successfully!');
                            });
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