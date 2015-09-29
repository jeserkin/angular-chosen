/**
 * angular-chosen 0.0.1-rc.4
 * @author Eugene Serkin
 * @license MIT License http://opensource.org/licenses/MIT
 */
"use strict";

(function(angular) {
    angular.module("angular-chosen", []);
    angular.module("angular-chosen").directive("chosen", function($parse, $timeout) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, defaultText = "", _init = function(element, options) {
            options = element.chosen(options).data("chosen");
            element.trigger("chosen:updated");
            defaultText = options.default_text;
            element.addClass("angular-chosen");
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
        }, _disableStateMonitoring = function(element, attrs) {
            attrs.$observe("disabled", function() {
                return element.trigger("chosen:updated");
            });
        }, _enable = function(element) {
            element.attr("data-placeholder", defaultText).removeAttr("disabled").trigger("chosen:updated");
        }, _disable = function(element, options) {
            element.attr("data-placeholder", options.results_none_found).attr("disabled", "disabled").trigger("chosen:updated");
        };
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, iElement, iAttrs, ngModelCtrl) {
                var _el = angular.element(iElement), options = $parse(iAttrs.chosen)() || {}, _ngOptionsMonitoring = function(element) {
                    if (!iAttrs.ngOptions || !ngModelCtrl) {
                        return;
                    }
                    var match = iAttrs.ngOptions.match(NG_OPTIONS_REGEXP), valuesExpr = match[7];
                    scope.$watchCollection(valuesExpr, function(newVal) {
                        $timeout(function() {
                            if (angular.isUndefined(newVal)) {} else {
                                _enable(element);
                                if (_isEmpty(newVal)) {
                                    _disable(element, options);
                                }
                            }
                        });
                    });
                };
                if (ngModelCtrl) {
                    ngModelCtrl.$formatters.push(function(modelValue) {
                        _init(_el, options, defaultText);
                        return modelValue;
                    });
                    ngModelCtrl.$parsers.push(function(viewValue) {
                        return viewValue;
                    });
                    ngModelCtrl.$isEmpty = function(value) {
                        return !value || value.length === 0;
                    };
                    ngModelCtrl.$validators.required = function(modelValue) {
                        if (angular.isUndefined(iAttrs.required) || iAttrs.required === false) {
                            return true;
                        }
                        return !ngModelCtrl.$isEmpty(modelValue);
                    };
                }
                _ngOptionsMonitoring(_el);
                _disableStateMonitoring(_el, iAttrs);
            }
        };
    });
})(angular);