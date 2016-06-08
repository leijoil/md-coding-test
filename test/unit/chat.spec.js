'use strict'

describe('Controller: ChatCtrl', function () {
  // load the controller's module
  beforeEach(module('mdCodingTestApp'))

  var ChatCtrl,
    scope

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new()
    ChatCtrl = $controller('ChatCtrl', {
      $scope: scope
      // place here mocked dependencies
    })
  }))

  it('should have injected ChatCtrl', function () {
    expect(ChatCtrl).not.toBeNull()
  })

  it('should connect and publish message', function () {
    ChatCtrl.publishMessage(1, '{\"sender\":\"John\",\"message\":\"Hello World!\"}')
    expect(ChatCtrl.connected).toBe(true)
    expect(ChatCtrl.messageObjects.length).toBe(1)
  })

  it('should connect, show welcome and publish message', function () {
    ChatCtrl.publishMessage(1, '{\"sender\":\"MeeBot\",\"message\":\"Hello Anonymous! Let\'s get started!\"}')
    expect(ChatCtrl.connected).toBe(true)
    expect(ChatCtrl.messageObjects.length).toBe(1)
  })

  it('should reset scope-variables', function () {
    ChatCtrl.connected = true
    ChatCtrl.error = 'This is an error'
    ChatCtrl.messageObjects = ['cargo', 'cult', 'is', 'for', 'real']
    ChatCtrl.nick = {name: 'Maria'}
    ChatCtrl.text = 'Hello World!'
    ChatCtrl.reset()
    expect(ChatCtrl.connected).toBe(false)
    expect(ChatCtrl.error).toBe('')
    expect(ChatCtrl.messageObjects.length).toBe(0)
    expect(ChatCtrl.nick).toEqual({name: ''})
    expect(ChatCtrl.text).toEqual('')
  })
})
