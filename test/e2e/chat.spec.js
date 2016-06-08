describe('e2e test for chat client', function () {
  var waitUntilReady = function (elm) {
    browser.wait(function () {
      return elm.isPresent()
    }, 10000)
    browser.wait(function () {
      return elm.isDisplayed()
    }, 10000)
  }

  beforeEach(function () {
    browser.get('http://localhost:9000')
    browser.manage().window().maximize()
    browser.waitForAngular()
  })

  it('should have disabled Connect Button if text input is empty', function () {
    waitUntilReady(element(by.css('.nick-choose button')))
    expect(element(by.css('.nick-choose button')).isEnabled()).toBe(false)
  })

  it('should have disabled Send Button if text input is empty', function () {
    waitUntilReady(element(by.model('chat.nick.name')))
    waitUntilReady(element(by.css('.nick-choose button')))

    element(by.model('chat.nick.name')).sendKeys('John Smith')
    element(by.css('.nick-choose button')).click()

    waitUntilReady(element(by.css('.panel-footer button')))
    expect(element(by.css('.panel-footer button')).isEnabled()).toBe(false)
  })

  it('should connect with a nickname, send a message and disconnect', function () {
    waitUntilReady(element(by.model('chat.nick.name')))
    waitUntilReady(element(by.css('.nick-choose button')))
    element(by.model('chat.nick.name')).sendKeys('Maria88')
    element(by.css('.nick-choose button')).click()

    waitUntilReady(element(by.model('chat.text')))
    waitUntilReady(element(by.css('.panel-footer button')))
    waitUntilReady(element(by.css('.panel-heading button')))

    element(by.model('chat.text')).sendKeys('testing text')
    element(by.css('.panel-footer button')).click()
    element(by.css('.panel-heading button')).click()
  })

  it('should connect with a nickname and send a message with ENTER', function () {
    waitUntilReady(element(by.model('chat.nick.name')))
    waitUntilReady(element(by.css('.nick-choose button')))
    element(by.model('chat.nick.name')).sendKeys('Sofia 1234 & ...')
    element(by.css('.nick-choose button')).sendKeys(protractor.Key.ENTER)

    waitUntilReady(element(by.model('chat.text')))
    waitUntilReady(element(by.css('.panel-footer button')))
    waitUntilReady(element(by.css('.panel-heading button')))

    element(by.model('chat.text')).sendKeys('testing text')
    element(by.css('.panel-footer button')).sendKeys(protractor.Key.ENTER)
    element(by.css('.panel-heading button')).click()
  })

  it('should generate message objects', function () {
    waitUntilReady(element(by.model('chat.nick.name')))
    waitUntilReady(element(by.css('.nick-choose button')))
    element(by.model('chat.nick.name')).sendKeys('Meedoc Test App')
    element(by.css('.nick-choose button')).click()

    waitUntilReady(element(by.model('chat.text')))
    waitUntilReady(element(by.css('.panel-footer button')))
    waitUntilReady(element(by.css('.panel-heading button')))

    element(by.model('chat.text')).sendKeys('testing text')
    element(by.css('.panel-footer button')).click()
    expect(element.all(by.repeater('messageObject in chat.messageObjects')).count()).toBeGreaterThan(1)
    element(by.css('.panel-heading button')).click()
  })
})
