(function () {
    angular.module("myapp")
    .filter('CamelCase', function () {
        return function (text) {
            var reg = /([^\W_]+[^\s-]*) */g; //: /([^\W_]+[^\s-]*)/;
            return text.replace(reg, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    })
    .filter('customDate', function ($filter) {
        return function (input) {
            var format = "";
            var date = new Date(Number(input));
            var today = new Date();
            today = today.setHours(0, 0, 0, 0);
            if (date > today) {
                format = $filter('date')(date, 'HH:mm');
            }
            else if ((today - date) > 86400000) {
                format = "Yest, " + $filter('date')(date, 'HH:mm');
            }
            else {
                format = $filter('date')(date, 'yyyy-MM-dd');
            }
            return format;
        }
    })
    .filter('GetObject', function () {
        return function (propertyName, propertyValue, collection) {
            var result = null;
            angular.forEach(collection, function (value, index) {
                if (value[propertyName] == propertyValue) {
                    result = {
                        'object': value,
                        'index': index
                    };
                }
            })
            return result;
        }
    });
})();