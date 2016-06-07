'use strict'

angular.module('mdCodingTestApp')
  .component('chat', {
    templateUrl: 'views/chat.html',
    controller: 'ChatCtrl as chat'
  })
  .controller('ChatCtrl', function ($scope, ChatService) {
    var chat = this
    chat.connected = false
    chat.date = new Date()
    chat.error = ''
    chat.messageObjects = []
    chat.nick = {name: null}
    chat.text = ''
    chat.welcomeShowed = false

    chat.connect = function () {
      ChatService.connect()
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
          if (!chat.welcomeShowed) {
            message = chat.welcomeByNick(message)
            chat.welcomeShowed = true
          }
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
        sender: this.nick.name,
        message: chat.text
      }
      chat.messageObjects.push(messageObj)
      ChatService.send(chat.text)
      chat.text = ''
    }

    chat.disconnect = function () {
      ChatService.close()
    }

    chat.welcomeByNick = function (welcomeMessage) {
      if (welcomeMessage.indexOf('Anonymous') >= 0) {
        welcomeMessage = welcomeMessage.replace('Anonymous', chat.nick.name)
      }
      return welcomeMessage
    }

    chat.reset = function () {
      chat.messageObjects = []
      chat.connected = false
      chat.nick = {name: null}
      chat.welcomeShowed = false
      chat.text = ''
      chat.error = ''
    }
  })
