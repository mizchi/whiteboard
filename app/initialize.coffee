template = require './template'

class EventEmitter
  on: (eventName, callback) ->
    @_events ?= []
    @_events[eventName] ?= []
    @_events[eventName].push callback
    @

  off: (eventName, fn) ->
    if arguments.length is 0
      delete @events
      return @
    if fn?
      # n = _.findIndex @events[eventName], (i) -> i is fn
      n = @events[eventName]?.indexOf fn
      if n > -1
        @_events[eventName].splice n, 1
    else
      delete @_events[eventName]
    @

  trigger: (eventName, args...) ->
    @_events?[eventName]?.map (callback) ->
      callback args...
    @

extend = (obj, props) ->
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
  extend @::, EventEmitter::

  constructor: (selector, {preview} = {}) ->
    strokeColor = 'black'
    fillColor = 'none'

    @svg = svg = document.querySelector selector
    $svg = $(svg)
    paper = Snap(selector)
    # window.paper = paper

    {left: offsetX, top: offsetY} = $svg.position()

    # reactView = React.renderComponent (ReactView {}), document.querySelector '.preview'

    update = =>
      @trigger 'changed', @getSVG()

    setDrawingMode = ->
      lastPath = null

      $(svg).off()
      paths = []
      new Hammer(svg)
        .on 'touch', (ev) ->
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

        .on 'drag', (ev) ->
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

        .on 'dragend', (ev) ->
          lastPath?.remove()

          simplified = simplify (paths.map ([x, y]) -> {x, y}), tolelance, false
          r = simplified.map ({x, y}) -> [x, y]

          lastPath = paper.polyline
            points: r
            stroke: strokeColor
            fill: fillColor
            strokeWidth: 2
          # rawSVG = document.querySelector('.main').outerHTML
          # reactView.setState value: rawSVG
          paths = []

          do (lastPath) ->
            lastPath.node.onmousemove = ->
              if eraser
                lastPath.remove()
                update()

          update()

    setRectDrawingMode = ->
      startPoint = null
      endPoint = null
      lastShape = null

      $(svg).off()
      new Hammer(svg)
        .on 'touch', (ev) ->
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
        .on 'dragstart', (ev) ->
          lastShape = null
        .on 'drag', (ev) ->
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

        .on 'dragend', (ev) ->
          update()
          do (lastShape) ->
            lastShape.node.onmousemove = ->
              if eraser
                lastShape.remove()
                update()

    setCircleDrawingMode = ->
      startPoint = null
      endPoint = null
      lastShape = null

      $(svg).off()
      new Hammer(svg)
        .on 'touch', (ev) ->
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape = null
        .on 'drag', (ev) ->
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

        .on 'dragend', (ev) ->
          update()
          do (lastShape) ->
            lastShape.node.onmousemove = ->
              if eraser
                lastShape.remove()
                update()


    setLineDrawingMode = ->
      startPoint = null
      endPoint = null
      lastShape = null

      $(svg).off()
      new Hammer(svg)
        .on 'touch', (ev) ->
          startPoint = [
            ev.gesture.center.pageX - offsetX
            ev.gesture.center.pageY - offsetY
          ]
          lastShape = null
        .on 'drag', (ev) ->
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

        .on 'dragend', (ev) ->
          update()
          do (lastShape) ->
            lastShape.node.onmousemove = ->
              if eraser
                lastShape.remove()
                update()

    eraser = false
    setEraserMode = ->
      $(svg).off()
      new Hammer(svg)
        .on 'dragstart', (ev) ->
          eraser = true
        .on 'dragend', (ev) ->
          eraser = false

    setDrawingMode()

    tolelance = 2
    $tolelance = $('.tolelance-value')
    $('.tolelance-plus').on 'click', ->
      tolelance++
      $tolelance.text tolelance

    $('.tolelance-minus').on 'click', ->
      tolelance--
      $tolelance.text tolelance

    $('.edit-free-drawing').on 'click', ->
      setDrawingMode()

    $('.edit-rect').on 'click', ->
      setRectDrawingMode()

    $('.edit-line').on 'click', ->
      setLineDrawingMode()

    $('.edit-circle').on 'click', ->
      setCircleDrawingMode()

    $('.edit-eraser').on 'click', ->
      setEraserMode()

    $fillColor = $('input.fill-color').on 'keyup', ->
      fillColor = $fillColor.val()

    $strokeColor = $('input.stroke-color').on 'keyup', ->
      strokeColor = $strokeColor.val()
    # $('svg.main').on '', 'rect', -> console.log 'rect'

  getSVG: ->
    @svg.outerHTML

$ =>
  $('body').html template()
  whiteboard = new Whiteboard('.main')

  reactView = React.renderComponent (ReactView {}), document.querySelector '.preview'
  whiteboard.on 'changed', (svg) ->
    reactView.setState value: svg

