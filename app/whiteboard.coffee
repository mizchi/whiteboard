RectDrawingGesture = require './gestures/rect-drawing-gesture'
FreeDrawingGesture = require './gestures/free-drawing-gesture'
LineDrawingGesture = require './gestures/line-drawing-gesture'
CircleDrawingGesture = require './gestures/circle-drawing-gesture'
EraserGesture = require './gestures/eraser-gesture'
GrabGesture = require './gestures/eraser-gesture'

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
    @paper.outerSVG()

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
      when 'grab'   then GrabGesture

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
    window.paper = paper

    {left: offsetX, top: offsetY} = @$svg.position()
    @offsetX = offsetX
    @offsetY = offsetY+32

    @setMode 'free'
    @tolelance = 2
    $tolelance = $('.tolelance-value')
    @$('.tolelance-plus').on 'click', =>
      @tolelance++
      $tolelance.text @tolelance

    @$('.tolelance-minus').on 'click', =>
      @tolelance--
      $tolelance.text @tolelance

    @$('.edit-free').on   'click', => @setMode 'free'
    @$('.edit-rect').on   'click', => @setMode 'rect'
    @$('.edit-line').on   'click', => @setMode 'line'
    @$('.edit-circle').on 'click', => @setMode 'circle'
    @$('.edit-eraser').on 'click', =>
      @setMode 'eraser'
      $svg.on 'mousemove', '*', (event) =>
        return unless @eraser
        $(event.target).remove()
        @update()

    @$('.edit-grab').on 'click', =>
      $svg.off()
      @setMode 'grab'
      grabbing = false

      $svg.hammer().on 'mousedown', '*', (event) =>
        grabbing = true
        # console.log event.target

      $svg.hammer().on 'mousemove', '*', (ev) ->
        return unless grabbing
        console.log ev
        console.log 'hammer mousedown'

      $svg.hammer().on 'mouseup', ->
        grabbing = false

      # $svg.on 'mousemove', '*', (event) =>
      #   return unless grabbing
      #   console.log event.target
      #
      # $svg.on 'mouseup', '*', (event) =>
      #   grabbing = false

    $fillColor = @$('input.fill-color').on 'keyup', =>
      @fillColor = @$fillColor.val()

    $strokeColor = @$('input.stroke-color').on 'keyup', =>
      @strokeColor = $strokeColor.val()

    @$('.undo').on 'click', => @trigger 'undo'

    @$('.redo').on 'click', => @trigger 'redo'
