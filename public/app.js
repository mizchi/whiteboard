(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventEmitter, ReactView, extend, template,
  __slice = [].slice;

template = require('./template');

EventEmitter = (function() {
  function EventEmitter() {}

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
        _ref1.map(function(callback) {
          return callback.apply(null, args);
        });
      }
    }
    return this;
  };

  return EventEmitter;

})();

extend = function(obj, props) {
  var k, v;
  for (k in props) {
    v = props[k];
    obj[k] = v;
  }
  return obj;
};

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

window.Whiteboard = (function() {
  extend(Whiteboard.prototype, EventEmitter.prototype);

  function Whiteboard(selector, _arg) {
    var $fillColor, $strokeColor, $svg, $tolelance, eraser, fillColor, offsetX, offsetY, paper, preview, setCircleDrawingMode, setDrawingMode, setEraserMode, setLineDrawingMode, setRectDrawingMode, strokeColor, svg, tolelance, update, _ref;
    preview = (_arg != null ? _arg : {}).preview;
    strokeColor = 'black';
    fillColor = 'none';
    this.svg = svg = document.querySelector(selector);
    $svg = $(svg);
    paper = Snap(selector);
    _ref = $svg.position(), offsetX = _ref.left, offsetY = _ref.top;
    update = (function(_this) {
      return function() {
        return _this.trigger('changed', _this.getSVG());
      };
    })(this);
    setDrawingMode = function() {
      var lastPath, paths;
      lastPath = null;
      $(svg).off();
      paths = [];
      return new Hammer(svg).on('touch', function(ev) {
        paths.push([ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY]);
        return lastPath = paper.polyline({
          points: _.flatten(paths),
          fill: "none",
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 1
        });
      }).on('drag', function(ev) {
        if (lastPath != null) {
          lastPath.remove();
        }
        paths.push([ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY]);
        return lastPath = paper.polyline({
          points: _.flatten(paths),
          fill: "none",
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 1
        });
      }).on('dragend', function(ev) {
        var r, simplified;
        if (lastPath != null) {
          lastPath.remove();
        }
        simplified = simplify(paths.map(function(_arg1) {
          var x, y;
          x = _arg1[0], y = _arg1[1];
          return {
            x: x,
            y: y
          };
        }), tolelance, false);
        r = simplified.map(function(_arg1) {
          var x, y;
          x = _arg1.x, y = _arg1.y;
          return [x, y];
        });
        lastPath = paper.polyline({
          points: r,
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 2
        });
        paths = [];
        (function(lastPath) {
          return lastPath.node.onmousemove = function() {
            if (eraser) {
              lastPath.remove();
              return update();
            }
          };
        })(lastPath);
        return update();
      });
    };
    setRectDrawingMode = function() {
      var endPoint, lastShape, startPoint;
      startPoint = null;
      endPoint = null;
      lastShape = null;
      $(svg).off();
      return new Hammer(svg).on('touch', function(ev) {
        return startPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
      }).on('dragstart', function(ev) {
        return lastShape = null;
      }).on('drag', function(ev) {
        var ex, ey, h, rect, sx, sy, w, x, y;
        endPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
        if (lastShape != null) {
          lastShape.remove();
        }
        sx = startPoint[0], sy = startPoint[1];
        ex = endPoint[0], ey = endPoint[1];
        x = Math.min(sx, ex);
        y = Math.min(sy, ey);
        w = Math.abs(sx - ex);
        h = Math.abs(sy - ey);
        rect = paper.rect(x, y, w, h);
        rect.attr({
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 1
        });
        return lastShape = rect;
      }).on('dragend', function(ev) {
        update();
        return (function(lastShape) {
          return lastShape.node.onmousemove = function() {
            if (eraser) {
              lastShape.remove();
              return update();
            }
          };
        })(lastShape);
      });
    };
    setCircleDrawingMode = function() {
      var endPoint, lastShape, startPoint;
      startPoint = null;
      endPoint = null;
      lastShape = null;
      $(svg).off();
      return new Hammer(svg).on('touch', function(ev) {
        startPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
        return lastShape = null;
      }).on('drag', function(ev) {
        var ex, ey, r, rect, sx, sy, x, y;
        endPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
        if (lastShape != null) {
          lastShape.remove();
        }
        sx = startPoint[0], sy = startPoint[1];
        ex = endPoint[0], ey = endPoint[1];
        x = sx;
        y = sy;
        r = Math.max(Math.abs(sx - ex), Math.abs(sy - ey));
        rect = paper.circle(x, y, r);
        rect.attr({
          strokeWidth: 1,
          stroke: strokeColor,
          fill: fillColor
        });
        return lastShape = rect;
      }).on('dragend', function(ev) {
        update();
        return (function(lastShape) {
          return lastShape.node.onmousemove = function() {
            if (eraser) {
              lastShape.remove();
              return update();
            }
          };
        })(lastShape);
      });
    };
    setLineDrawingMode = function() {
      var endPoint, lastShape, startPoint;
      startPoint = null;
      endPoint = null;
      lastShape = null;
      $(svg).off();
      return new Hammer(svg).on('touch', function(ev) {
        startPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
        return lastShape = null;
      }).on('drag', function(ev) {
        var ex, ey, line, sx, sy;
        console.log('drag');
        endPoint = [ev.gesture.center.pageX - offsetX, ev.gesture.center.pageY - offsetY];
        if (lastShape != null) {
          lastShape.remove();
        }
        sx = startPoint[0], sy = startPoint[1];
        ex = endPoint[0], ey = endPoint[1];
        line = paper.line(sx, sy, ex, ey);
        line.attr({
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: 1
        });
        return lastShape = line;
      }).on('dragend', function(ev) {
        update();
        return (function(lastShape) {
          return lastShape.node.onmousemove = function() {
            if (eraser) {
              lastShape.remove();
              return update();
            }
          };
        })(lastShape);
      });
    };
    eraser = false;
    setEraserMode = function() {
      $(svg).off();
      return new Hammer(svg).on('dragstart', function(ev) {
        return eraser = true;
      }).on('dragend', function(ev) {
        return eraser = false;
      });
    };
    setDrawingMode();
    tolelance = 2;
    $tolelance = $('.tolelance-value');
    $('.tolelance-plus').on('click', function() {
      tolelance++;
      return $tolelance.text(tolelance);
    });
    $('.tolelance-minus').on('click', function() {
      tolelance--;
      return $tolelance.text(tolelance);
    });
    $('.edit-free-drawing').on('click', function() {
      return setDrawingMode();
    });
    $('.edit-rect').on('click', function() {
      return setRectDrawingMode();
    });
    $('.edit-line').on('click', function() {
      return setLineDrawingMode();
    });
    $('.edit-circle').on('click', function() {
      return setCircleDrawingMode();
    });
    $('.edit-eraser').on('click', function() {
      return setEraserMode();
    });
    $fillColor = $('input.fill-color').on('keyup', function() {
      return fillColor = $fillColor.val();
    });
    $strokeColor = $('input.stroke-color').on('keyup', function() {
      return strokeColor = $strokeColor.val();
    });
  }

  Whiteboard.prototype.getSVG = function() {
    return this.svg.outerHTML;
  };

  return Whiteboard;

})();

$((function(_this) {
  return function() {
    var reactView, whiteboard;
    $('body').html(template());
    whiteboard = new Whiteboard('.main');
    reactView = React.renderComponent(ReactView({}), document.querySelector('.preview'));
    return whiteboard.on('changed', function(svg) {
      return reactView.setState({
        value: svg
      });
    });
  };
})(this));


},{"./template":2}],2:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p><button class=\"edit-free-drawing\">drawing</button><button class=\"edit-rect\">rect</button><button class=\"edit-circle\">circle</button><button class=\"edit-line\">line</button><button class=\"edit-eraser\">eraser</button></p><svg width=\"640\" height=\"320\" style=\"background-color:white\" class=\"main\"></svg><p><span>tolelance:</span><span class=\"tolelance-value\">2</span><button class=\"tolelance-plus\">+</button><button class=\"tolelance-minus\">-</button><span>stroke</span><input value=\"black\" class=\"stroke-color\"/><span>fill</span><input value=\"none\" class=\"fill-color\"/></p><div class=\"preview\"></div>");;return buf.join("");
};
},{"jade/runtime":3}],3:[function(require,module,exports){
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
},{}]},{},[1])