Gesture = require './base/gesture'
{pointsToSegments} = require '../utils/utils'

_simplify = (points, tolelance) ->
  simplify(
    (points.map ([x, y]) => {x, y}), tolelance, false
  ).map ({x, y}) => [x, y]

# Free drawing mode
module.exports =
class FreeDrawingGesture extends Gesture
  constructor: ->
    super
    @points = []

    [sx, sy] = []

    @wb.paper.drag (dx, dy, x, y, event) =>
      @points.push [sx+dx, sy+dy]
      @lastPath?.remove()
      segments = pointsToSegments @points
      @lastPath = @currentLayer().path
        path: segments
        fill: "none"
        stroke: @wb.strokeColor
        fill: @wb.fillColor
        strokeWidth: 1

    , (x, y, event) =>
      @points = []
      @lastPath = null

      [sx, sy] = @getPoint(event)
      @points.push [sx, sy]

    , =>
      @lastPath?.remove()

      segments = pointsToSegments _simplify @points
      @currentLayer().path
        path: segments
        fill: "none"
        stroke: @wb.strokeColor
        fill: @wb.fillColor
        strokeWidth: 1
      @wb.update()

  dispose: ->
    @wb.paper.undrag()
