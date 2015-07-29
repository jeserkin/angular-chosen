/**
 * angular-chosen 0.0.1
 * @author Eugene Serkin
 * @license MIT License http://opensource.org/licenses/MIT
 */
"use strict";

(function(angular) {
    angular.module("angular-chosen", []);
    angular.module("angular-chosen").directive("chosen", function($parse) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, iElement, iAttrs, ngModelCtrl) {
                var _el = angular.element(iElement), options = $parse(iAttrs.chosen)() || {}, defaultText = "";
                var _init = function(element) {
                    options = element.chosen(options).data("chosen");
                    element.trigger("chosen:updated");
                    defaultText = options.default_text;
                    _el.addClass("angular-chosen");
                }, _isEmpty = function(value) {
                    if (angular.isArray(value)) {
                        return value.length === 0;
                    } else if (angular.isObject(value)) {
                        var key;
                        for (key in value) {
                            if (value.hasOwnProperty(key)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }, _disableStateMonitoring = function(element) {
                    iAttrs.$observe("disabled", function() {
                        return element.trigger("chosen:updated");
                    });
                }, _enable = function(element) {
                    element.attr("data-placeholder", defaultText).removeAttr("disabled").trigger("chosen:updated");
                }, _disable = function(element) {
                    element.attr("data-placeholder", options.results_none_found).attr("disabled", "disabled").trigger("chosen:updated");
                }, _ngOptionsMonitoring = function(element) {
                    if (!iAttrs.ngOptions || !ngModelCtrl) {
                        return;
                    }
                    var match = iAttrs.ngOptions.match(NG_OPTIONS_REGEXP), valuesExpr = match[7];
                    scope.$watchCollection(valuesExpr, function(newVal) {
                        if (angular.isUndefined(newVal)) {} else {
                            _enable(element);
                            if (_isEmpty(newVal)) {
                                _disable(element);
                            }
                        }
                    });
                };
                ngModelCtrl.$formatters.push(function(modelValue) {
                    _init(_el);
                    return modelValue;
                });
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return viewValue;
                });
                ngModelCtrl.$isEmpty = function(value) {
                    return angular.isDefined(value);
                };
                _ngOptionsMonitoring(_el);
                _disableStateMonitoring(_el);
            }
        };
    });
})(angular);