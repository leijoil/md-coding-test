'use strict'

angular.module('mdCodingTestApp')
  .component('chat', {
    templateUrl: 'views/chat.html',
    controller: 'ChatCtrl as chat'
  })
  .controller('ChatCtrl', function ($scope, ChatService) {
    var chat = this
    chat.connected = false
    chat.nick = {name: null}

    chat.connect = function () {
      ChatService.connect()
    }

    ChatService.listen(function (error, readyState, message) {
      if (error) {
        console.log(error)
        chat.error = 'WebSocket error'
      } else {
        console.log(error, readyState, message)
      }
    })
    chat.welcomeByNick = function (welcomeMessage) {
      if (welcomeMessage.indexOf('Anonymous') >= 0) {
        welcomeMessage = welcomeMessage.replace('Anonymous', chat.nick.name)
      }
      return welcomeMessage
    }
  })
