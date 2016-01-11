#Macroscope Kiosk

The macroscope kiosk is an application through which users can access macroscope tools from the 2016 iteration of the *Places & Spaces: Mapping Science* exhibit. 

Generated with [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular).

Also depends on [Angular Material](https://material.angularjs.org), [Videogular](http://www.videogular.com/), and [ng-idle](https://hackedbychinese.github.io/ng-idle/).

## Getting Started

### Setup
Install required tools gulp and bower:
```
npm install -g gulp bower
```

Install dependencies:
```
npm install
```
and
```
bower install
```

### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

More information on the gulp tasks in the [User Gruide](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md).

### Note about videogular module
At present, the videogular icon font doesn't get properly packaged in the `build` step. As a result, they've been copied from */bower_components/videogular-themes/default/fonts* to */src/assets/fonts* and a CSS rule has been added to *index.css*. If the videogular theme is updated or changed, those fonts will need to be updated manually (or by fixing the gulp build step). 

## Touch-specific browser settings

### Chrome
Open *chrome://flags*

Disable swipe gesture control of history navigation:
- `overscroll history navigation` to `Disabled`

Disable browser zooming with the pinch gesture in desktop Chrome by doing one of the following:
- Enable the `Enable viewport meta tag` setting (preferred)
- Set `Enable pinch scale` to `Disabled`

Use the *Kiosk* extension to disable right-click and force fullscreen. 

### Firefox
Open *about:config*

Disable browser zooming with the pinch gesture in desktop Firefox:
- Set `zoom.maxPercent` and `zoom.minPercent` to 100

Unfortunately, this disables pinch zooming inside macroscopes as well, but it is the only way to keep Firefox from zooming the whole page at this time.

Use the *R-Kiosk* extension to disable right-click and force fullscreen.
