Gesture = require './base/gesture'
module.exports =
class GrabDrawingGesture extends Gesture
  constructor: ->
    super
  onTouch: (ev) =>
  onDrag: (ev) =>
  onDragEnd: (ev) =>
    @wb.update()
