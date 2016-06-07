'use strict'

angular.module('mdCodingTestApp')
  .directive('keyListener', function () {
    return {
      require: '^chat',
      link: function (scope, element, attr, ctrl) {
        angular.element(element).on('keyup', function (e) {
          if (scope.connector.$valid && e.which === 13) {
            ctrl.connect()
          }
        })
      }
    }
  })
