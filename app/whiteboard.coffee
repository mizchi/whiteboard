# Gestures
RectDrawingGesture   = require './gestures/rect-drawing-gesture'
FreeDrawingGesture   = require './gestures/free-drawing-gesture'
LineDrawingGesture   = require './gestures/line-drawing-gesture'
CircleDrawingGesture = require './gestures/circle-drawing-gesture'
EraserGesture        = require './gestures/eraser-gesture'
GrabGesture          = require './gestures/grab-gesture'

# Utilities
EventEmitter      = require './utils/event-emitter'
{getAnchorPoints} = require './utils/utils'

HistoryManager = require './history-manager'
int = parseInt

# Whiteboard
# @example
#    new Whiteboard '.whiteboard-container'
module.exports = class Whiteboard
  # start application
  # @param [string]
  # @return [Whiteboard]
  @initializeWithHistoryManager: (selector) ->
    whiteboard = new Whiteboard(selector)
    hist = new HistoryManager

    whiteboard.on 'changed', (svg) =>
      hist.pushHistory svg

    whiteboard.on 'undo', (svg) =>
      hist.undo()
      next = hist.current()
      whiteboard.setSVG next
      whiteboard.setMode whiteboard.mode

    whiteboard.on 'redo', (svg) =>
      hist.redo()
      next = hist.current()
      whiteboard.setSVG next
      whiteboard.setMode whiteboard.mode

    whiteboard.on 'hide-preview', (svg) =>
      preview.hide()

    whiteboard.on 'show-preview', (svg) =>
      preview.show()

    whiteboard

  # string template
  template = require './templates/whiteboard'

  _.extend @::, EventEmitter::

  # @param {string} fillColor fill color
  # @param {string} strokeColor stroke color
  # @param {number} tolelance drawing compress power
  # @param {HTMLElement} el application root element
  # @param {jQueryElement} $el application root element as jQueryElement
  # @param {Snap.Element} paper snap root element
  # @param {Snap.Element} layer focused layer to edit

  # Constructor
  # @param {string} initialized selector
  # @return [Whiteboard]
  constructor: (selector) ->
    window.whiteboard = @

    @strokeColor = strokeColor = 'black'
    @fillColor = fillColor = 'transparent'
    @tolelance = 2

    # setup element
    @el = el = document.querySelector selector
    @$el = $(@el)
    @$el.html template()
    @svg = svg = document.querySelector 'svg.whiteboard'
    @$svg = $svg = $(@svg)
    @paper = paper = Snap(svg)

    # get offset
    {left: offsetX, top: offsetY} = @$svg.position()
    @offsetX = offsetX
    @offsetY = offsetY

    # intialize buttons
    @setupButtons()

    @resetLayers()
    @setLayer(0)
    @setMode 'free'

  # Setup buttons for user interface
  # @private
  setupButtons: ->
    @$('.edit-free').on   'click', => @setMode 'free'
    @$('.edit-rect').on   'click', => @setMode 'rect'
    @$('.edit-line').on   'click', => @setMode 'line'
    @$('.edit-circle').on 'click', => @setMode 'circle'
    @$('.edit-eraser').on 'click', => @setMode 'eraser'
    @$('.edit-grab').on 'click', =>
      @$svg.off()
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

  # Clear all element on UI layer
  clearUI: ->
    Snap(@ui).selectAll('*').forEach (i) -> i.remove()

  # Fire changed event
  update: =>
    @trigger 'changed', @getSVG()

  # Get SVG
  getSVG: =>
    @paper.outerSVG()

  # Set SVG
  # @param [string] text CSS selector
  setSVG: (text) =>
    @$svg.html text

  # Get UI
  # TODO: reset correctly
  getUI: ->
    @ui ?= @paper.g()

  # Set Target Layer
  # @param [string] text CSS selector
  setLayer: (n) ->
    @clearUI()

    for l in @layers
      l.node.style.visibility = 'hidden'
    @layer = @layers[n]
    @layer.node.style.visibility = 'visible'

  # Show grid
  # @param [Array<number>] xs x axis points
  # @param [Array<number>] ys y axis points
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

  # Show background
  # @private
  showBackground: -> @$('.bg').show()

  # Hide background
  # @private
  hideBackground: -> @$('.bg').hide()

  # Alias to getAnchorPoints with this.layer
  getAnchorPoints: -> getAnchorPoints(@layer)


  # Set Mode
  # @param [string] mode mode name
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
      # console.log 'offset', ev.offsetX, ev.offsetY
      {left, top} = @$svg.offset()
      gesture._onTouchMove(ev)

      [x, y] = gesture.getPoint(ev)
      $x.text x
      $y.text y

  # TODO: flexisible layer creation
  # @private
  # @param [number] layerCount
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
      @svg = svg = document.querySelector 'svg.whiteboard'
      @$svg = $svg = $(@svg)
      @paper = paper = Snap(svg)
      @ui = Snap.select('.ui')
      @layers = [
        Snap.select('.l0')
        Snap.select('.l1')
        Snap.select('.l2')
      ]

  # jQuery shortcut wrap function
  # @param [string] selector CSS selector
  # @return [jQueryElement]
  $: (selector) =>
    @$el.find selector

  # @param [string] html html string
  setBackgroundHTML: (html) =>
    $bg = @$('.bg')
    $bg.html html
    w = $bg.width()
    h = $bg.height()
    @$svg.css
      width: Math.max w, 640
      height: Math.max h, 480


window.Whiteboard = Whiteboard
