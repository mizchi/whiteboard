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

  getStartPoint: (x, y, ev) ->
    if @wb.ua is 'firefox'
      [x - @wb.offsetX, y - @wb.offsetY]
    else if @wb.ua.indexOf('ie') > -1
      {left, top} = @wb.$svg.offset()
      [x, y] = @getPoint(ev)
      # rever offset for ie
      [
        x + left
        y + top
      ]
    else
      @getPoint(ev)

  getPoint: (ev) =>
    if ev.offsetX
      [
        ev.offsetX - @wb.offsetX
        ev.offsetY - @wb.offsetY
      ]
    else
      {left, top} = @wb.$svg.offset()
      [
        ev.pageX - left
        ev.pageY - top
      ]
