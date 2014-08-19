Gesture = require './base/gesture'
module.exports =
class RectDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint = null
    @lastShape = null

  onTouch: (ev) =>
    @lastShape = null
    @startPoint = @getPoint ev

  onDragStart: (ev) =>

  onDrag: (ev) =>
    @endPoint = @getPoint ev
    @lastShape?.remove()

    [sx, sy] = @startPoint
    [ex, ey] = @endPoint

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
