Gesture = require './base/gesture'
module.exports =
class CircleDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint   = null
    @lastShape  = null

  onTouch: (ev) =>
    @startPoint = @getPoint(ev)
    @lastShape = null

  onDrag: (ev) =>
    @endPoint = @getPoint(ev)
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

