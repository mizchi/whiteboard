DragGesture = require './base/drag-gesture'
module.exports =
class LineDrawingGesture extends DragGesture

  onDragStart: (ev) =>
    @lastShape = null
    console.log 'onDragStart'

  onDrag: (ev) =>
    console.log 'onDrag'
    @lastShape?.remove()
    [sx, sy] = @firstPoint()
    [ex, ey] = @lastPoint()

    line = @paper.line sx, sy, ex, ey
    line.attr
      stroke: @wb.strokeColor
      fill: @wb.fillColor
      strokeWidth: 1
    @lastShape = line

  onDragEnd: (ev) =>
    @wb.update()
