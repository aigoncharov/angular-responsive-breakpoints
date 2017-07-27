# angular-responsive-breakpoints

Angular Responsive Breakpoints is a small lightweight angular service, providing a customizable set of screen breakpoints.

## Install

NPM
```
npm install --save angular-responsive-breakpoints
```

## Usage

- Add 'ngResponsiveBreakpoints' to you modules
```
angular.module('myApp', ['ngResponsiveBreakpoints']);
```
- Inject 'responsiveBreakpoints' in your controller and you are ready to go.
```
angular.module('myApp').controller('MyController', ['$scope','responsiveBreakpoints', MyController]);

function MyController($scope, responsiveBreakpoints) {
    $scope.screen = responsiveBreakpoints;
}


<div ng-show="screen.md"></div>
```

## Description

The service watches your window size and sets its keys by the following rules:
- responsiveBreakpoints[breakpoint.code] is true if window.innerWidth <= breakpoint.value and window.innerWidth > previousBreakpoint.value (if it exists)
- responsiveBreakpoints[breakpoint.code + postfix] is true if window.innerWidth > breakpoint.value

### Example

responsiveBreakpoints.xs is true if window.innerWidth <= 600px
responsiveBreakpoints.md is true if window.innerWidth <= 1280px and window.innerWidth > 960px
responsiveBreakpoints.smGt is true if window.innerWidth > 960px

## Customize breakpoints and postfix

By default the breakpoint set is a collection in a format of:
```
[
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
]
```
Default postfix is 'Gt'

In order to override it inject 'responsiveBreakpointsProvider' in your config
```
angular.module('myApp').config(['responsiveBreakpointsProvider', config]);

function config(responsiveBreakpointsProvider) {
    responsiveBreakpointsProvider.setResponsiveBreakpoints(/* pass your collection of breakpoints in ascending order here */);
    responsiveBreakpointsProvider.setGreaterPostfix(/* pass your postfix here */);
}
```

# Bower deprecation notice
Since version 0.2.0 bower package is no longer maintained.
You still can install an older verion from bower with
```
bower install --save angular-responsive-breakpoints
```
