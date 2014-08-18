Gesture = require './gesture'
module.exports =
class FreeDrawingGesture extends Gesture
  constructor: ->
    super
    @paths = []
    @lastPath = null

  onTouch: (ev) =>
    @paths.push [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]
    @lastPath = @wb.paper.polyline
      points: _.flatten(@paths)
      fill: "none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

  onDrag: (ev) =>
    @lastPath?.remove()

    @paths.push [
      ev.gesture.center.pageX - @wb.offsetX
      ev.gesture.center.pageY - @wb.offsetY
    ]

    @lastPath = @paper.polyline
      points: _.flatten(@paths)
      fill:"none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1


  onDragEnd: (ev) =>
    @lastPath?.remove()

    simplified = simplify (@paths.map ([x, y]) => {x, y}), @wb.tolelance, false
    r = simplified.map ({x, y}) => [x, y]

    @lastPath = @wb.paper.polyline
      points: r
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
    @paths = []

    @wb.update()
