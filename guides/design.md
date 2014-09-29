# Basic design guide

## Concepts

- Modify raw primitive svg element(load and save).
- Can re-touch elements

## Features

- Draw shapes
- Move shapes
- Adjustment on rect dragging
- Shape chain on path dragging

## Modes

- circle
- free
- line
- rect
- grab
  - circle
  - path
  - rect
- eraser

## Layers

- Now default has 3 layers.
- Toggle display by style='visibility: hidden;'

## Libraries

- Snap.svg - SVG utilities
- simplify.js - Compress path data

## Directries

```
app/
├── gestures
│   ├── base
│   │   └── gesture.coffee
│   ├── circle-drawing-gesture.coffee
│   ├── eraser-gesture.coffee
│   ├── free-drawing-gesture.coffee
│   ├── grab-gesture.coffee
│   ├── line-drawing-gesture.coffee
│   └── rect-drawing-gesture.coffee
├── history-manager.coffee
├── operations
│   ├── circle.coffee
│   ├── path.coffee
│   └── rect.coffee
├── styles
│   └── main.scss
├── templates
│   └── whiteboard.jade
├── utils
│   ├── event-emitter.coffee
│   ├── extend.coffee
│   └── utils.coffee
└── whiteboard.coffee
```

- `gestures/*` gesture mode classes
- `operations/*` classes called in grab-mode

## TODO

- Load and reflesh
- Undo and redo
- Draw text element
