Gesture = require './gesture'
module.exports =
class LineDrawingGesture extends Gesture
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
    @lastShape = null

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

    line = @paper.line sx, sy, ex, ey
    line.attr
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
      # fill: 'transparent'
    @lastShape = line

  onDragEnd: (ev) =>
    @wb.update()
