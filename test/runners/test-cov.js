
  // instrument by jscoverage, do not modifly this file
  (function(file, lines, conds, source) {
      var BASE;
      if (typeof global === "object") {
          BASE = global;
      } else if (typeof window === "object") {
          BASE = window;
      } else {
          throw new Error("[jscoverage] unknow ENV!");
      }
      if (BASE._$jscoverage) {
          BASE._$jscmd(file, "init", lines, conds, source);
          return;
      }
      var cov = {};
      /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
      function jscmd(file, type, line, express, start, offset) {
          var storage;
          switch (type) {
            case "init":
              if (cov[file]) {
                  storage = cov[file];
              } else {
                  storage = [];
                  for (var i = 0; i < line.length; i++) {
                      storage[line[i]] = 0;
                  }
                  var condition = express;
                  var source = start;
                  storage.condition = condition;
                  storage.source = source;
              }
              cov[file] = storage;
              break;

            case "line":
              storage = cov[file];
              storage[line]++;
              break;

            case "cond":
              storage = cov[file];
              storage.condition[line]++;
              return express;
          }
      }
      BASE._$jscoverage = cov;
      BASE._$jscmd = jscmd;
      jscmd(file, "init", lines, conds, source);
  })("test/runners/test.js", [1,1,1,1,1,1,1,1,1,1,3,7,8,9,15,16,21,22], {"1_61_26":0,"1_89_7":0,"1_61_14":0,"1_100_2":0,"1_104_1":0,"1_157_24":0,"1_180_1":0,"1_274_1":0,"1_276_1":0,"1_327_26":0,"1_355_7":0,"1_327_14":0,"1_375_1":0,"1_377_8":0,"6_4_29":0,"6_37_15":0,"6_4_13":0,"6_37_6":0}, ["(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error(\"Cannot find module '\"+o+\"'\")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){","if (false) {","  'Never run';","}","","if (typeof window !== \"undefined\" && window !== null) {","  window.test_run = function() {","    require('./whiteboard');","    return require('./utils/utils');","  };","}","","","},{\"./utils/utils\":2,\"./whiteboard\":3}],2:[function(require,module,exports){","describe(\"app/utils/utils\", function() {","  return it(\"should be written\");","});","","","},{}],3:[function(require,module,exports){","describe(\"app/whiteboard\", function() {","  return it(\"should be written\", function() {});","});","","","},{}]},{},[1])"]);
_$jscmd("test/runners/test.js", "line", 1);

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                _$jscmd("test/runners/test.js", "line", 1);
                var a = _$jscmd("test/runners/test.js", "cond", "1_61_26", _$jscmd("test/runners/test.js", "cond", "1_61_14", typeof require) == "function") && _$jscmd("test/runners/test.js", "cond", "1_89_7", require);
                if (_$jscmd("test/runners/test.js", "cond", "1_100_2", !u) && _$jscmd("test/runners/test.js", "cond", "1_104_1", a)) return a(o, !0);
                if (i) return i(o, !0);
                _$jscmd("test/runners/test.js", "line", 1);
                throw new Error(_$jscmd("test/runners/test.js", "cond", "1_157_24", "Cannot find module '" + _$jscmd("test/runners/test.js", "cond", "1_180_1", o)) + "'");
            }
            _$jscmd("test/runners/test.js", "line", 1);
            var f = n[o] = {
                exports: {}
            };
            _$jscmd("test/runners/test.js", "line", 1);
            t[o][0].call(f.exports, function(e) {
                _$jscmd("test/runners/test.js", "line", 1);
                var n = t[o][1][e];
                _$jscmd("test/runners/test.js", "line", 1);
                return s(n ? _$jscmd("test/runners/test.js", "cond", "1_274_1", n) : _$jscmd("test/runners/test.js", "cond", "1_276_1", e));
            }, f, f.exports, e, t, n, r);
        }
        _$jscmd("test/runners/test.js", "line", 1);
        return n[o].exports;
    }
    _$jscmd("test/runners/test.js", "line", 1);
    var i = _$jscmd("test/runners/test.js", "cond", "1_327_26", _$jscmd("test/runners/test.js", "cond", "1_327_14", typeof require) == "function") && _$jscmd("test/runners/test.js", "cond", "1_355_7", require);
    for (var o = 0; _$jscmd("test/runners/test.js", "cond", "1_375_1", o) < _$jscmd("test/runners/test.js", "cond", "1_377_8", r.length); o++) s(r[o]);
    _$jscmd("test/runners/test.js", "line", 1);
    return s;
})({
    1: [ function(require, module, exports) {
        if (false) {
            _$jscmd("test/runners/test.js", "line", 3);
            "Never run";
        }
        if (_$jscmd("test/runners/test.js", "cond", "6_4_29", _$jscmd("test/runners/test.js", "cond", "6_4_13", typeof window) !== "undefined") && _$jscmd("test/runners/test.js", "cond", "6_37_15", _$jscmd("test/runners/test.js", "cond", "6_37_6", window) !== null)) {
            _$jscmd("test/runners/test.js", "line", 7);
            window.test_run = function() {
                _$jscmd("test/runners/test.js", "line", 8);
                require("./whiteboard");
                _$jscmd("test/runners/test.js", "line", 9);
                return require("./utils/utils");
            };
        }
    }, {
        "./utils/utils": 2,
        "./whiteboard": 3
    } ],
    2: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 15);
        describe("app/utils/utils", function() {
            _$jscmd("test/runners/test.js", "line", 16);
            return it("should be written");
        });
    }, {} ],
    3: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 21);
        describe("app/whiteboard", function() {
            _$jscmd("test/runners/test.js", "line", 22);
            return it("should be written", function() {});
        });
    }, {} ]
}, {}, [ 1 ]);