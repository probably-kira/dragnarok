/*
 * angular drag-n-drop functionality v0.0.1
 * (c) 2013 Probably Kira https://github.com/probably-kira/
 * License: MIT
 */

'use strict';

var app = angular.module('probably-kira.dragnarok', []);

app.directive('dragnarok', function ($document, $compile) {
    return {
      restrict: 'A',
      replace: true,
      template: '<div class="preview"><img src="{{ item }}"></div>',
      scope: {
      	into: '=',
      	from: '=',
        item: '='
      },

      link: function (scope, el) {
        var body = angular.element(document.body);

        //set of public methods that can be overruled
        scope.cfg = {
          onDragStart: function(e, scope) {},
          onDrag: function(e, scope) {},
          onDrop: function(e, scope, _default) {
            _default();
          },
          moveOriginal: false,
          everywhere: false,
          initCopies: true,
          target: 'dragnarok-target',
          shift: {
            x: -30,
            y: -20
          }
        }

        function drag(e, el) {
          if (!scope.cfg.shift) {
            scope.cfg.shift = {
              x: 0,
              y: 0
            }
          }

          el.css({
            left: (e.pageX + scope.cfg.shift.x) + 'px',
            top: (e.pageY + scope.cfg.shift.y) + 'px'
          })
        }

        //default functions for dragstart/stop; called if proper cfg are not overruled
        function dragStop(e, _el, el) {
          
          function observeScope() {
            if (scope.into) {
              scope.$apply(scope.into.push(scope.item));
            }

            if (scope.from) {
              scope.$apply(scope.from.splice(scope.from.indexOf(scope.item), 1));
            }
          }


          if (scope.cfg.everywhere) {
            observeScope();
            return;
          }

          //get an underlying element to check if it is our target
          _el.css({display: 'none'});
          var underlying = angular.element(document.elementFromPoint(e.clientX,e.clientY));
          _el.css({display: ''});
          
          if (underlying.hasClass(scope.cfg.target)) {
            observeScope();
            if(!scope.cfg.multipleCopy) {
              //prevent odd copying
              delete scope.from;
              delete scope.into;
            }
            scope.target = underlying;

          } else {
            _el.remove();
            if(!scope.cfg.multipleCopy) {
                el.css({
                  display: 'block'
                })
            }
          }
        }

        el.bind('mousedown', function (e) {
          e.preventDefault();
          var _el = angular.element(el.clone());

          drag(e, _el)

          _el.addClass('moved').css({
            position: 'absolute'
          });

          if (scope.cfg.moveOriginal) {
            el.css({display: 'none'});
          }

          scope.cfg.onDragStart(e, scope);

          body
            .append(_el)
            .bind('mousemove', function(e) {
                drag(e, _el);
                scope.cfg.onDrag(e, scope);
            })
            .bind('mouseup', function(e) {
              body.unbind('mousemove').unbind('mouseup');
              scope.cfg.onDrop(e, scope, function() {dragStop(e, _el, el)});

              _el.bind('mousedown', function (e) {
                 e.preventDefault();
                  body
                    .bind('mousemove', function(e) {
                        drag(e, _el);
                    })
                    .bind('mouseup', function(e) {
                      body.unbind('mousemove').unbind('mouseup');
                    });
              });

            });
        });
      },
      controller: ['$scope', function(scope) {
        this.setCfg = function(cfg) {
          angular.extend(scope.cfg, cfg);
        }
      }]
    }
  });