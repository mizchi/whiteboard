DragGesture = require './base/drag-gesture'
module.exports =
class LineDrawingGesture extends DragGesture

  onDragStart: (ev) =>
    @lastShape = null

  onDrag: (ev) =>
    @lastShape?.remove()
    [sx, sy] = @firstPoint()
    [ex, ey] = @lastPoint()

    line = @currentLayer().line sx, sy, ex, ey
    line.attr
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
    @lastShape = line

  onDragEnd: (ev) =>
    @wb.update()
