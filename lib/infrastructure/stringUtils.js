var utils = function() {
    return {
        getStringValue: getStringValue
    };
    
    function getStringValue(str) {
        var value = String(str).trim();
        return (str == null || !value.length) ? null : value;
    }
};

module.exports = utils();

