template = require './template'

ReactView = React.createClass
  getInitialState: -> value: '<svg class="main" width=640 height=320 style="background-color:white;"></svg>'
  render: ->
    React.DOM.div {
      className: 'content'
      dangerouslySetInnerHTML:
        __html: @state.value
    }


$ =>
  strokeColor = 'black'
  fillColor = 'none'

  $('body').html template()

  $svg = $('svg')
  paper = Snap('.main')
  window.paper = paper

  svg = document.querySelector '.main'

  {left: offsetX, top: offsetY} = $('svg').position()
  console.log offsetX, offsetY

  reactView = React.renderComponent (ReactView {}), document.querySelector '.preview'


  update = ->
    reactView.setState value: svg.outerHTML

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

