Gesture = require './base/gesture'
module.exports =
class LineDrawingGesture extends Gesture
  constructor: ->
    super
    @startPoint = null
    @endPoint = null
    @lastShape = null

  onTouch: (ev) =>
    @startPoint = @getPoint ev
    @lastShape = null

  onDragStart: (ev) =>
    @lastShape = null

  onDrag: (ev) =>
    @endPoint = @getPoint ev

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
