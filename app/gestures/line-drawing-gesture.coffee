DragGesture = require './base/drag-gesture'
Gesture = require './base/gesture'
{pointsToSegments, segementsToPoints} = require '../utils/utils'

# Layer -> (x:Int y:Int Path)[]
getPathPositions = ($group) ->
  points = []
  $group.selectAll('path').forEach ($path) =>
    segments = Snap.parsePathString($path.attr 'd')
    ps = segementsToPoints segments
    points.push _.first(ps).concat $path
    points.push _.last(ps).concat $path
    # points.push (ps.map ([x, y]) -> [x, y, $path])...
  points

# base:Point * canditates:Point[] -> (index:Int cost:Int Shape Int)?
# Find most near point from canditates
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

    mode = '' # head/tail/isolate

    pathArray = null
    fromShape = null

    points = null

    @paper.drag (dx, dy, x, y, event) =>
      segs = null
      [ex, ey] = [dx+sx, dy+sy]
      if p = getNearPoint([ex, ey], @nearPoints)
        [ex, ey] = p

      if mode is 'isolate'
        segs = pointsToSegments [[sx, sy], [ex, ey]]
      else if mode is 'tail'
        fromShape?.remove()
        fromShape = null
        segs = pointsToSegments points.concat([[ex, ey]])
      else if mode is 'head'
        fromShape?.remove()
        fromShape = null
        segs = pointsToSegments [[ex, ey]].concat points

      @lastShape?.remove()
      @lastShape = @currentLayer().path
        path: segs
        stroke: @wb.strokeColor
        fill: @wb.fillColor
        strokeWidth: 1

    , (x, y, event) =>
      console.log x, y
      sx = event.offsetX
      sy = event.offsetY
      if p = getNearPoint([sx, sy], @nearPoints)
        [sx, sy, fromShape] = p
        segs = Snap.parsePathString(fromShape.attr('d'))
        points = segementsToPoints(segs)
        [last_x, last_y] = _.last(points)
        if last_x is sx and last_y is sy
          mode = 'tail'
        else
          mode = 'head'
      else
        mode = 'isolate'
    , =>
      @nearPoints = getPathPositions @currentLayer()
      @showAnchorsToShape @lastShape
      @lastShape = null
