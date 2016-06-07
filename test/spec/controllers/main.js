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

  it('should replace \'Anonymous\' with nick.name', function () {
    ChatCtrl.nick = {name: 'Matthew'}
    expect(ChatCtrl.welcomeByNick('Anonymous')).toEqual('Matthew')
    expect(ChatCtrl.welcomeByNick('anonymous')).toEqual('anonymous')
    expect(ChatCtrl.welcomeByNick('Welcome Anonymous')).toEqual('Welcome Matthew')
    expect(ChatCtrl.welcomeByNick('Believe those who are seeking the truth; doubt those who find it.')).toEqual('Believe those who are seeking the truth; doubt those who find it.')
    expect(ChatCtrl.welcomeByNick('')).toEqual('')
  })
})
