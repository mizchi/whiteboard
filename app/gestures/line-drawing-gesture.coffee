DragGesture = require './base/drag-gesture'
Gesture = require './base/gesture'
{pointsToSegments, segementsToPoints} = require '../utils/utils'

# Layer -> (Int Int Path)[]
getPathPositions = ($group) ->
  points = []
  $group.selectAll('path').forEach ($path) =>
    segments = Snap.parsePathString($path.attr 'd')
    ps = segementsToPoints segments
    points.push (ps.map ([x, y]) -> [x, y, $path])...
  points

# Point * Point[] -> (Int Int Shape Int)?
getNearPoint = ([sx, sy], points, force = 10) ->
  return null if points.length is 0

  costs = points
    .map ([x, y], index) ->
      Math.abs(sx - x) + Math.abs(sy - y)

  [minIndex, minCost] = costs.reduce ([minIndex, minCost], cost, index) ->
    if minCost > cost
      [index, cost]
    else
      [minIndex, minCost]
  , [0, costs[0]]

  if minCost <= 10
    points[minIndex].concat minIndex
  else
    null

module.exports =
class LineDrawingGesture extends Gesture
  dispose: ->
    @paper.undrag()

  showAnchorsToShape: (shape) ->
    segs = Snap.parsePathString(shape.attr('d'))
    points = segementsToPoints(segs)
    points.map ([x, y]) =>
      $circle = @wb.ui.circle cx: x, cy: y, r: 8, fill: 'transparent', stroke: 'black'
      $circle.mousemove => $circle.attr 'stroke', 'red'
      $circle.mouseout => $circle.attr 'stroke', 'black'

  constructor: ->
    super
    @nearPoints = getPathPositions @currentLayer()

    sx = null
    sy = null
    ex = null
    ey = null

    mode = '' # head tail isolate

    pathArray = null

    @paper.drag (dx, dy, x, y, event) =>
      [ex, ey] = [dx+sx, dy+sy]
      if p = getNearPoint([ex, ey], @nearPoints)
        [ex, ey] = p

      segs = pointsToSegments [[sx, sy], [ex, ey]]
      # segs = pathArray.concat [ex, ey]

      @lastShape?.remove()
      @lastShape = @currentLayer().path
        path: segs
        fill: "none"
        stroke: @wb.strokeColor
        fill: @wb.fillColor
        strokeWidth: 1
    , (x, y, event) =>
      sx = event.offsetX
      sy = event.offsetY
      if p = getNearPoint([sx, sy], @nearPoints)
        mode = 'head'
        [sx, sy] = p
      else
        mode = 'isolate'
    , =>
      @nearPoints = getPathPositions @currentLayer()
      @showAnchorsToShape @lastShape
      @lastShape = null
