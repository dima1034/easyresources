var Q = require('q');

var appDefer = function () {
    var ctor = function () {
        var defer = Q.defer();
        defer.errors = [];
        defer.data = undefined;
        defer.addError = function (error) {
            var msg = error.stack ? error.stack : error;
            defer.errors.push(msg);
        };
        defer.hasErrors = function () {
            return defer.errors.length > 0;
        };
        defer.rejectWithError = function (error) {
            defer.addError(error);
            defer.reject(defer.errors);
        };
        defer.setData = function (data) {
            defer.data = data;
        };
        defer.setDataSafeExecution = function(handler) {
            try {
                defer.setData(handler());
            } catch (e) {
                defer.addError(e);
            } finally {
                defer.finalize();
            }
        };
        defer.finalize = function () {
            if (!defer.hasErrors()) {
                defer.resolve(defer.data);
            } else {
                defer.reject(defer.errors);
            }
        };
        
        return defer;
    };
    
    return ctor;
};

module.exports = appDefer();