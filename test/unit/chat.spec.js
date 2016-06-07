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
    expect(ChatCtrl.welcomeShowed).toBe(true)
    expect(ChatCtrl.messageObjects.length).toBe(1)
  })

  it('should replace \'Anonymous\' with nick.name', function () {
    ChatCtrl.nick = {name: 'Matthew'}
    expect(ChatCtrl.welcomeByNick('Anonymous')).toEqual('Matthew')
    expect(ChatCtrl.welcomeByNick('anonymous')).toEqual('anonymous')
    expect(ChatCtrl.welcomeByNick('Welcome Anonymous')).toEqual('Welcome Matthew')
    expect(ChatCtrl.welcomeByNick('Believe those who are seeking the truth; doubt those who find it.')).toEqual('Believe those who are seeking the truth; doubt those who find it.')
    expect(ChatCtrl.welcomeByNick('')).toEqual('')
  })

  it('should reset all scope-variables', function () {
    ChatCtrl.messageObjects = ['cargo', 'cult', 'is', 'for', 'real']
    ChatCtrl.connected = true
    ChatCtrl.nick = {name: 'Maria'}
    ChatCtrl.welcomeShowed = true
    ChatCtrl.text = 'Hello World!'
    ChatCtrl.error = 'This is an error'
    ChatCtrl.reset()
    expect(ChatCtrl.messageObjects.length).toBe(0)
    expect(ChatCtrl.connected).toBe(false)
    expect(ChatCtrl.nick).toEqual({name: null})
    expect(ChatCtrl.welcomeShowed).toBe(false)
    expect(ChatCtrl.text).toEqual('')
    expect(ChatCtrl.error).toBe('')
  })
})
