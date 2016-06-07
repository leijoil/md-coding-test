'use strict'
angular.module('mdCodingTestApp')
  .constant('config', {url: 'ws://codingtest.meedoc.com/ws'})
  .factory('ChatService', function (config) {
    var service = {}

    service.connect = function () {
      if (service.ws) {
        return
      }

      var ws = new WebSocket(config.url)

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

    service.subscribe = function (callback) {
      service.callback = callback
    }

    service.close = function (callback) {
      service.ws.close()
    }

    return service
  })
