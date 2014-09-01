RectDrawingGesture = require './gestures/rect-drawing-gesture'
FreeDrawingGesture = require './gestures/free-drawing-gesture'
LineDrawingGesture = require './gestures/line-drawing-gesture'
CircleDrawingGesture = require './gestures/circle-drawing-gesture'
EraserGesture = require './gestures/eraser-gesture'
GrabGesture = require './gestures/grab-gesture'

EventEmitter = require './utils/event-emitter'
extend = require './utils/extend'
{getAnchorPoints} = require './utils/utils'
int = parseInt

Whiteboard     = require './whiteboard'
HistoryManager = require './history-manager'
Preview        = require './preview'

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

  getUI: ->
    @ui = @paper.g()

  setLayer: (n) ->
    @clearUI()

    for l in @layers
      l.node.style.visibility = 'hidden'
    @layer = @layers[n]
    @layer.node.style.visibility = 'visible'

  clearUI: ->
    Snap(@ui).selectAll('*').forEach (i) -> i.remove()

  showBackground: -> @$('.bg').show()

  hideBackground: -> @$('.bg').hide()

  getAnchorPoints: -> getAnchorPoints(@layer)

  showGrid: (xs, ys) ->
    {xs, ys} = getAnchorPoints(@layer)
    for x in xs
      @ui.line
        x1: x, x2: x
        y1: 0, y2: 320
        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"

    for y in ys
      @ui.line
        x1: 0, x2: 640
        y1: y, y2: y
        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"

  setMode: (mode) =>
    # dispose previous gesture
    @$('.mode').text mode
    @_gesture?.dispose()

    @mode = mode
    @clearUI()
    @$svg.off()
    Gesture = switch mode
      when 'free'   then FreeDrawingGesture
      when 'rect'   then RectDrawingGesture
      when 'line'   then LineDrawingGesture
      when 'circle' then CircleDrawingGesture
      when 'eraser' then EraserGesture
      when 'grab'   then GrabGesture

    @_gesture = gesture = new Gesture @
    @$svg.on 'mousedown touchstart', (ev) => gesture._onTouchStart(ev)
    @$svg.on 'mouseup touchend', (ev) => gesture._onTouchEnd(ev)

    $x = $('.mouse-x')
    $y = $('.mouse-y')
    @$svg.on 'mousemove touchmove', (ev) =>
      gesture._onTouchMove(ev)
      [x, y] = gesture.getPoint(ev)
      $x.text x
      $y.text y

  constructor: (selector, {preview} = {}) ->
    window.whiteboard = @

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
    @offsetY = offsetY

    @tolelance = 2

    @$('.edit-free').on   'click', => @setMode 'free'
    @$('.edit-rect').on   'click', => @setMode 'rect'
    @$('.edit-line').on   'click', => @setMode 'line'
    @$('.edit-circle').on 'click', => @setMode 'circle'
    @$('.edit-eraser').on 'click', => @setMode 'eraser'

    @$('.edit-grab').on 'click', =>
      $svg.off()
      @setMode 'grab'
      grabbing = false

    $fillColor = @$('input.fill-color').on 'keyup', =>
      @fillColor = @$fillColor.val()

    $strokeColor = @$('input.stroke-color').on 'keyup', =>
      @strokeColor = $strokeColor.val()

    @$('.undo').on 'click', => @trigger 'undo'
    @$('.redo').on 'click', => @trigger 'redo'

    @$('.layer0').on 'click', => @setLayer(0); @showBackground()
    @$('.layer1').on 'click', => @setLayer(1); @hideBackground()
    @$('.layer2').on 'click', => @setLayer(2); @hideBackground()

    @resetLayers()

    @setLayer(0)
    @setMode 'grab'
    # $tolelance = $('.tolelance-value')
    # @$('.tolelance-plus').on 'click', =>
    #   @tolelance++
    #   $tolelance.text @tolelance
    #
    # @$('.tolelance-minus').on 'click', =>
    #   @tolelance--
    #   $tolelance.text @tolelance


  # TODO: flexisible layer creation
  resetLayers: (layerCount) ->
    unless @_layerInitialized
      @_layerInitialized = true
      @layers = [
        @paper.g().addClass 'l0'
        @paper.g().addClass 'l1'
        @paper.g().addClass 'l2'
      ]
      @ui = @paper.g().addClass 'ui'
    else
      @layers = [
        Snap.select('.l0')
        Snap.select('.l1')
        Snap.select('.l2')
      ]
      @ui = Snap.select('.ui')

  @start: (selector) ->
    whiteboard = new Whiteboard(selector)
    # preview = new Preview '.preview'
    hist = new HistoryManager

    whiteboard.on 'changed', (svg) =>
      hist.pushHistory svg
      # preview.update hist.current()

    whiteboard.on 'undo', (svg) =>
      console.log 'undo'
      hist.undo()
      next = hist.current()
      # preview.update next
      whiteboard.setSVG next
      whiteboard.setMode whiteboard.mode

    whiteboard.on 'redo', (svg) =>
      console.log 'redo'
      hist.redo()
      next = hist.current()
      # preview.update next
      whiteboard.setSVG next
      whiteboard.setMode whiteboard.mode

    whiteboard.on 'hide-preview', (svg) =>
      preview.hide()

    whiteboard.on 'show-preview', (svg) =>
      preview.show()

    whiteboard
