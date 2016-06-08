'use strict'

angular.module('mdCodingTestApp')
  .component('chat', {
    templateUrl: 'views/chat.html',
    controller: 'ChatCtrl as chat'
  })
  .controller('ChatCtrl', ['$scope', 'ChatService', function ($scope, ChatService) {
    var chat = this
    chat.connected = false
    chat.date = new Date()
    chat.error = ''
    chat.messageObjects = []
    chat.nick = {name: ''}
    chat.text = ''
    chat.wsUri = 'wss://codingtest.meedoc.com/ws?username='

    chat.connect = function () {
      ChatService.connect(chat.wsUri + encodeURIComponent(chat.nick.name))
    }

    ChatService.listen(function (error, readyState, message) {
      if (error) {
        console.log(error)
        chat.error = 'WebSocket error'
      } else {
        chat.publishMessage(readyState, message)
      }
    })

    chat.publishMessage = function (readyState, message) {
      try {
        if (readyState === 1) {
          chat.connected = true
        }
        if (readyState === 3) {
          chat.reset()
          $scope.$apply()
        }
        if (message !== null) {
          message = JSON.parse(message)
          chat.messageObjects.push(message)
          $scope.$apply()
        }
      } catch (error) {
        console.log(error)
        chat.error = 'Whoops, something went wrong'
        $scope.$apply()
      }
    }

    chat.send = function () {
      var messageObj = {
        sender: chat.nick.name,
        message: chat.text
      }
      chat.messageObjects.push(messageObj)
      ChatService.send(chat.text)
      chat.text = ''
    }

    chat.disconnect = function () {
      ChatService.close()
    }

    chat.reset = function () {
      chat.messageObjects = []
      chat.connected = false
      chat.nick = {name: ''}
      chat.welcomeShowed = false
      chat.text = ''
      chat.error = ''
    }
  }])
