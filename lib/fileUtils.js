var 
    fs = require('fs');

var utils = function () {
    return {
        fileExists: fileExists,
        writeToFile: writeToFile,
        writeBufferToExistingFile: writeBufferToExistingFile,
        createDirectory: createDirectory
    };
    
    function writeBufferToExistingFile(filePath, buffer) {
        fs.open(filePath, 'w', function (err, fd) {
            if (err) {
                throw 'Error while opening the file: ' + err;
            }
            
            fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                if (err) {
                    throw 'Error while writing file: ' + err;
                }
                
                fs.close(fd);
            });
        });
    }
    
    function writeToFile(path, data) {
        fs.writeFileSync(path, data);
    }
    
    function fileExists(fileName) {
        return fs.existsSync(fileName);
    }
    
    function createDirectory(dirPath) {
        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach(function (file) {
                var curPath = dirPath + "/" + file;
                fs.unlinkSync(curPath);
            });
        } else {
            fs.mkdirSync(dirPath);
        }
    }
};

module.exports = utils();

