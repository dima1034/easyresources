var googleSpreadsheetReader = require('./readers/googleSpreadsheetReader'),
    excelReader = require('./readers/excelReader'),
    resourceGenerator = require('./resourceGenerator.js'),
    logger = require('./infrastructure/logger'),
    dataReceiver = require('./dataReceiver');

var service = function () {
    var defaults = {
        resourceFileId: '1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58',
        output: '_output'
    }
    
    function generateTemplateResourcesFromLocalFile(templateNameArg, resourceFilePathArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFilePath = resourceFilePathArg || 'resources.xlsx',
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return excelReader.readWorksheet(resourceFilePath, templateName);
        }, outputPath, false);
    }
    
    function generateTemplateResources(templateNameArg, resourceFileIdArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFileId = resourceFileIdArg || defaults.resourceFileId,
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return googleSpreadsheetReader.readWorksheet(resourceFileId, templateName);
        }, outputPath, false);
    }
    
    function generateAppResources(worksheetNameArg, resourceFileIdArg, outputPathArg) {
        var worksheetName = worksheetNameArg || 'Resources',
            resourceFileId = resourceFileIdArg || defaults.resourceFileId,
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return googleSpreadsheetReader.readWorksheet(resourceFileId, worksheetName);
        }, outputPath, true);
    }
    
    function generate(readHandler, outputPath, useDefaultLocalizationWhenNoTranslation) {
        logger.log('Data reading started...');
        readHandler().then(function (worksheetData) {
            logger.log('Data formatting started...');
            return dataReceiver.receive(worksheetData, useDefaultLocalizationWhenNoTranslation).then(function (data) {
                logger.log('Files generation started...');
                return resourceGenerator.generate(data, outputPath).then(function () {
                    logger.logSuccess('Resource generation finished successfully!');
                });
            });
        }).fail(function (errors) {
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
        generateTemplateResourcesFromLocalFile: generateTemplateResourcesFromLocalFile,
        generateTemplateResources: generateTemplateResources,
        generateAppResources: generateAppResources
    };

};

module.exports = service();