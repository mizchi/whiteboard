Gesture = require './base/gesture'

## Eraser moder
module.exports =
class EraserDrawingGesture extends Gesture
  constructor: ->
    super
    @eraser = false
    @currentLayer().selectAll('*').forEach ($shape) =>
      $shape.mousemove =>
        if @eraser
          $shape.remove()
          @wb.update()

    @wb.paper.mousedown => @eraser = true
    @wb.paper.mouseup => @eraser = false

  dispose: ->
    @wb.paper.undrag()
