Gesture = require './base/gesture'
RectOperation = require '../operations/rect'
PathOperation = require '../operations/path'

{pointsToSegments, segementsToPoints, adjustToNearPoint, pathToPoints} = require '../utils/utils'

module.exports =
class GrabGesture extends Gesture
  getOperationByType: (type) ->
    switch type
      when 'path' then PathOperation
      when 'rect' then RectOperation

  constructor: ->
    super
    @disposers = []
    @$shapes = @currentLayer().selectAll('*')
    @$shapes.forEach ($shape) =>
      Operation = @getOperationByType($shape.type)
      @disposers.push Operation.watch $shape, @wb

  focus: ($shape) ->
    @getOperationByType($shape.type).focus($shape, @wb)

  dispose: ->
    @disposeFocus?()
    @$shapes.forEach ($path) =>
      $path.unclick()
      $path.undrag()
    @wb.clearUI()
