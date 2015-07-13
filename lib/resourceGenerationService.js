var googleSpreadsheetDataReceiver = require('./googleSpreadsheet/dataReceiver'),
    excelWorkbookDataReceiver = require('./excelWorkbook/dataReceiver'),
    resourceGenerator = require('./resourceGenerator.js');

var service = function () {
    return {
        generateFromExcelWorkbook: generateFromExcelWorkbook,
        generateFromGoogleSpreadsheet: generateFromGoogleSpreadsheet
    };
    
    function generateFromExcelWorkbook(templateNameArg, resourceFilePathArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFilePath = resourceFilePathArg || "resources.xlsx",
            outputPath = outputPathArg || "_output/";
        
        generate(function () {
            return excelWorkbookDataReceiver.receive(resourceFilePath, templateName);
        }, outputPath);
    }
    
    function generateFromGoogleSpreadsheet(templateNameArg, resourceFileIdArg, outputPathArg) {
        var templateName = templateNameArg,
            resourceFileId = resourceFileIdArg || "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58",
            outputPath = outputPathArg || "_output/";

        generate(function () {
            return googleSpreadsheetDataReceiver.receive(resourceFileId, templateName);
        }, outputPath);
    }
    
    function generate(receiveHandler, outputPath) {
        console.log('Data receiving started...');
        receiveHandler().then(function (data) {
            console.log('Files generation started...');
            resourceGenerator.generate(data, outputPath);
        });
    }

};

module.exports = service();