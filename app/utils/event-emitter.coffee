# @mixin
# @example
#   class MyClass
#     _.extend MyClass::, EventEmitter::
#   my = new MyClass
#   my.on 'my-event', -> console.log 'my event triggered'
#   my.trigger 'my-event'
#   my.off()
class EventEmitter
  # @param [string] eventName
  # @param [Function] callback
  # @return [EventEmitter]
  on: (eventName, callback) =>
    @_events ?= []
    @_events[eventName] ?= []
    @_events[eventName].push callback
    @

  # @option [string] eventName
  # @option [Function] callback
  # @return [EventEmitter]
  off: (eventName, fn) =>
    if arguments.length is 0
      delete @events
      return @
    if fn?
      n = @events[eventName]?.indexOf fn
      if n > -1
        @_events[eventName].splice n, 1
    else
      delete @_events[eventName]
    @

  # @param [string] eventName
  # @option [Array<Object>] args
  # @return [EventEmitter]
  trigger: (eventName, args...) =>
    @_events?[eventName]?.map (callback) =>
      callback args...
    @

module.exports = EventEmitter
