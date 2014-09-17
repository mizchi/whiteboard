Gesture = require './base/gesture'

# Rect drawing mode
module.exports =
class RectDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint = null
    @lastShape = null
    [sx, sy] = []

    @wb.paper.drag (dx, dy, x, y, event) =>
      @lastShape?.remove()
      [ex, ey] = [sx + dx, sy + dy]

      x = Math.min sx, ex
      y = Math.min sy, ey
      w = Math.abs sx - ex
      h = Math.abs sy - ey

      rect = @currentLayer().rect x, y, w, h
      rect.attr
        stroke: @wb.strokeColor
        fill: @wb.fillColor
        strokeWidth: 1

      @lastShape = rect
    , (x, y, event) =>
      [sx, sy] = @getPoint(event)
      @lastShape = null
    , =>
      @wb.update()
      @wb.setMode 'grab'
      @wb._gesture.focus @lastShape
      @lastShape = null

  dispose: ->
    @wb.paper.undrag()
