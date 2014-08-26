Gesture = require './base/gesture'
module.exports =
class EraserDrawingGesture extends Gesture
  constructor: ->
    super
    @eraser = false
    @currentLayer().selectAll('*').forEach ($shape) =>
      $shape.mousemove =>
        if @eraser then $shape.remove()

    @paper.mousedown => @eraser = true
    @paper.mouseup => @eraser = false
