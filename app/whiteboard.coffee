RectDrawingGesture = require './gestures/rect-drawing-gesture'
FreeDrawingGesture = require './gestures/free-drawing-gesture'
LineDrawingGesture = require './gestures/line-drawing-gesture'
CircleDrawingGesture = require './gestures/circle-drawing-gesture'
EraserGesture = require './gestures/eraser-gesture'
GrabGesture = require './gestures/eraser-gesture'

EventEmitter = require './utils/event-emitter'
extend = require './utils/extend'

pointsToSegments = ([[sx, sy], body...]) ->
  [].concat [['M', sx, sy]], body.map do =>
    lx = sx
    ly = sy
    ([x, y]) ->
      dx = x - lx
      dy = y - ly
      lx = x
      ly = y
      ['l', dx, dy]

segementsToPoints = ([[t, sx, sy], body...]) ->
  [].concat [[sx, sy]], body.map do =>
    cx = sx
    cy = sy
    ([t, x, y]) ->
      cx += x
      cy += y
      [cx, cy]

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

  setLayer: (n) ->
    for l in @layers
      l.node.style.visibility = 'hidden'
    @layer = @layers[n]
    @layer.node.style.visibility = 'visible'

  showBackground: -> @$('.bg').show()

  hideBackground: -> @$('.bg').hide()

  setMode: (mode) =>
    @mode = mode
    @$svg.off()
    Gesture = switch mode
      when 'free'   then FreeDrawingGesture
      when 'rect'   then RectDrawingGesture
      when 'line'   then LineDrawingGesture
      when 'circle' then CircleDrawingGesture
      when 'eraser' then EraserGesture
      when 'grab'   then GrabGesture

    gesture = new Gesture @
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

      # $svg.on 'mousedown', '*', (event) =>
      #   grabbing = true
      #
      # $svg.on 'mousemove', '*', (ev) ->
      #   return unless grabbing
      #   console.log ev
      #   console.log 'hammer mousedown'
      #
      # $svg.on 'mouseup', ->
      #   grabbing = false

    $fillColor = @$('input.fill-color').on 'keyup', =>
      @fillColor = @$fillColor.val()

    $strokeColor = @$('input.stroke-color').on 'keyup', =>
      @strokeColor = $strokeColor.val()

    @$('.undo').on 'click', => @trigger 'undo'

    @$('.redo').on 'click', => @trigger 'redo'

    @$('.layer0').on 'click', => @setLayer(0); @showBackground()
    @$('.layer1').on 'click', => @setLayer(1); @hideBackground()
    @$('.layer2').on 'click', => @setLayer(2); @hideBackground()
    @layers = [
      @paper.g()
      @paper.g()
      @paper.g()
    ]
    @ui = @paper.g()
    @setLayer(0)
    @setMode 'free'


    # $$path = Snap.select('path')
    # $$path.click =>
    #   path = Snap.parsePathString($$path.attr('d'))
    #   points = segementsToPoints path
    #   points.forEach ([sx, sy], index) =>
    #     $$circle = @ui.circle sx, sy, 5
    #     $$circle.attr fill: 'transparent', stroke: 'black', strokeDasharray:"1,2,1"
    #     lx = sx
    #     ly = sy
    #     $$circle.drag (dx, dy) ->
    #       # [x, y] = points[index]
    #       rx = lx + dx
    #       ry = ly + dy
    #       points[index] = [rx, ry]
    #       segs = pointsToSegments points
    #       $$path.attr('d', segs)
    #       $$circle.attr cx: rx, cy: ry
    #     , (x, y, p) ->
    #       console.log 'drag start', arguments...
    #       [lx, ly] = points[index]
    #       #
    #       # lx = x
    #       # ly = y
    #     # , ->
