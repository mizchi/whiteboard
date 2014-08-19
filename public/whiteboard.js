(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Gesture;

module.exports = Gesture = (function() {
  function Gesture(wb) {
    this.wb = wb;
    this.paper = this.wb.paper;
  }

  Gesture.prototype.onTouch = function() {};

  Gesture.prototype.onDragStart = function() {};

  Gesture.prototype.onDrag = function() {};

  Gesture.prototype.onDragEnd = function() {};

  Gesture.prototype.getPoint = function(ev) {
    return [ev.gesture.center.pageX - this.wb.offsetX, ev.gesture.center.pageY - this.wb.offsetY];
  };

  return Gesture;

})();


},{}],2:[function(require,module,exports){
var CircleDrawingGesture, Gesture,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = CircleDrawingGesture = (function(_super) {
  __extends(CircleDrawingGesture, _super);

  function CircleDrawingGesture() {
    this.onDragEnd = __bind(this.onDragEnd, this);
    this.onDrag = __bind(this.onDrag, this);
    this.onTouch = __bind(this.onTouch, this);
    CircleDrawingGesture.__super__.constructor.apply(this, arguments);
    this.startPoint = null;
    this.endPoint = null;
    this.lastShape = null;
  }

  CircleDrawingGesture.prototype.onTouch = function(ev) {
    this.startPoint = this.getPoint(ev);
    return this.lastShape = null;
  };

  CircleDrawingGesture.prototype.onDrag = function(ev) {
    var circle, ex, ey, r, sx, sy, x, y, _ref, _ref1, _ref2;
    this.endPoint = this.getPoint(ev);
    if ((_ref = this.lastShape) != null) {
      _ref.remove();
    }
    _ref1 = this.startPoint, sx = _ref1[0], sy = _ref1[1];
    _ref2 = this.endPoint, ex = _ref2[0], ey = _ref2[1];
    x = sx;
    y = sy;
    r = Math.max(Math.abs(sx - ex), Math.abs(sy - ey));
    circle = this.wb.paper.circle(x, y, r);
    circle.attr({
      strokeWidth: 1,
      stroke: this.wb.strokeColor,
      fill: this.wb.fillColor
    });
    return this.lastShape = circle;
  };

  CircleDrawingGesture.prototype.onDragEnd = function(ev) {
    return this.wb.update();
  };

  return CircleDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],3:[function(require,module,exports){
var EraserDrawingGesture, Gesture,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = EraserDrawingGesture = (function(_super) {
  __extends(EraserDrawingGesture, _super);

  function EraserDrawingGesture() {
    this.onDragEnd = __bind(this.onDragEnd, this);
    this.onDrag = __bind(this.onDrag, this);
    this.onDragStart = __bind(this.onDragStart, this);
    this.onTouch = __bind(this.onTouch, this);
    EraserDrawingGesture.__super__.constructor.apply(this, arguments);
  }

  EraserDrawingGesture.prototype.onTouch = function(ev) {};

  EraserDrawingGesture.prototype.onDragStart = function(ev) {
    return this.wb.eraser = true;
  };

  EraserDrawingGesture.prototype.onDrag = function(ev) {};

  EraserDrawingGesture.prototype.onDragEnd = function(ev) {
    return this.wb.eraser = false;
  };

  return EraserDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],4:[function(require,module,exports){
var FreeDrawingGesture, Gesture,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = FreeDrawingGesture = (function(_super) {
  __extends(FreeDrawingGesture, _super);

  function FreeDrawingGesture() {
    this.onDragEnd = __bind(this.onDragEnd, this);
    this.onDrag = __bind(this.onDrag, this);
    this.onTouch = __bind(this.onTouch, this);
    FreeDrawingGesture.__super__.constructor.apply(this, arguments);
    this.paths = null;
    this.lastPath = null;
  }

  FreeDrawingGesture.prototype.onTouch = function(ev) {
    this.paths = [];
    return this.paths.push(this.getPoint(ev));
  };

  FreeDrawingGesture.prototype.onDrag = function(ev) {
    var _ref;
    if ((_ref = this.lastPath) != null) {
      _ref.remove(ev);
    }
    this.paths.push(this.getPoint(ev));
    return this.lastPath = this.paper.polyline({
      points: _.flatten(this.paths),
      fill: "none",
      stroke: this.wb.strokeColor,
      fill: this.wb.fillColor,
      strokeWidth: 1
    });
  };

  FreeDrawingGesture.prototype.simplify = function(paths) {
    return simplify(paths.map((function(_this) {
      return function(_arg) {
        var x, y;
        x = _arg[0], y = _arg[1];
        return {
          x: x,
          y: y
        };
      };
    })(this)), this.wb.tolelance, false).map((function(_this) {
      return function(_arg) {
        var x, y;
        x = _arg.x, y = _arg.y;
        return [x, y];
      };
    })(this));
  };

  FreeDrawingGesture.prototype.onDragEnd = function(ev) {
    var simplified, _ref;
    if ((_ref = this.lastPath) != null) {
      _ref.remove();
    }
    simplified = this.simplify(this.paths);
    this.lastPath = this.wb.paper.polyline({
      points: simplified,
      stroke: this.wb.strokeColor,
      fill: this.wb.fillColor,
      strokeWidth: 1
    });
    this.paths = [];
    this.lastPath = null;
    return this.wb.update();
  };

  return FreeDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],5:[function(require,module,exports){
var Gesture, LineDrawingGesture,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = LineDrawingGesture = (function(_super) {
  __extends(LineDrawingGesture, _super);

  function LineDrawingGesture() {
    this.onDragEnd = __bind(this.onDragEnd, this);
    this.onDrag = __bind(this.onDrag, this);
    this.onDragStart = __bind(this.onDragStart, this);
    this.onTouch = __bind(this.onTouch, this);
    LineDrawingGesture.__super__.constructor.apply(this, arguments);
    this.startPoint = null;
    this.endPoint = null;
    this.lastShape = null;
  }

  LineDrawingGesture.prototype.onTouch = function(ev) {
    this.startPoint = this.getPoint(ev);
    return this.lastShape = null;
  };

  LineDrawingGesture.prototype.onDragStart = function(ev) {
    return this.lastShape = null;
  };

  LineDrawingGesture.prototype.onDrag = function(ev) {
    var ex, ey, line, sx, sy, _ref, _ref1, _ref2;
    this.endPoint = this.getPoint(ev);
    if ((_ref = this.lastShape) != null) {
      _ref.remove();
    }
    _ref1 = this.startPoint, sx = _ref1[0], sy = _ref1[1];
    _ref2 = this.endPoint, ex = _ref2[0], ey = _ref2[1];
    line = this.paper.line(sx, sy, ex, ey);
    line.attr({
      stroke: this.wb.strokeColor,
      fill: this.wb.fillColor,
      strokeWidth: 1
    });
    return this.lastShape = line;
  };

  LineDrawingGesture.prototype.onDragEnd = function(ev) {
    return this.wb.update();
  };

  return LineDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],6:[function(require,module,exports){
var Gesture, RectDrawingGesture,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gesture = require('./base/gesture');

module.exports = RectDrawingGesture = (function(_super) {
  __extends(RectDrawingGesture, _super);

  function RectDrawingGesture() {
    this.onDragEnd = __bind(this.onDragEnd, this);
    this.onDrag = __bind(this.onDrag, this);
    this.onDragStart = __bind(this.onDragStart, this);
    this.onTouch = __bind(this.onTouch, this);
    RectDrawingGesture.__super__.constructor.apply(this, arguments);
    this.startPoint = null;
    this.endPoint = null;
    this.lastShape = null;
  }

  RectDrawingGesture.prototype.onTouch = function(ev) {
    this.lastShape = null;
    return this.startPoint = this.getPoint(ev);
  };

  RectDrawingGesture.prototype.onDragStart = function(ev) {};

  RectDrawingGesture.prototype.onDrag = function(ev) {
    var ex, ey, h, rect, sx, sy, w, x, y, _ref, _ref1, _ref2;
    this.endPoint = this.getPoint(ev);
    if ((_ref = this.lastShape) != null) {
      _ref.remove();
    }
    _ref1 = this.startPoint, sx = _ref1[0], sy = _ref1[1];
    _ref2 = this.endPoint, ex = _ref2[0], ey = _ref2[1];
    x = Math.min(sx, ex);
    y = Math.min(sy, ey);
    w = Math.abs(sx - ex);
    h = Math.abs(sy - ey);
    rect = this.paper.rect(x, y, w, h);
    rect.attr({
      stroke: this.wb.strokeColor,
      fill: this.wb.fillColor,
      strokeWidth: 1
    });
    return this.lastShape = rect;
  };

  RectDrawingGesture.prototype.onDragEnd = function(ev) {
    return this.wb.update();
  };

  return RectDrawingGesture;

})(Gesture);


},{"./base/gesture":1}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
var HistoryManager, Preview, Whiteboard;

Whiteboard = require('./whiteboard');

HistoryManager = require('./history-manager');

Preview = require('./preview');

$((function(_this) {
  return function() {
    var hist, preview, whiteboard;
    whiteboard = new Whiteboard('.whiteboard-container');
    preview = new Preview('.preview');
    hist = new HistoryManager;
    whiteboard.on('changed', function(svg) {
      hist.pushHistory(svg);
      return preview.update(hist.current());
    });
    whiteboard.on('undo', function(svg) {
      var next;
      hist.undo();
      next = hist.current();
      preview.update(next);
      return whiteboard.setSVG(next);
    });
    return whiteboard.on('redo', function(svg) {
      var next;
      hist.redo();
      next = hist.current();
      preview.update(next);
      return whiteboard.setSVG(next);
    });
  };
})(this));


},{"./history-manager":7,"./preview":9,"./whiteboard":12}],9:[function(require,module,exports){
var Preview;

module.exports = Preview = (function() {
  var ReactView;

  ReactView = React.createClass({
    getInitialState: function() {
      return {
        value: '<svg class="main" width=640 height=320 style="background-color:white;"></svg>'
      };
    },
    render: function() {
      return React.DOM.div({
        className: 'content',
        dangerouslySetInnerHTML: {
          __html: this.state.value
        }
      });
    }
  });

  function Preview(selector) {
    this.reactView = React.renderComponent(ReactView({}), document.querySelector(selector));
  }

  Preview.prototype.update = function(text) {
    return this.reactView.setState({
      value: text
    });
  };

  return Preview;

})();


},{}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"whiteboard-container\"><p><button class=\"grab\">grab</button><button class=\"clear\">clear</button><button class=\"edit-free\">drawing</button><button class=\"edit-rect\">rect</button><button class=\"edit-circle\">circle</button><button class=\"edit-line\">line</button><button class=\"edit-eraser\">eraser</button>/<button class=\"undo\">undo</button><button class=\"redo\">redo</button></p><svg width=\"640\" height=\"320\" style=\"background-color:white\" class=\"whiteboard\"></svg><p><span>tolelance:</span><span class=\"tolelance-value\">2</span><button class=\"tolelance-plus\">+</button><button class=\"tolelance-minus\">-</button><span>stroke</span><input value=\"black\" class=\"stroke-color\"/><span>fill</span><input value=\"none\" class=\"fill-color\"/></p><div class=\"preview\"></div></div>");;return buf.join("");
};
},{"jade/runtime":13}],11:[function(require,module,exports){
var EventEmitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

module.exports = EventEmitter = (function() {
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


},{}],12:[function(require,module,exports){
var CircleDrawingGesture, EraserGesture, EventEmitter, FreeDrawingGesture, LineDrawingGesture, RectDrawingGesture, extend,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RectDrawingGesture = require('./gestures/rect-drawing-gesture');

FreeDrawingGesture = require('./gestures/free-drawing-gesture');

LineDrawingGesture = require('./gestures/line-drawing-gesture');

CircleDrawingGesture = require('./gestures/circle-drawing-gesture');

EraserGesture = require('./gestures/eraser-gesture');

EventEmitter = require('./utils/event-emitter');

extend = (function(_this) {
  return function(obj, props) {
    var k, v;
    for (k in props) {
      v = props[k];
      obj[k] = v;
    }
    return obj;
  };
})(this);

module.exports = window.Whiteboard = (function() {
  var template;

  template = require('./templates/whiteboard');

  extend(Whiteboard.prototype, EventEmitter.prototype);

  Whiteboard.prototype.$ = function(selector) {
    return this.$el.find(selector);
  };

  Whiteboard.prototype.update = function() {
    return this.trigger('changed', this.getSVG());
  };

  Whiteboard.prototype.getSVG = function() {
    return this.svg.outerHTML;
  };

  Whiteboard.prototype.setSVG = function(text) {
    return this.$svg.html(text);
  };

  Whiteboard.prototype.setMode = function(mode) {
    var Gesture, gesture;
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
      }
    })();
    gesture = new Gesture(this);
    return new Hammer(this.svg).on('touch', (function(_this) {
      return function(ev) {
        return gesture.onTouch(ev);
      };
    })(this)).on('dragstart', (function(_this) {
      return function(ev) {
        return gesture.onDragStart(ev);
      };
    })(this)).on('drag', (function(_this) {
      return function(ev) {
        return gesture.onDrag(ev);
      };
    })(this)).on('dragend', (function(_this) {
      return function(ev) {
        return gesture.onDragEnd(ev);
      };
    })(this));
  };

  function Whiteboard(selector, _arg) {
    var $fillColor, $strokeColor, $svg, $tolelance, el, fillColor, offsetX, offsetY, paper, preview, strokeColor, svg, _ref;
    preview = (_arg != null ? _arg : {}).preview;
    this.setMode = __bind(this.setMode, this);
    this.setSVG = __bind(this.setSVG, this);
    this.getSVG = __bind(this.getSVG, this);
    this.update = __bind(this.update, this);
    this.$ = __bind(this.$, this);
    this.strokeColor = strokeColor = 'black';
    this.fillColor = fillColor = 'transparent';
    this.el = el = document.querySelector(selector);
    this.$el = $(this.el);
    this.$el.html(template());
    this.svg = svg = document.querySelector('svg.whiteboard');
    this.$svg = $svg = $(this.svg);
    this.paper = paper = Snap(svg);
    _ref = this.$svg.position(), offsetX = _ref.left, offsetY = _ref.top;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.setMode('free');
    this.tolelance = 2;
    $tolelance = $('.tolelance-value');
    this.$('.tolelance-plus').on('click', (function(_this) {
      return function() {
        _this.tolelance++;
        return $tolelance.text(_this.tolelance);
      };
    })(this));
    this.$('.tolelance-minus').on('click', (function(_this) {
      return function() {
        _this.tolelance--;
        return $tolelance.text(_this.tolelance);
      };
    })(this));
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
        _this.setMode('eraser');
        return $svg.on('mousemove', '*', function(event) {
          if (!_this.eraser) {
            return;
          }
          $(event.target).remove();
          return _this.update();
        });
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
  }

  return Whiteboard;

})();


},{"./gestures/circle-drawing-gesture":2,"./gestures/eraser-gesture":3,"./gestures/free-drawing-gesture":4,"./gestures/line-drawing-gesture":5,"./gestures/rect-drawing-gesture":6,"./templates/whiteboard":10,"./utils/event-emitter":11}],13:[function(require,module,exports){
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
},{}]},{},[8])