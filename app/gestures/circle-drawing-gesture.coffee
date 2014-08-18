Gesture = require './base/gesture'
module.exports =
class CircleDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint   = null
    @lastShape  = null

  onTouch: (ev) =>
    @startPoint = [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]
    @lastShape = null

  onDrag: (ev) =>
    @endPoint = [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]
    @lastShape?.remove()

    [sx, sy] = @startPoint
    [ex, ey] = @endPoint

    x = sx
    y = sy

    r = Math.max Math.abs(sx - ex), Math.abs(sy - ey)
    circle = @wb.paper.circle x, y, r
    circle.attr
      strokeWidth: 1
      stroke: @wb.strokeColor
      fill: @wb.fillColor
    @lastShape = circle

  onDragEnd: (ev) =>
    @wb.update()

