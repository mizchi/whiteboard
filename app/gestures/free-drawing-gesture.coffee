Gesture = require './base/gesture'
DragGesture = require './base/drag-gesture'

_simplify = (points, tolelance) ->
  simplify(
    (points.map ([x, y]) => {x, y}), tolelance, false
  ).map ({x, y}) => [x, y]

pointsToSegments = ([[sx, sy], body...]) ->
  [].concat [['M', sx, sy]], body.map do =>
    lx = sx
    ly = sy
    ([x, y]) ->
      dx = x - lx
      dy = y - ly
      lx = x
      ly = y
      ['l', dx, dy]

segementsToPoints = ([[t, sx, sy], body...]) ->
  [].concat [[sx, sy]], body.map do =>
    cx = sx
    cy = sy
    ([t, x, y]) ->
      cx += x
      cy += y
      [cx, cy]

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
    console.log 'onDragEnd'
    @lastPath?.remove()
    segs = pointsToSegments _simplify @points

    $$path = @currentLayer().path
      path: segs
      fill: "none"
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1

    path = Snap.parsePathString($$path.attr('d'))
    points = segementsToPoints path

    $$path.click =>
      if @wb.mode is 'grab'
        $$points = points.map ([sx, sy], index) =>
          $$circle = @wb.ui.circle sx, sy, 5
          $$circle.attr fill: 'transparent', stroke: 'black', strokeDasharray:"1,2,1"
          lx = sx
          ly = sy
          $$circle.drag (dx, dy) =>
            rx = lx + dx
            ry = ly + dy
            points[index] = [rx, ry]
            segs = pointsToSegments points
            $$path.attr('d', segs)
            $$circle.attr cx: rx, cy: ry
            false
          , (x, y, ev) ->
            [lx, ly] = points[index]
            ev.stopPropagation()
            false
          , (ev) =>
            ev.stopPropagation()
            @wb.update()

          $$circle

        @paper.mousedown (ev) =>
          console.log 'click'
          if $$points
            for i in $$points then i.remove()

    @wb.update()
