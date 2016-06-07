exports.config = {
  seleniumServerJar: '../node_modules/grunt-protractor-runner/node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

  specs: ['e2e/chat.spec.js'],
  browser: 'chrome',
  framework: 'jasmine2'
}
