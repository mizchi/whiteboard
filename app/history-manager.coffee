module.exports =
class HistoryManager
  MAX_HISTORY = 10
  constructor: (@wb) ->
    @hist = ['']
    @future = []

  current: -> @hist[0]

  pushHistory: (svg) ->
    @future = []
    @hist.unshift svg
    if @hist.length > MAX_HISTORY
      @hist.pop()

  undo: ->
    return if @hist.length is 0
    head = @hist.shift()
    @future.unshift head
    if @future.length > MAX_HISTORY
      @future.pop()

  redo: ->
    return if @future.length is 0
    next = @future.shift()
    @hist.unshift next


