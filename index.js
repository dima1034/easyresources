#! /usr/bin/env node

var program = require('commander'),
    resourceGenerationService = require('./lib/resourceGenerationService');

program
    .version('0.0.16')
    .on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('  Generate resources');
    console.log('');
    console.log('    $ easyresources g %MODE%');
    console.log('    $ easyresources generate %MODE% -w "Resources" -f "%RESOURCE_FILE%" -o "_output" -e "nl, de"');
    console.log('    $ easyresources generate %MODE% --worksheetName "Resources" --resourceFile "%RESOURCE_FILE%" --outputPath "_output" --excludeLocalizations "nl, de"');
    console.log('');
    console.log('  %MODE% - optional. Possible values:');
    console.log('');
    console.log('    • app - is used by default');
    console.log('    • template');
    console.log('');
    console.log('  %RESOURCE_FILE% possible values:');
    console.log('');
    console.log('    • Google spreadsheet file id, eg "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58"');
    console.log('    • Local .xlsx file, eg "resources.xlsx"');
});

program
  .command('generate [mode]')
  .alias('g')
  .description('Generates json resource files spreadsheet resource file')
  .option("-w, --worksheetName [worksheetName]", "Worksheet name [Resources]")
  .option("-f, --resourceFile [resourceFile]", "Spreadsheet resource file [1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58]")
  .option("-o, --outputPath [outputPath]", "Output path [_output]")
  .option("-e, --excludeLocalizations [excludeLocalization]", "Exclude localizations, separated by ','")
  .action(function (mode, options) {
    resourceGenerationService.generateResources(mode, options);
});

program.parse(process.argv);
