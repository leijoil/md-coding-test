'use strict'

angular.module('mdCodingTestApp')
  .factory('ChatService', function () {
    var service = {}

    service.connect = function (wsUri) {
      if (service.ws) {
        return
      }

      var ws = new WebSocket(wsUri)

      ws.onopen = function () {
        service.callback(null, ws.readyState, null)
        console.log('WebSocket opened', 'readyState: ', ws.readyState)
      }

      ws.onerror = function (error) {
        service.callback(error, ws.readyState, null)
        console.log('WebSocket error ', error)
      }

      ws.onmessage = function (event) {
        service.callback(null, ws.readyState, event.data)
      }

      ws.onclose = function (event) {
        service.callback(null, ws.readyState, null)
        service.ws = null
        console.log('WebSocket closed', 'readyState: ', ws.readyState)
      }
      service.ws = ws
    }

    service.send = function (message) {
      service.ws.send(message)
    }

    service.listen = function (callback) {
      service.callback = callback
    }

    service.close = function (callback) {
      service.ws.close()
    }

    return service
  })
