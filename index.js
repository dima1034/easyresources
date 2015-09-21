#! /usr/bin/env node

var program = require('commander'),
    resourceGenerationService = require('./lib/resourceGenerationService');

program
    .version('0.0.8')
    .on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ easyresources generate-app-resources -w "Resources" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"');
    console.log('    $ easyresources ga');
    console.log('');
    console.log('    $ easyresources generate-template-resources -t "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"');
    console.log('    $ easyresources gt -t "Simple course"');
    console.log('');
    console.log('    $ easyresources generate-template-resources-from-local-file -t "Simple course" -f "resources.xlsx" -o "_output"');
    console.log('    $ easyresources gtf -t "Simple course"');
});

program
  .command('generate-app-resources')
  .alias('ga')
  .description('Generates json resource files for app from google spreadsheet resource file')
  .option("-w, --worksheetName [templateName]", "Worksheet name [Resources]")
  .option("-f, --resourceId [resourceFileId]", "Google spreadsheet resource file id [1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58]")
  .option("-o, --outputPath [outputPath]", "Output path [_output]")
  .action(function (options) {
    resourceGenerationService.generateAppResources(options.templateName, options.resourceFileId, options.outputPath);
});

program
  .command('generate-template-resources')
  .alias('gt')
  .description('Generates json resource files for templates from google spreadsheet resource file')
  .option("-t, --templateName <templateName>", "Template name")
  .option("-f, --resourceId [resourceFileId]", "Google spreadsheet resource file id [1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58]")
  .option("-o, --outputPath [outputPath]", "Output path [_output]")
  .action(function (options) {
    resourceGenerationService.generateTemplateResources(options.templateName, options.resourceFileId, options.outputPath);
});

program
  .command('generate-template-resources-from-local-file')
  .alias('gtf')
  .description('Generates json resource files for templates from excel workbook(*.xlsx) resource file')
  .option("-t, --templateName <templateName>", "Template name")
  .option("-f, --resourceFilePath [resourceFilePath]", "Resource file path *.xlsx [resources.xlsx]")
  .option("-o, --outputPath [outputPath]", "Output path [_output]")
  .action(function (options) {
    resourceGenerationService.generateTemplateResourcesFromLocalFile(options.templateName, options.resourceFilePath, options.outputPath);
});

program.parse(process.argv);
