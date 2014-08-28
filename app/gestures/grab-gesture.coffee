Gesture = require './base/gesture'
{pointsToSegments, segementsToPoints, adjustToNearPoint} = require '../utils/utils'

int = parseInt

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

  # setLineClick: ($line) ->
  #   $line.click =>
  #     @_$points = $points = points.map ([sx, sy], index) =>
  #       $circle = @wb.ui.circle sx, sy, 5
  #       $circle.attr fill: 'transparent', stroke: 'black' #, strokeDasharray:"1,2,1"
  #       lx = sx
  #       ly = sy
  #       $circle.drag (dx, dy) =>
  #         rx = lx + dx
  #         ry = ly + dy
  #         points[index] = [rx, ry]
  #         segs = pointsToSegments points
  #         $path.attr('d', segs)
  #         $circle.attr cx: rx, cy: ry
  #         false
  #       , (x, y, ev) ->
  #         [lx, ly] = points[index]
  #         ev.stopPropagation()
  #         false
  #       , (ev) =>
  #         ev.stopPropagation()
  #         @wb.update()
  #
  #       $circle

  focus: ($shape) ->
    switch $shape.type
      when 'rect'
        @focusToRect($shape)

  focusToRect: ($rect) ->
    x = int $rect.attr('x')
    y = int $rect.attr('y')
    w = int $rect.attr('width')
    h = int $rect.attr('height')
    $leftTop     = @wb.ui.circle()
    $rightTop    = @wb.ui.circle()
    $rightBottom = @wb.ui.circle()
    $leftBottom  = @wb.ui.circle()

    resetAnchorsPosition = (x, y, w, h, r = 5) ->
      $leftTop    .attr cx: x,   cy: y,   r: r
      $rightTop   .attr cx: x+w, cy: y,   r: r
      $rightBottom.attr cx: x+w, cy: y+h, r: r
      $leftBottom .attr cx: x,   cy: y+h, r: r

    resetAnchorsPosition x, y, w, h

    [lx, ly, lw, lh, xs, ys] = [x, y, w, h, [], []]
    padding = 5

    # Int * Int * Int[] * Int? -> (Int, Int)
    adjust = (p, size, points, force = 10) ->
      if a = adjustToNearPoint(p, points, force)
        return [a, size + p - ax]
      else
        return [p, size]
    [
      {
        shape: $leftTop
        x: (dx, dy, x, y, w, h) -> x + dx
        y: (dx, dy, x, y, w, h) -> y + dy
        w: (dx, dy, x, y, w, h) -> Math.max padding, w - dx
        h: (dx, dy, x, y, w, h) -> Math.max padding, h - dy
        adjust: (x, y, w, h) ->
          if ax = adjustToNearPoint(x, xs, 10)
            dx = x - ax
            x = ax
            w += dx
          if ay = adjustToNearPoint(y, ys, 10)
            dy = y - ay
            y = ay
            h += dy
          [x, y, w, h]
      }
      {
        shape: $rightTop
        x: (dx, dy, x, y, w, h) -> x
        y: (dx, dy, x, y, w, h) -> y + dy
        w: (dx, dy, x, y, w, h) -> Math.max padding, w + dx
        h: (dx, dy, x, y, w, h) -> Math.max padding, h - dy
        adjust: (x, y, w, h) ->
          gx = x + w # logical x
          if ax = adjustToNearPoint(gx, xs, 10)
            x = x
            w = ax - x
          if ay = adjustToNearPoint(y, ys, 10)
            dy = y - ay
            y = ay
            h += dy
          [x, y, w, h]
      }
      {
        shape: $rightBottom
        x: (dx, dy, x, y, w, h) -> x
        y: (dx, dy, x, y, w, h) -> y
        w: (dx, dy, x, y, w, h) -> Math.max padding, w + dx
        h: (dx, dy, x, y, w, h) -> Math.max padding, h + dy
        adjust: (x, y, w, h) ->
          gx = x + w # logical x
          if ax = adjustToNearPoint(gx, xs, 10)
            x = x
            w = ax - x
          gy = y + h
          if ay = adjustToNearPoint(gy, ys, 10)
            y = y
            h = ay - y
          [x, y, w, h]
      }
      {
        shape: $leftBottom
        x: (dx, dy, x, y, w, h) -> x + dx
        y: (dx, dy, x, y, w, h) -> y
        w: (dx, dy, x, y, w, h) -> Math.max padding, w - dx
        h: (dx, dy, x, y, w, h) -> Math.max padding, h + dy
        adjust: (x, y, w, h) ->
          if ax = adjustToNearPoint(x, xs, 10)
            dx = x - ax
            x = ax
            w += dx
          gy = y + h
          if ay = adjustToNearPoint(gy, ys, 10)
            y = y
            h = ay - y
          [x, y, w, h]
      }
    ].forEach (anc) =>
      anc.shape.drag (dx, dy) =>
        args = [dx, dy, lx, ly, lw, lh]
        rx = anc.x args...
        ry = anc.y args...
        rw = anc.w args...
        rh = anc.h args...
        [rx, ry, rw, rh] = anc.adjust(rx, ry, rw, rh)

        $rect.attr
          x: rx
          y: ry
          width: rw
          height: rh
        resetAnchorsPosition rx, ry, rw, rh

      , (x, y, ev) =>
        ev.stopPropagation()
        lx = int $leftTop.attr('cx')
        ly = int $leftTop.attr('cy')
        lw = int $rect.attr 'width'
        lh = int $rect.attr 'height'
        {xs, ys} = @wb.getAnchorPoints()
        @wb.showGrid()
      , =>
        @wb.clearUI()
        @wb.update()

  setRectClick: ($rect) ->
    @paper.mousedown (ev) => @wb.clearUI()

    lx = int $rect.attr('x')
    ly = int $rect.attr('y')

    $rect.drag (dx, dy) =>
      rx = lx + dx
      ry = ly + dy
      $rect.attr
        x: rx
        y: ry
    , (dx, dy, ev) =>
      @wb.clearUI()
      lx = int $rect.attr('x')
      ly = int $rect.attr('y')
      ev.stopPropagation()
      false
    , (ev) =>
      ev.stopPropagation()
      @wb.update()

    $rect.click => @focus($rect)

  constructor: ->
    super
    @$shapes = @currentLayer().selectAll('*')
    @$shapes.forEach ($shape) =>
      switch $shape.type
        when 'path' then @setPathClick $shape
        when 'rect' then @setRectClick $shape
        else
          console.log $shape.type

  onTouch: (ev) =>
  onDrag: (ev) =>
  onDragEnd: (ev) =>
    @wb.update()

  dispose: ->
    @$shapes.forEach ($path) =>
      $path.unclick()
      $path.undrag()
    # @$shapes.forEach ($path) => $path.unclick()
    # @wb.layer.selectAll('*').forEach ($path) =>
    #   $path.unclick()
    @wb.clearUI()
