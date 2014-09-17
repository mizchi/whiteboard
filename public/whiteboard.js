(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventEmitter, Gesture, extend,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

EventEmitter = require('../../utils/event-emitter');

extend = require('../../utils/extend');

module.exports = Gesture = (function() {
  function Gesture(wb) {
    this.wb = wb;
    this.getPoint = __bind(this.getPoint, this);
  }

  Gesture.prototype.currentLayer = function() {
    return this.wb.layer;
  };

  Gesture.prototype._onTouch = function() {
    return this.onTouch.apply(this, arguments);
  };

  Gesture.prototype.onTouch = function() {};

  Gesture.prototype._onTouchStart = function() {
    return this.onTouchStart.apply(this, arguments);
  };

  Gesture.prototype.onTouchStart = function() {};

  Gesture.prototype._onTouchMove = function() {
    return this.onTouchMove.apply(this, arguments);
  };

  Gesture.prototype.onTouchMove = function() {};

  Gesture.prototype._onTouchEnd = function() {
    return this.onTouchEnd.apply(this, arguments);
  };

  Gesture.prototype.onTouchEnd = function() {};

  Gesture.prototype._onTouchStart = function() {
    return this.onTouchStart.apply(this, arguments);
  };

  Gesture.prototype.onTouchStart = function() {};

  Gesture.prototype._onTouchMove = function() {
    return this.onTouchMove.apply(this, arguments);
  };

  Gesture.prototype.onTouchMove = function() {};

  Gesture.prototype._onTouchEnd = function() {
    return this.onTouchEnd.apply(this, arguments);
  };

  Gesture.prototype.onTouchEnd = function() {};

  Gesture.prototype.dispose = function() {};

  Gesture.prototype.getPoint = function(ev) {
    var left, top, _ref;
    if (ev.offsetX) {
      return [ev.offsetX - this.wb.offsetX, ev.offsetY - this.wb.offsetY];
    } else {
      _ref = this.wb.offset(), left = _ref.left, top = _ref.top;
      return [ev.pageX - left, ev.pageY - top];
    }
  };

  return Gesture;

})();


},{"../../utils/event-emitter":13,"../../utils/extend":14}],2:[function(require,module,exports){
var CircleDrawingGesture, Gesture,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = CircleDrawingGesture = (function(_super) {
  __extends(CircleDrawingGesture, _super);

  function CircleDrawingGesture() {
    var sx, sy, _ref;
    CircleDrawingGesture.__super__.constructor.apply(this, arguments);
    _ref = [], sx = _ref[0], sy = _ref[1];
    this.wb.paper.drag((function(_this) {
      return function(dx, dy, x, y, event) {
        var circle, ex, ey, r, _ref1, _ref2;
        if ((_ref1 = _this.lastShape) != null) {
          _ref1.remove();
        }
        _ref2 = [sx + dx, sy + dy], ex = _ref2[0], ey = _ref2[1];
        r = Math.max(Math.abs(sx - ex), Math.abs(sy - ey));
        circle = _this.currentLayer().circle(sx, sy, r);
        circle.attr({
          strokeWidth: 1,
          stroke: _this.wb.strokeColor,
          fill: _this.wb.fillColor
        });
        return _this.lastShape = circle;
      };
    })(this), (function(_this) {
      return function(x, y, event) {
        var _ref1;
        return _ref1 = _this.getPoint(event), sx = _ref1[0], sy = _ref1[1], _ref1;
      };
    })(this), (function(_this) {
      return function() {
        _this.wb.update();
        return _this.lastShape = null;
      };
    })(this));
  }

  CircleDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  return CircleDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],3:[function(require,module,exports){
var EraserDrawingGesture, Gesture,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = EraserDrawingGesture = (function(_super) {
  __extends(EraserDrawingGesture, _super);

  function EraserDrawingGesture() {
    EraserDrawingGesture.__super__.constructor.apply(this, arguments);
    this.eraser = false;
    this.currentLayer().selectAll('*').forEach((function(_this) {
      return function($shape) {
        return $shape.mousemove(function() {
          if (_this.eraser) {
            return $shape.remove();
          }
        });
      };
    })(this));
    this.wb.paper.mousedown((function(_this) {
      return function() {
        return _this.eraser = true;
      };
    })(this));
    this.wb.paper.mouseup((function(_this) {
      return function() {
        return _this.eraser = false;
      };
    })(this));
  }

  EraserDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  return EraserDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],4:[function(require,module,exports){
var FreeDrawingGesture, Gesture, pointsToSegments, _simplify,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

pointsToSegments = require('../utils/utils').pointsToSegments;

_simplify = function(points, tolelance) {
  return simplify(points.map((function(_this) {
    return function(_arg) {
      var x, y;
      x = _arg[0], y = _arg[1];
      return {
        x: x,
        y: y
      };
    };
  })(this)), tolelance, false).map((function(_this) {
    return function(_arg) {
      var x, y;
      x = _arg.x, y = _arg.y;
      return [x, y];
    };
  })(this));
};

module.exports = FreeDrawingGesture = (function(_super) {
  __extends(FreeDrawingGesture, _super);

  function FreeDrawingGesture() {
    var sx, sy, _ref;
    FreeDrawingGesture.__super__.constructor.apply(this, arguments);
    this.points = [];
    _ref = [], sx = _ref[0], sy = _ref[1];
    this.wb.paper.drag((function(_this) {
      return function(dx, dy, x, y, event) {
        var segments, _ref1;
        _this.points.push([sx + dx, sy + dy]);
        if ((_ref1 = _this.lastPath) != null) {
          _ref1.remove();
        }
        segments = pointsToSegments(_this.points);
        return _this.lastPath = _this.currentLayer().path({
          path: segments,
          fill: "none",
          stroke: _this.wb.strokeColor,
          fill: _this.wb.fillColor,
          strokeWidth: 1
        });
      };
    })(this), (function(_this) {
      return function(x, y, event) {
        var _ref1;
        _this.points = [];
        _this.lastPath = null;
        _ref1 = _this.getPoint(event), sx = _ref1[0], sy = _ref1[1];
        return _this.points.push([sx, sy]);
      };
    })(this), (function(_this) {
      return function() {
        var segments, _ref1;
        if ((_ref1 = _this.lastPath) != null) {
          _ref1.remove();
        }
        segments = pointsToSegments(_simplify(_this.points));
        _this.currentLayer().path({
          path: segments,
          fill: "none",
          stroke: _this.wb.strokeColor,
          fill: _this.wb.fillColor,
          strokeWidth: 1
        });
        return _this.wb.update();
      };
    })(this));
  }

  FreeDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  return FreeDrawingGesture;

})(Gesture);


},{"../utils/utils":15,"./base/gesture":1}],5:[function(require,module,exports){
var CircleOperation, Gesture, GrabGesture, PathOperation, RectOperation, adjustToNearPoint, pathToPoints, pointsToSegments, segementsToPoints, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

RectOperation = require('../operations/rect');

PathOperation = require('../operations/path');

CircleOperation = require('../operations/circle');

_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;

module.exports = GrabGesture = (function(_super) {
  __extends(GrabGesture, _super);

  function GrabGesture() {
    GrabGesture.__super__.constructor.apply(this, arguments);
    this.disposers = [];
    this.$shapes = this.currentLayer().selectAll('*');
    this.$shapes.forEach((function(_this) {
      return function($shape) {
        var Operation;
        Operation = _this.getOperationByType($shape.type);
        if (!Operation) {
          return;
        }
        return _this.disposers.push(Operation.watch($shape, _this.wb));
      };
    })(this));
  }

  GrabGesture.prototype.getOperationByType = function(type) {
    switch (type) {
      case 'path':
        return PathOperation;
      case 'rect':
        return RectOperation;
      case 'circle':
        return CircleOperation;
    }
  };

  GrabGesture.prototype.focus = function($shape) {
    return this.getOperationByType($shape.type).focus($shape, this.wb);
  };

  GrabGesture.prototype.dispose = function() {
    var d, _results;
    if (typeof this.disposeFocus === "function") {
      this.disposeFocus();
    }
    this.$shapes.forEach((function(_this) {
      return function($path) {
        $path.unclick();
        return $path.undrag();
      };
    })(this));
    this.wb.clearUI();
    this.wb.paper.undrag();
    this.wb.paper.unclick();
    _results = [];
    while (d = this.disposers.shift()) {
      _results.push(d());
    }
    return _results;
  };

  return GrabGesture;

})(Gesture);


},{"../operations/circle":9,"../operations/path":10,"../operations/rect":11,"../utils/utils":15,"./base/gesture":1}],6:[function(require,module,exports){
var Gesture, LineDrawingGesture, getNearPoint, getPathPositions, pointsToSegments, segementsToPoints, showAnchorsToShape, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints;

getPathPositions = function($group) {
  var points;
  points = [];
  $group.selectAll('path').forEach((function(_this) {
    return function($path) {
      var ps, segments;
      segments = Snap.parsePathString($path.attr('d'));
      ps = segementsToPoints(segments);
      points.push(_.first(ps).concat($path));
      return points.push(_.last(ps).concat($path));
    };
  })(this));
  return points;
};

getNearPoint = function(_arg, points, force) {
  var costs, minCost, minIndex, sx, sy, _ref1;
  sx = _arg[0], sy = _arg[1];
  if (force == null) {
    force = 10;
  }
  if (points.length === 0) {
    return null;
  }
  costs = points.map(function(_arg1, index) {
    var x, y;
    x = _arg1[0], y = _arg1[1];
    return Math.abs(sx - x) + Math.abs(sy - y);
  });
  _ref1 = costs.reduce(function(_arg1, cost, index) {
    var minCost, minIndex;
    minIndex = _arg1[0], minCost = _arg1[1];
    if (minCost > cost) {
      return [index, cost];
    } else {
      return [minIndex, minCost];
    }
  }, [0, costs[0]]), minIndex = _ref1[0], minCost = _ref1[1];
  if (minCost <= 10) {
    return points[minIndex].concat(minIndex);
  } else {
    return null;
  }
};

showAnchorsToShape = function(shape, wb) {
  var points, segs;
  segs = Snap.parsePathString(shape.attr('d'));
  points = segementsToPoints(segs);
  return points.map((function(_this) {
    return function(_arg) {
      var $circle, x, y;
      x = _arg[0], y = _arg[1];
      $circle = wb.ui.circle({
        cx: x,
        cy: y,
        r: 8,
        fill: 'transparent',
        stroke: 'blue',
        opacity: 0.86
      });
      $circle.mousemove(function() {
        return $circle.attr('stroke', 'red');
      });
      return $circle.mouseout(function() {
        return $circle.attr('stroke', 'blue');
      });
    };
  })(this));
};

module.exports = LineDrawingGesture = (function(_super) {
  __extends(LineDrawingGesture, _super);

  LineDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  function LineDrawingGesture() {
    var ex, ey, fromShape, mode, pathArray, points, sx, sy, _ref1;
    LineDrawingGesture.__super__.constructor.apply(this, arguments);
    this.nearPoints = getPathPositions(this.currentLayer());
    _ref1 = [], sx = _ref1[0], sy = _ref1[1], ex = _ref1[2], ey = _ref1[3];
    mode = '';
    pathArray = null;
    fromShape = null;
    points = null;
    this.wb.paper.drag((function(_this) {
      return function(dx, dy, x, y, event) {
        var p, segs, _ref2, _ref3;
        segs = null;
        _ref2 = [dx + sx, dy + sy], ex = _ref2[0], ey = _ref2[1];
        if (p = getNearPoint([ex, ey], _this.nearPoints)) {
          ex = p[0], ey = p[1];
        }
        if (mode === 'isolate') {
          segs = pointsToSegments([[sx, sy], [ex, ey]]);
        } else if (mode === 'tail') {
          if (fromShape != null) {
            fromShape.remove();
          }
          fromShape = null;
          segs = pointsToSegments(points.concat([[ex, ey]]));
        } else if (mode === 'head') {
          if (fromShape != null) {
            fromShape.remove();
          }
          fromShape = null;
          segs = pointsToSegments([[ex, ey]].concat(points));
        }
        if ((_ref3 = _this.lastShape) != null) {
          _ref3.remove();
        }
        return _this.lastShape = _this.currentLayer().path({
          path: segs,
          stroke: _this.wb.strokeColor,
          fill: _this.wb.fillColor,
          strokeWidth: 1
        });
      };
    })(this), (function(_this) {
      return function(x, y, event) {
        var last_x, last_y, p, segs, _ref2;
        sx = event.offsetX;
        sy = event.offsetY;
        if (p = getNearPoint([sx, sy], _this.nearPoints)) {
          sx = p[0], sy = p[1], fromShape = p[2];
          segs = Snap.parsePathString(fromShape.attr('d'));
          points = segementsToPoints(segs);
          _ref2 = _.last(points), last_x = _ref2[0], last_y = _ref2[1];
          if (last_x === sx && last_y === sy) {
            return mode = 'tail';
          } else {
            return mode = 'head';
          }
        } else {
          return mode = 'isolate';
        }
      };
    })(this), (function(_this) {
      return function() {
        _this.nearPoints = getPathPositions(_this.currentLayer());
        showAnchorsToShape(_this.lastShape, _this.wb);
        return _this.lastShape = null;
      };
    })(this));
  }

  LineDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  return LineDrawingGesture;

})(Gesture);


},{"../utils/utils":15,"./base/gesture":1}],7:[function(require,module,exports){
var Gesture, RectDrawingGesture,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = RectDrawingGesture = (function(_super) {
  __extends(RectDrawingGesture, _super);

  function RectDrawingGesture() {
    var sx, sy, _ref;
    RectDrawingGesture.__super__.constructor.apply(this, arguments);
    this.startPoint = null;
    this.endPoint = null;
    this.lastShape = null;
    _ref = [], sx = _ref[0], sy = _ref[1];
    this.wb.paper.drag((function(_this) {
      return function(dx, dy, x, y, event) {
        var ex, ey, h, rect, w, _ref1, _ref2;
        if ((_ref1 = _this.lastShape) != null) {
          _ref1.remove();
        }
        _ref2 = [sx + dx, sy + dy], ex = _ref2[0], ey = _ref2[1];
        x = Math.min(sx, ex);
        y = Math.min(sy, ey);
        w = Math.abs(sx - ex);
        h = Math.abs(sy - ey);
        rect = _this.currentLayer().rect(x, y, w, h);
        rect.attr({
          stroke: _this.wb.strokeColor,
          fill: _this.wb.fillColor,
          strokeWidth: 1
        });
        return _this.lastShape = rect;
      };
    })(this), (function(_this) {
      return function(x, y, event) {
        var _ref1;
        _ref1 = _this.getPoint(event), sx = _ref1[0], sy = _ref1[1];
        return _this.lastShape = null;
      };
    })(this), (function(_this) {
      return function() {
        _this.wb.update();
        _this.wb.setMode('grab');
        _this.wb._gesture.focus(_this.lastShape);
        return _this.lastShape = null;
      };
    })(this));
  }

  RectDrawingGesture.prototype.dispose = function() {
    return this.wb.paper.undrag();
  };

  return RectDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],8:[function(require,module,exports){
var HistoryManager;

module.exports = HistoryManager = (function() {
  var MAX_HISTORY;

  MAX_HISTORY = 10;

  function HistoryManager(wb) {
    this.wb = wb;
    this.hist = [''];
    this.future = [];
  }

  HistoryManager.prototype.current = function() {
    return this.hist[0];
  };

  HistoryManager.prototype.pushHistory = function(svg) {
    this.future = [];
    this.hist.unshift(svg);
    if (this.hist.length > MAX_HISTORY) {
      return this.hist.pop();
    }
  };

  HistoryManager.prototype.undo = function() {
    var head;
    if (this.hist.length === 0) {
      return;
    }
    head = this.hist.shift();
    this.future.unshift(head);
    if (this.future.length > MAX_HISTORY) {
      return this.future.pop();
    }
  };

  HistoryManager.prototype.redo = function() {
    var next;
    if (this.future.length === 0) {
      return;
    }
    next = this.future.shift();
    return this.hist.unshift(next);
  };

  return HistoryManager;

})();


},{}],9:[function(require,module,exports){
var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;

_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;

int = parseInt;

focus = function($path, wb) {
  return function() {};
};

watch = function($circle, wb) {
  var cx, cy, disposeFocus, _ref1;
  wb.paper.mousedown((function(_this) {
    return function(ev) {
      return wb.clearUI();
    };
  })(this));
  disposeFocus = null;
  $circle.click((function(_this) {
    return function() {
      wb.clearUI();
      if (typeof disposeFocus === "function") {
        disposeFocus();
      }
      return disposeFocus = focus($circle, wb);
    };
  })(this));
  _ref1 = [], cx = _ref1[0], cy = _ref1[1];
  $circle.drag((function(_this) {
    return function(dx, dy) {
      var rx, ry;
      rx = cx + dx;
      ry = cy + dy;
      return $circle.attr({
        cx: rx,
        cy: ry
      });
    };
  })(this), (function(_this) {
    return function(dx, dy, ev) {
      cx = int($circle.attr('cx'));
      cy = int($circle.attr('cy'));
      ev.stopPropagation();
      return false;
    };
  })(this), (function(_this) {
    return function(ev) {
      ev.stopPropagation();
      return wb.update();
    };
  })(this));
  return function() {
    wb.paper.unmousedown();
    if (typeof disposeFocus === "function") {
      disposeFocus();
    }
    $circle.undrag();
    return $circle.unclick();
  };
};

module.exports = {
  watch: watch,
  focus: focus
};


},{"../utils/utils":15}],10:[function(require,module,exports){
var adjustToNearPoint, focus, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;

_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;

focus = function($path, wb) {
  var $points, points;
  points = pathToPoints($path);
  $points = points.map((function(_this) {
    return function(_arg, index) {
      var $circle, lx, ly, sx, sy;
      sx = _arg[0], sy = _arg[1];
      $circle = wb.ui.circle({
        cx: sx,
        cy: sy,
        fill: 'transparent',
        stroke: 'blue',
        r: 6
      });
      lx = sx;
      ly = sy;
      $circle.drag(function(dx, dy) {
        var rx, ry, segs;
        rx = lx + dx;
        ry = ly + dy;
        points[index] = [rx, ry];
        segs = pointsToSegments(points);
        $path.attr('d', segs);
        $circle.attr({
          cx: rx,
          cy: ry
        });
        return false;
      }, function(x, y, ev) {
        var _ref1;
        _ref1 = points[index], lx = _ref1[0], ly = _ref1[1];
        ev.stopPropagation();
        return false;
      }, function(ev) {
        ev.stopPropagation();
        return wb.update();
      });
      return $circle;
    };
  })(this));
  return function() {
    var $p, _i, _len, _results;
    wb.paper.unmousedown();
    _results = [];
    for (_i = 0, _len = $points.length; _i < _len; _i++) {
      $p = $points[_i];
      _results.push($p.remove());
    }
    return _results;
  };
};

watch = function($path, wb) {
  var disposeFocus, lx, ly, points, segs, _ref1, _type;
  points = pathToPoints($path);
  wb.paper.mousedown((function(_this) {
    return function(ev) {
      return wb.clearUI();
    };
  })(this));
  disposeFocus = null;
  $path.click((function(_this) {
    return function() {
      wb.clearUI();
      if (typeof disposeFocus === "function") {
        disposeFocus();
      }
      return disposeFocus = focus($path, wb);
    };
  })(this));
  segs = null;
  _ref1 = [], _type = _ref1[0], lx = _ref1[1], ly = _ref1[2];
  $path.drag((function(_this) {
    return function(dx, dy) {
      var rx, ry;
      rx = lx + dx;
      ry = ly + dy;
      segs[0] = ['M', rx, ry];
      return $path.attr('d', segs);
    };
  })(this), (function(_this) {
    return function(dx, dy, ev) {
      var _ref2;
      segs = Snap.parsePathString($path.attr('d'));
      _ref2 = segs[0], _type = _ref2[0], lx = _ref2[1], ly = _ref2[2];
      wb.clearUI();
      ev.stopPropagation();
      return false;
    };
  })(this), (function(_this) {
    return function(ev) {
      points = segementsToPoints(segs);
      ev.stopPropagation();
      return wb.update();
    };
  })(this));
  return function() {
    wb.paper.unmousedown();
    if (typeof disposeFocus === "function") {
      disposeFocus();
    }
    $path.undrag();
    return $path.unclick();
  };
};

module.exports = {
  watch: watch,
  focus: focus
};


},{"../utils/utils":15}],11:[function(require,module,exports){
var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;

_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;

int = parseInt;

focus = function($shape, wb) {
  var $leftBottom, $leftTop, $rightBottom, $rightTop, h, lh, lw, lx, ly, padding, resetAnchorsPosition, w, x, xs, y, ys, _ref1;
  x = int($shape.attr('x'));
  y = int($shape.attr('y'));
  w = int($shape.attr('width'));
  h = int($shape.attr('height'));
  $leftTop = wb.ui.circle({
    fill: 'transparent',
    stroke: 'blue',
    opacity: 0.86,
    r: 8
  });
  $rightTop = wb.ui.circle({
    fill: 'transparent',
    stroke: 'blue',
    opacity: 0.86,
    r: 8
  });
  $rightBottom = wb.ui.circle({
    fill: 'transparent',
    stroke: 'blue',
    opacity: 0.86,
    r: 8
  });
  $leftBottom = wb.ui.circle({
    fill: 'transparent',
    stroke: 'blue',
    opacity: 0.86,
    r: 8
  });
  resetAnchorsPosition = function(x, y, w, h) {
    $leftTop.attr({
      cx: x,
      cy: y
    });
    $rightTop.attr({
      cx: x + w,
      cy: y
    });
    $rightBottom.attr({
      cx: x + w,
      cy: y + h
    });
    return $leftBottom.attr({
      cx: x,
      cy: y + h
    });
  };
  resetAnchorsPosition(x, y, w, h);
  _ref1 = [x, y, w, h, [], []], lx = _ref1[0], ly = _ref1[1], lw = _ref1[2], lh = _ref1[3], xs = _ref1[4], ys = _ref1[5];
  padding = 5;
  return [
    {
      shape: $leftTop,
      x: function(dx, dy, x, y, w, h) {
        return x + dx;
      },
      y: function(dx, dy, x, y, w, h) {
        return y + dy;
      },
      w: function(dx, dy, x, y, w, h) {
        return Math.max(padding, w - dx);
      },
      h: function(dx, dy, x, y, w, h) {
        return Math.max(padding, h - dy);
      },
      adjust: function(x, y, w, h) {
        var ax, ay, dx, dy;
        if (ax = adjustToNearPoint(x, xs, 10)) {
          dx = x - ax;
          x = ax;
          w += dx;
        }
        if (ay = adjustToNearPoint(y, ys, 10)) {
          dy = y - ay;
          y = ay;
          h += dy;
        }
        return [x, y, w, h];
      }
    }, {
      shape: $rightTop,
      x: function(dx, dy, x, y, w, h) {
        return x;
      },
      y: function(dx, dy, x, y, w, h) {
        return y + dy;
      },
      w: function(dx, dy, x, y, w, h) {
        return Math.max(padding, w + dx);
      },
      h: function(dx, dy, x, y, w, h) {
        return Math.max(padding, h - dy);
      },
      adjust: function(x, y, w, h) {
        var ax, ay, dy, gx;
        gx = x + w;
        if (ax = adjustToNearPoint(gx, xs, 10)) {
          x = x;
          w = ax - x;
        }
        if (ay = adjustToNearPoint(y, ys, 10)) {
          dy = y - ay;
          y = ay;
          h += dy;
        }
        return [x, y, w, h];
      }
    }, {
      shape: $rightBottom,
      x: function(dx, dy, x, y, w, h) {
        return x;
      },
      y: function(dx, dy, x, y, w, h) {
        return y;
      },
      w: function(dx, dy, x, y, w, h) {
        return Math.max(padding, w + dx);
      },
      h: function(dx, dy, x, y, w, h) {
        return Math.max(padding, h + dy);
      },
      adjust: function(x, y, w, h) {
        var ax, ay, gx, gy;
        gx = x + w;
        if (ax = adjustToNearPoint(gx, xs, 10)) {
          x = x;
          w = ax - x;
        }
        gy = y + h;
        if (ay = adjustToNearPoint(gy, ys, 10)) {
          y = y;
          h = ay - y;
        }
        return [x, y, w, h];
      }
    }, {
      shape: $leftBottom,
      x: function(dx, dy, x, y, w, h) {
        return x + dx;
      },
      y: function(dx, dy, x, y, w, h) {
        return y;
      },
      w: function(dx, dy, x, y, w, h) {
        return Math.max(padding, w - dx);
      },
      h: function(dx, dy, x, y, w, h) {
        return Math.max(padding, h + dy);
      },
      adjust: function(x, y, w, h) {
        var ax, ay, dx, gy;
        if (ax = adjustToNearPoint(x, xs, 10)) {
          dx = x - ax;
          x = ax;
          w += dx;
        }
        gy = y + h;
        if (ay = adjustToNearPoint(gy, ys, 10)) {
          y = y;
          h = ay - y;
        }
        return [x, y, w, h];
      }
    }
  ].forEach((function(_this) {
    return function(anc) {
      return anc.shape.drag(function(dx, dy) {
        var args, rh, rw, rx, ry, _ref2;
        args = [dx, dy, lx, ly, lw, lh];
        rx = anc.x.apply(anc, args);
        ry = anc.y.apply(anc, args);
        rw = anc.w.apply(anc, args);
        rh = anc.h.apply(anc, args);
        _ref2 = anc.adjust(rx, ry, rw, rh), rx = _ref2[0], ry = _ref2[1], rw = _ref2[2], rh = _ref2[3];
        $shape.attr({
          x: rx,
          y: ry,
          width: rw,
          height: rh
        });
        return resetAnchorsPosition(rx, ry, rw, rh);
      }, function(x, y, ev) {
        var _ref2;
        ev.stopPropagation();
        lx = int($leftTop.attr('cx'));
        ly = int($leftTop.attr('cy'));
        lw = int($shape.attr('width'));
        lh = int($shape.attr('height'));
        _ref2 = wb.getAnchorPoints(), xs = _ref2.xs, ys = _ref2.ys;
        return wb.showGrid();
      }, function() {
        wb.clearUI();
        return wb.update();
      });
    };
  })(this));
};

watch = function($shape, wb) {
  var disposeFocus, lx, ly;
  wb.paper.mousedown((function(_this) {
    return function(ev) {
      return wb.clearUI();
    };
  })(this));
  disposeFocus = null;
  $shape.click((function(_this) {
    return function() {
      if (typeof disposeFocus === "function") {
        disposeFocus();
      }
      return disposeFocus = focus($shape, wb);
    };
  })(this));
  lx = int($shape.attr('x'));
  ly = int($shape.attr('y'));
  $shape.drag((function(_this) {
    return function(dx, dy) {
      var rx, ry;
      rx = lx + dx;
      ry = ly + dy;
      return $shape.attr({
        x: rx,
        y: ry
      });
    };
  })(this), (function(_this) {
    return function(dx, dy, ev) {
      wb.clearUI();
      lx = int($shape.attr('x'));
      ly = int($shape.attr('y'));
      ev.stopPropagation();
      return false;
    };
  })(this), (function(_this) {
    return function(ev) {
      ev.stopPropagation();
      return wb.update();
    };
  })(this));
  return function() {
    wb.paper.unmousedown();
    if (typeof disposeFocus === "function") {
      disposeFocus();
    }
    $shape.undrag();
    return $shape.unclick();
  };
};

module.exports = {
  watch: watch,
  focus: focus
};


},{"../utils/utils":15}],12:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div><button class=\"edit-grab\">grab</button><button class=\"edit-free\">free</button><button class=\"edit-rect\">rect</button><button class=\"edit-circle\">circle</button><button class=\"edit-line\">line</button><button class=\"edit-eraser\">eraser</button><span class=\"mode\"></span>&nbsp;<span class=\"mouse-x\"></span>:<span class=\"mouse-y\"></span></div><div><button class=\"layer0\">1</button><button class=\"layer1\">2</button><button class=\"layer2\">3</button></div><div style=\"position:relative; width:640px; height:320px; padding:0 margin: 0;\" class=\"main\"><div style=\"position:absolute;padding:0; margin: 0; overflow: hidden; -webkit-user-select: none;\" class=\"bg\"></div><svg width=\"640\" height=\"320\" style=\"position:absolute;padding:0 margin: 0;cursor: crosshair\" class=\"whiteboard\"></svg></div>");;return buf.join("");
};
},{"jade/runtime":17}],13:[function(require,module,exports){
var EventEmitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

EventEmitter = (function() {
  function EventEmitter() {
    this.trigger = __bind(this.trigger, this);
    this.off = __bind(this.off, this);
    this.on = __bind(this.on, this);
  }

  EventEmitter.prototype.on = function(eventName, callback) {
    var _base;
    if (this._events == null) {
      this._events = [];
    }
    if ((_base = this._events)[eventName] == null) {
      _base[eventName] = [];
    }
    this._events[eventName].push(callback);
    return this;
  };

  EventEmitter.prototype.off = function(eventName, fn) {
    var n, _ref;
    if (arguments.length === 0) {
      delete this.events;
      return this;
    }
    if (fn != null) {
      n = (_ref = this.events[eventName]) != null ? _ref.indexOf(fn) : void 0;
      if (n > -1) {
        this._events[eventName].splice(n, 1);
      }
    } else {
      delete this._events[eventName];
    }
    return this;
  };

  EventEmitter.prototype.trigger = function() {
    var args, eventName, _ref, _ref1;
    eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if ((_ref = this._events) != null) {
      if ((_ref1 = _ref[eventName]) != null) {
        _ref1.map((function(_this) {
          return function(callback) {
            return callback.apply(null, args);
          };
        })(this));
      }
    }
    return this;
  };

  return EventEmitter;

})();

module.exports = EventEmitter;


},{}],14:[function(require,module,exports){
var extend;

module.exports = extend = (function(_this) {
  return function(obj, props) {
    var k, v;
    for (k in props) {
      v = props[k];
      obj[k] = v;
    }
    return obj;
  };
})(this);


},{}],15:[function(require,module,exports){
var adjustToNearPoint, getAnchorPoints, int, pathToPoints, pointsToSegments, segementsToPoints,
  __slice = [].slice;

int = parseInt;

pointsToSegments = function(points) {
  var body, ex, ey, segs, sx, sy, _ref, _ref1;
  (_ref = points[0], sx = _ref[0], sy = _ref[1]), body = 2 <= points.length ? __slice.call(points, 1) : [];
  segs = [].concat([['M', sx, sy]], body.map((function(_this) {
    return function() {
      var lx, ly;
      lx = sx;
      ly = sy;
      return function(_arg) {
        var dx, dy, x, y;
        x = _arg[0], y = _arg[1];
        dx = x - lx;
        dy = y - ly;
        lx = x;
        ly = y;
        return ['l', dx, dy];
      };
    };
  })(this)()));
  _ref1 = _.last(body), ex = _ref1[0], ey = _ref1[1];
  if (sx === ex && sy === ey) {
    segs[segs.length - 1] = ['Z'];
  }
  return segs;
};

segementsToPoints = function(segments) {
  var body, sx, sy, t, _ref;
  (_ref = segments[0], t = _ref[0], sx = _ref[1], sy = _ref[2]), body = 2 <= segments.length ? __slice.call(segments, 1) : [];
  return [].concat([[sx, sy]], body.map((function(_this) {
    return function() {
      var cx, cy;
      cx = sx;
      cy = sy;
      return function(_arg) {
        var t, x, y;
        t = _arg[0], x = _arg[1], y = _arg[2];
        if (t === 'Z') {
          return [sx, sy];
        }
        cx += x;
        cy += y;
        return [cx, cy];
      };
    };
  })(this)()));
};

pathToPoints = function($path) {
  var segments;
  segments = Snap.parsePathString($path.attr('d'));
  return segementsToPoints(segments);
};

adjustToNearPoint = function(n, points, force) {
  var p, _i, _len;
  if (force == null) {
    force = 3;
  }
  for (_i = 0, _len = points.length; _i < _len; _i++) {
    p = points[_i];
    if ((p - force < n && n < p + force)) {
      return p;
    }
  }
  return null;
};

getAnchorPoints = function(layer) {
  var anchor_points, anchor_x, anchor_y;
  anchor_x = [];
  anchor_y = [];
  anchor_points = [];
  layer.selectAll('*').forEach((function(_this) {
    return function($shape) {
      var h, w, x, y;
      switch ($shape.type) {
        case 'rect':
          x = int($shape.attr('x'));
          y = int($shape.attr('y'));
          w = int($shape.attr('width'));
          h = int($shape.attr('height'));
          anchor_x.push(x, x + w);
          return anchor_y.push(y, y + h);
      }
    };
  })(this));
  return {
    xs: anchor_x,
    ys: anchor_y
  };
};

module.exports = {
  pointsToSegments: pointsToSegments,
  segementsToPoints: segementsToPoints,
  getAnchorPoints: getAnchorPoints,
  adjustToNearPoint: adjustToNearPoint,
  pathToPoints: pathToPoints
};


},{}],16:[function(require,module,exports){
var CircleDrawingGesture, EraserGesture, EventEmitter, FreeDrawingGesture, GrabGesture, HistoryManager, LineDrawingGesture, RectDrawingGesture, Whiteboard, getAnchorPoints, int,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RectDrawingGesture = require('./gestures/rect-drawing-gesture');

FreeDrawingGesture = require('./gestures/free-drawing-gesture');

LineDrawingGesture = require('./gestures/line-drawing-gesture');

CircleDrawingGesture = require('./gestures/circle-drawing-gesture');

EraserGesture = require('./gestures/eraser-gesture');

GrabGesture = require('./gestures/grab-gesture');

EventEmitter = require('./utils/event-emitter');

getAnchorPoints = require('./utils/utils').getAnchorPoints;

HistoryManager = require('./history-manager');

int = parseInt;

module.exports = Whiteboard = (function() {
  var template;

  Whiteboard.initializeWithHistoryManager = function(selector) {
    var hist, whiteboard;
    whiteboard = new Whiteboard(selector);
    hist = new HistoryManager;
    whiteboard.on('changed', (function(_this) {
      return function(svg) {
        return hist.pushHistory(svg);
      };
    })(this));
    whiteboard.on('undo', (function(_this) {
      return function(svg) {
        var next;
        hist.undo();
        next = hist.current();
        whiteboard.setSVG(next);
        return whiteboard.setMode(whiteboard.mode);
      };
    })(this));
    whiteboard.on('redo', (function(_this) {
      return function(svg) {
        var next;
        hist.redo();
        next = hist.current();
        whiteboard.setSVG(next);
        return whiteboard.setMode(whiteboard.mode);
      };
    })(this));
    whiteboard.on('hide-preview', (function(_this) {
      return function(svg) {
        return preview.hide();
      };
    })(this));
    whiteboard.on('show-preview', (function(_this) {
      return function(svg) {
        return preview.show();
      };
    })(this));
    return whiteboard;
  };

  template = require('./templates/whiteboard');

  _.extend(Whiteboard.prototype, EventEmitter.prototype);

  function Whiteboard(selector) {
    this.setBackgroundHTML = __bind(this.setBackgroundHTML, this);
    this.$ = __bind(this.$, this);
    this.setMode = __bind(this.setMode, this);
    this.setSVG = __bind(this.setSVG, this);
    this.getSVG = __bind(this.getSVG, this);
    this.update = __bind(this.update, this);
    var $svg, el, fillColor, offsetX, offsetY, paper, strokeColor, svg, _ref;
    window.whiteboard = this;
    this.strokeColor = strokeColor = 'black';
    this.fillColor = fillColor = 'transparent';
    this.tolelance = 2;
    this.el = el = document.querySelector(selector);
    this.$el = $(this.el);
    this.$el.html(template());
    this.svg = svg = document.querySelector('svg.whiteboard');
    this.$svg = $svg = $(this.svg);
    this.paper = paper = Snap(svg);
    _ref = this.$svg.position(), offsetX = _ref.left, offsetY = _ref.top;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.setupButtons();
    this.resetLayers();
    this.setLayer(0);
    this.setMode('free');
  }

  Whiteboard.prototype.setupButtons = function() {
    var $fillColor, $strokeColor;
    this.$('.edit-free').on('click', (function(_this) {
      return function() {
        return _this.setMode('free');
      };
    })(this));
    this.$('.edit-rect').on('click', (function(_this) {
      return function() {
        return _this.setMode('rect');
      };
    })(this));
    this.$('.edit-line').on('click', (function(_this) {
      return function() {
        return _this.setMode('line');
      };
    })(this));
    this.$('.edit-circle').on('click', (function(_this) {
      return function() {
        return _this.setMode('circle');
      };
    })(this));
    this.$('.edit-eraser').on('click', (function(_this) {
      return function() {
        return _this.setMode('eraser');
      };
    })(this));
    this.$('.edit-grab').on('click', (function(_this) {
      return function() {
        var grabbing;
        _this.$svg.off();
        _this.setMode('grab');
        return grabbing = false;
      };
    })(this));
    $fillColor = this.$('input.fill-color').on('keyup', (function(_this) {
      return function() {
        return _this.fillColor = _this.$fillColor.val();
      };
    })(this));
    $strokeColor = this.$('input.stroke-color').on('keyup', (function(_this) {
      return function() {
        return _this.strokeColor = $strokeColor.val();
      };
    })(this));
    this.$('.undo').on('click', (function(_this) {
      return function() {
        return _this.trigger('undo');
      };
    })(this));
    this.$('.redo').on('click', (function(_this) {
      return function() {
        return _this.trigger('redo');
      };
    })(this));
    this.$('.layer0').on('click', (function(_this) {
      return function() {
        _this.setLayer(0);
        return _this.showBackground();
      };
    })(this));
    this.$('.layer1').on('click', (function(_this) {
      return function() {
        _this.setLayer(1);
        return _this.hideBackground();
      };
    })(this));
    return this.$('.layer2').on('click', (function(_this) {
      return function() {
        _this.setLayer(2);
        return _this.hideBackground();
      };
    })(this));
  };

  Whiteboard.prototype.clearUI = function() {
    return Snap(this.ui).selectAll('*').forEach(function(i) {
      return i.remove();
    });
  };

  Whiteboard.prototype.update = function() {
    return this.trigger('changed', this.getSVG());
  };

  Whiteboard.prototype.getSVG = function() {
    return this.paper.outerSVG();
  };

  Whiteboard.prototype.setSVG = function(text) {
    return this.$svg.html(text);
  };

  Whiteboard.prototype.getUI = function() {
    return this.ui != null ? this.ui : this.ui = this.paper.g();
  };

  Whiteboard.prototype.setLayer = function(n) {
    var l, _i, _len, _ref;
    this.clearUI();
    _ref = this.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      l = _ref[_i];
      l.node.style.visibility = 'hidden';
    }
    this.layer = this.layers[n];
    return this.layer.node.style.visibility = 'visible';
  };

  Whiteboard.prototype.showGrid = function(xs, ys) {
    var x, y, _i, _j, _len, _len1, _ref, _results;
    _ref = getAnchorPoints(this.layer), xs = _ref.xs, ys = _ref.ys;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      this.ui.line({
        x1: x,
        x2: x,
        y1: 0,
        y2: 320,
        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"
      });
    }
    _results = [];
    for (_j = 0, _len1 = ys.length; _j < _len1; _j++) {
      y = ys[_j];
      _results.push(this.ui.line({
        x1: 0,
        x2: 640,
        y1: y,
        y2: y,
        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"
      }));
    }
    return _results;
  };

  Whiteboard.prototype.showBackground = function() {
    return this.$('.bg').show();
  };

  Whiteboard.prototype.hideBackground = function() {
    return this.$('.bg').hide();
  };

  Whiteboard.prototype.getAnchorPoints = function() {
    return getAnchorPoints(this.layer);
  };

  Whiteboard.prototype.setMode = function(mode) {
    var $x, $y, Gesture, gesture, _ref;
    this.$('.mode').text(mode);
    if ((_ref = this._gesture) != null) {
      _ref.dispose();
    }
    this.mode = mode;
    this.clearUI();
    this.$svg.off();
    Gesture = (function() {
      switch (mode) {
        case 'free':
          return FreeDrawingGesture;
        case 'rect':
          return RectDrawingGesture;
        case 'line':
          return LineDrawingGesture;
        case 'circle':
          return CircleDrawingGesture;
        case 'eraser':
          return EraserGesture;
        case 'grab':
          return GrabGesture;
      }
    })();
    this._gesture = gesture = new Gesture(this);
    this.$svg.on('mousedown touchstart', (function(_this) {
      return function(ev) {
        return gesture._onTouchStart(ev);
      };
    })(this));
    this.$svg.on('mouseup touchend', (function(_this) {
      return function(ev) {
        return gesture._onTouchEnd(ev);
      };
    })(this));
    $x = $('.mouse-x');
    $y = $('.mouse-y');
    return this.$svg.on('mousemove touchmove', (function(_this) {
      return function(ev) {
        var left, top, x, y, _ref1, _ref2;
        _ref1 = _this.$svg.offset(), left = _ref1.left, top = _ref1.top;
        gesture._onTouchMove(ev);
        _ref2 = gesture.getPoint(ev), x = _ref2[0], y = _ref2[1];
        $x.text(x);
        return $y.text(y);
      };
    })(this));
  };

  Whiteboard.prototype.resetLayers = function(layerCount) {
    var $svg, paper, svg;
    if (!this._layerInitialized) {
      this._layerInitialized = true;
      this.layers = [this.paper.g().addClass('l0'), this.paper.g().addClass('l1'), this.paper.g().addClass('l2')];
      return this.ui = this.paper.g().addClass('ui');
    } else {
      this.svg = svg = document.querySelector('svg.whiteboard');
      this.$svg = $svg = $(this.svg);
      this.paper = paper = Snap(svg);
      this.ui = Snap.select('.ui');
      return this.layers = [Snap.select('.l0'), Snap.select('.l1'), Snap.select('.l2')];
    }
  };

  Whiteboard.prototype.$ = function(selector) {
    return this.$el.find(selector);
  };

  Whiteboard.prototype.setBackgroundHTML = function(html) {
    var $bg, h, w;
    $bg = this.$('.bg');
    $bg.html(html);
    w = $bg.width();
    h = $bg.height();
    return this.$svg.css({
      width: Math.max(w, 640),
      height: Math.max(h, 480)
    });
  };

  return Whiteboard;

})();

window.Whiteboard = Whiteboard;


},{"./gestures/circle-drawing-gesture":2,"./gestures/eraser-gesture":3,"./gestures/free-drawing-gesture":4,"./gestures/grab-gesture":5,"./gestures/line-drawing-gesture":6,"./gestures/rect-drawing-gesture":7,"./history-manager":8,"./templates/whiteboard":12,"./utils/event-emitter":13,"./utils/utils":15}],17:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || _dereq_('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[16])