module.exports = (g, {$1}) ->
  g.gen "gesture.coffee.hbs", "app/gestures/#{$1}-gesture.coffee"