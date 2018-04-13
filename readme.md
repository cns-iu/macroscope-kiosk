# Macroscope Kiosk

The macroscope kiosk is an application through which users can access macroscope tools from [Iteration XI](http://scimaps.org/iteration/11) of the *[Places & Spaces: Mapping Science](http://scimaps.org/)* exhibit.

## Technical Background

This is an [AngularJS](https://angularjs.org/)-based web application that is designed to be run as a touchscreen kiosk. It was scaffolded using the [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular) [Yeoman](http://yeoman.io/) generator.

It uses [Bower](http://bower.io/) (client-side) and [npm](https://www.npmjs.com/) (developer-side) for package management.

Client-side, it uses [UIRouter](https://angular-ui.github.io/ui-router/) for page routing, [Angular Material](https://material.angularjs.org) for layout and widgets, [Videogular](http://www.videogular.com/) for a custom video player, and [ng-idle](https://hackedbychinese.github.io/ng-idle/) for the idle mode. See *bower.json*.

Developer-side, it uses [GulpJS](http://gulpjs.com/) for task automation, [BrowserSync](https://www.browsersync.io/) for live page-refresh, [Karma](https://karma-runner.github.io) + [Jasmine](http://jasmine.github.io/) for unit testing, and [Protractor](http://www.protractortest.org) for e2e testing, among others. See *package.json*.

## Code Description

### index
The initial setup of the app is done in all files that start with *index*. This setup includes module injection, style definitions, routing definitions, and the root page *index.html*, into which the rest of the app is injected.

### main
The *main* module contains the header, the idle overlay, and a container to hold the rest of the app's content. It consists of the HTML template (*main.html*), controller (*main.controller.js*), and unit tests for the controller (*main.controller.spec.js*).

### breadcrumb
The *breadcrumb* template is located within main. It controls updating the breadcrumb links for navigation between iterations and macroscopes. It consists of an HTML template (*breadcrumb.html*) and associated style definitions (*breadcrumb.css*).

### macroscopes
The *macroscopes* module is a service which provides the basic details of each macroscope. The macroscopes are defined in a simple array, but it could one day be extended to fetch the macroscopes from a file or database if desired. Unit tests for this service are provided in *macroscopes.service.spec.js*.

#### Iteration XII Changes
The additional iteration pages are defined as parent objects in the same json array that defines the macroscopes.

### iteration
The *iteration* module defines the iteration buttons on the home page. It consists of an HTML template (*iteration.html*) and associated style definitions (*iteration.css*).

### grid
The *grid* module defines the macroscope buttons on the home page. It consists of an HTML template (*grid.html*) and associated style definitions (*grid.css*).

### macro
The *macro* module defines the display of a specific macroscope. A macroscope page contains a sidenav pane with buttons and the main container showing the macroscope itself.

- *macro.html* - the HTML template
- *macro.css* - style
- *macro.controller.js* - controller
- *macro.controller.spec.js* - unit tests for the controller
- *templates* - HTML templates for the dialogs

#### Iteration XII Changes
The *macro* module no longer manages the sidenav pane. It now only determines if the macroscope container needs to add controls for the video player.


### trustedUrl
The *trustedUrl* module is a trivial service to tell Angular to trust a URL for use in an `iframe` within the *macro* module.

## Development Setup
1. Install [NodeJS](https://nodejs.org), which will automatically install the npm package manager.

2. Create a local clone of this repo.

3. Install required tools gulp and bower:
```
npm install -g gulp bower
```

4. Install dependencies:
```
npm install
```
and
```
bower install
```

## Development Workflow

1. Use `gulp serve` to launch a browser sync server on the source files. This will open a browser window which automatically reloads whenever you save a file.

### List of Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application

More information on the gulp tasks in the [User Guide](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md).

### Building Issues

The home icon for the breadcrumb menu does not get properly packaged. When building, change the url from `../../../assets/images/home.png` to `../assets/images/home.png`

At present, the videogular icon font doesn't get properly packaged in the `build` step. As a result, they've been copied from */bower_components/videogular-themes/default/fonts* to */src/assets/fonts* and a CSS rule has been added to *index.css*. If the videogular theme is updated or changed, those fonts will need to be updated manually (or someone will have to fix the gulp build step).

In addition, the `src` for the video is currently hard-coded due to issues with how `videogular` handles dynamic sources. Future iterations that feature videos will either have to continue hard-coding or figure out how to fix the problem.

## Deployment

Generate the build for deployment using `gulp build`. Copy the contents of */dist/* to the deployment machine.

The application will need to be run in a full-screen web browser, and efforts need to be made to keep users from exiting the browser or accessing the OS. For iteration XIII, we are using Chrome as a few macroscopes do not run in firefox. 

### Iteration XIII Deployment
We used [Electron](http://electron.atom.io/) to package the website into an executable. Through electron, restrictions for zoom and touch can be controlled similarly to the web browser deployment method, but with the added benefit of being in a self contained package. An alternative deployment method used in past iterations is still described below.

### Web Browser Deployment strategy 
We used a computer running Windows 10. We had to set the Windows display scaling to 100 in order to keep the browser from scaling up the UI.

We used Google Chrome web browser for launching the macroscope. To pass the needed settings into a shortcut link, you

- Set it to open the home page on launch, and set the home page to the kiosk app's *index.html*
- Disable browser zooming with the pinch gesture
  1. Open *about:config*
  2. Set `zoom.maxPercent` and `zoom.minPercent` to 100 (Unfortunately, this disables pinch zooming inside macroscopes as well, but it is the only way to keep Firefox from zooming the whole page.)

- Install the [R-Kiosk](https://addons.mozilla.org/en-US/firefox/addon/r-kiosk/) extension to disable right-click and force fullscreen

To prevent user access to the OS, we ran started the kiosk app with a batch script which disabled the *explorer* shell while the kiosk app was running. That script looks something like this:

```
taskkill /f /im explorer.exe
"C:\Users\Kiosk\Documents\FirefoxPortable\FirefoxPortable.exe"
explorer.exe
```

### Future Deployments
Future iterations may wish to use Chrome instead of Firefox. To configure Chrome for kiosk use, use the following steps:

- Disable browser zooming and history swiping
  1. Open *chrome://flags*
  2. Set `overscroll history navigation` to `Disabled`
  3. Either enable the `Enable viewport meta tag` setting (preferred) or set `Enable pinch scale` to `Disabled`

- Use the [Kiosk](https://chrome.google.com/webstore/detail/kiosk/afhcomalholahplbjhnmahkoekoijban) extension to disable right-click and force fullscreen

