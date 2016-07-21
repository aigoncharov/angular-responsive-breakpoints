(function () {
    'use strict';

    angular
        .module('ngResponsiveBreakpoints', [])
        .provider('responsiveBreakpoints', responsiveBreakpointsProvider);

    function responsiveBreakpointsProvider() {
        this._responsiveBreakpoints = [
            {
                code: 'xs',
                value: 600
            },
            {
                code: 'sm',
                value: 960
            },
            {
                code: 'md',
                value: 1280
            },
            {
                code: 'lg',
                value: 1920
            }
        ];
        this._greaterPostfix = 'Gt';

        this.setResponsiveBreakpoints = setProperty.bind(this, '_responsiveBreakpoints');
        this.setGreaterPostfix = setProperty.bind(this, '_greaterPostfix');
        this.$get = ['$rootScope', '$window', responsiveBreakpointsFactory.bind(this)];
    }

    function setProperty(prop, newVal) {
        if (newVal) {
            this[prop] = newVal;
        }
    }

    function responsiveBreakpointsFactory($rootScope, $window) {
        return new ResponsiveBreakpointsService($rootScope, $window, this._responsiveBreakpoints, this._greaterPostfix);
    }

    function ResponsiveBreakpointsService($rootScope, $window, breakpoints, greaterPostfix) {
        var service = this;

        $rootScope.$watch(
            function () {
                return $window.innerWidth;
            },
            function (windowWidth) {
                breakpoints.forEach(function (item, key) {
                    service[item.code] = windowWidth <= item.value && (breakpoints[key - 1] ? breakpoints[key - 1].value < windowWidth : true);
                });

                breakpoints.forEach(function (item) {
                    service[item.code + greaterPostfix] = windowWidth > item.value;
                });
            }
        );

        angular.element($window).bind('resize', function () {
            $rootScope.$apply();
        });
    }
})();
