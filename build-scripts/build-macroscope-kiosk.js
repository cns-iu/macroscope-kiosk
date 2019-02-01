const nativefier = require('nativefier').default;

// possible options, defaults unless specified otherwise
const options = {
  alwaysOnTop: true,
  disableContextMenu: true,
  disableDevTools: true,
  fullScreen: true,
  hideWindowFrame: true,
  ignoreGpuBlacklist: true,
  inject: ['./macroscope-zoom-fix.js'],
  insecure: true,
  name: 'macroscope-kiosk', // will be inferred if not specified
  targetUrl: 'http://idemo.cns.iu.edu/macroscope-kiosk/#/', // required 
};
nativefier(options, function(error, appPath) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('App has been nativefied to', appPath);
});