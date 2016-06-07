describe('directive tests', function() {

  var waitUntilReady = function (elm) {
    browser.wait(function () {
      return elm.isPresent()
    },10000)
    browser.wait(function () {
      return elm.isDisplayed()
    },10000)
  }
  
  beforeEach(function() {
    browser.get('http://localhost:9000')
    browser.manage().window().maximize()
    browser.waitForAngular()
  })
  
  it('should have disabled Connect Button if text input is empty', function() {
    waitUntilReady(element(by.css('.nick-choose button')));
    expect(element(by.css('.nick-choose button')).isEnabled()).toBe(false);
  })

});
