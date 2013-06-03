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

app.directive('moveOriginal', function() {
  return {
    require: '^dragnarok',
    link: function(scope, el, attr, Dragnarok) {
      Dragnarok.setCfg({
        moveOriginal: true
      })
    }
  }
});
