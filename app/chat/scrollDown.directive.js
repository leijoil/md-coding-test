'use strict'

angular.module('mdCodingTestApp')
  .directive('scrollDown', function () {
    return {
      scope: {
        scrollDown: '='
      },
      link: function (scope, element) {
        scope.$watchCollection('scrollDown', function (newValue) {
          if (newValue) {
            $(element).scrollTop($(element)[0].scrollHeight) // eslint-disable-line
          }
        })
      }
    }
  })
