# Gesture = require './base/gesture'
DragGesture = require './base/drag-gesture'
module.exports =
class CircleDrawingGesture extends DragGesture
  constructor: ->
    super
    @startPoint = null
    @endPoint   = null
    @lastShape  = null

  onDrag: (ev) =>
    @endPoint = @getPoint(ev)
    @lastShape?.remove()

    [sx, sy] = @firstPoint()
    [ex, ey] = @lastPoint()

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
    @lastShape = null
