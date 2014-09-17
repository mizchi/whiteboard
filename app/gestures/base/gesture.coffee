EventEmitter = require '../../utils/event-emitter'
extend = require '../../utils/extend'

# Base Gesture for Mode
module.exports =
class Gesture
  constructor: (@wb) ->

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

  # Called at change mode
  dispose: ->

  getPoint: (ev) =>
    # TODO: Fix for touch ui
    if ev.offsetX
      [
        ev.offsetX - @wb.offsetX
        ev.offsetY - @wb.offsetY
      ]
    else
      {left, top} = @wb.offset()
      [
        ev.pageX - left
        ev.pageY - top
      ]
