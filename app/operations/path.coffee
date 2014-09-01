{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'

focus = ($path, wb) ->
  points = pathToPoints $path
  points.forEach ([sx, sy], index) =>
    $circle = wb.ui.circle sx, sy, 5
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
      wb.update()
    $circle

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
    $shape.undrag()
    $shape.unclick()

module.exports = {watch, focus}
