EventEmitter = require '../../utils/event-emitter'
extend = require '../../utils/extend'

module.exports =
class Gesture
  constructor: (@wb) ->
    @paper = @wb.paper

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

  getPoint: (ev) =>
    # TODO: Fix for android
    [
      ev.offsetX - @wb.offsetX
      ev.offsetY - @wb.offsetY
    ]
