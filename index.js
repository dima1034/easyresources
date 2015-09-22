#! /usr/bin/env node

var program = require('commander'),
    resourceGenerationService = require('./lib/resourceGenerationService');

program
    .version('0.0.9')
    .on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('  Generate app resources');
    console.log('');
    console.log('    $ easyresources g');
    console.log('    $ easyresources generate -w "Resources" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"');
    console.log('    $ easyresources generate --worksheetName "Resources" --resourceFile "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" --outputPath "_output"');
    console.log('');
    console.log('  Generate template resources');
    console.log('');
    console.log('    $ easyresources g template -w "Simple course"');
    console.log('    $ easyresources generate template -w "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"');
    console.log('    $ easyresources generate template --worksheetName "Simple course" --resourceFile "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" --outputPath "_output"');
    console.log('');
    console.log('  Generate app resources from local .xlsx file');
    console.log('');
    console.log('    $ easyresources g -f "resources.xlsx"');
    console.log('    $ easyresources generate -w "Resources" -f "resources.xlsx" -o "_output"');
    console.log('    $ easyresources generate --worksheetName "Resources" --resourceFile "resources.xlsx" --outputPath "_output"');
    console.log('');
    console.log('  Generate template resources from local .xlsx file');
    console.log('');
    console.log('    $ easyresources g template -w "Simple course" -f "resources.xlsx"');
    console.log('    $ easyresources generate template -w "Simple course" -f "resources.xlsx" -o "_output"');
    console.log('    $ easyresources generate template --worksheetName "Simple course" --resourceFile "resources.xlsx" --outputPath "_output"');
});

program
  .command('generate [mode]')
  .alias('g')
  .description('Generates json resource files spreadsheet resource file')
  .option("-w, --worksheetName [worksheetName]", "Worksheet name [Resources]")
  .option("-f, --resourceFile [resourceFile]", "Spreadsheet resource file [1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58]")
  .option("-o, --outputPath [outputPath]", "Output path [_output]")
  .action(function (mode, options) {
    resourceGenerationService.generateResources(mode, options.worksheetName, options.resourceFile, options.outputPath);
});

program.parse(process.argv);
