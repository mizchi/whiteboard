Gesture = require './base/gesture'

# Circle drawing mode
module.exports =
class CircleDrawingGesture extends Gesture
  constructor: ->
    super
    [sx, sy] = []

    @wb.paper.drag (dx, dy, x, y, event) =>
      @lastShape?.remove()

      [ex, ey] = [sx + dx, sy + dy]

      r = Math.max Math.abs(sx - ex), Math.abs(sy - ey)
      circle = @currentLayer().circle sx, sy, r
      circle.attr
        strokeWidth: 1
        stroke: @wb.strokeColor
        fill: @wb.fillColor
      @lastShape = circle
    , (x, y, event) =>
      [sx, sy] = @getPoint(event)
    , =>
      @wb.update()
      @lastShape = null

  dispose: ->
    @wb.paper.undrag()
