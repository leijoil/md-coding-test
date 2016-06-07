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
  })
