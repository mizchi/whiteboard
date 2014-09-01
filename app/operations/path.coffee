{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'

focus = ($path, wb) ->
  points = pathToPoints $path
  $points = points.map ([sx, sy], index) =>
    $circle = wb.ui.circle
      cx: sx
      cy: sy
      fill: 'transparent'
      stroke: 'blue'
      r: 6
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
      wb.update()
    $circle
  ->
    wb.paper.unmousedown()
    for $p in $points
      $p.remove()

watch = ($path, wb) ->
  points = pathToPoints $path
  wb.paper.mousedown (ev) => wb.clearUI()

  disposeFocus = null
  $path.click =>
    wb.clearUI()
    disposeFocus?()
    disposeFocus = focus($path, wb)

  segs = null
  [_type, lx, ly] = []

  $path.drag (dx, dy) =>
    rx = lx + dx
    ry = ly + dy
    segs[0] = ['M', rx, ry]
    $path.attr('d', segs)
  , (dx, dy, ev) =>
    segs = Snap.parsePathString($path.attr('d'))
    [_type, lx, ly] = segs[0]
    wb.clearUI()
    ev.stopPropagation()
    false
  , (ev) =>
    points = segementsToPoints segs
    ev.stopPropagation()
    wb.update()

  return ->
    wb.paper.unmousedown()
    disposeFocus?()
    $path.undrag()
    $path.unclick()

module.exports = {watch, focus}
