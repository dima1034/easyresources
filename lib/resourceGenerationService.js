var googleSpreadsheetDataReceiver = require('./googleSpreadsheet/dataReceiver'),
    excelWorkbookDataReceiver = require('./excelWorkbook/dataReceiver'),
    resourceGenerator = require('./resourceGenerator.js'),
    logger = require('./logger');

var service = function () {
    var defaults = {
        resourceFileId: '1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58',
        output: '_output'
    }
    
    return {
        generateTemplateResourcesFromLocalFile: generateTemplateResourcesFromLocalFile,
        generateTemplateResources: generateTemplateResources,
        generateAppResources: generateAppResources
    };
    
    function generateTemplateResourcesFromLocalFile(templateNameArg, resourceFilePathArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFilePath = resourceFilePathArg || 'resources.xlsx',
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return excelWorkbookDataReceiver.receive(resourceFilePath, templateName);
        }, outputPath);
    }
    
    function generateTemplateResources(templateNameArg, resourceFileIdArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFileId = resourceFileIdArg || defaults.resourceFileId,
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return googleSpreadsheetDataReceiver.receive(resourceFileId, templateName, false);
        }, outputPath);
    }
    
    function generateAppResources(worksheetNameArg, resourceFileIdArg, outputPathArg) {
        var worksheetName = worksheetNameArg || 'Resources',
            resourceFileId = resourceFileIdArg || defaults.resourceFileId,
            outputPath = outputPathArg || defaults.output;
        
        generate(function () {
            return googleSpreadsheetDataReceiver.receive(resourceFileId, worksheetName, true);
        }, outputPath);
    }
    
    function generate(receiveHandler, outputPath) {
        logger.log('Data receiving started...');
        receiveHandler().then(function (result) {
            if (result.errors.length > 0) {
                logger.logWarn('Failed to generate resources due to following errors:');
                result.errors.forEach(function (error) {
                    logger.logError(error);
                });
                
                return;
            }
            
            logger.log('Files generation started...');
            resourceGenerator.generate(result.data, outputPath);
            logger.logSuccess('Resource generation finished successfully!');
        });
    }

};

module.exports = service();