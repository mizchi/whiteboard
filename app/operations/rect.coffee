# Grab operation for rect
{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'

int = parseInt

# on focus rect element
# Show 4 point to drag to reshape on UI
focus = ($shape, wb) ->
  x = int $shape.attr('x')
  y = int $shape.attr('y')
  w = int $shape.attr('width')
  h = int $shape.attr('height')

  $leftTop     = wb.ui.circle fill: 'transparent', stroke: 'blue', opacity: 0.86, r: 8
  $rightTop    = wb.ui.circle fill: 'transparent', stroke: 'blue', opacity: 0.86, r: 8
  $rightBottom = wb.ui.circle fill: 'transparent', stroke: 'blue', opacity: 0.86, r: 8
  $leftBottom  = wb.ui.circle fill: 'transparent', stroke: 'blue', opacity: 0.86, r: 8

  resetAnchorsPosition = (x, y, w, h) ->
    $leftTop    .attr cx: x,   cy: y
    $rightTop   .attr cx: x+w, cy: y
    $rightBottom.attr cx: x+w, cy: y+h
    $leftBottom .attr cx: x,   cy: y+h

  resetAnchorsPosition x, y, w, h

  [lx, ly, lw, lh, xs, ys] = [x, y, w, h, [], []]
  padding = 5

  # Reshaping function for each points
  [
    # leftTop
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
    # rightTop
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
    # rightBottom
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
    # leftBottom
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

      $shape.attr
        x: rx
        y: ry
        width: rw
        height: rh
      resetAnchorsPosition rx, ry, rw, rh

    , (x, y, ev) =>
      ev.stopPropagation()
      lx = int $leftTop.attr('cx')
      ly = int $leftTop.attr('cy')
      lw = int $shape.attr 'width'
      lh = int $shape.attr 'height'
      {xs, ys} = wb.getAnchorPoints()
      wb.showGrid()
    , =>
      wb.clearUI()
      wb.update()

# on watch rect element
watch = ($shape, wb) ->
  wb.paper.mousedown (ev) => wb.clearUI()
  disposeFocus = null
  $shape.click =>
    disposeFocus?()
    disposeFocus = focus $shape, wb

  lx = int $shape.attr('x')
  ly = int $shape.attr('y')

  $shape.drag (dx, dy) =>
    rx = lx + dx
    ry = ly + dy
    $shape.attr x: rx, y: ry
  , (dx, dy, ev) =>
    wb.clearUI()
    lx = int $shape.attr('x')
    ly = int $shape.attr('y')
    ev.stopPropagation()
    false
  , (ev) =>
    ev.stopPropagation()
    wb.update()

  return ->
    wb.paper.unmousedown()
    disposeFocus?()
    $shape.undrag()
    $shape.unclick()

module.exports = {watch, focus}
