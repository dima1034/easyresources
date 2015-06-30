var fs = require('fs'),
    argumentValidation = require('./argumentValidation');

var generator = function () {
    return {
        generate: generate
    };
    
    function generate(json, outputDir) {
        argumentValidation.throwIfNotDefined(json, 'Json data is undefined');
        argumentValidation.throwIfNotDefined(outputDir, 'Output dir path is undefined');

        createOutputDirectory();
        createResourceFiles();

        function createResourceFiles() {
            for (var locale in json) {
                var jsonData = JSON.stringify(json[locale], null, 4);
                var localeFileName = generateLocaleName(locale) + ".json";
                fs.writeFileSync(outputDir + localeFileName, jsonData);
                console.log(outputDir + localeFileName);
            }
        }
        
        function generateLocaleName(locale) {
            var localeName = locale;
            var index = localeName.indexOf("#");
            if (index > 1) {
                localeName = localeName.substr(0, index);
            }
            
            return localeName.trim();
        }
        
        function createOutputDirectory() {
            if (fs.existsSync(outputDir)) {
                fs.readdirSync(outputDir).forEach(function (file) {
                    var curPath = outputDir + "/" + file;
                    fs.unlinkSync(curPath);
                });
            } else {
                fs.mkdirSync(outputDir);
            }
        }
    }
};

module.exports = generator();