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

```coffee
$ =>
  $('body').html template()
  whiteboard = new Whiteboard('svg.main') # svg tag

  reactView = React.renderComponent (ReactView {}), document.querySelector '.preview'
  whiteboard.on 'changed', (svg) ->
    reactView.setState value: svg
```

## API

- `new Whiteboard(selector)`
- `Whiteboard#getSVG()`: get current SVG
