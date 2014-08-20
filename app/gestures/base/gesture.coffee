module.exports =
class Gesture
  constructor: (@wb) ->
    @paper = @wb.paper
  onTouch: ->
  onDragStart: ->
  onDrag: ->
  onDragEnd: ->

  getPoint: (ev) ->
    [
      ev.gesture.center.pageX - @wb.offsetX - 7
      ev.gesture.center.pageY - @wb.offsetY
    ]

