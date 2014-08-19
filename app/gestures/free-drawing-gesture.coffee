Gesture = require './base/gesture'
module.exports =
class FreeDrawingGesture extends Gesture
  constructor: ->
    super
    @paths = null
    @lastPath = null

  onTouch: (ev) =>
    @paths = []
    @paths.push @getPoint(ev)

  onDrag: (ev) =>
    @lastPath?.remove(ev)
    @paths.push @getPoint(ev)
    @lastPath = @paper.polyline
      points: _.flatten(@paths)
      fill:"none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

  simplify: (paths) ->
    simplify(
      (paths.map ([x, y]) => {x, y}), @wb.tolelance, false
    ).map ({x, y}) => [x, y]

  onDragEnd: (ev) =>
    @lastPath?.remove()

    simplified = @simplify (@paths)

    @lastPath = @wb.paper.polyline
      points: simplified
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
    @paths = []

    @lastPath = null
    @wb.update()
