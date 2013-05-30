app.directive('everywhere', function() {
  return {
    require: '^dragnarok',
    link: function(scope, el, attr, Dragnarok) {
      Dragnarok.setCfg({
        everywhere: true
      })
    }
  }
});

app.directive('original', function() {
  return {
    require: '^dragnarok',
    link: function(scope, el, attr, Dragnarok) {
      Dragnarok.setCfg({
        moveOriginal: true,

        onDrop: function(e, scope, _default) {
          _default();
          var colors = ['green', 'black', 'blue', 'magento', 'yellow', 'grey', 'red'];
          if (scope.target) {
            scope.target.css({
              background: colors[Math.floor(Math.random() * 10)] || 'red'
           })
          }
        }
      })
    }
  }
});
