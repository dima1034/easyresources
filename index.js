#! /usr/bin/env node

var program = require('commander');
var templateResouceGenerator = require('./templateResourceGenerator');

program
    .version('0.0.6')
    .on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ easyresources generate -t "Simple course" -f "resources.xlsx" -o "_output/"');
    console.log('    $ easyresources generate -t "Simple course"');
    console.log('');
});

program
  .command('generate')
  .alias('g')
  .description('Generates json resource files for templates from *.xlsx resource file')
  .option("-t, --templateName <templateName>", "Template name")
  .option("-f, --resourceFilePath [resourceFilePath]", "Resource file path *.xlsx")
  .option("-o, --outputPath [outputPath]", "Output path")
  .action(function (options) {
    var resourceFilePath = options.resourceFilePath || "resources.xlsx";
    var outputPath = options.outputPath || "_output/";
    
    templateResouceGenerator.generate(options.templateName, resourceFilePath, outputPath);
});

program.parse(process.argv);