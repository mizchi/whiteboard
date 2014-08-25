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

module.exports = {pointsToSegments, segementsToPoints}
