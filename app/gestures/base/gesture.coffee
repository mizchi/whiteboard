EventEmitter = require '../../utils/event-emitter'
extend = require '../../utils/extend'

module.exports =
class Gesture
  constructor: (@wb) ->
    @paper = @wb.paper

  select: ->
    Snap(@wb.svg).select arguments...

  selectAll: ->
    Snap(@wb.svg).selectAll arguments...

  currentLayer: -> @wb.layer

  _onTouch: -> @onTouch arguments...
  onTouch: ->

  _onTouchStart: -> @onTouchStart arguments...
  onTouchStart: ->

  _onTouchMove: -> @onTouchMove arguments...
  onTouchMove: ->

  _onTouchEnd: -> @onTouchEnd arguments...
  onTouchEnd: ->

  _onTouchStart: -> @onTouchStart arguments...
  onTouchStart: ->

  _onTouchMove: -> @onTouchMove arguments...
  onTouchMove: ->

  _onTouchEnd: -> @onTouchEnd arguments...
  onTouchEnd: ->

  dispose: ->

  getPoint: (ev) =>
    # TODO: Fix for android
    if ev.offsetX
      [
        ev.offsetX - @wb.offsetX
        ev.offsetY - @wb.offsetY
      ]
    else
      {left, top} = @wb.$svg.offset()
      [
        ev.pageX - left # - @wb.offsetX
        ev.pageY - top # - @wb.offsetY
      ]
