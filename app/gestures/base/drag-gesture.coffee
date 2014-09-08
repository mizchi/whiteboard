Gesture = require './gesture'

# Drag Gesture Class
module.exports =
class DragGesture extends Gesture
  # @param [onDragging]
  constructor: (@wb) ->
    super
    @onDragging = false
    @points = null
    @_moved = false
    @minimumTouchSize = 3

  onTouch: (ev) ->
  onDragStart: (ev) ->
  onDrag: (ev) ->
  onDragEnd: (ev) ->

  firstPoint: -> @points?[0]

  lastPoint: -> @points?[@points?.length-1]

  _onTouchStart: (ev) ->
    @_moved = false
    @points = null
    @onDragging = true
    @points = [@getPoint(ev)]
    @onTouchStart(ev)

  _onTouchMove: (ev) ->
    @onTouchMove(ev)
    return unless @onDragging
    @points.push @getPoint(ev)

    if @_moved
      @onDrag(ev)
    else
      [sx, sy] = @firstPoint()
      [ex, ey] = @lastPoint()
      distance = Math.sqrt(Math.pow(sx - ey, 2) + Math.pow(sy - ey, 2))
      if distance > @minimumTouchSize
        @_moved = true
        @onDragStart(ev)

  _onTouchEnd: (ev) ->
    return unless @onDragging
    unless @_moved
      @onTouch(ev)
    else
      @onDragEnd(ev)

    @onDragging = false
