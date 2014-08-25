Gesture = require './base/gesture'
DragGesture = require './base/drag-gesture'
{pointsToSegments} = require '../utils/utils'

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
    segs = pointsToSegments @points

    @lastPath = @currentLayer().path
      path: segs
      fill: "none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

  onDragEnd: (ev) =>
    @lastPath?.remove()
    segs = pointsToSegments _simplify @points

    @currentLayer().path
      path: segs
      fill: "none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
    @wb.update()
