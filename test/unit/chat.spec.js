'use strict'

describe('Controller: ChatCtrl', function () {
  beforeEach(module('mdCodingTestApp'))

  var ChatCtrl,
    scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new()
    ChatCtrl = $controller('ChatCtrl', {
      $scope: scope
    })
  }))

  it('should have injected controller', function () {
    expect(ChatCtrl).not.toBeNull()
  })

  it('should have connected and published message if WebSocket is opened', function () {
    ChatCtrl.publishMessage(1, '{\"sender\":\"John\",\"message\":\"Hello World!\"}')
    expect(ChatCtrl.connected).toBe(true)
    expect(ChatCtrl.messageObjects.length).toBe(1)
  })

  it('should have reset scope variables if WebSocket is closed', function () {
    ChatCtrl.publishMessage(3, null)
    expect(ChatCtrl.connected).toBe(false)
    expect(ChatCtrl.error).toBe('')
    expect(ChatCtrl.messageObjects.length).toBe(0)
    expect(ChatCtrl.nick).toEqual({name: ''})
    expect(ChatCtrl.text).toEqual('')
  })

  it('should reset scope variables', function () {
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
