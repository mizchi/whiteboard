# Grab operation for circle

{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'
int = parseInt

# TODO
focus = ($path, wb) ->
  ->

watch = ($circle, wb) ->
  wb.paper.mousedown (ev) =>
    wb.clearUI()

  disposeFocus = null
  $circle.click =>
    wb.clearUI()
    disposeFocus?()
    disposeFocus = focus($circle, wb)

  [cx, cy] = []
  $circle.drag (dx, dy) =>
    rx = cx + dx
    ry = cy + dy
    $circle.attr
      cx: rx
      cy: ry
  , (dx, dy, ev) =>
    cx = int $circle.attr('cx')
    cy = int $circle.attr('cy')
    ev.stopPropagation()
    false
  , (ev) =>
    ev.stopPropagation()
    wb.update()

  return ->
    wb.paper.unmousedown()
    disposeFocus?()
    $circle.undrag()
    $circle.unclick()

module.exports = {watch, focus}
