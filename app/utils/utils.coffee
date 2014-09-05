int = parseInt

# Point[] -> Segment[]
# @param [Array<Point>] points
# @return [Array<Segment>]
pointsToSegments = (points) ->
  [[sx, sy], body...] = points
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

# Segment[] -> Point[]
# @param [Array<Segment>] segments
# @return [Array<Point>]
segementsToPoints = (segments) ->
  [[t, sx, sy], body...] = segments
  [].concat [[sx, sy]], body.map do =>
    cx = sx
    cy = sy
    ([t, x, y]) ->
      if t is 'Z' then return [sx, sy]
      cx += x
      cy += y
      [cx, cy]

# Snap.Path -> Point[]
# @param [Snap.Path] $path
# @return [Array<Point>]
pathToPoints = ($path) ->
  segments = Snap.parsePathString $path.attr('d')
  segementsToPoints segments

# Point * Point[] * Int? -> Point
# @param [number] n base value
# @param [Array<number>] points canditates
# @option [number] force adjust power(default=3)
# @return [number]
adjustToNearPoint = (n, points, force = 3) ->
  for p in points when p - force < n < p + force
    return p
  null

# Snap.Group -> {xs :: Int[], ys :: Int[]}
# @param [Snap.Group] layer target Snap.Group
# @return [Array<number>]
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

module.exports = {pointsToSegments, segementsToPoints, getAnchorPoints, adjustToNearPoint, pathToPoints}
