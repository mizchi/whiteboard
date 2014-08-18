Gesture = require './gesture'
module.exports =
class RectDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint = null
    @lastShape = null

  onTouch: (ev) =>
    @startPoint = [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]

  onDragStart: (ev) =>
    @lastShape = null

  onDrag: (ev) =>
    @endPoint = [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]

    @lastShape?.remove()

    [sx, sy] = @startPoint
    [ex, ey] = @endPoint

    x = Math.min sx, ex
    y = Math.min sy, ey

    w = Math.abs sx - ex
    h = Math.abs sy - ey

    rect = @wb.paper.rect x, y, w, h
    rect.attr
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

    @lastShape = rect

  onDragEnd: (ev) =>
    @wb.update()
