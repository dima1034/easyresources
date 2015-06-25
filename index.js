var parser = require('./parser');
var fs = require('fs');

function resourceGenerator(){
	return {
		generateTemplateResources: generateTemplateResources
	};

	function generateTemplateResources(templateName, resourceFileName, outputDir) {
		if (!templateName) {
			throw 'Template name is not specified';
		}
		
		if (!fs.existsSync(resourceFileName)) {
			throw 'Resource file ' + resourceFileName + ' does not exist';
		}
		
		var json = parser.parseTemplateResources(resourceFileName, templateName);
		createOutputDirectory();
		createResourceFiles(json);
		
		function createResourceFiles(json) {
			for (var locale in json) {
				var jsonData = JSON.stringify(json[locale]);
				var localeFileName = locale + ".js";
				fs.writeFileSync(outputDir + localeFileName, jsonData);
				console.log(outputDir + localeFileName);
			}
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
}

module.exports = resourceGenerator();