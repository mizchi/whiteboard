Gesture = require './base/gesture'
RectOperation = require '../operations/rect'
PathOperation = require '../operations/path'
CircleOperation = require '../operations/circle'

{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'

module.exports =
class GrabGesture extends Gesture
  constructor: ->
    super
    @disposers = []
    @$shapes = @currentLayer().selectAll('*')
    @$shapes.forEach ($shape) =>
      Operation = @getOperationByType($shape.type)
      return unless Operation # TODO: Avoid unknown shape
      @disposers.push Operation.watch $shape, @wb

  getOperationByType: (type) ->
    switch type
      when 'path' then PathOperation
      when 'rect' then RectOperation
      when 'circle' then CircleOperation

  focus: ($shape) ->
    @getOperationByType($shape.type).focus($shape, @wb)

  dispose: ->
    @disposeFocus?()
    @$shapes.forEach ($path) =>
      $path.unclick()
      $path.undrag()
    @wb.clearUI()
    @wb.paper.undrag()
    @wb.paper.unclick()
    while d = @disposers.shift()
      d()
