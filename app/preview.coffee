module.exports =
class Preview
  ReactView = React.createClass
    getInitialState: -> value: '<svg class="main" width=640 height=320 style="background-color:white;"></svg>'
    render: ->
      React.DOM.div {
        className: 'content'
        dangerouslySetInnerHTML:
          __html: @state.value
      }

  constructor: (selector) ->
    @el = document.querySelector selector
    @reactView = React.renderComponent (ReactView {}), @el

  update: (text) ->
    @reactView.setState value: text
