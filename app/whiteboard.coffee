RectDrawingGesture = require './gestures/rect-drawing-gesture'
FreeDrawingGesture = require './gestures/free-drawing-gesture'
LineDrawingGesture = require './gestures/line-drawing-gesture'
CircleDrawingGesture = require './gestures/circle-drawing-gesture'
EraserGesture = require './gestures/eraser-gesture'

EventEmitter = require './utils/event-emitter'
extend = (obj, props) =>
  for k, v of props then obj[k] = v
  obj

module.exports =
class window.Whiteboard
  template = require './templates/whiteboard'

  extend @::, EventEmitter::

  $: (selector) =>
    @$el.find selector

  update: =>
    @trigger 'changed', @getSVG()

  getSVG: =>
    @svg.outerHTML

  setSVG: (text) =>
    @$svg.html text

  setMode: (mode) =>
    @$svg.off()
    Gesture = switch mode
      when 'free'   then FreeDrawingGesture
      when 'rect'   then RectDrawingGesture
      when 'line'   then LineDrawingGesture
      when 'circle' then CircleDrawingGesture
      when 'eraser' then EraserGesture
    gesture = new Gesture @
    new Hammer(@svg)
      .on 'touch',     (ev) => gesture.onTouch(ev)
      .on 'dragstart', (ev) => gesture.onDragStart(ev)
      .on 'drag',      (ev) => gesture.onDrag ev
      .on 'dragend',   (ev) => gesture.onDragEnd ev

  constructor: (selector, {preview} = {}) ->
    @strokeColor = strokeColor = 'black'
    @fillColor = fillColor = 'transparent'

    @el = el = document.querySelector selector
    @$el = $(@el)
    @$el.html template()

    @svg = svg = document.querySelector 'svg.whiteboard'
    @$svg = $svg = $(@svg)
    @paper = paper = Snap(svg)

    {left: offsetX, top: offsetY} = @$svg.position()
    @offsetX = offsetX
    @offsetY = offsetY

    @setMode 'free'
    @tolelance = 2
    $tolelance = $('.tolelance-value')
    @$('.tolelance-plus').on 'click', =>
      @tolelance++
      $tolelance.text @tolelance

    @$('.tolelance-minus').on 'click', =>
      @tolelance--
      $tolelance.text @tolelance

    @$('.edit-free').on 'click', => @setMode 'free'
    @$('.edit-rect').on   'click', => @setMode 'rect'
    @$('.edit-line').on   'click', => @setMode 'line'
    @$('.edit-circle').on 'click', => @setMode 'circle'
    @$('.edit-eraser').on 'click', =>
      @setMode 'eraser'
      $svg.on 'mousemove', '*', (event) =>
        return unless @eraser
        $(event.target).remove()
        @update()

    $fillColor = @$('input.fill-color').on 'keyup', =>
      @fillColor = @$fillColor.val()

    $strokeColor = @$('input.stroke-color').on 'keyup', =>
      @strokeColor = $strokeColor.val()

    @$('.undo').on 'click', => @trigger 'undo'

    @$('.redo').on 'click', => @trigger 'redo'

