# Whiteboard

![](http://i.gyazo.com/c6d2ccb694d483127d4b539d412194e0.png)

## Build

```
npm install
bower install
gulp
open public/index.html
```

## Example

```html
<body>
  <div class='whiteboard-container'></div>
</body>
```

```coffee
$ =>
  whiteboard = new Whiteboard('.whiteboard-container')
  whiteboard.on 'changed', (svg) ->
    console.log 'raw svg', svg
```

## API

- `new Whiteboard(selector)`
- `Whiteboard#getSVG()`: get current SVG
