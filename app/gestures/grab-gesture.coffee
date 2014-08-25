Gesture = require './base/gesture'
{pointsToSegments, segementsToPoints} = require '../utils/utils'

module.exports =
class GrabGesture extends Gesture

  setPathClick: ($path) ->
    path = Snap.parsePathString($path.attr('d'))
    points = segementsToPoints path

    @paper.mousedown (ev) => @wb.clearUI()
    $path.click =>
      @_$points = $points = points.map ([sx, sy], index) =>
        $circle = @wb.ui.circle sx, sy, 5
        $circle.attr fill: 'transparent', stroke: 'black' #, strokeDasharray:"1,2,1"
        lx = sx
        ly = sy
        $circle.drag (dx, dy) =>
          rx = lx + dx
          ry = ly + dy
          points[index] = [rx, ry]
          segs = pointsToSegments points
          $path.attr('d', segs)
          $circle.attr cx: rx, cy: ry
          false
        , (x, y, ev) ->
          [lx, ly] = points[index]
          ev.stopPropagation()
          false
        , (ev) =>
          ev.stopPropagation()
          @wb.update()

        $circle

  constructor: ->
    super
    @$shapes = @currentLayer().selectAll('*')
    @$shapes.forEach ($shape) =>
      switch $shape.type
        when 'path' then @setPathClick $shape

  onTouch: (ev) =>
  onDrag: (ev) =>
  onDragEnd: (ev) =>
    @wb.update()

  dispose: ->
    @$shapes.forEach ($path) => $path.unclick()
    @wb.clearUI()
