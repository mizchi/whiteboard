# Whiteboard

![](http://i.gyazo.com/c6d2ccb694d483127d4b539d412194e0.png)

See concepts and implementation at [guides/design.md](guides/design.md)

## Example

```html
<body>
  ...
  <div class='whiteboard-container'></div>
  ...
</body>
```

```coffee
$ =>
  whiteboard = new Whiteboard('.whiteboard-container')
  whiteboard.on 'changed', (svg) ->
    console.log 'raw svg text', svg
```

## API

- `new Whiteboard(selector)`
- `Whiteboard#getSVG()`: get current SVG
- `Whiteboard#setSVG(svg_text)`: set SVG(not yet)

## Build

```
npm install -g bower gulp
npm install
bower install
gulp
open public/index.html
```

## Documents

```
npm install codo -g
codo app/
```

## Test

```
npm install -g mocha-phantomjs
gulp test
```

(ready to add test but not exists)

## Coverage

```
npm install -g json2htmlcov mocha-phantomjs
gulp coverage
open coverage.html
```
