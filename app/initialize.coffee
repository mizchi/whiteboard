class EventEmitter
  on: (eventName, callback) =>
    @_events ?= []
    @_events[eventName] ?= []
    @_events[eventName].push callback
    @

  off: (eventName, fn) =>
    if arguments.length is 0
      delete @events
      return @
    if fn?
      # n = _.findIndex @events[eventName], (i) => i is fn
      n = @events[eventName]?.indexOf fn
      if n > -1
        @_events[eventName].splice n, 1
    else
      delete @_events[eventName]
    @

  trigger: (eventName, args...) =>
    @_events?[eventName]?.map (callback) =>
      callback args...
    @

extend = (obj, props) =>
  for k, v of props then obj[k] = v
  obj

ReactView = React.createClass
  getInitialState: -> value: '<svg class="main" width=640 height=320 style="background-color:white;"></svg>'
  render: ->
    React.DOM.div {
      className: 'content'
      dangerouslySetInnerHTML:
        __html: @state.value
    }

class window.Whiteboard
  template = require './template'

  extend @::, EventEmitter::

  $: (selector) =>
    @$el.find selector

  update: =>
    @trigger 'changed', @getSVG()

  getSVG: =>
    @svg.outerHTML

  constructor: (selector, {preview} = {}) ->
    strokeColor = 'black'
    fillColor = 'transparent'

    @el = el = document.querySelector selector
    @$el = $(@el)
    @$el.html template()

    @svg = svg = document.querySelector 'svg.whiteboard'
    @$svg = $svg = $(@svg)
    paper = Snap(svg)

    {left: offsetX, top: offsetY} = @$svg.position()

    setDrawingMode = =>
      lastPath = null

      @$svg.off()
      paths = []
      new Hammer(@svg)
        .on 'touch', (ev) =>
          paths.push [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastPath = paper.polyline
            points: _.flatten(paths)
            fill: "none"
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 1

        .on 'drag', (ev) =>
          lastPath?.remove()

          paths.push [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastPath = paper.polyline
            points: _.flatten(paths)
            fill:"none"
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 1

        .on 'dragend', (ev) =>
          lastPath?.remove()

          simplified = simplify (paths.map ([x, y]) => {x, y}), tolelance, false
          r = simplified.map ({x, y}) => [x, y]

          lastPath = paper.polyline
            points: r
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 2
          paths = []

          do (lastPath) =>
            lastPath.node.onmousemove = =>
              if eraser
                lastPath.remove()
                @update()

          @update()

    setRectDrawingMode = =>
      startPoint = null
      endPoint = null
      lastShape = null

      @$svg.off()
      new Hammer(@svg)
        .on 'touch', (ev) =>
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
        .on 'dragstart', (ev) =>
          lastShape = null
        .on 'drag', (ev) =>
          endPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape?.remove()
          [sx, sy] = startPoint
          [ex, ey] = endPoint

          x = Math.min sx, ex
          y = Math.min sy, ey

          w = Math.abs sx - ex
          h = Math.abs sy - ey

          rect = paper.rect x, y, w, h
          rect.attr
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 1
          lastShape = rect

        .on 'dragend', (ev) =>
          @update()
          do (lastShape) =>
            lastShape.node.onmousemove = =>
              if eraser
                lastShape.remove()
                @update()

    setCircleDrawingMode = =>
      startPoint = null
      endPoint = null
      lastShape = null

      @$svg.off()
      new Hammer(@svg)
        .on 'touch', (ev) =>
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape = null
        .on 'drag', (ev) =>
          endPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape?.remove()
          [sx, sy] = startPoint
          [ex, ey] = endPoint

          x = sx
          y = sy

          r = Math.max Math.abs(sx - ex), Math.abs(sy - ey)

          rect = paper.circle x, y, r
          rect.attr
            strokeWidth: 1
            stroke: strokeColor
            fill: fillColor
          lastShape = rect

        .on 'dragend', (ev) =>
          @update()
          do (lastShape) =>
            lastShape.node.onmousemove = =>
              if eraser
                lastShape.remove()
                @update()


    setLineDrawingMode = =>
      startPoint = null
      endPoint = null
      lastShape = null

      @$svg.off()
      new Hammer(@svg)
        .on 'touch', (ev) =>
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape = null
        .on 'drag', (ev) =>
          console.log 'drag'
          endPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape?.remove()
          [sx, sy] = startPoint
          [ex, ey] = endPoint

          line = paper.line sx, sy, ex, ey
          line.attr
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 1
            # fill: 'transparent'

          lastShape = line

        .on 'dragend', (ev) =>
          @update()
          do (lastShape) =>
            lastShape.node.onmousemove = =>
              if eraser
                lastShape.remove()
                @update()

    eraser = false
    setEraserMode = =>
      @$svg.off()
      new Hammer(svg)
        .on 'dragstart', (ev) =>
          eraser = true
        .on 'dragend', (ev) =>
          eraser = false

    setDrawingMode()

    tolelance = 2
    $tolelance = $('.tolelance-value')
    @$('.tolelance-plus').on 'click', =>
      tolelance++
      $tolelance.text tolelance

    @$('.tolelance-minus').on 'click', =>
      tolelance--
      $tolelance.text tolelance

    @$('.edit-free-drawing').on 'click', =>
      setDrawingMode()

    @$('.edit-rect').on 'click', =>
      setRectDrawingMode()

    @$('.edit-line').on 'click', =>
      setLineDrawingMode()

    @$('.edit-circle').on 'click', =>
      setCircleDrawingMode()

    @$('.edit-eraser').on 'click', =>
      setEraserMode()

    $fillColor = @$('input.fill-color').on 'keyup', =>
      fillColor = @$fillColor.val()

    $strokeColor = @$('input.stroke-color').on 'keyup', =>
      strokeColor = $strokeColor.val()

    @$('.undo').on 'click', =>
      @trigger 'undo'

    @$('.redo').on 'click', =>
      @trigger 'redo'

$ =>
  whiteboard = new Whiteboard('.whiteboard-container')

  hist = ['']
  future = []

  MAX_HISTORY = 10
  $svg = $('svg')

  reactView = React.renderComponent (ReactView {}), document.querySelector '.preview'
  whiteboard.on 'changed', (svg) =>
    future = []
    hist.unshift svg
    if hist.length > MAX_HISTORY
      hist.pop()
    reactView.setState value: svg

  whiteboard.on 'undo', (svg) =>
    return if hist.length is 0

    head = hist.shift()
    future.unshift head
    if future.length > MAX_HISTORY
      future.pop()

    next = hist[0]
    reactView.setState value: next
    $svg.html next

  whiteboard.on 'redo', (svg) =>
    return if future.length is 0
    next = future.shift()
    hist.unshift next

    reactView.setState value: next
    $svg.html next
