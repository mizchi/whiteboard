Gesture = require './base/gesture'
DragGesture = require './base/drag-gesture'

_simplify = (points, tolelance) ->
  simplify(
    (points.map ([x, y]) => {x, y}), tolelance, false
  ).map ({x, y}) => [x, y]

module.exports =
class FreeDrawingGesture extends DragGesture
  onDragStart: (ev) =>
    @lastPath = null

  onDrag: (ev) =>
    @lastPath?.remove()

    @lastPath = @currentLayer().polyline
      points: _.flatten(@points)
      fill: "none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

  onDragEnd: (ev) =>
    @lastPath?.remove()

    simplified = _simplify(@points, @wb.tolelance)
    @lastPath = @currentLayer().polyline
      points: simplified
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

    @wb.update()
