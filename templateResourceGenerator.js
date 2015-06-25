var parser = require('./parser');
var fs = require('fs');

var generator = function(){
	return {
		generate: generate
	};

	function generate(templateName, resourceFileName, outputDir) {
		if (!templateName) {
			throw new Error('Template name is not specified');
		}
		
		if (!fs.existsSync(resourceFileName)) {
			throw new Error('Resource file ' + resourceFileName + ' does not exist');
		}
		
		console.log(resourceFileName + ' file parsing started...');
		var json = parser.parseTemplateResources(resourceFileName, templateName);
		console.log('parsing finished');
		
		console.log('generating output...');
		createOutputDirectory();
		createResourceFiles(json);
		
		function createResourceFiles(json) {
			for (var locale in json) {
				var jsonData = JSON.stringify(json[locale], null, 4);
				var localeFileName = generateLocaleName(locale) + ".json";
				fs.writeFileSync(outputDir + localeFileName, jsonData);
				console.log(outputDir + localeFileName);
			}
		}
		
		function generateLocaleName(locale){
			var localeName = locale;
			var index = localeName.indexOf("#");
			if(index > 1){
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