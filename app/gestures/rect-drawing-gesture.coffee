DragGesture = require './base/drag-gesture'
module.exports =
class RectDrawingGesture extends DragGesture
  constructor: ->
    super
    @startPoint = null
    @endPoint = null
    @lastShape = null

  onDragStart: (ev) =>
    @lastShape = null

  onDrag: (ev) =>
    @lastShape?.remove()

    [sx, sy] = @firstPoint()
    [ex, ey] = @lastPoint()

    x = Math.min sx, ex
    y = Math.min sy, ey

    w = Math.abs sx - ex
    h = Math.abs sy - ey

    rect = @paper.rect x, y, w, h
    rect.attr
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

    @lastShape = rect

  onDragEnd: (ev) =>
    @wb.update()
