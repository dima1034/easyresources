#! /usr/bin/env node

var program = require('commander'),
    resourceGenerationService = require('./lib/resourceGenerationService');

program
    .version('0.0.6')
    .on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ easyresources generate-from-google-spreadsheet -t "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output/"');
    console.log('    $ easyresources generate -t "Simple course"');
    console.log('');
    console.log('    $ easyresources generate-from-excel-workbook -t "Simple course" -f "resources.xlsx" -o "_output/"');
    console.log('    $ easyresources ge -t "Simple course"');
});

program
  .command('generate-from-google-spreadsheet')
  .alias('generate')
  .description('Generates json resource files for templates from google spreadsheet resource file')
  .option("-t, --templateName <templateName>", "Template name")
  .option("-f, --resourceId [resourceFileId]", "Google spreadsheet resource file id")
  .option("-o, --outputPath [outputPath]", "Output path")
  .action(function (options) {
    resourceGenerationService.generateFromGoogleSpreadsheet(options.templateName, options.resourceFileId, options.outputPath);
});

program
  .command('generate-from-excel-workbook')
  .alias('ge')
  .description('Generates json resource files for templates from excel workbook(*.xlsx) resource file')
  .option("-t, --templateName <templateName>", "Template name")
  .option("-f, --resourceFilePath [resourceFilePath]", "Resource file path *.xlsx")
  .option("-o, --outputPath [outputPath]", "Output path")
  .action(function (options) {
    resourceGenerationService.generateFromExcelWorkbook(options.templateName, options.resourceFilePath, options.outputPath);
});

program.parse(process.argv);
