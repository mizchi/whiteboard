int = parseInt

pointsToSegments = ([[sx, sy], body...]) ->
  segs = [].concat [['M', sx, sy]], body.map do =>
    lx = sx
    ly = sy
    ([x, y]) ->
      dx = x - lx
      dy = y - ly
      lx = x
      ly = y
      ['l', dx, dy]

  [ex, ey] = _.last body
  if sx is ex and sy is ey
    segs[segs.length-1] = ['Z']
  segs



segementsToPoints = ([[t, sx, sy], body...]) ->
  [].concat [[sx, sy]], body.map do =>
    cx = sx
    cy = sy
    ([t, x, y]) ->
      if t is 'Z' then return [sx, sy]
      cx += x
      cy += y
      [cx, cy]

# Int * Int[] * Int? -> { adjusted :: Bool, n :: Int }
adjustToNearPoint = (n, points, force = 3) ->
  for p in points when p - force < n < p + force
    return p
  null

# Snap.Group -> {xs :: Int[], ys :: Int[]}
getAnchorPoints = (layer) ->
  anchor_x = []
  anchor_y = []
  anchor_points = []
  layer.selectAll('*').forEach ($shape) =>
    switch $shape.type
      when 'rect'
        x = int $shape.attr('x')
        y = int $shape.attr('y')
        w = int $shape.attr('width')
        h = int $shape.attr('height')

        anchor_x.push x, x+w
        anchor_y.push y, y+h
  {xs: anchor_x, ys: anchor_y}

module.exports = {pointsToSegments, segementsToPoints, getAnchorPoints, adjustToNearPoint}
