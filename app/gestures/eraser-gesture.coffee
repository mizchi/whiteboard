Gesture = require './base/gesture'
module.exports =
class EraserDrawingGesture extends Gesture
  constructor: ->
    super
  onTouch: (ev) =>
  onDragStart: (ev) =>
    @wb.eraser = true
  onDrag: (ev) =>
  onDragEnd: (ev) =>
    @wb.eraser = false
