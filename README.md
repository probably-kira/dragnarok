# dragnarok
Extendable drag-and-drop" directives for AngularJS, written on pure Angular.js

## Usage
1. Include the `dragnarok.js` script provided by this component into your app.
2. Add `probably-kira.dragnarok` as a module dependency to your app.

And then in html:
```html
  <div ng-repeat="item in collection">
    <div dragnarok from="collection" into="otherCollection" item="item"></div>
  </div>
```

Optional steps(if you need to extend directive functionality):

3. Write custom directive which use dragnarok as a dependency
```js
app.directive('myDirective', function() {
  return {
    require: '^dragnarok',
    link: function(scope, el, attr, Dragnarok) {
      Dragnarok.setCfg({
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
```

And then in html:
```html
  <div ng-repeat="item in collection">
    <div dragnarok my-directive from="collection" into="otherCollection" item="item"></div>
  </div>
```
By default and depends on config, you can drag items into specified target(or everywhere), move them into another collection, make a lot of copies from one item. Available options see below.

## Config
There are 2 kinds of configs. One is initial and specified in directive html
Options are:
```html
    <div dragnarok from="collection" into="otherCollection" item="item"></div>
```
from: collection the items will be copied(or moved) from [optional]
into: collection the items will be copied in [optional]
item: the target item itself

Second config is an object which will extend public methods/properties of dragnarok:
```js
 {
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
```
#####onDragStart, onDrag, onDrop 
there are callbacks on proper events. They getting a params 'event' and 'scope'. onDrop also get a '_default' which is a function that realize default behaviour of onDrop: copying items from one collection to another if any, put items in specified target if we need it etc [please view source line 57-97]. If you want to do something before or after copying, just call this function in place you need it. If you want to do some special, just not call this function at all, but be careful with it.

#####moveOriginal
set it to true if you want move 'original' item somewhere. Default to false

#####everywhere
set to true if you want to move items everywhere on the screen. If this property is true, then 'target' prop will be ignored. Default to false.

#####initCopies
make copies draggable to. Note, that if you will drag/drop copies, they will not affect collections. Default to true

#####target
a classname of target in which you want to move items.

#####shift
a shift for copied targets related to main item(visual effect). Default to -30/-20

All these options can be extended in the 'link' function of children directive:
```js
app.directive('moveOriginal', function() {
  return {
    require: '^dragnarok',
    link: function(scope, el, attr, Dragnarok) {
      Dragnarok.setCfg({
        moveOriginal: true,
        onDragStart: function() {
        	console.log('item drag start')
    	},
    	onDrag: function(e, scope) {
    		console.log('item dragged')
    	},
    	onDrop: function(e, scope, _default) {
    		console.log('Drop!')
    		_default();
    	}
      })
    }
  }
});
```



## Example
See `example.html` and `directive.js`

## License
MIT
