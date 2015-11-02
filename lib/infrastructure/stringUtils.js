var utils = function() {
    return {
        getStringValue: getStringValue,
        getLocaleName: getLocaleName
    };
    
    function getStringValue(str) {
        var value = String(str).trim();
        return (str == null || !value.length) ? null : value;
    }

    function getLocaleName(locale) {
        var localeName = locale;
        var index = localeName.indexOf("#");
        if (index > 1) {
            localeName = localeName.substr(0, index);
        }
        
        return localeName.trim().toLowerCase();
    }
};

module.exports = utils();

