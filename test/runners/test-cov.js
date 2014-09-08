
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
  })("test/runners/test.js", [1,1,1,1,1,1,1,1,1,1,2,6,8,4,4,4,4,4,9,20,22,24,26,28,33,38,46,66,78,12,13,14,15,16,17,29,30,34,35,39,40,41,42,43,47,48,52,50,54,56,57,58,60,61,75,68,71,73,84,87,89,91,85,85,98,103,108,112,116,118,122,124,128,130,134,136,140,142,146,148,152,154,156,160,93,94,95,99,100,104,105,109,113,119,125,131,137,143,149,157,166,171,173,167,167,169,169,169,169,169,174,184,204,209,177,178,179,180,181,185,186,190,191,192,193,194,195,196,201,188,205,206,215,219,221,217,217,217,217,217,222,248,225,226,227,236,241,228,229,231,237,238,242,243,254,259,261,263,265,284,255,255,257,257,257,257,257,266,267,268,269,270,276,277,278,279,285,294,298,313,329,288,289,290,291,295,299,303,304,301,314,318,319,326,316,335,339,341,343,345,347,349,337,337,337,337,337,350,368,379,383,404,353,354,355,356,357,358,359,363,361,371,373,375,380,384,388,394,395,396,397,401,386,389,390,391,399,410,414,416,418,420,435,465,491,412,412,412,412,412,421,422,423,432,424,425,426,427,428,429,436,437,444,449,439,442,445,446,447,450,451,453,455,459,461,466,467,468,469,470,471,472,473,481,484,482,485,492,494,573,495,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,537,517,520,525,526,523,531,532,529,535,545,546,547,548,549,551,552,553,554,556,558,561,565,566,567,568,579,584,586,580,580,582,582,582,582,582,587,599,603,623,630,590,591,592,593,594,595,596,600,604,608,609,610,611,612,613,614,615,620,606,624,625,626,627,636,638,639,641,649,653,661,673,682,644,645,646,650,654,655,657,662,666,667,664,669,674,678,679,676,688,690,692,694,698,749,695,699,700,705,706,715,716,739,701,702,707,708,712,710,717,718,719,720,721,727,728,729,730,731,734,735,736,740,744,745,742,756,758,760,812,866,761,762,763,800,764,765,766,767,774,775,776,797,777,778,779,780,781,782,783,787,789,790,791,792,794,795,801,802,803,808,805,806,813,814,815,820,821,830,831,832,856,816,817,822,823,827,825,833,834,835,836,837,838,841,842,843,844,845,846,847,850,851,852,853,857,861,862,859,873,875,877,879,1078,1130,880,881,882,883,884,885,891,897,903,909,927,928,929,930,910,914,918,922,934,937,940,943,946,957,948,949,950,953,954,955,962,965,968,971,974,975,985,977,978,981,982,983,990,993,996,999,1002,1003,1008,1013,1005,1006,1010,1011,1018,1021,1024,1027,1030,1036,1041,1032,1033,1034,1038,1039,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1060,1062,1063,1064,1065,1066,1067,1068,1069,1071,1072,1079,1080,1085,1086,1094,1095,1096,1120,1081,1082,1087,1091,1089,1097,1098,1099,1100,1101,1107,1108,1109,1110,1111,1112,1115,1116,1117,1121,1125,1126,1123,1137,1139,1140,1141,1142,1144,1144,1144,1147,1151,1206,1148,1148,1158,1170,1187,1202,1153,1154,1155,1159,1166,1167,1161,1164,1171,1184,1173,1174,1177,1179,1182,1188,1189,1199,1192,1193,1194,1210,1212,1213,1214,1219,1216,1217,1225,1228,1230,1256,1278,1284,1298,1323,1231,1232,1233,1249,1253,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1251,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1270,1271,1272,1268,1279,1280,1281,1285,1295,1287,1290,1292,1299,1300,1301,1302,1303,1317,1304,1305,1308,1309,1310,1311,1312,1313,1333,1336,1338,1340,1342,1344,1346,1348,1350,1352,1354,1356,1358,1660,1334,1334,1359,1361,1401,1403,1432,1507,1513,1517,1521,1525,1529,1541,1568,1572,1576,1580,1629,1640,1644,1656,1362,1363,1364,1365,1370,1379,1388,1393,1398,1366,1367,1371,1372,1373,1374,1375,1376,1380,1381,1382,1383,1384,1385,1389,1390,1394,1395,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1429,1433,1434,1439,1444,1449,1454,1459,1467,1472,1477,1482,1487,1493,1499,1435,1436,1440,1441,1445,1446,1450,1451,1455,1456,1460,1461,1462,1463,1464,1468,1469,1473,1474,1478,1479,1483,1484,1488,1489,1490,1494,1495,1496,1500,1501,1502,1508,1509,1514,1518,1522,1526,1530,1531,1532,1537,1538,1534,1535,1542,1543,1554,1565,1545,1546,1556,1557,1569,1573,1577,1581,1582,1586,1587,1588,1589,1605,1606,1611,1616,1617,1618,1584,1592,1594,1596,1598,1600,1602,1607,1608,1612,1613,1619,1620,1621,1622,1623,1624,1631,1632,1633,1635,1636,1641,1645,1646,1647,1648,1649,1650,1664,1665,1665,1665,1665,1665,1665,1665,1665,1665,1665,1665,1665,1665,1665,1666,1680,1726,1738,1764,1787,1818,1838,1688,1689,1705,1682,1686,1684,1692,1693,1696,1701,1717,1728,1739,1747,1742,1744,1749,1751,1767,1769,1772,1774,1776,1788,1790,1807,1794,1799,1802,1819,1849,1855,1864,1865,1867,1841,1842,1845,1847,1856,1857,1878,1882,1883,1884,1890,1891,1896,1898,1899,1900], {"1_61_26":0,"1_89_7":0,"1_61_14":0,"1_100_2":0,"1_104_1":0,"1_157_24":0,"1_180_1":0,"1_274_1":0,"1_276_1":0,"1_327_26":0,"1_355_7":0,"1_327_14":0,"1_375_1":0,"1_377_8":0,"30_42_7":0,"30_52_6":0,"30_11_20":0,"35_42_65":0,"35_110_6":0,"35_11_20":0,"35_47_55":0,"35_80_12":0,"35_95_6":0,"35_48_21":0,"58_27_20":0,"58_50_20":0,"58_36_2":0,"58_41_2":0,"58_59_2":0,"58_64_2":0,"59_10_8":0,"59_21_21":0,"157_12_10":0,"157_25_15":0,"157_42_10":0,"157_55_15":0,"187_8_23":0,"194_26_2":0,"194_31_2":0,"194_45_2":0,"194_50_2":0,"300_8_22":0,"315_8_22":0,"385_8_24":0,"438_6_5":0,"441_6_13":0,"447_11_16":0,"447_30_16":0,"447_20_2":0,"447_25_1":0,"447_39_2":0,"447_44_1":0,"452_8_7":0,"452_18_4":0,"458_6_7":0,"515_17_2":0,"515_22_2":0,"515_26_2":0,"515_31_2":0,"519_12_4":0,"521_19_4":0,"522_14_9":0,"527_19_4":0,"528_14_9":0,"534_12_25":0,"555_14_13":0,"555_31_13":0,"555_14_6":0,"555_25_2":0,"555_31_6":0,"555_42_2":0,"605_8_23":0,"612_17_2":0,"612_22_2":0,"613_17_2":0,"613_22_2":0,"656_8_16":0,"656_27_11":0,"663_8_16":0,"668_8_18":0,"668_29_11":0,"675_8_18":0,"709_10_19":0,"719_11_2":0,"719_16_2":0,"720_11_2":0,"720_16_2":0,"741_8_19":0,"778_13_2":0,"778_18_2":0,"779_13_2":0,"779_18_2":0,"804_40_2":0,"804_45_4":0,"824_10_19":0,"835_11_2":0,"835_16_2":0,"836_11_2":0,"836_16_2":0,"858_8_19":0,"915_10_1":0,"915_14_1":0,"919_10_1":0,"919_14_1":0,"920_10_1":0,"920_14_1":0,"924_10_1":0,"924_14_1":0,"934_15_1":0,"934_19_2":0,"937_15_1":0,"937_19_2":0,"940_33_1":0,"940_37_2":0,"943_33_1":0,"943_37_2":0,"948_15_1":0,"948_19_2":0,"953_15_1":0,"953_19_2":0,"965_15_1":0,"965_19_2":0,"968_33_1":0,"968_37_2":0,"971_33_1":0,"971_37_2":0,"975_13_1":0,"975_17_1":0,"978_14_2":0,"978_19_1":0,"981_15_1":0,"981_19_2":0,"996_33_1":0,"996_37_2":0,"999_33_1":0,"999_37_2":0,"1003_13_1":0,"1003_17_1":0,"1006_14_2":0,"1006_19_1":0,"1008_13_1":0,"1008_17_1":0,"1011_14_2":0,"1011_19_1":0,"1018_15_1":0,"1018_19_2":0,"1024_33_1":0,"1024_37_2":0,"1027_33_1":0,"1027_37_2":0,"1032_15_1":0,"1032_19_2":0,"1036_13_1":0,"1036_17_1":0,"1039_14_2":0,"1039_19_1":0,"1088_10_19":0,"1099_11_2":0,"1099_16_2":0,"1100_11_2":0,"1100_16_2":0,"1122_8_19":0,"1160_8_12":0,"1163_8_33":0,"1172_8_16":0,"1176_8_2":0,"1177_52_16":0,"1177_71_6":0,"1177_10_31":0,"1178_10_1":0,"1178_14_2":0,"1189_61_26":0,"1189_90_2":0,"1189_42_16":0,"1190_8_21":0,"1191_10_25":0,"1232_78_23":0,"1232_104_2":0,"1232_62_13":0,"1241_13_1":0,"1241_17_2":0,"1242_13_1":0,"1242_17_2":0,"1250_6_9":0,"1250_19_9":0,"1250_6_2":0,"1250_13_2":0,"1250_19_2":0,"1250_26_2":0,"1251_9_11":0,"1258_95_25":0,"1258_123_2":0,"1258_77_15":0,"1267_12_1":0,"1286_6_5":0,"1289_37_2":0,"1289_42_4":0,"1291_9_13":0,"1291_26_13":0,"1291_9_9":0,"1291_21_1":0,"1291_9_1":0,"1291_13_5":0,"1291_26_1":0,"1291_30_9":0,"1291_30_1":0,"1291_34_5":0,"1312_27_1":0,"1312_31_1":0,"1313_34_1":0,"1313_38_1":0,"1526_29_7":0,"1526_39_24":0,"1526_11_7":0,"1533_37_2":0,"1533_42_4":0,"1544_35_2":0,"1544_40_4":0,"1555_36_2":0,"1555_41_5":0,"1583_8_22":0,"1665_26_14":0,"1665_68_25":0,"1665_95_10":0,"1665_80_13":0,"1665_154_8":0,"1665_163_70":0,"1665_140_13":0,"1665_190_8":0,"1665_199_34":0,"1665_176_13":0,"1665_199_24":0,"1665_225_8":0,"1665_212_11":0,"1665_352_26":0,"1665_380_7":0,"1665_352_14":0,"1665_391_2":0,"1665_395_1":0,"1665_448_24":0,"1665_471_1":0,"1665_565_1":0,"1665_567_1":0,"1665_618_26":0,"1665_646_7":0,"1665_618_14":0,"1665_666_1":0,"1665_668_8":0,"1681_6_16":0,"1683_20_1":0,"1683_24_8":0,"1691_6_2":0,"1691_12_2":0,"1692_9_2":0,"1692_15_2":0,"1693_9_2":0,"1693_15_2":0,"1700_8_3":0,"1717_9_11":0,"1717_24_10":0,"1717_9_3":0,"1717_24_3":0,"1728_30_44":0,"1728_77_3":0,"1740_18_1":0,"1740_22_14":0,"1741_8_7":0,"1741_19_10":0,"1749_11_17":0,"1749_24_4":0,"1765_6_23":0,"1765_33_11":0,"1765_19_10":0,"1765_41_3":0,"1767_19_38":0,"1767_28_3":0,"1767_34_22":0,"1767_34_16":0,"1767_34_10":0,"1767_47_3":0,"1767_34_3":0,"1771_13_24":0,"1771_41_22":0,"1771_18_19":0,"1771_53_10":0,"1772_11_62":0,"1772_11_16":0,"1772_30_43":0,"1772_11_9":0,"1772_17_3":0,"1774_11_38":0,"1774_11_16":0,"1774_30_19":0,"1774_11_9":0,"1774_17_3":0,"1776_11_22":0,"1776_11_16":0,"1776_30_3":0,"1776_11_9":0,"1776_17_3":0,"1793_20_1":0,"1793_24_11":0,"1797_21_3":0,"1799_19_22":0,"1799_19_16":0,"1799_38_3":0,"1799_19_9":0,"1799_25_3":0,"1824_6_6":0,"1824_17_9":0,"1824_22_4":0,"1839_8_3":0,"1839_23_5":0,"1840_6_43":0,"1840_53_4":0,"1840_7_28":0,"1840_39_9":0,"1840_7_13":0,"1841_33_6":0,"1845_10_3":0,"1845_17_44":0,"1851_23_6":0,"1851_32_7":0,"1852_35_6":0,"1852_44_7":0,"1856_15_9":0,"1856_15_1":0,"1856_19_5":0,"1857_11_60":0,"1860_8_4":0,"1857_11_47":0,"1857_11_34":0,"1858_8_4":0,"1857_29_6":0,"1857_38_6":0,"1857_12_4":0,"1857_20_6":0,"1865_16_65":0,"1866_32_11":0,"1865_16_56":0,"1865_16_46":0,"1866_13_7":0,"1865_16_35":0,"1865_16_26":0,"1865_45_6":0,"1865_16_20":0,"1865_17_8":0,"1875_43_4":0,"1875_50_43":0,"1875_13_11":0,"1875_82_6":0,"1875_91_2":0,"1875_50_13":0,"1881_4_29":0,"1881_37_15":0,"1881_4_13":0,"1881_37_6":0}, ["(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error(\"Cannot find module '\"+o+\"'\")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){","var DragGesture, Gesture,","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","Gesture = require('./gesture');","","module.exports = DragGesture = (function(_super) {","  __extends(DragGesture, _super);","","  function DragGesture(wb) {","    this.wb = wb;","    DragGesture.__super__.constructor.apply(this, arguments);","    this.onDragging = false;","    this.points = null;","    this._moved = false;","    this.minimumTouchSize = 3;","  }","","  DragGesture.prototype.onTouch = function(ev) {};","","  DragGesture.prototype.onDragStart = function(ev) {};","","  DragGesture.prototype.onDrag = function(ev) {};","","  DragGesture.prototype.onDragEnd = function(ev) {};","","  DragGesture.prototype.firstPoint = function() {","    var _ref;","    return (_ref = this.points) != null ? _ref[0] : void 0;","  };","","  DragGesture.prototype.lastPoint = function() {","    var _ref, _ref1;","    return (_ref = this.points) != null ? _ref[((_ref1 = this.points) != null ? _ref1.length : void 0) - 1] : void 0;","  };","","  DragGesture.prototype._onTouchStart = function(ev) {","    this._moved = false;","    this.points = null;","    this.onDragging = true;","    this.points = [this.getPoint(ev)];","    return this.onTouchStart(ev);","  };","","  DragGesture.prototype._onTouchMove = function(ev) {","    var distance, ex, ey, sx, sy, _ref, _ref1;","    this.onTouchMove(ev);","    if (!this.onDragging) {","      return;","    }","    this.points.push(this.getPoint(ev));","    if (this._moved) {","      return this.onDrag(ev);","    } else {","      _ref = this.firstPoint(), sx = _ref[0], sy = _ref[1];","      _ref1 = this.lastPoint(), ex = _ref1[0], ey = _ref1[1];","      distance = Math.sqrt(Math.pow(sx - ey, 2) + Math.pow(sy - ey, 2));","      if (distance > this.minimumTouchSize) {","        this._moved = true;","        return this.onDragStart(ev);","      }","    }","  };","","  DragGesture.prototype._onTouchEnd = function(ev) {","    if (!this.onDragging) {","      return;","    }","    if (!this._moved) {","      this.onTouch(ev);","    } else {","      this.onDragEnd(ev);","    }","    return this.onDragging = false;","  };","","  return DragGesture;","","})(Gesture);","","","},{\"./gesture\":2}],2:[function(require,module,exports){","var EventEmitter, Gesture, extend,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };","","EventEmitter = require('../../utils/event-emitter');","","extend = require('../../utils/extend');","","module.exports = Gesture = (function() {","  function Gesture(wb) {","    this.wb = wb;","    this.getPoint = __bind(this.getPoint, this);","    this.paper = this.wb.paper;","  }","","  Gesture.prototype.select = function() {","    var _ref;","    return (_ref = Snap(this.wb.svg)).select.apply(_ref, arguments);","  };","","  Gesture.prototype.selectAll = function() {","    var _ref;","    return (_ref = Snap(this.wb.svg)).selectAll.apply(_ref, arguments);","  };","","  Gesture.prototype.currentLayer = function() {","    return this.wb.layer;","  };","","  Gesture.prototype._onTouch = function() {","    return this.onTouch.apply(this, arguments);","  };","","  Gesture.prototype.onTouch = function() {};","","  Gesture.prototype._onTouchStart = function() {","    return this.onTouchStart.apply(this, arguments);","  };","","  Gesture.prototype.onTouchStart = function() {};","","  Gesture.prototype._onTouchMove = function() {","    return this.onTouchMove.apply(this, arguments);","  };","","  Gesture.prototype.onTouchMove = function() {};","","  Gesture.prototype._onTouchEnd = function() {","    return this.onTouchEnd.apply(this, arguments);","  };","","  Gesture.prototype.onTouchEnd = function() {};","","  Gesture.prototype._onTouchStart = function() {","    return this.onTouchStart.apply(this, arguments);","  };","","  Gesture.prototype.onTouchStart = function() {};","","  Gesture.prototype._onTouchMove = function() {","    return this.onTouchMove.apply(this, arguments);","  };","","  Gesture.prototype.onTouchMove = function() {};","","  Gesture.prototype._onTouchEnd = function() {","    return this.onTouchEnd.apply(this, arguments);","  };","","  Gesture.prototype.onTouchEnd = function() {};","","  Gesture.prototype.dispose = function() {};","","  Gesture.prototype.getPoint = function(ev) {","    return [ev.offsetX - this.wb.offsetX, ev.offsetY - this.wb.offsetY];","  };","","  return Gesture;","","})();","","","},{\"../../utils/event-emitter\":14,\"../../utils/extend\":15}],3:[function(require,module,exports){","var CircleDrawingGesture, DragGesture,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","DragGesture = require('./base/drag-gesture');","","module.exports = CircleDrawingGesture = (function(_super) {","  __extends(CircleDrawingGesture, _super);","","  function CircleDrawingGesture() {","    this.onDragEnd = __bind(this.onDragEnd, this);","    this.onDrag = __bind(this.onDrag, this);","    CircleDrawingGesture.__super__.constructor.apply(this, arguments);","    this.startPoint = null;","    this.endPoint = null;","  }","","  CircleDrawingGesture.prototype.onDrag = function(ev) {","    var circle, ex, ey, r, sx, sy, x, y, _ref, _ref1, _ref2;","    this.endPoint = this.getPoint(ev);","    if ((_ref = this.lastShape) != null) {","      _ref.remove();","    }","    _ref1 = this.firstPoint(), sx = _ref1[0], sy = _ref1[1];","    _ref2 = this.lastPoint(), ex = _ref2[0], ey = _ref2[1];","    x = sx;","    y = sy;","    r = Math.max(Math.abs(sx - ex), Math.abs(sy - ey));","    circle = this.currentLayer().circle(x, y, r);","    circle.attr({","      strokeWidth: 1,","      stroke: this.wb.strokeColor,","      fill: this.wb.fillColor","    });","    return this.lastShape = circle;","  };","","  CircleDrawingGesture.prototype.onDragEnd = function(ev) {","    this.wb.update();","    return this.lastShape = null;","  };","","  return CircleDrawingGesture;","","})(DragGesture);","","","},{\"./base/drag-gesture\":1}],4:[function(require,module,exports){","var EraserDrawingGesture, Gesture,","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","Gesture = require('./base/gesture');","","module.exports = EraserDrawingGesture = (function(_super) {","  __extends(EraserDrawingGesture, _super);","","  function EraserDrawingGesture() {","    EraserDrawingGesture.__super__.constructor.apply(this, arguments);","    this.eraser = false;","    this.currentLayer().selectAll('*').forEach((function(_this) {","      return function($shape) {","        return $shape.mousemove(function() {","          if (_this.eraser) {","            return $shape.remove();","          }","        });","      };","    })(this));","    this.paper.mousedown((function(_this) {","      return function() {","        return _this.eraser = true;","      };","    })(this));","    this.paper.mouseup((function(_this) {","      return function() {","        return _this.eraser = false;","      };","    })(this));","  }","","  return EraserDrawingGesture;","","})(Gesture);","","","},{\"./base/gesture\":2}],5:[function(require,module,exports){","var DragGesture, FreeDrawingGesture, Gesture, pointsToSegments, _simplify,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","Gesture = require('./base/gesture');","","DragGesture = require('./base/drag-gesture');","","pointsToSegments = require('../utils/utils').pointsToSegments;","","_simplify = function(points, tolelance) {","  return simplify(points.map((function(_this) {","    return function(_arg) {","      var x, y;","      x = _arg[0], y = _arg[1];","      return {","        x: x,","        y: y","      };","    };","  })(this)), tolelance, false).map((function(_this) {","    return function(_arg) {","      var x, y;","      x = _arg.x, y = _arg.y;","      return [x, y];","    };","  })(this));","};","","module.exports = FreeDrawingGesture = (function(_super) {","  __extends(FreeDrawingGesture, _super);","","  function FreeDrawingGesture() {","    this.onDragEnd = __bind(this.onDragEnd, this);","    this.onDrag = __bind(this.onDrag, this);","    this.onDragStart = __bind(this.onDragStart, this);","    return FreeDrawingGesture.__super__.constructor.apply(this, arguments);","  }","","  FreeDrawingGesture.prototype.onDragStart = function(ev) {","    return this.lastPath = null;","  };","","  FreeDrawingGesture.prototype.onDrag = function(ev) {","    var segs, _ref;","    if ((_ref = this.lastPath) != null) {","      _ref.remove();","    }","    segs = pointsToSegments(this.points);","    return this.lastPath = this.currentLayer().path({","      path: segs,","      fill: \"none\",","      stroke: this.wb.strokeColor,","      fill: this.wb.fillColor,","      strokeWidth: 1","    });","  };","","  FreeDrawingGesture.prototype.onDragEnd = function(ev) {","    var segs, _ref;","    if ((_ref = this.lastPath) != null) {","      _ref.remove();","    }","    segs = pointsToSegments(_simplify(this.points));","    this.currentLayer().path({","      path: segs,","      fill: \"none\",","      stroke: this.wb.strokeColor,","      fill: this.wb.fillColor,","      strokeWidth: 1","    });","    return this.wb.update();","  };","","  return FreeDrawingGesture;","","})(DragGesture);","","","},{\"../utils/utils\":16,\"./base/drag-gesture\":1,\"./base/gesture\":2}],6:[function(require,module,exports){","var CircleOperation, Gesture, GrabGesture, PathOperation, RectOperation, adjustToNearPoint, pathToPoints, pointsToSegments, segementsToPoints, _ref,","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","Gesture = require('./base/gesture');","","RectOperation = require('../operations/rect');","","PathOperation = require('../operations/path');","","CircleOperation = require('../operations/circle');","","_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;","","module.exports = GrabGesture = (function(_super) {","  __extends(GrabGesture, _super);","","  function GrabGesture() {","    GrabGesture.__super__.constructor.apply(this, arguments);","    this.disposers = [];","    this.$shapes = this.currentLayer().selectAll('*');","    this.$shapes.forEach((function(_this) {","      return function($shape) {","        var Operation;","        Operation = _this.getOperationByType($shape.type);","        if (!Operation) {","          return;","        }","        return _this.disposers.push(Operation.watch($shape, _this.wb));","      };","    })(this));","  }","","  GrabGesture.prototype.getOperationByType = function(type) {","    switch (type) {","      case 'path':","        return PathOperation;","      case 'rect':","        return RectOperation;","      case 'circle':","        return CircleOperation;","    }","  };","","  GrabGesture.prototype.focus = function($shape) {","    return this.getOperationByType($shape.type).focus($shape, this.wb);","  };","","  GrabGesture.prototype.dispose = function() {","    var d, _results;","    if (typeof this.disposeFocus === \"function\") {","      this.disposeFocus();","    }","    this.$shapes.forEach((function(_this) {","      return function($path) {","        $path.unclick();","        return $path.undrag();","      };","    })(this));","    this.wb.clearUI();","    this.wb.paper.undrag();","    this.wb.paper.unclick();","    _results = [];","    while (d = this.disposers.shift()) {","      _results.push(d());","    }","    return _results;","  };","","  return GrabGesture;","","})(Gesture);","","","},{\"../operations/circle\":10,\"../operations/path\":11,\"../operations/rect\":12,\"../utils/utils\":16,\"./base/gesture\":2}],7:[function(require,module,exports){","var DragGesture, Gesture, LineDrawingGesture, getNearPoint, getPathPositions, pointsToSegments, segementsToPoints, showAnchorsToShape, _ref,","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","DragGesture = require('./base/drag-gesture');","","Gesture = require('./base/gesture');","","_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints;","","getPathPositions = function($group) {","  var points;","  points = [];","  $group.selectAll('path').forEach((function(_this) {","    return function($path) {","      var ps, segments;","      segments = Snap.parsePathString($path.attr('d'));","      ps = segementsToPoints(segments);","      points.push(_.first(ps).concat($path));","      return points.push(_.last(ps).concat($path));","    };","  })(this));","  return points;","};","","getNearPoint = function(_arg, points, force) {","  var costs, minCost, minIndex, sx, sy, _ref1;","  sx = _arg[0], sy = _arg[1];","  if (force == null) {","    force = 10;","  }","  if (points.length === 0) {","    return null;","  }","  costs = points.map(function(_arg1, index) {","    var x, y;","    x = _arg1[0], y = _arg1[1];","    return Math.abs(sx - x) + Math.abs(sy - y);","  });","  _ref1 = costs.reduce(function(_arg1, cost, index) {","    var minCost, minIndex;","    minIndex = _arg1[0], minCost = _arg1[1];","    if (minCost > cost) {","      return [index, cost];","    } else {","      return [minIndex, minCost];","    }","  }, [0, costs[0]]), minIndex = _ref1[0], minCost = _ref1[1];","  if (minCost <= 10) {","    return points[minIndex].concat(minIndex);","  } else {","    return null;","  }","};","","showAnchorsToShape = function(shape, wb) {","  var points, segs;","  segs = Snap.parsePathString(shape.attr('d'));","  points = segementsToPoints(segs);","  return points.map((function(_this) {","    return function(_arg) {","      var $circle, x, y;","      x = _arg[0], y = _arg[1];","      $circle = wb.ui.circle({","        cx: x,","        cy: y,","        r: 8,","        fill: 'transparent',","        stroke: 'blue',","        opacity: 0.86","      });","      $circle.mousemove(function() {","        return $circle.attr('stroke', 'red');","      });","      return $circle.mouseout(function() {","        return $circle.attr('stroke', 'blue');","      });","    };","  })(this));","};","","module.exports = LineDrawingGesture = (function(_super) {","  __extends(LineDrawingGesture, _super);","","  LineDrawingGesture.prototype.dispose = function() {","    return this.paper.undrag();","  };","","  function LineDrawingGesture() {","    var ex, ey, fromShape, mode, pathArray, points, sx, sy;","    LineDrawingGesture.__super__.constructor.apply(this, arguments);","    this.nearPoints = getPathPositions(this.currentLayer());","    sx = null;","    sy = null;","    ex = null;","    ey = null;","    mode = '';","    pathArray = null;","    fromShape = null;","    points = null;","    this.paper.drag((function(_this) {","      return function(dx, dy, x, y, event) {","        var p, segs, _ref1, _ref2;","        console.log('line draging', dx, dy, x, y);","        segs = null;","        _ref1 = [dx + sx, dy + sy], ex = _ref1[0], ey = _ref1[1];","        if (p = getNearPoint([ex, ey], _this.nearPoints)) {","          ex = p[0], ey = p[1];","        }","        if (mode === 'isolate') {","          segs = pointsToSegments([[sx, sy], [ex, ey]]);","        } else if (mode === 'tail') {","          if (fromShape != null) {","            fromShape.remove();","          }","          fromShape = null;","          segs = pointsToSegments(points.concat([[ex, ey]]));","        } else if (mode === 'head') {","          if (fromShape != null) {","            fromShape.remove();","          }","          fromShape = null;","          segs = pointsToSegments([[ex, ey]].concat(points));","        }","        if ((_ref2 = _this.lastShape) != null) {","          _ref2.remove();","        }","        return _this.lastShape = _this.currentLayer().path({","          path: segs,","          stroke: _this.wb.strokeColor,","          fill: _this.wb.fillColor,","          strokeWidth: 1","        });","      };","    })(this), (function(_this) {","      return function(x, y, event) {","        var last_x, last_y, p, segs, _ref1;","        console.log('line drag start', x, y);","        sx = event.offsetX;","        sy = event.offsetY;","        if (p = getNearPoint([sx, sy], _this.nearPoints)) {","          sx = p[0], sy = p[1], fromShape = p[2];","          segs = Snap.parsePathString(fromShape.attr('d'));","          points = segementsToPoints(segs);","          _ref1 = _.last(points), last_x = _ref1[0], last_y = _ref1[1];","          if (last_x === sx && last_y === sy) {","            return mode = 'tail';","          } else {","            return mode = 'head';","          }","        } else {","          return mode = 'isolate';","        }","      };","    })(this), (function(_this) {","      return function() {","        _this.nearPoints = getPathPositions(_this.currentLayer());","        showAnchorsToShape(_this.lastShape, _this.wb);","        return _this.lastShape = null;","      };","    })(this));","  }","","  return LineDrawingGesture;","","})(Gesture);","","","},{\"../utils/utils\":16,\"./base/drag-gesture\":1,\"./base/gesture\":2}],8:[function(require,module,exports){","var DragGesture, RectDrawingGesture,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","DragGesture = require('./base/drag-gesture');","","module.exports = RectDrawingGesture = (function(_super) {","  __extends(RectDrawingGesture, _super);","","  function RectDrawingGesture() {","    this.onDragEnd = __bind(this.onDragEnd, this);","    this.onDrag = __bind(this.onDrag, this);","    this.onDragStart = __bind(this.onDragStart, this);","    RectDrawingGesture.__super__.constructor.apply(this, arguments);","    this.startPoint = null;","    this.endPoint = null;","    this.lastShape = null;","  }","","  RectDrawingGesture.prototype.onDragStart = function(ev) {","    return this.lastShape = null;","  };","","  RectDrawingGesture.prototype.onDrag = function(ev) {","    var ex, ey, h, rect, sx, sy, w, x, y, _ref, _ref1, _ref2;","    if ((_ref = this.lastShape) != null) {","      _ref.remove();","    }","    _ref1 = this.firstPoint(), sx = _ref1[0], sy = _ref1[1];","    _ref2 = this.lastPoint(), ex = _ref2[0], ey = _ref2[1];","    x = Math.min(sx, ex);","    y = Math.min(sy, ey);","    w = Math.abs(sx - ex);","    h = Math.abs(sy - ey);","    rect = this.currentLayer().rect(x, y, w, h);","    rect.attr({","      stroke: this.wb.strokeColor,","      fill: this.wb.fillColor,","      strokeWidth: 1","    });","    return this.lastShape = rect;","  };","","  RectDrawingGesture.prototype.onDragEnd = function(ev) {","    this.wb.update();","    this.wb.setMode('grab');","    this.wb._gesture.focus(this.lastShape);","    return this.lastShape = null;","  };","","  return RectDrawingGesture;","","})(DragGesture);","","","},{\"./base/drag-gesture\":1}],9:[function(require,module,exports){","var HistoryManager;","","module.exports = HistoryManager = (function() {","  var MAX_HISTORY;","","  MAX_HISTORY = 10;","","  function HistoryManager(wb) {","    this.wb = wb;","    this.hist = [''];","    this.future = [];","  }","","  HistoryManager.prototype.current = function() {","    return this.hist[0];","  };","","  HistoryManager.prototype.pushHistory = function(svg) {","    this.future = [];","    this.hist.unshift(svg);","    if (this.hist.length > MAX_HISTORY) {","      return this.hist.pop();","    }","  };","","  HistoryManager.prototype.undo = function() {","    var head;","    if (this.hist.length === 0) {","      return;","    }","    head = this.hist.shift();","    this.future.unshift(head);","    if (this.future.length > MAX_HISTORY) {","      return this.future.pop();","    }","  };","","  HistoryManager.prototype.redo = function() {","    var next;","    if (this.future.length === 0) {","      return;","    }","    next = this.future.shift();","    return this.hist.unshift(next);","  };","","  return HistoryManager;","","})();","","","},{}],10:[function(require,module,exports){","var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;","","_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;","","int = parseInt;","","focus = function($path, wb) {","  return function() {};","};","","watch = function($circle, wb) {","  var cx, cy, disposeFocus, _ref1;","  wb.paper.mousedown((function(_this) {","    return function(ev) {","      return wb.clearUI();","    };","  })(this));","  disposeFocus = null;","  $circle.click((function(_this) {","    return function() {","      wb.clearUI();","      if (typeof disposeFocus === \"function\") {","        disposeFocus();","      }","      return disposeFocus = focus($circle, wb);","    };","  })(this));","  _ref1 = [], cx = _ref1[0], cy = _ref1[1];","  $circle.drag((function(_this) {","    return function(dx, dy) {","      var rx, ry;","      rx = cx + dx;","      ry = cy + dy;","      return $circle.attr({","        cx: rx,","        cy: ry","      });","    };","  })(this), (function(_this) {","    return function(dx, dy, ev) {","      cx = int($circle.attr('cx'));","      cy = int($circle.attr('cy'));","      ev.stopPropagation();","      return false;","    };","  })(this), (function(_this) {","    return function(ev) {","      ev.stopPropagation();","      return wb.update();","    };","  })(this));","  return function() {","    wb.paper.unmousedown();","    if (typeof disposeFocus === \"function\") {","      disposeFocus();","    }","    $circle.undrag();","    return $circle.unclick();","  };","};","","module.exports = {","  watch: watch,","  focus: focus","};","","","},{\"../utils/utils\":16}],11:[function(require,module,exports){","var adjustToNearPoint, focus, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;","","_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;","","focus = function($path, wb) {","  var $points, points;","  points = pathToPoints($path);","  $points = points.map((function(_this) {","    return function(_arg, index) {","      var $circle, lx, ly, sx, sy;","      sx = _arg[0], sy = _arg[1];","      $circle = wb.ui.circle({","        cx: sx,","        cy: sy,","        fill: 'transparent',","        stroke: 'blue',","        r: 6","      });","      lx = sx;","      ly = sy;","      $circle.drag(function(dx, dy) {","        var rx, ry, segs;","        rx = lx + dx;","        ry = ly + dy;","        points[index] = [rx, ry];","        segs = pointsToSegments(points);","        $path.attr('d', segs);","        $circle.attr({","          cx: rx,","          cy: ry","        });","        return false;","      }, function(x, y, ev) {","        var _ref1;","        _ref1 = points[index], lx = _ref1[0], ly = _ref1[1];","        ev.stopPropagation();","        return false;","      }, function(ev) {","        ev.stopPropagation();","        return wb.update();","      });","      return $circle;","    };","  })(this));","  return function() {","    var $p, _i, _len, _results;","    wb.paper.unmousedown();","    _results = [];","    for (_i = 0, _len = $points.length; _i < _len; _i++) {","      $p = $points[_i];","      _results.push($p.remove());","    }","    return _results;","  };","};","","watch = function($path, wb) {","  var disposeFocus, lx, ly, points, segs, _ref1, _type;","  points = pathToPoints($path);","  wb.paper.mousedown((function(_this) {","    return function(ev) {","      return wb.clearUI();","    };","  })(this));","  disposeFocus = null;","  $path.click((function(_this) {","    return function() {","      wb.clearUI();","      if (typeof disposeFocus === \"function\") {","        disposeFocus();","      }","      return disposeFocus = focus($path, wb);","    };","  })(this));","  segs = null;","  _ref1 = [], _type = _ref1[0], lx = _ref1[1], ly = _ref1[2];","  $path.drag((function(_this) {","    return function(dx, dy) {","      var rx, ry;","      rx = lx + dx;","      ry = ly + dy;","      segs[0] = ['M', rx, ry];","      return $path.attr('d', segs);","    };","  })(this), (function(_this) {","    return function(dx, dy, ev) {","      var _ref2;","      segs = Snap.parsePathString($path.attr('d'));","      _ref2 = segs[0], _type = _ref2[0], lx = _ref2[1], ly = _ref2[2];","      wb.clearUI();","      ev.stopPropagation();","      return false;","    };","  })(this), (function(_this) {","    return function(ev) {","      points = segementsToPoints(segs);","      ev.stopPropagation();","      return wb.update();","    };","  })(this));","  return function() {","    wb.paper.unmousedown();","    if (typeof disposeFocus === \"function\") {","      disposeFocus();","    }","    $path.undrag();","    return $path.unclick();","  };","};","","module.exports = {","  watch: watch,","  focus: focus","};","","","},{\"../utils/utils\":16}],12:[function(require,module,exports){","var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;","","_ref = require('../utils/utils'), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;","","int = parseInt;","","focus = function($shape, wb) {","  var $leftBottom, $leftTop, $rightBottom, $rightTop, h, lh, lw, lx, ly, padding, resetAnchorsPosition, w, x, xs, y, ys, _ref1;","  x = int($shape.attr('x'));","  y = int($shape.attr('y'));","  w = int($shape.attr('width'));","  h = int($shape.attr('height'));","  $leftTop = wb.ui.circle({","    fill: 'transparent',","    stroke: 'blue',","    opacity: 0.86,","    r: 8","  });","  $rightTop = wb.ui.circle({","    fill: 'transparent',","    stroke: 'blue',","    opacity: 0.86,","    r: 8","  });","  $rightBottom = wb.ui.circle({","    fill: 'transparent',","    stroke: 'blue',","    opacity: 0.86,","    r: 8","  });","  $leftBottom = wb.ui.circle({","    fill: 'transparent',","    stroke: 'blue',","    opacity: 0.86,","    r: 8","  });","  resetAnchorsPosition = function(x, y, w, h) {","    $leftTop.attr({","      cx: x,","      cy: y","    });","    $rightTop.attr({","      cx: x + w,","      cy: y","    });","    $rightBottom.attr({","      cx: x + w,","      cy: y + h","    });","    return $leftBottom.attr({","      cx: x,","      cy: y + h","    });","  };","  resetAnchorsPosition(x, y, w, h);","  _ref1 = [x, y, w, h, [], []], lx = _ref1[0], ly = _ref1[1], lw = _ref1[2], lh = _ref1[3], xs = _ref1[4], ys = _ref1[5];","  padding = 5;","  return [","    {","      shape: $leftTop,","      x: function(dx, dy, x, y, w, h) {","        return x + dx;","      },","      y: function(dx, dy, x, y, w, h) {","        return y + dy;","      },","      w: function(dx, dy, x, y, w, h) {","        return Math.max(padding, w - dx);","      },","      h: function(dx, dy, x, y, w, h) {","        return Math.max(padding, h - dy);","      },","      adjust: function(x, y, w, h) {","        var ax, ay, dx, dy;","        if (ax = adjustToNearPoint(x, xs, 10)) {","          dx = x - ax;","          x = ax;","          w += dx;","        }","        if (ay = adjustToNearPoint(y, ys, 10)) {","          dy = y - ay;","          y = ay;","          h += dy;","        }","        return [x, y, w, h];","      }","    }, {","      shape: $rightTop,","      x: function(dx, dy, x, y, w, h) {","        return x;","      },","      y: function(dx, dy, x, y, w, h) {","        return y + dy;","      },","      w: function(dx, dy, x, y, w, h) {","        return Math.max(padding, w + dx);","      },","      h: function(dx, dy, x, y, w, h) {","        return Math.max(padding, h - dy);","      },","      adjust: function(x, y, w, h) {","        var ax, ay, dy, gx;","        gx = x + w;","        if (ax = adjustToNearPoint(gx, xs, 10)) {","          x = x;","          w = ax - x;","        }","        if (ay = adjustToNearPoint(y, ys, 10)) {","          dy = y - ay;","          y = ay;","          h += dy;","        }","        return [x, y, w, h];","      }","    }, {","      shape: $rightBottom,","      x: function(dx, dy, x, y, w, h) {","        return x;","      },","      y: function(dx, dy, x, y, w, h) {","        return y;","      },","      w: function(dx, dy, x, y, w, h) {","        return Math.max(padding, w + dx);","      },","      h: function(dx, dy, x, y, w, h) {","        return Math.max(padding, h + dy);","      },","      adjust: function(x, y, w, h) {","        var ax, ay, gx, gy;","        gx = x + w;","        if (ax = adjustToNearPoint(gx, xs, 10)) {","          x = x;","          w = ax - x;","        }","        gy = y + h;","        if (ay = adjustToNearPoint(gy, ys, 10)) {","          y = y;","          h = ay - y;","        }","        return [x, y, w, h];","      }","    }, {","      shape: $leftBottom,","      x: function(dx, dy, x, y, w, h) {","        return x + dx;","      },","      y: function(dx, dy, x, y, w, h) {","        return y;","      },","      w: function(dx, dy, x, y, w, h) {","        return Math.max(padding, w - dx);","      },","      h: function(dx, dy, x, y, w, h) {","        return Math.max(padding, h + dy);","      },","      adjust: function(x, y, w, h) {","        var ax, ay, dx, gy;","        if (ax = adjustToNearPoint(x, xs, 10)) {","          dx = x - ax;","          x = ax;","          w += dx;","        }","        gy = y + h;","        if (ay = adjustToNearPoint(gy, ys, 10)) {","          y = y;","          h = ay - y;","        }","        return [x, y, w, h];","      }","    }","  ].forEach((function(_this) {","    return function(anc) {","      return anc.shape.drag(function(dx, dy) {","        var args, rh, rw, rx, ry, _ref2;","        args = [dx, dy, lx, ly, lw, lh];","        rx = anc.x.apply(anc, args);","        ry = anc.y.apply(anc, args);","        rw = anc.w.apply(anc, args);","        rh = anc.h.apply(anc, args);","        _ref2 = anc.adjust(rx, ry, rw, rh), rx = _ref2[0], ry = _ref2[1], rw = _ref2[2], rh = _ref2[3];","        $shape.attr({","          x: rx,","          y: ry,","          width: rw,","          height: rh","        });","        return resetAnchorsPosition(rx, ry, rw, rh);","      }, function(x, y, ev) {","        var _ref2;","        ev.stopPropagation();","        lx = int($leftTop.attr('cx'));","        ly = int($leftTop.attr('cy'));","        lw = int($shape.attr('width'));","        lh = int($shape.attr('height'));","        _ref2 = wb.getAnchorPoints(), xs = _ref2.xs, ys = _ref2.ys;","        return wb.showGrid();","      }, function() {","        wb.clearUI();","        return wb.update();","      });","    };","  })(this));","};","","watch = function($shape, wb) {","  var disposeFocus, lx, ly;","  wb.paper.mousedown((function(_this) {","    return function(ev) {","      return wb.clearUI();","    };","  })(this));","  disposeFocus = null;","  $shape.click((function(_this) {","    return function() {","      if (typeof disposeFocus === \"function\") {","        disposeFocus();","      }","      return disposeFocus = focus($shape, wb);","    };","  })(this));","  lx = int($shape.attr('x'));","  ly = int($shape.attr('y'));","  $shape.drag((function(_this) {","    return function(dx, dy) {","      var rx, ry;","      rx = lx + dx;","      ry = ly + dy;","      return $shape.attr({","        x: rx,","        y: ry","      });","    };","  })(this), (function(_this) {","    return function(dx, dy, ev) {","      wb.clearUI();","      lx = int($shape.attr('x'));","      ly = int($shape.attr('y'));","      ev.stopPropagation();","      return false;","    };","  })(this), (function(_this) {","    return function(ev) {","      ev.stopPropagation();","      return wb.update();","    };","  })(this));","  return function() {","    wb.paper.unmousedown();","    if (typeof disposeFocus === \"function\") {","      disposeFocus();","    }","    $shape.undrag();","    return $shape.unclick();","  };","};","","module.exports = {","  watch: watch,","  focus: focus","};","","","},{\"../utils/utils\":16}],13:[function(require,module,exports){","var jade = require(\"jade/runtime\");","","module.exports = function template(locals) {","var buf = [];","var jade_mixins = {};","var jade_interp;","","buf.push(\"<div><button class=\\\"edit-grab\\\">grab</button><button class=\\\"edit-free\\\">free</button><button class=\\\"edit-rect\\\">rect</button><button class=\\\"edit-circle\\\">circle</button><button class=\\\"edit-line\\\">line</button><button class=\\\"edit-eraser\\\">eraser</button><span class=\\\"mode\\\"></span>&nbsp;<span class=\\\"mouse-x\\\"></span>:<span class=\\\"mouse-y\\\"></span></div><div><button class=\\\"layer0\\\">1</button><button class=\\\"layer1\\\">2</button><button class=\\\"layer2\\\">3</button></div><div style=\\\"position:relative; width:640px; height:320px; padding:0 margin: 0;\\\" class=\\\"main\\\"><div style=\\\"position:absolute;padding:0; margin: 0; overflow: hidden; -webkit-user-select: none;\\\" class=\\\"bg\\\"></div><svg width=\\\"640\\\" height=\\\"320\\\" style=\\\"position:absolute;padding:0 margin: 0;cursor: crosshair\\\" class=\\\"whiteboard\\\"></svg></div>\");;return buf.join(\"\");","};","},{\"jade/runtime\":18}],14:[function(require,module,exports){","var EventEmitter,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },","  __slice = [].slice;","","EventEmitter = (function() {","  function EventEmitter() {","    this.trigger = __bind(this.trigger, this);","    this.off = __bind(this.off, this);","    this.on = __bind(this.on, this);","  }","","  EventEmitter.prototype.on = function(eventName, callback) {","    var _base;","    if (this._events == null) {","      this._events = [];","    }","    if ((_base = this._events)[eventName] == null) {","      _base[eventName] = [];","    }","    this._events[eventName].push(callback);","    return this;","  };","","  EventEmitter.prototype.off = function(eventName, fn) {","    var n, _ref;","    if (arguments.length === 0) {","      delete this.events;","      return this;","    }","    if (fn != null) {","      n = (_ref = this.events[eventName]) != null ? _ref.indexOf(fn) : void 0;","      if (n > -1) {","        this._events[eventName].splice(n, 1);","      }","    } else {","      delete this._events[eventName];","    }","    return this;","  };","","  EventEmitter.prototype.trigger = function() {","    var args, eventName, _ref, _ref1;","    eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];","    if ((_ref = this._events) != null) {","      if ((_ref1 = _ref[eventName]) != null) {","        _ref1.map((function(_this) {","          return function(callback) {","            return callback.apply(null, args);","          };","        })(this));","      }","    }","    return this;","  };","","  return EventEmitter;","","})();","","module.exports = EventEmitter;","","","},{}],15:[function(require,module,exports){","var extend;","","module.exports = extend = (function(_this) {","  return function(obj, props) {","    var k, v;","    for (k in props) {","      v = props[k];","      obj[k] = v;","    }","    return obj;","  };","})(this);","","","},{}],16:[function(require,module,exports){","var adjustToNearPoint, getAnchorPoints, int, pathToPoints, pointsToSegments, segementsToPoints,","  __slice = [].slice;","","int = parseInt;","","pointsToSegments = function(points) {","  var body, ex, ey, segs, sx, sy, _ref, _ref1;","  (_ref = points[0], sx = _ref[0], sy = _ref[1]), body = 2 <= points.length ? __slice.call(points, 1) : [];","  segs = [].concat([['M', sx, sy]], body.map((function(_this) {","    return function() {","      var lx, ly;","      lx = sx;","      ly = sy;","      return function(_arg) {","        var dx, dy, x, y;","        x = _arg[0], y = _arg[1];","        dx = x - lx;","        dy = y - ly;","        lx = x;","        ly = y;","        return ['l', dx, dy];","      };","    };","  })(this)()));","  _ref1 = _.last(body), ex = _ref1[0], ey = _ref1[1];","  if (sx === ex && sy === ey) {","    segs[segs.length - 1] = ['Z'];","  }","  return segs;","};","","segementsToPoints = function(segments) {","  var body, sx, sy, t, _ref;","  (_ref = segments[0], t = _ref[0], sx = _ref[1], sy = _ref[2]), body = 2 <= segments.length ? __slice.call(segments, 1) : [];","  return [].concat([[sx, sy]], body.map((function(_this) {","    return function() {","      var cx, cy;","      cx = sx;","      cy = sy;","      return function(_arg) {","        var t, x, y;","        t = _arg[0], x = _arg[1], y = _arg[2];","        if (t === 'Z') {","          return [sx, sy];","        }","        cx += x;","        cy += y;","        return [cx, cy];","      };","    };","  })(this)()));","};","","pathToPoints = function($path) {","  var segments;","  segments = Snap.parsePathString($path.attr('d'));","  return segementsToPoints(segments);","};","","adjustToNearPoint = function(n, points, force) {","  var p, _i, _len;","  if (force == null) {","    force = 3;","  }","  for (_i = 0, _len = points.length; _i < _len; _i++) {","    p = points[_i];","    if ((p - force < n && n < p + force)) {","      return p;","    }","  }","  return null;","};","","getAnchorPoints = function(layer) {","  var anchor_points, anchor_x, anchor_y;","  anchor_x = [];","  anchor_y = [];","  anchor_points = [];","  layer.selectAll('*').forEach((function(_this) {","    return function($shape) {","      var h, w, x, y;","      switch ($shape.type) {","        case 'rect':","          x = int($shape.attr('x'));","          y = int($shape.attr('y'));","          w = int($shape.attr('width'));","          h = int($shape.attr('height'));","          anchor_x.push(x, x + w);","          return anchor_y.push(y, y + h);","      }","    };","  })(this));","  return {","    xs: anchor_x,","    ys: anchor_y","  };","};","","module.exports = {","  pointsToSegments: pointsToSegments,","  segementsToPoints: segementsToPoints,","  getAnchorPoints: getAnchorPoints,","  adjustToNearPoint: adjustToNearPoint,","  pathToPoints: pathToPoints","};","","","},{}],17:[function(require,module,exports){","var CircleDrawingGesture, EraserGesture, EventEmitter, FreeDrawingGesture, GrabGesture, HistoryManager, LineDrawingGesture, RectDrawingGesture, Whiteboard, extend, getAnchorPoints, int,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };","","RectDrawingGesture = require('./gestures/rect-drawing-gesture');","","FreeDrawingGesture = require('./gestures/free-drawing-gesture');","","LineDrawingGesture = require('./gestures/line-drawing-gesture');","","CircleDrawingGesture = require('./gestures/circle-drawing-gesture');","","EraserGesture = require('./gestures/eraser-gesture');","","GrabGesture = require('./gestures/grab-gesture');","","EventEmitter = require('./utils/event-emitter');","","extend = require('./utils/extend');","","getAnchorPoints = require('./utils/utils').getAnchorPoints;","","HistoryManager = require('./history-manager');","","int = parseInt;","","Whiteboard = (function() {","  var template;","","  Whiteboard.start = function(selector) {","    var hist, whiteboard;","    whiteboard = new Whiteboard(selector);","    hist = new HistoryManager;","    whiteboard.on('changed', (function(_this) {","      return function(svg) {","        return hist.pushHistory(svg);","      };","    })(this));","    whiteboard.on('undo', (function(_this) {","      return function(svg) {","        var next;","        hist.undo();","        next = hist.current();","        whiteboard.setSVG(next);","        return whiteboard.setMode(whiteboard.mode);","      };","    })(this));","    whiteboard.on('redo', (function(_this) {","      return function(svg) {","        var next;","        hist.redo();","        next = hist.current();","        whiteboard.setSVG(next);","        return whiteboard.setMode(whiteboard.mode);","      };","    })(this));","    whiteboard.on('hide-preview', (function(_this) {","      return function(svg) {","        return preview.hide();","      };","    })(this));","    whiteboard.on('show-preview', (function(_this) {","      return function(svg) {","        return preview.show();","      };","    })(this));","    return whiteboard;","  };","","  template = require('./templates/whiteboard');","","  extend(Whiteboard.prototype, EventEmitter.prototype);","","  function Whiteboard(selector) {","    this.setBackgroundHTML = __bind(this.setBackgroundHTML, this);","    this.$ = __bind(this.$, this);","    this.setMode = __bind(this.setMode, this);","    this.setSVG = __bind(this.setSVG, this);","    this.getSVG = __bind(this.getSVG, this);","    this.update = __bind(this.update, this);","    var $svg, el, fillColor, offsetX, offsetY, paper, strokeColor, svg, _ref;","    window.whiteboard = this;","    this.strokeColor = strokeColor = 'black';","    this.fillColor = fillColor = 'transparent';","    this.tolelance = 2;","    this.el = el = document.querySelector(selector);","    this.$el = $(this.el);","    this.$el.html(template());","    this.svg = svg = document.querySelector('svg.whiteboard');","    this.$svg = $svg = $(this.svg);","    this.paper = paper = Snap(svg);","    _ref = this.$svg.position(), offsetX = _ref.left, offsetY = _ref.top;","    this.offsetX = offsetX;","    this.offsetY = offsetY;","    this.setupButtons();","    this.resetLayers();","    this.setLayer(0);","    this.setMode('free');","  }","","  Whiteboard.prototype.setupButtons = function() {","    var $fillColor, $strokeColor;","    this.$('.edit-free').on('click', (function(_this) {","      return function() {","        return _this.setMode('free');","      };","    })(this));","    this.$('.edit-rect').on('click', (function(_this) {","      return function() {","        return _this.setMode('rect');","      };","    })(this));","    this.$('.edit-line').on('click', (function(_this) {","      return function() {","        return _this.setMode('line');","      };","    })(this));","    this.$('.edit-circle').on('click', (function(_this) {","      return function() {","        return _this.setMode('circle');","      };","    })(this));","    this.$('.edit-eraser').on('click', (function(_this) {","      return function() {","        return _this.setMode('eraser');","      };","    })(this));","    this.$('.edit-grab').on('click', (function(_this) {","      return function() {","        var grabbing;","        $svg.off();","        _this.setMode('grab');","        return grabbing = false;","      };","    })(this));","    $fillColor = this.$('input.fill-color').on('keyup', (function(_this) {","      return function() {","        return _this.fillColor = _this.$fillColor.val();","      };","    })(this));","    $strokeColor = this.$('input.stroke-color').on('keyup', (function(_this) {","      return function() {","        return _this.strokeColor = $strokeColor.val();","      };","    })(this));","    this.$('.undo').on('click', (function(_this) {","      return function() {","        return _this.trigger('undo');","      };","    })(this));","    this.$('.redo').on('click', (function(_this) {","      return function() {","        return _this.trigger('redo');","      };","    })(this));","    this.$('.layer0').on('click', (function(_this) {","      return function() {","        _this.setLayer(0);","        return _this.showBackground();","      };","    })(this));","    this.$('.layer1').on('click', (function(_this) {","      return function() {","        _this.setLayer(1);","        return _this.hideBackground();","      };","    })(this));","    return this.$('.layer2').on('click', (function(_this) {","      return function() {","        _this.setLayer(2);","        return _this.hideBackground();","      };","    })(this));","  };","","  Whiteboard.prototype.clearUI = function() {","    return Snap(this.ui).selectAll('*').forEach(function(i) {","      return i.remove();","    });","  };","","  Whiteboard.prototype.update = function() {","    return this.trigger('changed', this.getSVG());","  };","","  Whiteboard.prototype.getSVG = function() {","    return this.paper.outerSVG();","  };","","  Whiteboard.prototype.setSVG = function(text) {","    return this.$svg.html(text);","  };","","  Whiteboard.prototype.getUI = function() {","    return this.ui != null ? this.ui : this.ui = this.paper.g();","  };","","  Whiteboard.prototype.setLayer = function(n) {","    var l, _i, _len, _ref;","    this.clearUI();","    _ref = this.layers;","    for (_i = 0, _len = _ref.length; _i < _len; _i++) {","      l = _ref[_i];","      l.node.style.visibility = 'hidden';","    }","    this.layer = this.layers[n];","    return this.layer.node.style.visibility = 'visible';","  };","","  Whiteboard.prototype.showGrid = function(xs, ys) {","    var x, y, _i, _j, _len, _len1, _ref, _results;","    _ref = getAnchorPoints(this.layer), xs = _ref.xs, ys = _ref.ys;","    for (_i = 0, _len = xs.length; _i < _len; _i++) {","      x = xs[_i];","      this.ui.line({","        x1: x,","        x2: x,","        y1: 0,","        y2: 320,","        style: \"stroke:rgba(200,200,200, 0.5);stroke-width:1\"","      });","    }","    _results = [];","    for (_j = 0, _len1 = ys.length; _j < _len1; _j++) {","      y = ys[_j];","      _results.push(this.ui.line({","        x1: 0,","        x2: 640,","        y1: y,","        y2: y,","        style: \"stroke:rgba(200,200,200, 0.5);stroke-width:1\"","      }));","    }","    return _results;","  };","","  Whiteboard.prototype.showBackground = function() {","    return this.$('.bg').show();","  };","","  Whiteboard.prototype.hideBackground = function() {","    return this.$('.bg').hide();","  };","","  Whiteboard.prototype.getAnchorPoints = function() {","    return getAnchorPoints(this.layer);","  };","","  Whiteboard.prototype.setMode = function(mode) {","    var $x, $y, Gesture, gesture, _ref;","    this.$('.mode').text(mode);","    if ((_ref = this._gesture) != null) {","      _ref.dispose();","    }","    this.mode = mode;","    this.clearUI();","    this.$svg.off();","    Gesture = (function() {","      switch (mode) {","        case 'free':","          return FreeDrawingGesture;","        case 'rect':","          return RectDrawingGesture;","        case 'line':","          return LineDrawingGesture;","        case 'circle':","          return CircleDrawingGesture;","        case 'eraser':","          return EraserGesture;","        case 'grab':","          return GrabGesture;","      }","    })();","    this._gesture = gesture = new Gesture(this);","    this.$svg.on('mousedown touchstart', (function(_this) {","      return function(ev) {","        return gesture._onTouchStart(ev);","      };","    })(this));","    this.$svg.on('mouseup touchend', (function(_this) {","      return function(ev) {","        return gesture._onTouchEnd(ev);","      };","    })(this));","    $x = $('.mouse-x');","    $y = $('.mouse-y');","    return this.$svg.on('mousemove touchmove', (function(_this) {","      return function(ev) {","        var x, y, _ref1;","        gesture._onTouchMove(ev);","        _ref1 = gesture.getPoint(ev), x = _ref1[0], y = _ref1[1];","        $x.text(x);","        return $y.text(y);","      };","    })(this));","  };","","  Whiteboard.prototype.resetLayers = function(layerCount) {","    if (!this._layerInitialized) {","      this._layerInitialized = true;","      this.layers = [this.paper.g().addClass('l0'), this.paper.g().addClass('l1'), this.paper.g().addClass('l2')];","      return this.ui = this.paper.g().addClass('ui');","    } else {","      this.layers = [Snap.select('.l0'), Snap.select('.l1'), Snap.select('.l2')];","      return this.ui = Snap.select('.ui');","    }","  };","","  Whiteboard.prototype.$ = function(selector) {","    return this.$el.find(selector);","  };","","  Whiteboard.prototype.setBackgroundHTML = function(html) {","    var $bg, h, w;","    $bg = this.$('.bg');","    $bg.html(html);","    w = $bg.width();","    h = $bg.height();","    return this.$svg.css({","      width: Math.max(w, 640),","      height: Math.max(h, 480)","    });","  };","","  return Whiteboard;","","})();","","window.Whiteboard = Whiteboard;","","","},{\"./gestures/circle-drawing-gesture\":3,\"./gestures/eraser-gesture\":4,\"./gestures/free-drawing-gesture\":5,\"./gestures/grab-gesture\":6,\"./gestures/line-drawing-gesture\":7,\"./gestures/rect-drawing-gesture\":8,\"./history-manager\":9,\"./templates/whiteboard\":13,\"./utils/event-emitter\":14,\"./utils/extend\":15,\"./utils/utils\":16}],18:[function(require,module,exports){","(function (global){","!function(e){if(\"object\"==typeof exports)module.exports=e();else if(\"function\"==typeof define&&define.amd)define(e);else{var f;\"undefined\"!=typeof window?f=window:\"undefined\"!=typeof global?f=global:\"undefined\"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error(\"Cannot find module '\"+o+\"'\")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){","'use strict';","","/**"," * Merge two attribute objects giving precedence"," * to values in object `b`. Classes are special-cased"," * allowing for arrays and merging/joining appropriately"," * resulting in a string."," *"," * @param {Object} a"," * @param {Object} b"," * @return {Object} a"," * @api private"," */","","exports.merge = function merge(a, b) {","  if (arguments.length === 1) {","    var attrs = a[0];","    for (var i = 1; i < a.length; i++) {","      attrs = merge(attrs, a[i]);","    }","    return attrs;","  }","  var ac = a['class'];","  var bc = b['class'];","","  if (ac || bc) {","    ac = ac || [];","    bc = bc || [];","    if (!Array.isArray(ac)) ac = [ac];","    if (!Array.isArray(bc)) bc = [bc];","    a['class'] = ac.concat(bc).filter(nulls);","  }","","  for (var key in b) {","    if (key != 'class') {","      a[key] = b[key];","    }","  }","","  return a;","};","","/**"," * Filter null `val`s."," *"," * @param {*} val"," * @return {Boolean}"," * @api private"," */","","function nulls(val) {","  return val != null && val !== '';","}","","/**"," * join array as classes."," *"," * @param {*} val"," * @return {String}"," */","exports.joinClasses = joinClasses;","function joinClasses(val) {","  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;","}","","/**"," * Render the given classes."," *"," * @param {Array} classes"," * @param {Array.<Boolean>} escaped"," * @return {String}"," */","exports.cls = function cls(classes, escaped) {","  var buf = [];","  for (var i = 0; i < classes.length; i++) {","    if (escaped && escaped[i]) {","      buf.push(exports.escape(joinClasses([classes[i]])));","    } else {","      buf.push(joinClasses(classes[i]));","    }","  }","  var text = joinClasses(buf);","  if (text.length) {","    return ' class=\"' + text + '\"';","  } else {","    return '';","  }","};","","/**"," * Render the given attribute."," *"," * @param {String} key"," * @param {String} val"," * @param {Boolean} escaped"," * @param {Boolean} terse"," * @return {String}"," */","exports.attr = function attr(key, val, escaped, terse) {","  if ('boolean' == typeof val || null == val) {","    if (val) {","      return ' ' + (terse ? key : key + '=\"' + key + '\"');","    } else {","      return '';","    }","  } else if (0 == key.indexOf('data') && 'string' != typeof val) {","    return ' ' + key + \"='\" + JSON.stringify(val).replace(/'/g, '&apos;') + \"'\";","  } else if (escaped) {","    return ' ' + key + '=\"' + exports.escape(val) + '\"';","  } else {","    return ' ' + key + '=\"' + val + '\"';","  }","};","","/**"," * Render the given attributes object."," *"," * @param {Object} obj"," * @param {Object} escaped"," * @return {String}"," */","exports.attrs = function attrs(obj, terse){","  var buf = [];","","  var keys = Object.keys(obj);","","  if (keys.length) {","    for (var i = 0; i < keys.length; ++i) {","      var key = keys[i]","        , val = obj[key];","","      if ('class' == key) {","        if (val = joinClasses(val)) {","          buf.push(' ' + key + '=\"' + val + '\"');","        }","      } else {","        buf.push(exports.attr(key, val, false, terse));","      }","    }","  }","","  return buf.join('');","};","","/**"," * Escape the given string of `html`."," *"," * @param {String} html"," * @return {String}"," * @api private"," */","","exports.escape = function escape(html){","  var result = String(html)","    .replace(/&/g, '&amp;')","    .replace(/</g, '&lt;')","    .replace(/>/g, '&gt;')","    .replace(/\"/g, '&quot;');","  if (result === '' + html) return html;","  else return result;","};","","/**"," * Re-throw the given `err` in context to the"," * the jade in `filename` at the given `lineno`."," *"," * @param {Error} err"," * @param {String} filename"," * @param {String} lineno"," * @api private"," */","","exports.rethrow = function rethrow(err, filename, lineno, str){","  if (!(err instanceof Error)) throw err;","  if ((typeof window != 'undefined' || !filename) && !str) {","    err.message += ' on line ' + lineno;","    throw err;","  }","  try {","    str = str || _dereq_('fs').readFileSync(filename, 'utf8')","  } catch (ex) {","    rethrow(err, null, lineno)","  }","  var context = 3","    , lines = str.split('\\n')","    , start = Math.max(lineno - context, 0)","    , end = Math.min(lines.length, lineno + context);","","  // Error context","  var context = lines.slice(start, end).map(function(line, i){","    var curr = i + start + 1;","    return (curr == lineno ? '  > ' : '    ')","      + curr","      + '| '","      + line;","  }).join('\\n');","","  // Alter exception message","  err.path = filename;","  err.message = (filename || 'Jade') + ':' + lineno","    + '\\n' + context + '\\n\\n' + err.message;","  throw err;","};","","},{\"fs\":2}],2:[function(_dereq_,module,exports){","","},{}]},{},[1])","(1)","});","}).call(this,typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})","},{}],19:[function(require,module,exports){","if (false) {","  'Never run';","}","","if (typeof window !== \"undefined\" && window !== null) {","  window.test_run = function() {","    require('./whiteboard');","    return require('./utils/utils');","  };","}","","","},{\"./utils/utils\":20,\"./whiteboard\":21}],20:[function(require,module,exports){","describe(\"app/utils/utils\", function() {","  return it(\"should be written\");","});","","","},{}],21:[function(require,module,exports){","require('../app/whiteboard');","","describe(\"app/whiteboard\", function() {","  return it(\"should be written\", function() {","    return new Whiteboard(\"body\");","  });","});","","","},{\"../app/whiteboard\":17}]},{},[19])"]);
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
        _$jscmd("test/runners/test.js", "line", 2);
        var DragGesture, Gesture, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 4);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 4);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 4);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 4);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 4);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 6);
        Gesture = require("./gesture");
        _$jscmd("test/runners/test.js", "line", 8);
        module.exports = DragGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 9);
            __extends(DragGesture, _super);
            function DragGesture(wb) {
                _$jscmd("test/runners/test.js", "line", 12);
                this.wb = wb;
                _$jscmd("test/runners/test.js", "line", 13);
                DragGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 14);
                this.onDragging = false;
                _$jscmd("test/runners/test.js", "line", 15);
                this.points = null;
                _$jscmd("test/runners/test.js", "line", 16);
                this._moved = false;
                _$jscmd("test/runners/test.js", "line", 17);
                this.minimumTouchSize = 3;
            }
            _$jscmd("test/runners/test.js", "line", 20);
            DragGesture.prototype.onTouch = function(ev) {};
            _$jscmd("test/runners/test.js", "line", 22);
            DragGesture.prototype.onDragStart = function(ev) {};
            _$jscmd("test/runners/test.js", "line", 24);
            DragGesture.prototype.onDrag = function(ev) {};
            _$jscmd("test/runners/test.js", "line", 26);
            DragGesture.prototype.onDragEnd = function(ev) {};
            _$jscmd("test/runners/test.js", "line", 28);
            DragGesture.prototype.firstPoint = function() {
                _$jscmd("test/runners/test.js", "line", 29);
                var _ref;
                _$jscmd("test/runners/test.js", "line", 30);
                return _$jscmd("test/runners/test.js", "cond", "30_11_20", _ref = this.points) != null ? _$jscmd("test/runners/test.js", "cond", "30_42_7", _ref[0]) : _$jscmd("test/runners/test.js", "cond", "30_52_6", void 0);
            };
            _$jscmd("test/runners/test.js", "line", 33);
            DragGesture.prototype.lastPoint = function() {
                _$jscmd("test/runners/test.js", "line", 34);
                var _ref, _ref1;
                _$jscmd("test/runners/test.js", "line", 35);
                return _$jscmd("test/runners/test.js", "cond", "35_11_20", _ref = this.points) != null ? _$jscmd("test/runners/test.js", "cond", "35_42_65", _ref[_$jscmd("test/runners/test.js", "cond", "35_47_55", _$jscmd("test/runners/test.js", "cond", "35_48_21", _ref1 = this.points) != null ? _$jscmd("test/runners/test.js", "cond", "35_80_12", _ref1.length) : _$jscmd("test/runners/test.js", "cond", "35_95_6", void 0)) - 1]) : _$jscmd("test/runners/test.js", "cond", "35_110_6", void 0);
            };
            _$jscmd("test/runners/test.js", "line", 38);
            DragGesture.prototype._onTouchStart = function(ev) {
                _$jscmd("test/runners/test.js", "line", 39);
                this._moved = false;
                _$jscmd("test/runners/test.js", "line", 40);
                this.points = null;
                _$jscmd("test/runners/test.js", "line", 41);
                this.onDragging = true;
                _$jscmd("test/runners/test.js", "line", 42);
                this.points = [ this.getPoint(ev) ];
                _$jscmd("test/runners/test.js", "line", 43);
                return this.onTouchStart(ev);
            };
            _$jscmd("test/runners/test.js", "line", 46);
            DragGesture.prototype._onTouchMove = function(ev) {
                _$jscmd("test/runners/test.js", "line", 47);
                var distance, ex, ey, sx, sy, _ref, _ref1;
                _$jscmd("test/runners/test.js", "line", 48);
                this.onTouchMove(ev);
                if (!this.onDragging) {
                    _$jscmd("test/runners/test.js", "line", 50);
                    return;
                }
                _$jscmd("test/runners/test.js", "line", 52);
                this.points.push(this.getPoint(ev));
                if (this._moved) {
                    _$jscmd("test/runners/test.js", "line", 54);
                    return this.onDrag(ev);
                } else {
                    _$jscmd("test/runners/test.js", "line", 56);
                    _ref = this.firstPoint(), sx = _ref[0], sy = _ref[1];
                    _$jscmd("test/runners/test.js", "line", 57);
                    _ref1 = this.lastPoint(), ex = _ref1[0], ey = _ref1[1];
                    _$jscmd("test/runners/test.js", "line", 58);
                    distance = Math.sqrt(_$jscmd("test/runners/test.js", "cond", "58_27_20", Math.pow(_$jscmd("test/runners/test.js", "cond", "58_36_2", sx) - _$jscmd("test/runners/test.js", "cond", "58_41_2", ey), 2)) + _$jscmd("test/runners/test.js", "cond", "58_50_20", Math.pow(_$jscmd("test/runners/test.js", "cond", "58_59_2", sy) - _$jscmd("test/runners/test.js", "cond", "58_64_2", ey), 2)));
                    if (_$jscmd("test/runners/test.js", "cond", "59_10_8", distance) > _$jscmd("test/runners/test.js", "cond", "59_21_21", this.minimumTouchSize)) {
                        _$jscmd("test/runners/test.js", "line", 60);
                        this._moved = true;
                        _$jscmd("test/runners/test.js", "line", 61);
                        return this.onDragStart(ev);
                    }
                }
            };
            _$jscmd("test/runners/test.js", "line", 66);
            DragGesture.prototype._onTouchEnd = function(ev) {
                if (!this.onDragging) {
                    _$jscmd("test/runners/test.js", "line", 68);
                    return;
                }
                if (!this._moved) {
                    _$jscmd("test/runners/test.js", "line", 71);
                    this.onTouch(ev);
                } else {
                    _$jscmd("test/runners/test.js", "line", 73);
                    this.onDragEnd(ev);
                }
                _$jscmd("test/runners/test.js", "line", 75);
                return this.onDragging = false;
            };
            _$jscmd("test/runners/test.js", "line", 78);
            return DragGesture;
        }(Gesture);
    }, {
        "./gesture": 2
    } ],
    2: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 84);
        var EventEmitter, Gesture, extend, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 85);
            return function() {
                _$jscmd("test/runners/test.js", "line", 85);
                return fn.apply(me, arguments);
            };
        };
        _$jscmd("test/runners/test.js", "line", 87);
        EventEmitter = require("../../utils/event-emitter");
        _$jscmd("test/runners/test.js", "line", 89);
        extend = require("../../utils/extend");
        _$jscmd("test/runners/test.js", "line", 91);
        module.exports = Gesture = function() {
            function Gesture(wb) {
                _$jscmd("test/runners/test.js", "line", 93);
                this.wb = wb;
                _$jscmd("test/runners/test.js", "line", 94);
                this.getPoint = __bind(this.getPoint, this);
                _$jscmd("test/runners/test.js", "line", 95);
                this.paper = this.wb.paper;
            }
            _$jscmd("test/runners/test.js", "line", 98);
            Gesture.prototype.select = function() {
                _$jscmd("test/runners/test.js", "line", 99);
                var _ref;
                _$jscmd("test/runners/test.js", "line", 100);
                return (_ref = Snap(this.wb.svg)).select.apply(_ref, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 103);
            Gesture.prototype.selectAll = function() {
                _$jscmd("test/runners/test.js", "line", 104);
                var _ref;
                _$jscmd("test/runners/test.js", "line", 105);
                return (_ref = Snap(this.wb.svg)).selectAll.apply(_ref, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 108);
            Gesture.prototype.currentLayer = function() {
                _$jscmd("test/runners/test.js", "line", 109);
                return this.wb.layer;
            };
            _$jscmd("test/runners/test.js", "line", 112);
            Gesture.prototype._onTouch = function() {
                _$jscmd("test/runners/test.js", "line", 113);
                return this.onTouch.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 116);
            Gesture.prototype.onTouch = function() {};
            _$jscmd("test/runners/test.js", "line", 118);
            Gesture.prototype._onTouchStart = function() {
                _$jscmd("test/runners/test.js", "line", 119);
                return this.onTouchStart.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 122);
            Gesture.prototype.onTouchStart = function() {};
            _$jscmd("test/runners/test.js", "line", 124);
            Gesture.prototype._onTouchMove = function() {
                _$jscmd("test/runners/test.js", "line", 125);
                return this.onTouchMove.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 128);
            Gesture.prototype.onTouchMove = function() {};
            _$jscmd("test/runners/test.js", "line", 130);
            Gesture.prototype._onTouchEnd = function() {
                _$jscmd("test/runners/test.js", "line", 131);
                return this.onTouchEnd.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 134);
            Gesture.prototype.onTouchEnd = function() {};
            _$jscmd("test/runners/test.js", "line", 136);
            Gesture.prototype._onTouchStart = function() {
                _$jscmd("test/runners/test.js", "line", 137);
                return this.onTouchStart.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 140);
            Gesture.prototype.onTouchStart = function() {};
            _$jscmd("test/runners/test.js", "line", 142);
            Gesture.prototype._onTouchMove = function() {
                _$jscmd("test/runners/test.js", "line", 143);
                return this.onTouchMove.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 146);
            Gesture.prototype.onTouchMove = function() {};
            _$jscmd("test/runners/test.js", "line", 148);
            Gesture.prototype._onTouchEnd = function() {
                _$jscmd("test/runners/test.js", "line", 149);
                return this.onTouchEnd.apply(this, arguments);
            };
            _$jscmd("test/runners/test.js", "line", 152);
            Gesture.prototype.onTouchEnd = function() {};
            _$jscmd("test/runners/test.js", "line", 154);
            Gesture.prototype.dispose = function() {};
            _$jscmd("test/runners/test.js", "line", 156);
            Gesture.prototype.getPoint = function(ev) {
                _$jscmd("test/runners/test.js", "line", 157);
                return [ _$jscmd("test/runners/test.js", "cond", "157_12_10", ev.offsetX) - _$jscmd("test/runners/test.js", "cond", "157_25_15", this.wb.offsetX), _$jscmd("test/runners/test.js", "cond", "157_42_10", ev.offsetY) - _$jscmd("test/runners/test.js", "cond", "157_55_15", this.wb.offsetY) ];
            };
            _$jscmd("test/runners/test.js", "line", 160);
            return Gesture;
        }();
    }, {
        "../../utils/event-emitter": 14,
        "../../utils/extend": 15
    } ],
    3: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 166);
        var CircleDrawingGesture, DragGesture, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 167);
            return function() {
                _$jscmd("test/runners/test.js", "line", 167);
                return fn.apply(me, arguments);
            };
        }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 169);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 169);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 169);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 169);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 169);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 171);
        DragGesture = require("./base/drag-gesture");
        _$jscmd("test/runners/test.js", "line", 173);
        module.exports = CircleDrawingGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 174);
            __extends(CircleDrawingGesture, _super);
            function CircleDrawingGesture() {
                _$jscmd("test/runners/test.js", "line", 177);
                this.onDragEnd = __bind(this.onDragEnd, this);
                _$jscmd("test/runners/test.js", "line", 178);
                this.onDrag = __bind(this.onDrag, this);
                _$jscmd("test/runners/test.js", "line", 179);
                CircleDrawingGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 180);
                this.startPoint = null;
                _$jscmd("test/runners/test.js", "line", 181);
                this.endPoint = null;
            }
            _$jscmd("test/runners/test.js", "line", 184);
            CircleDrawingGesture.prototype.onDrag = function(ev) {
                _$jscmd("test/runners/test.js", "line", 185);
                var circle, ex, ey, r, sx, sy, x, y, _ref, _ref1, _ref2;
                _$jscmd("test/runners/test.js", "line", 186);
                this.endPoint = this.getPoint(ev);
                if (_$jscmd("test/runners/test.js", "cond", "187_8_23", _ref = this.lastShape) != null) {
                    _$jscmd("test/runners/test.js", "line", 188);
                    _ref.remove();
                }
                _$jscmd("test/runners/test.js", "line", 190);
                _ref1 = this.firstPoint(), sx = _ref1[0], sy = _ref1[1];
                _$jscmd("test/runners/test.js", "line", 191);
                _ref2 = this.lastPoint(), ex = _ref2[0], ey = _ref2[1];
                _$jscmd("test/runners/test.js", "line", 192);
                x = sx;
                _$jscmd("test/runners/test.js", "line", 193);
                y = sy;
                _$jscmd("test/runners/test.js", "line", 194);
                r = Math.max(Math.abs(_$jscmd("test/runners/test.js", "cond", "194_26_2", sx) - _$jscmd("test/runners/test.js", "cond", "194_31_2", ex)), Math.abs(_$jscmd("test/runners/test.js", "cond", "194_45_2", sy) - _$jscmd("test/runners/test.js", "cond", "194_50_2", ey)));
                _$jscmd("test/runners/test.js", "line", 195);
                circle = this.currentLayer().circle(x, y, r);
                _$jscmd("test/runners/test.js", "line", 196);
                circle.attr({
                    strokeWidth: 1,
                    stroke: this.wb.strokeColor,
                    fill: this.wb.fillColor
                });
                _$jscmd("test/runners/test.js", "line", 201);
                return this.lastShape = circle;
            };
            _$jscmd("test/runners/test.js", "line", 204);
            CircleDrawingGesture.prototype.onDragEnd = function(ev) {
                _$jscmd("test/runners/test.js", "line", 205);
                this.wb.update();
                _$jscmd("test/runners/test.js", "line", 206);
                return this.lastShape = null;
            };
            _$jscmd("test/runners/test.js", "line", 209);
            return CircleDrawingGesture;
        }(DragGesture);
    }, {
        "./base/drag-gesture": 1
    } ],
    4: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 215);
        var EraserDrawingGesture, Gesture, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 217);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 217);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 217);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 217);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 217);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 219);
        Gesture = require("./base/gesture");
        _$jscmd("test/runners/test.js", "line", 221);
        module.exports = EraserDrawingGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 222);
            __extends(EraserDrawingGesture, _super);
            function EraserDrawingGesture() {
                _$jscmd("test/runners/test.js", "line", 225);
                EraserDrawingGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 226);
                this.eraser = false;
                _$jscmd("test/runners/test.js", "line", 227);
                this.currentLayer().selectAll("*").forEach(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 228);
                    return function($shape) {
                        _$jscmd("test/runners/test.js", "line", 229);
                        return $shape.mousemove(function() {
                            if (_this.eraser) {
                                _$jscmd("test/runners/test.js", "line", 231);
                                return $shape.remove();
                            }
                        });
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 236);
                this.paper.mousedown(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 237);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 238);
                        return _this.eraser = true;
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 241);
                this.paper.mouseup(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 242);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 243);
                        return _this.eraser = false;
                    };
                }(this));
            }
            _$jscmd("test/runners/test.js", "line", 248);
            return EraserDrawingGesture;
        }(Gesture);
    }, {
        "./base/gesture": 2
    } ],
    5: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 254);
        var DragGesture, FreeDrawingGesture, Gesture, pointsToSegments, _simplify, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 255);
            return function() {
                _$jscmd("test/runners/test.js", "line", 255);
                return fn.apply(me, arguments);
            };
        }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 257);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 257);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 257);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 257);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 257);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 259);
        Gesture = require("./base/gesture");
        _$jscmd("test/runners/test.js", "line", 261);
        DragGesture = require("./base/drag-gesture");
        _$jscmd("test/runners/test.js", "line", 263);
        pointsToSegments = require("../utils/utils").pointsToSegments;
        _$jscmd("test/runners/test.js", "line", 265);
        _simplify = function(points, tolelance) {
            _$jscmd("test/runners/test.js", "line", 266);
            return simplify(points.map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 267);
                return function(_arg) {
                    _$jscmd("test/runners/test.js", "line", 268);
                    var x, y;
                    _$jscmd("test/runners/test.js", "line", 269);
                    x = _arg[0], y = _arg[1];
                    _$jscmd("test/runners/test.js", "line", 270);
                    return {
                        x: x,
                        y: y
                    };
                };
            }(this)), tolelance, false).map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 276);
                return function(_arg) {
                    _$jscmd("test/runners/test.js", "line", 277);
                    var x, y;
                    _$jscmd("test/runners/test.js", "line", 278);
                    x = _arg.x, y = _arg.y;
                    _$jscmd("test/runners/test.js", "line", 279);
                    return [ x, y ];
                };
            }(this));
        };
        _$jscmd("test/runners/test.js", "line", 284);
        module.exports = FreeDrawingGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 285);
            __extends(FreeDrawingGesture, _super);
            function FreeDrawingGesture() {
                _$jscmd("test/runners/test.js", "line", 288);
                this.onDragEnd = __bind(this.onDragEnd, this);
                _$jscmd("test/runners/test.js", "line", 289);
                this.onDrag = __bind(this.onDrag, this);
                _$jscmd("test/runners/test.js", "line", 290);
                this.onDragStart = __bind(this.onDragStart, this);
                _$jscmd("test/runners/test.js", "line", 291);
                return FreeDrawingGesture.__super__.constructor.apply(this, arguments);
            }
            _$jscmd("test/runners/test.js", "line", 294);
            FreeDrawingGesture.prototype.onDragStart = function(ev) {
                _$jscmd("test/runners/test.js", "line", 295);
                return this.lastPath = null;
            };
            _$jscmd("test/runners/test.js", "line", 298);
            FreeDrawingGesture.prototype.onDrag = function(ev) {
                _$jscmd("test/runners/test.js", "line", 299);
                var segs, _ref;
                if (_$jscmd("test/runners/test.js", "cond", "300_8_22", _ref = this.lastPath) != null) {
                    _$jscmd("test/runners/test.js", "line", 301);
                    _ref.remove();
                }
                _$jscmd("test/runners/test.js", "line", 303);
                segs = pointsToSegments(this.points);
                _$jscmd("test/runners/test.js", "line", 304);
                return this.lastPath = this.currentLayer().path({
                    path: segs,
                    fill: "none",
                    stroke: this.wb.strokeColor,
                    fill: this.wb.fillColor,
                    strokeWidth: 1
                });
            };
            _$jscmd("test/runners/test.js", "line", 313);
            FreeDrawingGesture.prototype.onDragEnd = function(ev) {
                _$jscmd("test/runners/test.js", "line", 314);
                var segs, _ref;
                if (_$jscmd("test/runners/test.js", "cond", "315_8_22", _ref = this.lastPath) != null) {
                    _$jscmd("test/runners/test.js", "line", 316);
                    _ref.remove();
                }
                _$jscmd("test/runners/test.js", "line", 318);
                segs = pointsToSegments(_simplify(this.points));
                _$jscmd("test/runners/test.js", "line", 319);
                this.currentLayer().path({
                    path: segs,
                    fill: "none",
                    stroke: this.wb.strokeColor,
                    fill: this.wb.fillColor,
                    strokeWidth: 1
                });
                _$jscmd("test/runners/test.js", "line", 326);
                return this.wb.update();
            };
            _$jscmd("test/runners/test.js", "line", 329);
            return FreeDrawingGesture;
        }(DragGesture);
    }, {
        "../utils/utils": 16,
        "./base/drag-gesture": 1,
        "./base/gesture": 2
    } ],
    6: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 335);
        var CircleOperation, Gesture, GrabGesture, PathOperation, RectOperation, adjustToNearPoint, pathToPoints, pointsToSegments, segementsToPoints, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 337);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 337);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 337);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 337);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 337);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 339);
        Gesture = require("./base/gesture");
        _$jscmd("test/runners/test.js", "line", 341);
        RectOperation = require("../operations/rect");
        _$jscmd("test/runners/test.js", "line", 343);
        PathOperation = require("../operations/path");
        _$jscmd("test/runners/test.js", "line", 345);
        CircleOperation = require("../operations/circle");
        _$jscmd("test/runners/test.js", "line", 347);
        _ref = require("../utils/utils"), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, 
        adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;
        _$jscmd("test/runners/test.js", "line", 349);
        module.exports = GrabGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 350);
            __extends(GrabGesture, _super);
            function GrabGesture() {
                _$jscmd("test/runners/test.js", "line", 353);
                GrabGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 354);
                this.disposers = [];
                _$jscmd("test/runners/test.js", "line", 355);
                this.$shapes = this.currentLayer().selectAll("*");
                _$jscmd("test/runners/test.js", "line", 356);
                this.$shapes.forEach(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 357);
                    return function($shape) {
                        _$jscmd("test/runners/test.js", "line", 358);
                        var Operation;
                        _$jscmd("test/runners/test.js", "line", 359);
                        Operation = _this.getOperationByType($shape.type);
                        if (!Operation) {
                            _$jscmd("test/runners/test.js", "line", 361);
                            return;
                        }
                        _$jscmd("test/runners/test.js", "line", 363);
                        return _this.disposers.push(Operation.watch($shape, _this.wb));
                    };
                }(this));
            }
            _$jscmd("test/runners/test.js", "line", 368);
            GrabGesture.prototype.getOperationByType = function(type) {
                switch (type) {
                  case "path":
                    _$jscmd("test/runners/test.js", "line", 371);
                    return PathOperation;

                  case "rect":
                    _$jscmd("test/runners/test.js", "line", 373);
                    return RectOperation;

                  case "circle":
                    _$jscmd("test/runners/test.js", "line", 375);
                    return CircleOperation;
                }
            };
            _$jscmd("test/runners/test.js", "line", 379);
            GrabGesture.prototype.focus = function($shape) {
                _$jscmd("test/runners/test.js", "line", 380);
                return this.getOperationByType($shape.type).focus($shape, this.wb);
            };
            _$jscmd("test/runners/test.js", "line", 383);
            GrabGesture.prototype.dispose = function() {
                _$jscmd("test/runners/test.js", "line", 384);
                var d, _results;
                if (_$jscmd("test/runners/test.js", "cond", "385_8_24", typeof this.disposeFocus) === "function") {
                    _$jscmd("test/runners/test.js", "line", 386);
                    this.disposeFocus();
                }
                _$jscmd("test/runners/test.js", "line", 388);
                this.$shapes.forEach(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 389);
                    return function($path) {
                        _$jscmd("test/runners/test.js", "line", 390);
                        $path.unclick();
                        _$jscmd("test/runners/test.js", "line", 391);
                        return $path.undrag();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 394);
                this.wb.clearUI();
                _$jscmd("test/runners/test.js", "line", 395);
                this.wb.paper.undrag();
                _$jscmd("test/runners/test.js", "line", 396);
                this.wb.paper.unclick();
                _$jscmd("test/runners/test.js", "line", 397);
                _results = [];
                while (d = this.disposers.shift()) {
                    _$jscmd("test/runners/test.js", "line", 399);
                    _results.push(d());
                }
                _$jscmd("test/runners/test.js", "line", 401);
                return _results;
            };
            _$jscmd("test/runners/test.js", "line", 404);
            return GrabGesture;
        }(Gesture);
    }, {
        "../operations/circle": 10,
        "../operations/path": 11,
        "../operations/rect": 12,
        "../utils/utils": 16,
        "./base/gesture": 2
    } ],
    7: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 410);
        var DragGesture, Gesture, LineDrawingGesture, getNearPoint, getPathPositions, pointsToSegments, segementsToPoints, showAnchorsToShape, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 412);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 412);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 412);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 412);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 412);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 414);
        DragGesture = require("./base/drag-gesture");
        _$jscmd("test/runners/test.js", "line", 416);
        Gesture = require("./base/gesture");
        _$jscmd("test/runners/test.js", "line", 418);
        _ref = require("../utils/utils"), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints;
        _$jscmd("test/runners/test.js", "line", 420);
        getPathPositions = function($group) {
            _$jscmd("test/runners/test.js", "line", 421);
            var points;
            _$jscmd("test/runners/test.js", "line", 422);
            points = [];
            _$jscmd("test/runners/test.js", "line", 423);
            $group.selectAll("path").forEach(function(_this) {
                _$jscmd("test/runners/test.js", "line", 424);
                return function($path) {
                    _$jscmd("test/runners/test.js", "line", 425);
                    var ps, segments;
                    _$jscmd("test/runners/test.js", "line", 426);
                    segments = Snap.parsePathString($path.attr("d"));
                    _$jscmd("test/runners/test.js", "line", 427);
                    ps = segementsToPoints(segments);
                    _$jscmd("test/runners/test.js", "line", 428);
                    points.push(_.first(ps).concat($path));
                    _$jscmd("test/runners/test.js", "line", 429);
                    return points.push(_.last(ps).concat($path));
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 432);
            return points;
        };
        _$jscmd("test/runners/test.js", "line", 435);
        getNearPoint = function(_arg, points, force) {
            _$jscmd("test/runners/test.js", "line", 436);
            var costs, minCost, minIndex, sx, sy, _ref1;
            _$jscmd("test/runners/test.js", "line", 437);
            sx = _arg[0], sy = _arg[1];
            if (_$jscmd("test/runners/test.js", "cond", "438_6_5", force) == null) {
                _$jscmd("test/runners/test.js", "line", 439);
                force = 10;
            }
            if (_$jscmd("test/runners/test.js", "cond", "441_6_13", points.length) === 0) {
                _$jscmd("test/runners/test.js", "line", 442);
                return null;
            }
            _$jscmd("test/runners/test.js", "line", 444);
            costs = points.map(function(_arg1, index) {
                _$jscmd("test/runners/test.js", "line", 445);
                var x, y;
                _$jscmd("test/runners/test.js", "line", 446);
                x = _arg1[0], y = _arg1[1];
                _$jscmd("test/runners/test.js", "line", 447);
                return _$jscmd("test/runners/test.js", "cond", "447_11_16", Math.abs(_$jscmd("test/runners/test.js", "cond", "447_20_2", sx) - _$jscmd("test/runners/test.js", "cond", "447_25_1", x))) + _$jscmd("test/runners/test.js", "cond", "447_30_16", Math.abs(_$jscmd("test/runners/test.js", "cond", "447_39_2", sy) - _$jscmd("test/runners/test.js", "cond", "447_44_1", y)));
            });
            _$jscmd("test/runners/test.js", "line", 449);
            _ref1 = costs.reduce(function(_arg1, cost, index) {
                _$jscmd("test/runners/test.js", "line", 450);
                var minCost, minIndex;
                _$jscmd("test/runners/test.js", "line", 451);
                minIndex = _arg1[0], minCost = _arg1[1];
                if (_$jscmd("test/runners/test.js", "cond", "452_8_7", minCost) > _$jscmd("test/runners/test.js", "cond", "452_18_4", cost)) {
                    _$jscmd("test/runners/test.js", "line", 453);
                    return [ index, cost ];
                } else {
                    _$jscmd("test/runners/test.js", "line", 455);
                    return [ minIndex, minCost ];
                }
            }, [ 0, costs[0] ]), minIndex = _ref1[0], minCost = _ref1[1];
            if (_$jscmd("test/runners/test.js", "cond", "458_6_7", minCost) <= 10) {
                _$jscmd("test/runners/test.js", "line", 459);
                return points[minIndex].concat(minIndex);
            } else {
                _$jscmd("test/runners/test.js", "line", 461);
                return null;
            }
        };
        _$jscmd("test/runners/test.js", "line", 465);
        showAnchorsToShape = function(shape, wb) {
            _$jscmd("test/runners/test.js", "line", 466);
            var points, segs;
            _$jscmd("test/runners/test.js", "line", 467);
            segs = Snap.parsePathString(shape.attr("d"));
            _$jscmd("test/runners/test.js", "line", 468);
            points = segementsToPoints(segs);
            _$jscmd("test/runners/test.js", "line", 469);
            return points.map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 470);
                return function(_arg) {
                    _$jscmd("test/runners/test.js", "line", 471);
                    var $circle, x, y;
                    _$jscmd("test/runners/test.js", "line", 472);
                    x = _arg[0], y = _arg[1];
                    _$jscmd("test/runners/test.js", "line", 473);
                    $circle = wb.ui.circle({
                        cx: x,
                        cy: y,
                        r: 8,
                        fill: "transparent",
                        stroke: "blue",
                        opacity: .86
                    });
                    _$jscmd("test/runners/test.js", "line", 481);
                    $circle.mousemove(function() {
                        _$jscmd("test/runners/test.js", "line", 482);
                        return $circle.attr("stroke", "red");
                    });
                    _$jscmd("test/runners/test.js", "line", 484);
                    return $circle.mouseout(function() {
                        _$jscmd("test/runners/test.js", "line", 485);
                        return $circle.attr("stroke", "blue");
                    });
                };
            }(this));
        };
        _$jscmd("test/runners/test.js", "line", 491);
        module.exports = LineDrawingGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 492);
            __extends(LineDrawingGesture, _super);
            _$jscmd("test/runners/test.js", "line", 494);
            LineDrawingGesture.prototype.dispose = function() {
                _$jscmd("test/runners/test.js", "line", 495);
                return this.paper.undrag();
            };
            function LineDrawingGesture() {
                _$jscmd("test/runners/test.js", "line", 499);
                var ex, ey, fromShape, mode, pathArray, points, sx, sy;
                _$jscmd("test/runners/test.js", "line", 500);
                LineDrawingGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 501);
                this.nearPoints = getPathPositions(this.currentLayer());
                _$jscmd("test/runners/test.js", "line", 502);
                sx = null;
                _$jscmd("test/runners/test.js", "line", 503);
                sy = null;
                _$jscmd("test/runners/test.js", "line", 504);
                ex = null;
                _$jscmd("test/runners/test.js", "line", 505);
                ey = null;
                _$jscmd("test/runners/test.js", "line", 506);
                mode = "";
                _$jscmd("test/runners/test.js", "line", 507);
                pathArray = null;
                _$jscmd("test/runners/test.js", "line", 508);
                fromShape = null;
                _$jscmd("test/runners/test.js", "line", 509);
                points = null;
                _$jscmd("test/runners/test.js", "line", 510);
                this.paper.drag(function(_this) {
                    _$jscmd("test/runners/test.js", "line", 511);
                    return function(dx, dy, x, y, event) {
                        _$jscmd("test/runners/test.js", "line", 512);
                        var p, segs, _ref1, _ref2;
                        _$jscmd("test/runners/test.js", "line", 513);
                        console.log("line draging", dx, dy, x, y);
                        _$jscmd("test/runners/test.js", "line", 514);
                        segs = null;
                        _$jscmd("test/runners/test.js", "line", 515);
                        _ref1 = [ _$jscmd("test/runners/test.js", "cond", "515_17_2", dx) + _$jscmd("test/runners/test.js", "cond", "515_22_2", sx), _$jscmd("test/runners/test.js", "cond", "515_26_2", dy) + _$jscmd("test/runners/test.js", "cond", "515_31_2", sy) ], 
                        ex = _ref1[0], ey = _ref1[1];
                        if (p = getNearPoint([ ex, ey ], _this.nearPoints)) {
                            _$jscmd("test/runners/test.js", "line", 517);
                            ex = p[0], ey = p[1];
                        }
                        if (_$jscmd("test/runners/test.js", "cond", "519_12_4", mode) === "isolate") {
                            _$jscmd("test/runners/test.js", "line", 520);
                            segs = pointsToSegments([ [ sx, sy ], [ ex, ey ] ]);
                        } else if (_$jscmd("test/runners/test.js", "cond", "521_19_4", mode) === "tail") {
                            if (_$jscmd("test/runners/test.js", "cond", "522_14_9", fromShape) != null) {
                                _$jscmd("test/runners/test.js", "line", 523);
                                fromShape.remove();
                            }
                            _$jscmd("test/runners/test.js", "line", 525);
                            fromShape = null;
                            _$jscmd("test/runners/test.js", "line", 526);
                            segs = pointsToSegments(points.concat([ [ ex, ey ] ]));
                        } else if (_$jscmd("test/runners/test.js", "cond", "527_19_4", mode) === "head") {
                            if (_$jscmd("test/runners/test.js", "cond", "528_14_9", fromShape) != null) {
                                _$jscmd("test/runners/test.js", "line", 529);
                                fromShape.remove();
                            }
                            _$jscmd("test/runners/test.js", "line", 531);
                            fromShape = null;
                            _$jscmd("test/runners/test.js", "line", 532);
                            segs = pointsToSegments([ [ ex, ey ] ].concat(points));
                        }
                        if (_$jscmd("test/runners/test.js", "cond", "534_12_25", _ref2 = _this.lastShape) != null) {
                            _$jscmd("test/runners/test.js", "line", 535);
                            _ref2.remove();
                        }
                        _$jscmd("test/runners/test.js", "line", 537);
                        return _this.lastShape = _this.currentLayer().path({
                            path: segs,
                            stroke: _this.wb.strokeColor,
                            fill: _this.wb.fillColor,
                            strokeWidth: 1
                        });
                    };
                }(this), function(_this) {
                    _$jscmd("test/runners/test.js", "line", 545);
                    return function(x, y, event) {
                        _$jscmd("test/runners/test.js", "line", 546);
                        var last_x, last_y, p, segs, _ref1;
                        _$jscmd("test/runners/test.js", "line", 547);
                        console.log("line drag start", x, y);
                        _$jscmd("test/runners/test.js", "line", 548);
                        sx = event.offsetX;
                        _$jscmd("test/runners/test.js", "line", 549);
                        sy = event.offsetY;
                        if (p = getNearPoint([ sx, sy ], _this.nearPoints)) {
                            _$jscmd("test/runners/test.js", "line", 551);
                            sx = p[0], sy = p[1], fromShape = p[2];
                            _$jscmd("test/runners/test.js", "line", 552);
                            segs = Snap.parsePathString(fromShape.attr("d"));
                            _$jscmd("test/runners/test.js", "line", 553);
                            points = segementsToPoints(segs);
                            _$jscmd("test/runners/test.js", "line", 554);
                            _ref1 = _.last(points), last_x = _ref1[0], last_y = _ref1[1];
                            if (_$jscmd("test/runners/test.js", "cond", "555_14_13", _$jscmd("test/runners/test.js", "cond", "555_14_6", last_x) === _$jscmd("test/runners/test.js", "cond", "555_25_2", sx)) && _$jscmd("test/runners/test.js", "cond", "555_31_13", _$jscmd("test/runners/test.js", "cond", "555_31_6", last_y) === _$jscmd("test/runners/test.js", "cond", "555_42_2", sy))) {
                                _$jscmd("test/runners/test.js", "line", 556);
                                return mode = "tail";
                            } else {
                                _$jscmd("test/runners/test.js", "line", 558);
                                return mode = "head";
                            }
                        } else {
                            _$jscmd("test/runners/test.js", "line", 561);
                            return mode = "isolate";
                        }
                    };
                }(this), function(_this) {
                    _$jscmd("test/runners/test.js", "line", 565);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 566);
                        _this.nearPoints = getPathPositions(_this.currentLayer());
                        _$jscmd("test/runners/test.js", "line", 567);
                        showAnchorsToShape(_this.lastShape, _this.wb);
                        _$jscmd("test/runners/test.js", "line", 568);
                        return _this.lastShape = null;
                    };
                }(this));
            }
            _$jscmd("test/runners/test.js", "line", 573);
            return LineDrawingGesture;
        }(Gesture);
    }, {
        "../utils/utils": 16,
        "./base/drag-gesture": 1,
        "./base/gesture": 2
    } ],
    8: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 579);
        var DragGesture, RectDrawingGesture, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 580);
            return function() {
                _$jscmd("test/runners/test.js", "line", 580);
                return fn.apply(me, arguments);
            };
        }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                _$jscmd("test/runners/test.js", "line", 582);
                this.constructor = child;
            }
            _$jscmd("test/runners/test.js", "line", 582);
            ctor.prototype = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 582);
            child.prototype = new ctor();
            _$jscmd("test/runners/test.js", "line", 582);
            child.__super__ = parent.prototype;
            _$jscmd("test/runners/test.js", "line", 582);
            return child;
        };
        _$jscmd("test/runners/test.js", "line", 584);
        DragGesture = require("./base/drag-gesture");
        _$jscmd("test/runners/test.js", "line", 586);
        module.exports = RectDrawingGesture = function(_super) {
            _$jscmd("test/runners/test.js", "line", 587);
            __extends(RectDrawingGesture, _super);
            function RectDrawingGesture() {
                _$jscmd("test/runners/test.js", "line", 590);
                this.onDragEnd = __bind(this.onDragEnd, this);
                _$jscmd("test/runners/test.js", "line", 591);
                this.onDrag = __bind(this.onDrag, this);
                _$jscmd("test/runners/test.js", "line", 592);
                this.onDragStart = __bind(this.onDragStart, this);
                _$jscmd("test/runners/test.js", "line", 593);
                RectDrawingGesture.__super__.constructor.apply(this, arguments);
                _$jscmd("test/runners/test.js", "line", 594);
                this.startPoint = null;
                _$jscmd("test/runners/test.js", "line", 595);
                this.endPoint = null;
                _$jscmd("test/runners/test.js", "line", 596);
                this.lastShape = null;
            }
            _$jscmd("test/runners/test.js", "line", 599);
            RectDrawingGesture.prototype.onDragStart = function(ev) {
                _$jscmd("test/runners/test.js", "line", 600);
                return this.lastShape = null;
            };
            _$jscmd("test/runners/test.js", "line", 603);
            RectDrawingGesture.prototype.onDrag = function(ev) {
                _$jscmd("test/runners/test.js", "line", 604);
                var ex, ey, h, rect, sx, sy, w, x, y, _ref, _ref1, _ref2;
                if (_$jscmd("test/runners/test.js", "cond", "605_8_23", _ref = this.lastShape) != null) {
                    _$jscmd("test/runners/test.js", "line", 606);
                    _ref.remove();
                }
                _$jscmd("test/runners/test.js", "line", 608);
                _ref1 = this.firstPoint(), sx = _ref1[0], sy = _ref1[1];
                _$jscmd("test/runners/test.js", "line", 609);
                _ref2 = this.lastPoint(), ex = _ref2[0], ey = _ref2[1];
                _$jscmd("test/runners/test.js", "line", 610);
                x = Math.min(sx, ex);
                _$jscmd("test/runners/test.js", "line", 611);
                y = Math.min(sy, ey);
                _$jscmd("test/runners/test.js", "line", 612);
                w = Math.abs(_$jscmd("test/runners/test.js", "cond", "612_17_2", sx) - _$jscmd("test/runners/test.js", "cond", "612_22_2", ex));
                _$jscmd("test/runners/test.js", "line", 613);
                h = Math.abs(_$jscmd("test/runners/test.js", "cond", "613_17_2", sy) - _$jscmd("test/runners/test.js", "cond", "613_22_2", ey));
                _$jscmd("test/runners/test.js", "line", 614);
                rect = this.currentLayer().rect(x, y, w, h);
                _$jscmd("test/runners/test.js", "line", 615);
                rect.attr({
                    stroke: this.wb.strokeColor,
                    fill: this.wb.fillColor,
                    strokeWidth: 1
                });
                _$jscmd("test/runners/test.js", "line", 620);
                return this.lastShape = rect;
            };
            _$jscmd("test/runners/test.js", "line", 623);
            RectDrawingGesture.prototype.onDragEnd = function(ev) {
                _$jscmd("test/runners/test.js", "line", 624);
                this.wb.update();
                _$jscmd("test/runners/test.js", "line", 625);
                this.wb.setMode("grab");
                _$jscmd("test/runners/test.js", "line", 626);
                this.wb._gesture.focus(this.lastShape);
                _$jscmd("test/runners/test.js", "line", 627);
                return this.lastShape = null;
            };
            _$jscmd("test/runners/test.js", "line", 630);
            return RectDrawingGesture;
        }(DragGesture);
    }, {
        "./base/drag-gesture": 1
    } ],
    9: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 636);
        var HistoryManager;
        _$jscmd("test/runners/test.js", "line", 638);
        module.exports = HistoryManager = function() {
            _$jscmd("test/runners/test.js", "line", 639);
            var MAX_HISTORY;
            _$jscmd("test/runners/test.js", "line", 641);
            MAX_HISTORY = 10;
            function HistoryManager(wb) {
                _$jscmd("test/runners/test.js", "line", 644);
                this.wb = wb;
                _$jscmd("test/runners/test.js", "line", 645);
                this.hist = [ "" ];
                _$jscmd("test/runners/test.js", "line", 646);
                this.future = [];
            }
            _$jscmd("test/runners/test.js", "line", 649);
            HistoryManager.prototype.current = function() {
                _$jscmd("test/runners/test.js", "line", 650);
                return this.hist[0];
            };
            _$jscmd("test/runners/test.js", "line", 653);
            HistoryManager.prototype.pushHistory = function(svg) {
                _$jscmd("test/runners/test.js", "line", 654);
                this.future = [];
                _$jscmd("test/runners/test.js", "line", 655);
                this.hist.unshift(svg);
                if (_$jscmd("test/runners/test.js", "cond", "656_8_16", this.hist.length) > _$jscmd("test/runners/test.js", "cond", "656_27_11", MAX_HISTORY)) {
                    _$jscmd("test/runners/test.js", "line", 657);
                    return this.hist.pop();
                }
            };
            _$jscmd("test/runners/test.js", "line", 661);
            HistoryManager.prototype.undo = function() {
                _$jscmd("test/runners/test.js", "line", 662);
                var head;
                if (_$jscmd("test/runners/test.js", "cond", "663_8_16", this.hist.length) === 0) {
                    _$jscmd("test/runners/test.js", "line", 664);
                    return;
                }
                _$jscmd("test/runners/test.js", "line", 666);
                head = this.hist.shift();
                _$jscmd("test/runners/test.js", "line", 667);
                this.future.unshift(head);
                if (_$jscmd("test/runners/test.js", "cond", "668_8_18", this.future.length) > _$jscmd("test/runners/test.js", "cond", "668_29_11", MAX_HISTORY)) {
                    _$jscmd("test/runners/test.js", "line", 669);
                    return this.future.pop();
                }
            };
            _$jscmd("test/runners/test.js", "line", 673);
            HistoryManager.prototype.redo = function() {
                _$jscmd("test/runners/test.js", "line", 674);
                var next;
                if (_$jscmd("test/runners/test.js", "cond", "675_8_18", this.future.length) === 0) {
                    _$jscmd("test/runners/test.js", "line", 676);
                    return;
                }
                _$jscmd("test/runners/test.js", "line", 678);
                next = this.future.shift();
                _$jscmd("test/runners/test.js", "line", 679);
                return this.hist.unshift(next);
            };
            _$jscmd("test/runners/test.js", "line", 682);
            return HistoryManager;
        }();
    }, {} ],
    10: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 688);
        var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;
        _$jscmd("test/runners/test.js", "line", 690);
        _ref = require("../utils/utils"), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, 
        adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;
        _$jscmd("test/runners/test.js", "line", 692);
        int = parseInt;
        _$jscmd("test/runners/test.js", "line", 694);
        focus = function($path, wb) {
            _$jscmd("test/runners/test.js", "line", 695);
            return function() {};
        };
        _$jscmd("test/runners/test.js", "line", 698);
        watch = function($circle, wb) {
            _$jscmd("test/runners/test.js", "line", 699);
            var cx, cy, disposeFocus, _ref1;
            _$jscmd("test/runners/test.js", "line", 700);
            wb.paper.mousedown(function(_this) {
                _$jscmd("test/runners/test.js", "line", 701);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 702);
                    return wb.clearUI();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 705);
            disposeFocus = null;
            _$jscmd("test/runners/test.js", "line", 706);
            $circle.click(function(_this) {
                _$jscmd("test/runners/test.js", "line", 707);
                return function() {
                    _$jscmd("test/runners/test.js", "line", 708);
                    wb.clearUI();
                    if (_$jscmd("test/runners/test.js", "cond", "709_10_19", typeof disposeFocus) === "function") {
                        _$jscmd("test/runners/test.js", "line", 710);
                        disposeFocus();
                    }
                    _$jscmd("test/runners/test.js", "line", 712);
                    return disposeFocus = focus($circle, wb);
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 715);
            _ref1 = [], cx = _ref1[0], cy = _ref1[1];
            _$jscmd("test/runners/test.js", "line", 716);
            $circle.drag(function(_this) {
                _$jscmd("test/runners/test.js", "line", 717);
                return function(dx, dy) {
                    _$jscmd("test/runners/test.js", "line", 718);
                    var rx, ry;
                    _$jscmd("test/runners/test.js", "line", 719);
                    rx = _$jscmd("test/runners/test.js", "cond", "719_11_2", cx) + _$jscmd("test/runners/test.js", "cond", "719_16_2", dx);
                    _$jscmd("test/runners/test.js", "line", 720);
                    ry = _$jscmd("test/runners/test.js", "cond", "720_11_2", cy) + _$jscmd("test/runners/test.js", "cond", "720_16_2", dy);
                    _$jscmd("test/runners/test.js", "line", 721);
                    return $circle.attr({
                        cx: rx,
                        cy: ry
                    });
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 727);
                return function(dx, dy, ev) {
                    _$jscmd("test/runners/test.js", "line", 728);
                    cx = int($circle.attr("cx"));
                    _$jscmd("test/runners/test.js", "line", 729);
                    cy = int($circle.attr("cy"));
                    _$jscmd("test/runners/test.js", "line", 730);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 731);
                    return false;
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 734);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 735);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 736);
                    return wb.update();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 739);
            return function() {
                _$jscmd("test/runners/test.js", "line", 740);
                wb.paper.unmousedown();
                if (_$jscmd("test/runners/test.js", "cond", "741_8_19", typeof disposeFocus) === "function") {
                    _$jscmd("test/runners/test.js", "line", 742);
                    disposeFocus();
                }
                _$jscmd("test/runners/test.js", "line", 744);
                $circle.undrag();
                _$jscmd("test/runners/test.js", "line", 745);
                return $circle.unclick();
            };
        };
        _$jscmd("test/runners/test.js", "line", 749);
        module.exports = {
            watch: watch,
            focus: focus
        };
    }, {
        "../utils/utils": 16
    } ],
    11: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 756);
        var adjustToNearPoint, focus, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;
        _$jscmd("test/runners/test.js", "line", 758);
        _ref = require("../utils/utils"), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, 
        adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;
        _$jscmd("test/runners/test.js", "line", 760);
        focus = function($path, wb) {
            _$jscmd("test/runners/test.js", "line", 761);
            var $points, points;
            _$jscmd("test/runners/test.js", "line", 762);
            points = pathToPoints($path);
            _$jscmd("test/runners/test.js", "line", 763);
            $points = points.map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 764);
                return function(_arg, index) {
                    _$jscmd("test/runners/test.js", "line", 765);
                    var $circle, lx, ly, sx, sy;
                    _$jscmd("test/runners/test.js", "line", 766);
                    sx = _arg[0], sy = _arg[1];
                    _$jscmd("test/runners/test.js", "line", 767);
                    $circle = wb.ui.circle({
                        cx: sx,
                        cy: sy,
                        fill: "transparent",
                        stroke: "blue",
                        r: 6
                    });
                    _$jscmd("test/runners/test.js", "line", 774);
                    lx = sx;
                    _$jscmd("test/runners/test.js", "line", 775);
                    ly = sy;
                    _$jscmd("test/runners/test.js", "line", 776);
                    $circle.drag(function(dx, dy) {
                        _$jscmd("test/runners/test.js", "line", 777);
                        var rx, ry, segs;
                        _$jscmd("test/runners/test.js", "line", 778);
                        rx = _$jscmd("test/runners/test.js", "cond", "778_13_2", lx) + _$jscmd("test/runners/test.js", "cond", "778_18_2", dx);
                        _$jscmd("test/runners/test.js", "line", 779);
                        ry = _$jscmd("test/runners/test.js", "cond", "779_13_2", ly) + _$jscmd("test/runners/test.js", "cond", "779_18_2", dy);
                        _$jscmd("test/runners/test.js", "line", 780);
                        points[index] = [ rx, ry ];
                        _$jscmd("test/runners/test.js", "line", 781);
                        segs = pointsToSegments(points);
                        _$jscmd("test/runners/test.js", "line", 782);
                        $path.attr("d", segs);
                        _$jscmd("test/runners/test.js", "line", 783);
                        $circle.attr({
                            cx: rx,
                            cy: ry
                        });
                        _$jscmd("test/runners/test.js", "line", 787);
                        return false;
                    }, function(x, y, ev) {
                        _$jscmd("test/runners/test.js", "line", 789);
                        var _ref1;
                        _$jscmd("test/runners/test.js", "line", 790);
                        _ref1 = points[index], lx = _ref1[0], ly = _ref1[1];
                        _$jscmd("test/runners/test.js", "line", 791);
                        ev.stopPropagation();
                        _$jscmd("test/runners/test.js", "line", 792);
                        return false;
                    }, function(ev) {
                        _$jscmd("test/runners/test.js", "line", 794);
                        ev.stopPropagation();
                        _$jscmd("test/runners/test.js", "line", 795);
                        return wb.update();
                    });
                    _$jscmd("test/runners/test.js", "line", 797);
                    return $circle;
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 800);
            return function() {
                _$jscmd("test/runners/test.js", "line", 801);
                var $p, _i, _len, _results;
                _$jscmd("test/runners/test.js", "line", 802);
                wb.paper.unmousedown();
                _$jscmd("test/runners/test.js", "line", 803);
                _results = [];
                for (_i = 0, _len = $points.length; _$jscmd("test/runners/test.js", "cond", "804_40_2", _i) < _$jscmd("test/runners/test.js", "cond", "804_45_4", _len); _i++) {
                    _$jscmd("test/runners/test.js", "line", 805);
                    $p = $points[_i];
                    _$jscmd("test/runners/test.js", "line", 806);
                    _results.push($p.remove());
                }
                _$jscmd("test/runners/test.js", "line", 808);
                return _results;
            };
        };
        _$jscmd("test/runners/test.js", "line", 812);
        watch = function($path, wb) {
            _$jscmd("test/runners/test.js", "line", 813);
            var disposeFocus, lx, ly, points, segs, _ref1, _type;
            _$jscmd("test/runners/test.js", "line", 814);
            points = pathToPoints($path);
            _$jscmd("test/runners/test.js", "line", 815);
            wb.paper.mousedown(function(_this) {
                _$jscmd("test/runners/test.js", "line", 816);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 817);
                    return wb.clearUI();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 820);
            disposeFocus = null;
            _$jscmd("test/runners/test.js", "line", 821);
            $path.click(function(_this) {
                _$jscmd("test/runners/test.js", "line", 822);
                return function() {
                    _$jscmd("test/runners/test.js", "line", 823);
                    wb.clearUI();
                    if (_$jscmd("test/runners/test.js", "cond", "824_10_19", typeof disposeFocus) === "function") {
                        _$jscmd("test/runners/test.js", "line", 825);
                        disposeFocus();
                    }
                    _$jscmd("test/runners/test.js", "line", 827);
                    return disposeFocus = focus($path, wb);
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 830);
            segs = null;
            _$jscmd("test/runners/test.js", "line", 831);
            _ref1 = [], _type = _ref1[0], lx = _ref1[1], ly = _ref1[2];
            _$jscmd("test/runners/test.js", "line", 832);
            $path.drag(function(_this) {
                _$jscmd("test/runners/test.js", "line", 833);
                return function(dx, dy) {
                    _$jscmd("test/runners/test.js", "line", 834);
                    var rx, ry;
                    _$jscmd("test/runners/test.js", "line", 835);
                    rx = _$jscmd("test/runners/test.js", "cond", "835_11_2", lx) + _$jscmd("test/runners/test.js", "cond", "835_16_2", dx);
                    _$jscmd("test/runners/test.js", "line", 836);
                    ry = _$jscmd("test/runners/test.js", "cond", "836_11_2", ly) + _$jscmd("test/runners/test.js", "cond", "836_16_2", dy);
                    _$jscmd("test/runners/test.js", "line", 837);
                    segs[0] = [ "M", rx, ry ];
                    _$jscmd("test/runners/test.js", "line", 838);
                    return $path.attr("d", segs);
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 841);
                return function(dx, dy, ev) {
                    _$jscmd("test/runners/test.js", "line", 842);
                    var _ref2;
                    _$jscmd("test/runners/test.js", "line", 843);
                    segs = Snap.parsePathString($path.attr("d"));
                    _$jscmd("test/runners/test.js", "line", 844);
                    _ref2 = segs[0], _type = _ref2[0], lx = _ref2[1], ly = _ref2[2];
                    _$jscmd("test/runners/test.js", "line", 845);
                    wb.clearUI();
                    _$jscmd("test/runners/test.js", "line", 846);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 847);
                    return false;
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 850);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 851);
                    points = segementsToPoints(segs);
                    _$jscmd("test/runners/test.js", "line", 852);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 853);
                    return wb.update();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 856);
            return function() {
                _$jscmd("test/runners/test.js", "line", 857);
                wb.paper.unmousedown();
                if (_$jscmd("test/runners/test.js", "cond", "858_8_19", typeof disposeFocus) === "function") {
                    _$jscmd("test/runners/test.js", "line", 859);
                    disposeFocus();
                }
                _$jscmd("test/runners/test.js", "line", 861);
                $path.undrag();
                _$jscmd("test/runners/test.js", "line", 862);
                return $path.unclick();
            };
        };
        _$jscmd("test/runners/test.js", "line", 866);
        module.exports = {
            watch: watch,
            focus: focus
        };
    }, {
        "../utils/utils": 16
    } ],
    12: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 873);
        var adjustToNearPoint, focus, int, pathToPoints, pointsToSegments, segementsToPoints, watch, _ref;
        _$jscmd("test/runners/test.js", "line", 875);
        _ref = require("../utils/utils"), pointsToSegments = _ref.pointsToSegments, segementsToPoints = _ref.segementsToPoints, 
        adjustToNearPoint = _ref.adjustToNearPoint, pathToPoints = _ref.pathToPoints;
        _$jscmd("test/runners/test.js", "line", 877);
        int = parseInt;
        _$jscmd("test/runners/test.js", "line", 879);
        focus = function($shape, wb) {
            _$jscmd("test/runners/test.js", "line", 880);
            var $leftBottom, $leftTop, $rightBottom, $rightTop, h, lh, lw, lx, ly, padding, resetAnchorsPosition, w, x, xs, y, ys, _ref1;
            _$jscmd("test/runners/test.js", "line", 881);
            x = int($shape.attr("x"));
            _$jscmd("test/runners/test.js", "line", 882);
            y = int($shape.attr("y"));
            _$jscmd("test/runners/test.js", "line", 883);
            w = int($shape.attr("width"));
            _$jscmd("test/runners/test.js", "line", 884);
            h = int($shape.attr("height"));
            _$jscmd("test/runners/test.js", "line", 885);
            $leftTop = wb.ui.circle({
                fill: "transparent",
                stroke: "blue",
                opacity: .86,
                r: 8
            });
            _$jscmd("test/runners/test.js", "line", 891);
            $rightTop = wb.ui.circle({
                fill: "transparent",
                stroke: "blue",
                opacity: .86,
                r: 8
            });
            _$jscmd("test/runners/test.js", "line", 897);
            $rightBottom = wb.ui.circle({
                fill: "transparent",
                stroke: "blue",
                opacity: .86,
                r: 8
            });
            _$jscmd("test/runners/test.js", "line", 903);
            $leftBottom = wb.ui.circle({
                fill: "transparent",
                stroke: "blue",
                opacity: .86,
                r: 8
            });
            _$jscmd("test/runners/test.js", "line", 909);
            resetAnchorsPosition = function(x, y, w, h) {
                _$jscmd("test/runners/test.js", "line", 910);
                $leftTop.attr({
                    cx: x,
                    cy: y
                });
                _$jscmd("test/runners/test.js", "line", 914);
                $rightTop.attr({
                    cx: _$jscmd("test/runners/test.js", "cond", "915_10_1", x) + _$jscmd("test/runners/test.js", "cond", "915_14_1", w),
                    cy: y
                });
                _$jscmd("test/runners/test.js", "line", 918);
                $rightBottom.attr({
                    cx: _$jscmd("test/runners/test.js", "cond", "919_10_1", x) + _$jscmd("test/runners/test.js", "cond", "919_14_1", w),
                    cy: _$jscmd("test/runners/test.js", "cond", "920_10_1", y) + _$jscmd("test/runners/test.js", "cond", "920_14_1", h)
                });
                _$jscmd("test/runners/test.js", "line", 922);
                return $leftBottom.attr({
                    cx: x,
                    cy: _$jscmd("test/runners/test.js", "cond", "924_10_1", y) + _$jscmd("test/runners/test.js", "cond", "924_14_1", h)
                });
            };
            _$jscmd("test/runners/test.js", "line", 927);
            resetAnchorsPosition(x, y, w, h);
            _$jscmd("test/runners/test.js", "line", 928);
            _ref1 = [ x, y, w, h, [], [] ], lx = _ref1[0], ly = _ref1[1], lw = _ref1[2], lh = _ref1[3], 
            xs = _ref1[4], ys = _ref1[5];
            _$jscmd("test/runners/test.js", "line", 929);
            padding = 5;
            _$jscmd("test/runners/test.js", "line", 930);
            return [ {
                shape: $leftTop,
                x: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 934);
                    return _$jscmd("test/runners/test.js", "cond", "934_15_1", x) + _$jscmd("test/runners/test.js", "cond", "934_19_2", dx);
                },
                y: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 937);
                    return _$jscmd("test/runners/test.js", "cond", "937_15_1", y) + _$jscmd("test/runners/test.js", "cond", "937_19_2", dy);
                },
                w: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 940);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "940_33_1", w) - _$jscmd("test/runners/test.js", "cond", "940_37_2", dx));
                },
                h: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 943);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "943_33_1", h) - _$jscmd("test/runners/test.js", "cond", "943_37_2", dy));
                },
                adjust: function(x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 946);
                    var ax, ay, dx, dy;
                    if (ax = adjustToNearPoint(x, xs, 10)) {
                        _$jscmd("test/runners/test.js", "line", 948);
                        dx = _$jscmd("test/runners/test.js", "cond", "948_15_1", x) - _$jscmd("test/runners/test.js", "cond", "948_19_2", ax);
                        _$jscmd("test/runners/test.js", "line", 949);
                        x = ax;
                        _$jscmd("test/runners/test.js", "line", 950);
                        w += dx;
                    }
                    if (ay = adjustToNearPoint(y, ys, 10)) {
                        _$jscmd("test/runners/test.js", "line", 953);
                        dy = _$jscmd("test/runners/test.js", "cond", "953_15_1", y) - _$jscmd("test/runners/test.js", "cond", "953_19_2", ay);
                        _$jscmd("test/runners/test.js", "line", 954);
                        y = ay;
                        _$jscmd("test/runners/test.js", "line", 955);
                        h += dy;
                    }
                    _$jscmd("test/runners/test.js", "line", 957);
                    return [ x, y, w, h ];
                }
            }, {
                shape: $rightTop,
                x: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 962);
                    return x;
                },
                y: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 965);
                    return _$jscmd("test/runners/test.js", "cond", "965_15_1", y) + _$jscmd("test/runners/test.js", "cond", "965_19_2", dy);
                },
                w: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 968);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "968_33_1", w) + _$jscmd("test/runners/test.js", "cond", "968_37_2", dx));
                },
                h: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 971);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "971_33_1", h) - _$jscmd("test/runners/test.js", "cond", "971_37_2", dy));
                },
                adjust: function(x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 974);
                    var ax, ay, dy, gx;
                    _$jscmd("test/runners/test.js", "line", 975);
                    gx = _$jscmd("test/runners/test.js", "cond", "975_13_1", x) + _$jscmd("test/runners/test.js", "cond", "975_17_1", w);
                    if (ax = adjustToNearPoint(gx, xs, 10)) {
                        _$jscmd("test/runners/test.js", "line", 977);
                        x = x;
                        _$jscmd("test/runners/test.js", "line", 978);
                        w = _$jscmd("test/runners/test.js", "cond", "978_14_2", ax) - _$jscmd("test/runners/test.js", "cond", "978_19_1", x);
                    }
                    if (ay = adjustToNearPoint(y, ys, 10)) {
                        _$jscmd("test/runners/test.js", "line", 981);
                        dy = _$jscmd("test/runners/test.js", "cond", "981_15_1", y) - _$jscmd("test/runners/test.js", "cond", "981_19_2", ay);
                        _$jscmd("test/runners/test.js", "line", 982);
                        y = ay;
                        _$jscmd("test/runners/test.js", "line", 983);
                        h += dy;
                    }
                    _$jscmd("test/runners/test.js", "line", 985);
                    return [ x, y, w, h ];
                }
            }, {
                shape: $rightBottom,
                x: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 990);
                    return x;
                },
                y: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 993);
                    return y;
                },
                w: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 996);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "996_33_1", w) + _$jscmd("test/runners/test.js", "cond", "996_37_2", dx));
                },
                h: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 999);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "999_33_1", h) + _$jscmd("test/runners/test.js", "cond", "999_37_2", dy));
                },
                adjust: function(x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1002);
                    var ax, ay, gx, gy;
                    _$jscmd("test/runners/test.js", "line", 1003);
                    gx = _$jscmd("test/runners/test.js", "cond", "1003_13_1", x) + _$jscmd("test/runners/test.js", "cond", "1003_17_1", w);
                    if (ax = adjustToNearPoint(gx, xs, 10)) {
                        _$jscmd("test/runners/test.js", "line", 1005);
                        x = x;
                        _$jscmd("test/runners/test.js", "line", 1006);
                        w = _$jscmd("test/runners/test.js", "cond", "1006_14_2", ax) - _$jscmd("test/runners/test.js", "cond", "1006_19_1", x);
                    }
                    _$jscmd("test/runners/test.js", "line", 1008);
                    gy = _$jscmd("test/runners/test.js", "cond", "1008_13_1", y) + _$jscmd("test/runners/test.js", "cond", "1008_17_1", h);
                    if (ay = adjustToNearPoint(gy, ys, 10)) {
                        _$jscmd("test/runners/test.js", "line", 1010);
                        y = y;
                        _$jscmd("test/runners/test.js", "line", 1011);
                        h = _$jscmd("test/runners/test.js", "cond", "1011_14_2", ay) - _$jscmd("test/runners/test.js", "cond", "1011_19_1", y);
                    }
                    _$jscmd("test/runners/test.js", "line", 1013);
                    return [ x, y, w, h ];
                }
            }, {
                shape: $leftBottom,
                x: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1018);
                    return _$jscmd("test/runners/test.js", "cond", "1018_15_1", x) + _$jscmd("test/runners/test.js", "cond", "1018_19_2", dx);
                },
                y: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1021);
                    return y;
                },
                w: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1024);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "1024_33_1", w) - _$jscmd("test/runners/test.js", "cond", "1024_37_2", dx));
                },
                h: function(dx, dy, x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1027);
                    return Math.max(padding, _$jscmd("test/runners/test.js", "cond", "1027_33_1", h) + _$jscmd("test/runners/test.js", "cond", "1027_37_2", dy));
                },
                adjust: function(x, y, w, h) {
                    _$jscmd("test/runners/test.js", "line", 1030);
                    var ax, ay, dx, gy;
                    if (ax = adjustToNearPoint(x, xs, 10)) {
                        _$jscmd("test/runners/test.js", "line", 1032);
                        dx = _$jscmd("test/runners/test.js", "cond", "1032_15_1", x) - _$jscmd("test/runners/test.js", "cond", "1032_19_2", ax);
                        _$jscmd("test/runners/test.js", "line", 1033);
                        x = ax;
                        _$jscmd("test/runners/test.js", "line", 1034);
                        w += dx;
                    }
                    _$jscmd("test/runners/test.js", "line", 1036);
                    gy = _$jscmd("test/runners/test.js", "cond", "1036_13_1", y) + _$jscmd("test/runners/test.js", "cond", "1036_17_1", h);
                    if (ay = adjustToNearPoint(gy, ys, 10)) {
                        _$jscmd("test/runners/test.js", "line", 1038);
                        y = y;
                        _$jscmd("test/runners/test.js", "line", 1039);
                        h = _$jscmd("test/runners/test.js", "cond", "1039_14_2", ay) - _$jscmd("test/runners/test.js", "cond", "1039_19_1", y);
                    }
                    _$jscmd("test/runners/test.js", "line", 1041);
                    return [ x, y, w, h ];
                }
            } ].forEach(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1045);
                return function(anc) {
                    _$jscmd("test/runners/test.js", "line", 1046);
                    return anc.shape.drag(function(dx, dy) {
                        _$jscmd("test/runners/test.js", "line", 1047);
                        var args, rh, rw, rx, ry, _ref2;
                        _$jscmd("test/runners/test.js", "line", 1048);
                        args = [ dx, dy, lx, ly, lw, lh ];
                        _$jscmd("test/runners/test.js", "line", 1049);
                        rx = anc.x.apply(anc, args);
                        _$jscmd("test/runners/test.js", "line", 1050);
                        ry = anc.y.apply(anc, args);
                        _$jscmd("test/runners/test.js", "line", 1051);
                        rw = anc.w.apply(anc, args);
                        _$jscmd("test/runners/test.js", "line", 1052);
                        rh = anc.h.apply(anc, args);
                        _$jscmd("test/runners/test.js", "line", 1053);
                        _ref2 = anc.adjust(rx, ry, rw, rh), rx = _ref2[0], ry = _ref2[1], rw = _ref2[2], 
                        rh = _ref2[3];
                        _$jscmd("test/runners/test.js", "line", 1054);
                        $shape.attr({
                            x: rx,
                            y: ry,
                            width: rw,
                            height: rh
                        });
                        _$jscmd("test/runners/test.js", "line", 1060);
                        return resetAnchorsPosition(rx, ry, rw, rh);
                    }, function(x, y, ev) {
                        _$jscmd("test/runners/test.js", "line", 1062);
                        var _ref2;
                        _$jscmd("test/runners/test.js", "line", 1063);
                        ev.stopPropagation();
                        _$jscmd("test/runners/test.js", "line", 1064);
                        lx = int($leftTop.attr("cx"));
                        _$jscmd("test/runners/test.js", "line", 1065);
                        ly = int($leftTop.attr("cy"));
                        _$jscmd("test/runners/test.js", "line", 1066);
                        lw = int($shape.attr("width"));
                        _$jscmd("test/runners/test.js", "line", 1067);
                        lh = int($shape.attr("height"));
                        _$jscmd("test/runners/test.js", "line", 1068);
                        _ref2 = wb.getAnchorPoints(), xs = _ref2.xs, ys = _ref2.ys;
                        _$jscmd("test/runners/test.js", "line", 1069);
                        return wb.showGrid();
                    }, function() {
                        _$jscmd("test/runners/test.js", "line", 1071);
                        wb.clearUI();
                        _$jscmd("test/runners/test.js", "line", 1072);
                        return wb.update();
                    });
                };
            }(this));
        };
        _$jscmd("test/runners/test.js", "line", 1078);
        watch = function($shape, wb) {
            _$jscmd("test/runners/test.js", "line", 1079);
            var disposeFocus, lx, ly;
            _$jscmd("test/runners/test.js", "line", 1080);
            wb.paper.mousedown(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1081);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 1082);
                    return wb.clearUI();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 1085);
            disposeFocus = null;
            _$jscmd("test/runners/test.js", "line", 1086);
            $shape.click(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1087);
                return function() {
                    if (_$jscmd("test/runners/test.js", "cond", "1088_10_19", typeof disposeFocus) === "function") {
                        _$jscmd("test/runners/test.js", "line", 1089);
                        disposeFocus();
                    }
                    _$jscmd("test/runners/test.js", "line", 1091);
                    return disposeFocus = focus($shape, wb);
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 1094);
            lx = int($shape.attr("x"));
            _$jscmd("test/runners/test.js", "line", 1095);
            ly = int($shape.attr("y"));
            _$jscmd("test/runners/test.js", "line", 1096);
            $shape.drag(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1097);
                return function(dx, dy) {
                    _$jscmd("test/runners/test.js", "line", 1098);
                    var rx, ry;
                    _$jscmd("test/runners/test.js", "line", 1099);
                    rx = _$jscmd("test/runners/test.js", "cond", "1099_11_2", lx) + _$jscmd("test/runners/test.js", "cond", "1099_16_2", dx);
                    _$jscmd("test/runners/test.js", "line", 1100);
                    ry = _$jscmd("test/runners/test.js", "cond", "1100_11_2", ly) + _$jscmd("test/runners/test.js", "cond", "1100_16_2", dy);
                    _$jscmd("test/runners/test.js", "line", 1101);
                    return $shape.attr({
                        x: rx,
                        y: ry
                    });
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 1107);
                return function(dx, dy, ev) {
                    _$jscmd("test/runners/test.js", "line", 1108);
                    wb.clearUI();
                    _$jscmd("test/runners/test.js", "line", 1109);
                    lx = int($shape.attr("x"));
                    _$jscmd("test/runners/test.js", "line", 1110);
                    ly = int($shape.attr("y"));
                    _$jscmd("test/runners/test.js", "line", 1111);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 1112);
                    return false;
                };
            }(this), function(_this) {
                _$jscmd("test/runners/test.js", "line", 1115);
                return function(ev) {
                    _$jscmd("test/runners/test.js", "line", 1116);
                    ev.stopPropagation();
                    _$jscmd("test/runners/test.js", "line", 1117);
                    return wb.update();
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 1120);
            return function() {
                _$jscmd("test/runners/test.js", "line", 1121);
                wb.paper.unmousedown();
                if (_$jscmd("test/runners/test.js", "cond", "1122_8_19", typeof disposeFocus) === "function") {
                    _$jscmd("test/runners/test.js", "line", 1123);
                    disposeFocus();
                }
                _$jscmd("test/runners/test.js", "line", 1125);
                $shape.undrag();
                _$jscmd("test/runners/test.js", "line", 1126);
                return $shape.unclick();
            };
        };
        _$jscmd("test/runners/test.js", "line", 1130);
        module.exports = {
            watch: watch,
            focus: focus
        };
    }, {
        "../utils/utils": 16
    } ],
    13: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1137);
        var jade = require("jade/runtime");
        _$jscmd("test/runners/test.js", "line", 1139);
        module.exports = function template(locals) {
            _$jscmd("test/runners/test.js", "line", 1140);
            var buf = [];
            _$jscmd("test/runners/test.js", "line", 1141);
            var jade_mixins = {};
            _$jscmd("test/runners/test.js", "line", 1142);
            var jade_interp;
            _$jscmd("test/runners/test.js", "line", 1144);
            buf.push('<div><button class="edit-grab">grab</button><button class="edit-free">free</button><button class="edit-rect">rect</button><button class="edit-circle">circle</button><button class="edit-line">line</button><button class="edit-eraser">eraser</button><span class="mode"></span>&nbsp;<span class="mouse-x"></span>:<span class="mouse-y"></span></div><div><button class="layer0">1</button><button class="layer1">2</button><button class="layer2">3</button></div><div style="position:relative; width:640px; height:320px; padding:0 margin: 0;" class="main"><div style="position:absolute;padding:0; margin: 0; overflow: hidden; -webkit-user-select: none;" class="bg"></div><svg width="640" height="320" style="position:absolute;padding:0 margin: 0;cursor: crosshair" class="whiteboard"></svg></div>');
            _$jscmd("test/runners/test.js", "line", 1144);
            _$jscmd("test/runners/test.js", "line", 1144);
            return buf.join("");
        };
    }, {
        "jade/runtime": 18
    } ],
    14: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1147);
        var EventEmitter, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 1148);
            return function() {
                _$jscmd("test/runners/test.js", "line", 1148);
                return fn.apply(me, arguments);
            };
        }, __slice = [].slice;
        _$jscmd("test/runners/test.js", "line", 1151);
        EventEmitter = function() {
            function EventEmitter() {
                _$jscmd("test/runners/test.js", "line", 1153);
                this.trigger = __bind(this.trigger, this);
                _$jscmd("test/runners/test.js", "line", 1154);
                this.off = __bind(this.off, this);
                _$jscmd("test/runners/test.js", "line", 1155);
                this.on = __bind(this.on, this);
            }
            _$jscmd("test/runners/test.js", "line", 1158);
            EventEmitter.prototype.on = function(eventName, callback) {
                _$jscmd("test/runners/test.js", "line", 1159);
                var _base;
                if (_$jscmd("test/runners/test.js", "cond", "1160_8_12", this._events) == null) {
                    _$jscmd("test/runners/test.js", "line", 1161);
                    this._events = [];
                }
                if (_$jscmd("test/runners/test.js", "cond", "1163_8_33", (_base = this._events)[eventName]) == null) {
                    _$jscmd("test/runners/test.js", "line", 1164);
                    _base[eventName] = [];
                }
                _$jscmd("test/runners/test.js", "line", 1166);
                this._events[eventName].push(callback);
                _$jscmd("test/runners/test.js", "line", 1167);
                return this;
            };
            _$jscmd("test/runners/test.js", "line", 1170);
            EventEmitter.prototype.off = function(eventName, fn) {
                _$jscmd("test/runners/test.js", "line", 1171);
                var n, _ref;
                if (_$jscmd("test/runners/test.js", "cond", "1172_8_16", arguments.length) === 0) {
                    _$jscmd("test/runners/test.js", "line", 1173);
                    delete this.events;
                    _$jscmd("test/runners/test.js", "line", 1174);
                    return this;
                }
                if (_$jscmd("test/runners/test.js", "cond", "1176_8_2", fn) != null) {
                    _$jscmd("test/runners/test.js", "line", 1177);
                    n = _$jscmd("test/runners/test.js", "cond", "1177_10_31", _ref = this.events[eventName]) != null ? _$jscmd("test/runners/test.js", "cond", "1177_52_16", _ref.indexOf(fn)) : _$jscmd("test/runners/test.js", "cond", "1177_71_6", void 0);
                    if (_$jscmd("test/runners/test.js", "cond", "1178_10_1", n) > _$jscmd("test/runners/test.js", "cond", "1178_14_2", -1)) {
                        _$jscmd("test/runners/test.js", "line", 1179);
                        this._events[eventName].splice(n, 1);
                    }
                } else {
                    _$jscmd("test/runners/test.js", "line", 1182);
                    delete this._events[eventName];
                }
                _$jscmd("test/runners/test.js", "line", 1184);
                return this;
            };
            _$jscmd("test/runners/test.js", "line", 1187);
            EventEmitter.prototype.trigger = function() {
                _$jscmd("test/runners/test.js", "line", 1188);
                var args, eventName, _ref, _ref1;
                _$jscmd("test/runners/test.js", "line", 1189);
                eventName = arguments[0], args = 2 <= _$jscmd("test/runners/test.js", "cond", "1189_42_16", arguments.length) ? _$jscmd("test/runners/test.js", "cond", "1189_61_26", __slice.call(arguments, 1)) : _$jscmd("test/runners/test.js", "cond", "1189_90_2", []);
                if (_$jscmd("test/runners/test.js", "cond", "1190_8_21", _ref = this._events) != null) {
                    if (_$jscmd("test/runners/test.js", "cond", "1191_10_25", _ref1 = _ref[eventName]) != null) {
                        _$jscmd("test/runners/test.js", "line", 1192);
                        _ref1.map(function(_this) {
                            _$jscmd("test/runners/test.js", "line", 1193);
                            return function(callback) {
                                _$jscmd("test/runners/test.js", "line", 1194);
                                return callback.apply(null, args);
                            };
                        }(this));
                    }
                }
                _$jscmd("test/runners/test.js", "line", 1199);
                return this;
            };
            _$jscmd("test/runners/test.js", "line", 1202);
            return EventEmitter;
        }();
        _$jscmd("test/runners/test.js", "line", 1206);
        module.exports = EventEmitter;
    }, {} ],
    15: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1210);
        var extend;
        _$jscmd("test/runners/test.js", "line", 1212);
        module.exports = extend = function(_this) {
            _$jscmd("test/runners/test.js", "line", 1213);
            return function(obj, props) {
                _$jscmd("test/runners/test.js", "line", 1214);
                var k, v;
                for (k in props) {
                    _$jscmd("test/runners/test.js", "line", 1216);
                    v = props[k];
                    _$jscmd("test/runners/test.js", "line", 1217);
                    obj[k] = v;
                }
                _$jscmd("test/runners/test.js", "line", 1219);
                return obj;
            };
        }(this);
    }, {} ],
    16: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1225);
        var adjustToNearPoint, getAnchorPoints, int, pathToPoints, pointsToSegments, segementsToPoints, __slice = [].slice;
        _$jscmd("test/runners/test.js", "line", 1228);
        int = parseInt;
        _$jscmd("test/runners/test.js", "line", 1230);
        pointsToSegments = function(points) {
            _$jscmd("test/runners/test.js", "line", 1231);
            var body, ex, ey, segs, sx, sy, _ref, _ref1;
            _$jscmd("test/runners/test.js", "line", 1232);
            _ref = points[0], sx = _ref[0], sy = _ref[1], body = 2 <= _$jscmd("test/runners/test.js", "cond", "1232_62_13", points.length) ? _$jscmd("test/runners/test.js", "cond", "1232_78_23", __slice.call(points, 1)) : _$jscmd("test/runners/test.js", "cond", "1232_104_2", []);
            _$jscmd("test/runners/test.js", "line", 1233);
            segs = [].concat([ [ "M", sx, sy ] ], body.map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1234);
                return function() {
                    _$jscmd("test/runners/test.js", "line", 1235);
                    var lx, ly;
                    _$jscmd("test/runners/test.js", "line", 1236);
                    lx = sx;
                    _$jscmd("test/runners/test.js", "line", 1237);
                    ly = sy;
                    _$jscmd("test/runners/test.js", "line", 1238);
                    return function(_arg) {
                        _$jscmd("test/runners/test.js", "line", 1239);
                        var dx, dy, x, y;
                        _$jscmd("test/runners/test.js", "line", 1240);
                        x = _arg[0], y = _arg[1];
                        _$jscmd("test/runners/test.js", "line", 1241);
                        dx = _$jscmd("test/runners/test.js", "cond", "1241_13_1", x) - _$jscmd("test/runners/test.js", "cond", "1241_17_2", lx);
                        _$jscmd("test/runners/test.js", "line", 1242);
                        dy = _$jscmd("test/runners/test.js", "cond", "1242_13_1", y) - _$jscmd("test/runners/test.js", "cond", "1242_17_2", ly);
                        _$jscmd("test/runners/test.js", "line", 1243);
                        lx = x;
                        _$jscmd("test/runners/test.js", "line", 1244);
                        ly = y;
                        _$jscmd("test/runners/test.js", "line", 1245);
                        return [ "l", dx, dy ];
                    };
                };
            }(this)()));
            _$jscmd("test/runners/test.js", "line", 1249);
            _ref1 = _.last(body), ex = _ref1[0], ey = _ref1[1];
            if (_$jscmd("test/runners/test.js", "cond", "1250_6_9", _$jscmd("test/runners/test.js", "cond", "1250_6_2", sx) === _$jscmd("test/runners/test.js", "cond", "1250_13_2", ex)) && _$jscmd("test/runners/test.js", "cond", "1250_19_9", _$jscmd("test/runners/test.js", "cond", "1250_19_2", sy) === _$jscmd("test/runners/test.js", "cond", "1250_26_2", ey))) {
                _$jscmd("test/runners/test.js", "line", 1251);
                segs[_$jscmd("test/runners/test.js", "cond", "1251_9_11", segs.length) - 1] = [ "Z" ];
            }
            _$jscmd("test/runners/test.js", "line", 1253);
            return segs;
        };
        _$jscmd("test/runners/test.js", "line", 1256);
        segementsToPoints = function(segments) {
            _$jscmd("test/runners/test.js", "line", 1257);
            var body, sx, sy, t, _ref;
            _$jscmd("test/runners/test.js", "line", 1258);
            _ref = segments[0], t = _ref[0], sx = _ref[1], sy = _ref[2], body = 2 <= _$jscmd("test/runners/test.js", "cond", "1258_77_15", segments.length) ? _$jscmd("test/runners/test.js", "cond", "1258_95_25", __slice.call(segments, 1)) : _$jscmd("test/runners/test.js", "cond", "1258_123_2", []);
            _$jscmd("test/runners/test.js", "line", 1259);
            return [].concat([ [ sx, sy ] ], body.map(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1260);
                return function() {
                    _$jscmd("test/runners/test.js", "line", 1261);
                    var cx, cy;
                    _$jscmd("test/runners/test.js", "line", 1262);
                    cx = sx;
                    _$jscmd("test/runners/test.js", "line", 1263);
                    cy = sy;
                    _$jscmd("test/runners/test.js", "line", 1264);
                    return function(_arg) {
                        _$jscmd("test/runners/test.js", "line", 1265);
                        var t, x, y;
                        _$jscmd("test/runners/test.js", "line", 1266);
                        t = _arg[0], x = _arg[1], y = _arg[2];
                        if (_$jscmd("test/runners/test.js", "cond", "1267_12_1", t) === "Z") {
                            _$jscmd("test/runners/test.js", "line", 1268);
                            return [ sx, sy ];
                        }
                        _$jscmd("test/runners/test.js", "line", 1270);
                        cx += x;
                        _$jscmd("test/runners/test.js", "line", 1271);
                        cy += y;
                        _$jscmd("test/runners/test.js", "line", 1272);
                        return [ cx, cy ];
                    };
                };
            }(this)()));
        };
        _$jscmd("test/runners/test.js", "line", 1278);
        pathToPoints = function($path) {
            _$jscmd("test/runners/test.js", "line", 1279);
            var segments;
            _$jscmd("test/runners/test.js", "line", 1280);
            segments = Snap.parsePathString($path.attr("d"));
            _$jscmd("test/runners/test.js", "line", 1281);
            return segementsToPoints(segments);
        };
        _$jscmd("test/runners/test.js", "line", 1284);
        adjustToNearPoint = function(n, points, force) {
            _$jscmd("test/runners/test.js", "line", 1285);
            var p, _i, _len;
            if (_$jscmd("test/runners/test.js", "cond", "1286_6_5", force) == null) {
                _$jscmd("test/runners/test.js", "line", 1287);
                force = 3;
            }
            for (_i = 0, _len = points.length; _$jscmd("test/runners/test.js", "cond", "1289_37_2", _i) < _$jscmd("test/runners/test.js", "cond", "1289_42_4", _len); _i++) {
                _$jscmd("test/runners/test.js", "line", 1290);
                p = points[_i];
                if (_$jscmd("test/runners/test.js", "cond", "1291_9_13", _$jscmd("test/runners/test.js", "cond", "1291_9_9", _$jscmd("test/runners/test.js", "cond", "1291_9_1", p) - _$jscmd("test/runners/test.js", "cond", "1291_13_5", force)) < _$jscmd("test/runners/test.js", "cond", "1291_21_1", n)) && _$jscmd("test/runners/test.js", "cond", "1291_26_13", _$jscmd("test/runners/test.js", "cond", "1291_26_1", n) < _$jscmd("test/runners/test.js", "cond", "1291_30_9", _$jscmd("test/runners/test.js", "cond", "1291_30_1", p) + _$jscmd("test/runners/test.js", "cond", "1291_34_5", force)))) {
                    _$jscmd("test/runners/test.js", "line", 1292);
                    return p;
                }
            }
            _$jscmd("test/runners/test.js", "line", 1295);
            return null;
        };
        _$jscmd("test/runners/test.js", "line", 1298);
        getAnchorPoints = function(layer) {
            _$jscmd("test/runners/test.js", "line", 1299);
            var anchor_points, anchor_x, anchor_y;
            _$jscmd("test/runners/test.js", "line", 1300);
            anchor_x = [];
            _$jscmd("test/runners/test.js", "line", 1301);
            anchor_y = [];
            _$jscmd("test/runners/test.js", "line", 1302);
            anchor_points = [];
            _$jscmd("test/runners/test.js", "line", 1303);
            layer.selectAll("*").forEach(function(_this) {
                _$jscmd("test/runners/test.js", "line", 1304);
                return function($shape) {
                    _$jscmd("test/runners/test.js", "line", 1305);
                    var h, w, x, y;
                    switch ($shape.type) {
                      case "rect":
                        _$jscmd("test/runners/test.js", "line", 1308);
                        x = int($shape.attr("x"));
                        _$jscmd("test/runners/test.js", "line", 1309);
                        y = int($shape.attr("y"));
                        _$jscmd("test/runners/test.js", "line", 1310);
                        w = int($shape.attr("width"));
                        _$jscmd("test/runners/test.js", "line", 1311);
                        h = int($shape.attr("height"));
                        _$jscmd("test/runners/test.js", "line", 1312);
                        anchor_x.push(x, _$jscmd("test/runners/test.js", "cond", "1312_27_1", x) + _$jscmd("test/runners/test.js", "cond", "1312_31_1", w));
                        _$jscmd("test/runners/test.js", "line", 1313);
                        return anchor_y.push(y, _$jscmd("test/runners/test.js", "cond", "1313_34_1", y) + _$jscmd("test/runners/test.js", "cond", "1313_38_1", h));
                    }
                };
            }(this));
            _$jscmd("test/runners/test.js", "line", 1317);
            return {
                xs: anchor_x,
                ys: anchor_y
            };
        };
        _$jscmd("test/runners/test.js", "line", 1323);
        module.exports = {
            pointsToSegments: pointsToSegments,
            segementsToPoints: segementsToPoints,
            getAnchorPoints: getAnchorPoints,
            adjustToNearPoint: adjustToNearPoint,
            pathToPoints: pathToPoints
        };
    }, {} ],
    17: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1333);
        var CircleDrawingGesture, EraserGesture, EventEmitter, FreeDrawingGesture, GrabGesture, HistoryManager, LineDrawingGesture, RectDrawingGesture, Whiteboard, extend, getAnchorPoints, int, __bind = function(fn, me) {
            _$jscmd("test/runners/test.js", "line", 1334);
            return function() {
                _$jscmd("test/runners/test.js", "line", 1334);
                return fn.apply(me, arguments);
            };
        };
        _$jscmd("test/runners/test.js", "line", 1336);
        RectDrawingGesture = require("./gestures/rect-drawing-gesture");
        _$jscmd("test/runners/test.js", "line", 1338);
        FreeDrawingGesture = require("./gestures/free-drawing-gesture");
        _$jscmd("test/runners/test.js", "line", 1340);
        LineDrawingGesture = require("./gestures/line-drawing-gesture");
        _$jscmd("test/runners/test.js", "line", 1342);
        CircleDrawingGesture = require("./gestures/circle-drawing-gesture");
        _$jscmd("test/runners/test.js", "line", 1344);
        EraserGesture = require("./gestures/eraser-gesture");
        _$jscmd("test/runners/test.js", "line", 1346);
        GrabGesture = require("./gestures/grab-gesture");
        _$jscmd("test/runners/test.js", "line", 1348);
        EventEmitter = require("./utils/event-emitter");
        _$jscmd("test/runners/test.js", "line", 1350);
        extend = require("./utils/extend");
        _$jscmd("test/runners/test.js", "line", 1352);
        getAnchorPoints = require("./utils/utils").getAnchorPoints;
        _$jscmd("test/runners/test.js", "line", 1354);
        HistoryManager = require("./history-manager");
        _$jscmd("test/runners/test.js", "line", 1356);
        int = parseInt;
        _$jscmd("test/runners/test.js", "line", 1358);
        Whiteboard = function() {
            _$jscmd("test/runners/test.js", "line", 1359);
            var template;
            _$jscmd("test/runners/test.js", "line", 1361);
            Whiteboard.start = function(selector) {
                _$jscmd("test/runners/test.js", "line", 1362);
                var hist, whiteboard;
                _$jscmd("test/runners/test.js", "line", 1363);
                whiteboard = new Whiteboard(selector);
                _$jscmd("test/runners/test.js", "line", 1364);
                hist = new HistoryManager();
                _$jscmd("test/runners/test.js", "line", 1365);
                whiteboard.on("changed", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1366);
                    return function(svg) {
                        _$jscmd("test/runners/test.js", "line", 1367);
                        return hist.pushHistory(svg);
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1370);
                whiteboard.on("undo", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1371);
                    return function(svg) {
                        _$jscmd("test/runners/test.js", "line", 1372);
                        var next;
                        _$jscmd("test/runners/test.js", "line", 1373);
                        hist.undo();
                        _$jscmd("test/runners/test.js", "line", 1374);
                        next = hist.current();
                        _$jscmd("test/runners/test.js", "line", 1375);
                        whiteboard.setSVG(next);
                        _$jscmd("test/runners/test.js", "line", 1376);
                        return whiteboard.setMode(whiteboard.mode);
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1379);
                whiteboard.on("redo", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1380);
                    return function(svg) {
                        _$jscmd("test/runners/test.js", "line", 1381);
                        var next;
                        _$jscmd("test/runners/test.js", "line", 1382);
                        hist.redo();
                        _$jscmd("test/runners/test.js", "line", 1383);
                        next = hist.current();
                        _$jscmd("test/runners/test.js", "line", 1384);
                        whiteboard.setSVG(next);
                        _$jscmd("test/runners/test.js", "line", 1385);
                        return whiteboard.setMode(whiteboard.mode);
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1388);
                whiteboard.on("hide-preview", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1389);
                    return function(svg) {
                        _$jscmd("test/runners/test.js", "line", 1390);
                        return preview.hide();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1393);
                whiteboard.on("show-preview", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1394);
                    return function(svg) {
                        _$jscmd("test/runners/test.js", "line", 1395);
                        return preview.show();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1398);
                return whiteboard;
            };
            _$jscmd("test/runners/test.js", "line", 1401);
            template = require("./templates/whiteboard");
            _$jscmd("test/runners/test.js", "line", 1403);
            extend(Whiteboard.prototype, EventEmitter.prototype);
            function Whiteboard(selector) {
                _$jscmd("test/runners/test.js", "line", 1406);
                this.setBackgroundHTML = __bind(this.setBackgroundHTML, this);
                _$jscmd("test/runners/test.js", "line", 1407);
                this.$ = __bind(this.$, this);
                _$jscmd("test/runners/test.js", "line", 1408);
                this.setMode = __bind(this.setMode, this);
                _$jscmd("test/runners/test.js", "line", 1409);
                this.setSVG = __bind(this.setSVG, this);
                _$jscmd("test/runners/test.js", "line", 1410);
                this.getSVG = __bind(this.getSVG, this);
                _$jscmd("test/runners/test.js", "line", 1411);
                this.update = __bind(this.update, this);
                _$jscmd("test/runners/test.js", "line", 1412);
                var $svg, el, fillColor, offsetX, offsetY, paper, strokeColor, svg, _ref;
                _$jscmd("test/runners/test.js", "line", 1413);
                window.whiteboard = this;
                _$jscmd("test/runners/test.js", "line", 1414);
                this.strokeColor = strokeColor = "black";
                _$jscmd("test/runners/test.js", "line", 1415);
                this.fillColor = fillColor = "transparent";
                _$jscmd("test/runners/test.js", "line", 1416);
                this.tolelance = 2;
                _$jscmd("test/runners/test.js", "line", 1417);
                this.el = el = document.querySelector(selector);
                _$jscmd("test/runners/test.js", "line", 1418);
                this.$el = $(this.el);
                _$jscmd("test/runners/test.js", "line", 1419);
                this.$el.html(template());
                _$jscmd("test/runners/test.js", "line", 1420);
                this.svg = svg = document.querySelector("svg.whiteboard");
                _$jscmd("test/runners/test.js", "line", 1421);
                this.$svg = $svg = $(this.svg);
                _$jscmd("test/runners/test.js", "line", 1422);
                this.paper = paper = Snap(svg);
                _$jscmd("test/runners/test.js", "line", 1423);
                _ref = this.$svg.position(), offsetX = _ref.left, offsetY = _ref.top;
                _$jscmd("test/runners/test.js", "line", 1424);
                this.offsetX = offsetX;
                _$jscmd("test/runners/test.js", "line", 1425);
                this.offsetY = offsetY;
                _$jscmd("test/runners/test.js", "line", 1426);
                this.setupButtons();
                _$jscmd("test/runners/test.js", "line", 1427);
                this.resetLayers();
                _$jscmd("test/runners/test.js", "line", 1428);
                this.setLayer(0);
                _$jscmd("test/runners/test.js", "line", 1429);
                this.setMode("free");
            }
            _$jscmd("test/runners/test.js", "line", 1432);
            Whiteboard.prototype.setupButtons = function() {
                _$jscmd("test/runners/test.js", "line", 1433);
                var $fillColor, $strokeColor;
                _$jscmd("test/runners/test.js", "line", 1434);
                this.$(".edit-free").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1435);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1436);
                        return _this.setMode("free");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1439);
                this.$(".edit-rect").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1440);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1441);
                        return _this.setMode("rect");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1444);
                this.$(".edit-line").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1445);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1446);
                        return _this.setMode("line");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1449);
                this.$(".edit-circle").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1450);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1451);
                        return _this.setMode("circle");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1454);
                this.$(".edit-eraser").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1455);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1456);
                        return _this.setMode("eraser");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1459);
                this.$(".edit-grab").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1460);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1461);
                        var grabbing;
                        _$jscmd("test/runners/test.js", "line", 1462);
                        $svg.off();
                        _$jscmd("test/runners/test.js", "line", 1463);
                        _this.setMode("grab");
                        _$jscmd("test/runners/test.js", "line", 1464);
                        return grabbing = false;
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1467);
                $fillColor = this.$("input.fill-color").on("keyup", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1468);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1469);
                        return _this.fillColor = _this.$fillColor.val();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1472);
                $strokeColor = this.$("input.stroke-color").on("keyup", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1473);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1474);
                        return _this.strokeColor = $strokeColor.val();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1477);
                this.$(".undo").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1478);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1479);
                        return _this.trigger("undo");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1482);
                this.$(".redo").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1483);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1484);
                        return _this.trigger("redo");
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1487);
                this.$(".layer0").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1488);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1489);
                        _this.setLayer(0);
                        _$jscmd("test/runners/test.js", "line", 1490);
                        return _this.showBackground();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1493);
                this.$(".layer1").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1494);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1495);
                        _this.setLayer(1);
                        _$jscmd("test/runners/test.js", "line", 1496);
                        return _this.hideBackground();
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1499);
                return this.$(".layer2").on("click", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1500);
                    return function() {
                        _$jscmd("test/runners/test.js", "line", 1501);
                        _this.setLayer(2);
                        _$jscmd("test/runners/test.js", "line", 1502);
                        return _this.hideBackground();
                    };
                }(this));
            };
            _$jscmd("test/runners/test.js", "line", 1507);
            Whiteboard.prototype.clearUI = function() {
                _$jscmd("test/runners/test.js", "line", 1508);
                return Snap(this.ui).selectAll("*").forEach(function(i) {
                    _$jscmd("test/runners/test.js", "line", 1509);
                    return i.remove();
                });
            };
            _$jscmd("test/runners/test.js", "line", 1513);
            Whiteboard.prototype.update = function() {
                _$jscmd("test/runners/test.js", "line", 1514);
                return this.trigger("changed", this.getSVG());
            };
            _$jscmd("test/runners/test.js", "line", 1517);
            Whiteboard.prototype.getSVG = function() {
                _$jscmd("test/runners/test.js", "line", 1518);
                return this.paper.outerSVG();
            };
            _$jscmd("test/runners/test.js", "line", 1521);
            Whiteboard.prototype.setSVG = function(text) {
                _$jscmd("test/runners/test.js", "line", 1522);
                return this.$svg.html(text);
            };
            _$jscmd("test/runners/test.js", "line", 1525);
            Whiteboard.prototype.getUI = function() {
                _$jscmd("test/runners/test.js", "line", 1526);
                return _$jscmd("test/runners/test.js", "cond", "1526_11_7", this.ui) != null ? _$jscmd("test/runners/test.js", "cond", "1526_29_7", this.ui) : _$jscmd("test/runners/test.js", "cond", "1526_39_24", this.ui = this.paper.g());
            };
            _$jscmd("test/runners/test.js", "line", 1529);
            Whiteboard.prototype.setLayer = function(n) {
                _$jscmd("test/runners/test.js", "line", 1530);
                var l, _i, _len, _ref;
                _$jscmd("test/runners/test.js", "line", 1531);
                this.clearUI();
                _$jscmd("test/runners/test.js", "line", 1532);
                _ref = this.layers;
                for (_i = 0, _len = _ref.length; _$jscmd("test/runners/test.js", "cond", "1533_37_2", _i) < _$jscmd("test/runners/test.js", "cond", "1533_42_4", _len); _i++) {
                    _$jscmd("test/runners/test.js", "line", 1534);
                    l = _ref[_i];
                    _$jscmd("test/runners/test.js", "line", 1535);
                    l.node.style.visibility = "hidden";
                }
                _$jscmd("test/runners/test.js", "line", 1537);
                this.layer = this.layers[n];
                _$jscmd("test/runners/test.js", "line", 1538);
                return this.layer.node.style.visibility = "visible";
            };
            _$jscmd("test/runners/test.js", "line", 1541);
            Whiteboard.prototype.showGrid = function(xs, ys) {
                _$jscmd("test/runners/test.js", "line", 1542);
                var x, y, _i, _j, _len, _len1, _ref, _results;
                _$jscmd("test/runners/test.js", "line", 1543);
                _ref = getAnchorPoints(this.layer), xs = _ref.xs, ys = _ref.ys;
                for (_i = 0, _len = xs.length; _$jscmd("test/runners/test.js", "cond", "1544_35_2", _i) < _$jscmd("test/runners/test.js", "cond", "1544_40_4", _len); _i++) {
                    _$jscmd("test/runners/test.js", "line", 1545);
                    x = xs[_i];
                    _$jscmd("test/runners/test.js", "line", 1546);
                    this.ui.line({
                        x1: x,
                        x2: x,
                        y1: 0,
                        y2: 320,
                        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"
                    });
                }
                _$jscmd("test/runners/test.js", "line", 1554);
                _results = [];
                for (_j = 0, _len1 = ys.length; _$jscmd("test/runners/test.js", "cond", "1555_36_2", _j) < _$jscmd("test/runners/test.js", "cond", "1555_41_5", _len1); _j++) {
                    _$jscmd("test/runners/test.js", "line", 1556);
                    y = ys[_j];
                    _$jscmd("test/runners/test.js", "line", 1557);
                    _results.push(this.ui.line({
                        x1: 0,
                        x2: 640,
                        y1: y,
                        y2: y,
                        style: "stroke:rgba(200,200,200, 0.5);stroke-width:1"
                    }));
                }
                _$jscmd("test/runners/test.js", "line", 1565);
                return _results;
            };
            _$jscmd("test/runners/test.js", "line", 1568);
            Whiteboard.prototype.showBackground = function() {
                _$jscmd("test/runners/test.js", "line", 1569);
                return this.$(".bg").show();
            };
            _$jscmd("test/runners/test.js", "line", 1572);
            Whiteboard.prototype.hideBackground = function() {
                _$jscmd("test/runners/test.js", "line", 1573);
                return this.$(".bg").hide();
            };
            _$jscmd("test/runners/test.js", "line", 1576);
            Whiteboard.prototype.getAnchorPoints = function() {
                _$jscmd("test/runners/test.js", "line", 1577);
                return getAnchorPoints(this.layer);
            };
            _$jscmd("test/runners/test.js", "line", 1580);
            Whiteboard.prototype.setMode = function(mode) {
                _$jscmd("test/runners/test.js", "line", 1581);
                var $x, $y, Gesture, gesture, _ref;
                _$jscmd("test/runners/test.js", "line", 1582);
                this.$(".mode").text(mode);
                if (_$jscmd("test/runners/test.js", "cond", "1583_8_22", _ref = this._gesture) != null) {
                    _$jscmd("test/runners/test.js", "line", 1584);
                    _ref.dispose();
                }
                _$jscmd("test/runners/test.js", "line", 1586);
                this.mode = mode;
                _$jscmd("test/runners/test.js", "line", 1587);
                this.clearUI();
                _$jscmd("test/runners/test.js", "line", 1588);
                this.$svg.off();
                _$jscmd("test/runners/test.js", "line", 1589);
                Gesture = function() {
                    switch (mode) {
                      case "free":
                        _$jscmd("test/runners/test.js", "line", 1592);
                        return FreeDrawingGesture;

                      case "rect":
                        _$jscmd("test/runners/test.js", "line", 1594);
                        return RectDrawingGesture;

                      case "line":
                        _$jscmd("test/runners/test.js", "line", 1596);
                        return LineDrawingGesture;

                      case "circle":
                        _$jscmd("test/runners/test.js", "line", 1598);
                        return CircleDrawingGesture;

                      case "eraser":
                        _$jscmd("test/runners/test.js", "line", 1600);
                        return EraserGesture;

                      case "grab":
                        _$jscmd("test/runners/test.js", "line", 1602);
                        return GrabGesture;
                    }
                }();
                _$jscmd("test/runners/test.js", "line", 1605);
                this._gesture = gesture = new Gesture(this);
                _$jscmd("test/runners/test.js", "line", 1606);
                this.$svg.on("mousedown touchstart", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1607);
                    return function(ev) {
                        _$jscmd("test/runners/test.js", "line", 1608);
                        return gesture._onTouchStart(ev);
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1611);
                this.$svg.on("mouseup touchend", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1612);
                    return function(ev) {
                        _$jscmd("test/runners/test.js", "line", 1613);
                        return gesture._onTouchEnd(ev);
                    };
                }(this));
                _$jscmd("test/runners/test.js", "line", 1616);
                $x = $(".mouse-x");
                _$jscmd("test/runners/test.js", "line", 1617);
                $y = $(".mouse-y");
                _$jscmd("test/runners/test.js", "line", 1618);
                return this.$svg.on("mousemove touchmove", function(_this) {
                    _$jscmd("test/runners/test.js", "line", 1619);
                    return function(ev) {
                        _$jscmd("test/runners/test.js", "line", 1620);
                        var x, y, _ref1;
                        _$jscmd("test/runners/test.js", "line", 1621);
                        gesture._onTouchMove(ev);
                        _$jscmd("test/runners/test.js", "line", 1622);
                        _ref1 = gesture.getPoint(ev), x = _ref1[0], y = _ref1[1];
                        _$jscmd("test/runners/test.js", "line", 1623);
                        $x.text(x);
                        _$jscmd("test/runners/test.js", "line", 1624);
                        return $y.text(y);
                    };
                }(this));
            };
            _$jscmd("test/runners/test.js", "line", 1629);
            Whiteboard.prototype.resetLayers = function(layerCount) {
                if (!this._layerInitialized) {
                    _$jscmd("test/runners/test.js", "line", 1631);
                    this._layerInitialized = true;
                    _$jscmd("test/runners/test.js", "line", 1632);
                    this.layers = [ this.paper.g().addClass("l0"), this.paper.g().addClass("l1"), this.paper.g().addClass("l2") ];
                    _$jscmd("test/runners/test.js", "line", 1633);
                    return this.ui = this.paper.g().addClass("ui");
                } else {
                    _$jscmd("test/runners/test.js", "line", 1635);
                    this.layers = [ Snap.select(".l0"), Snap.select(".l1"), Snap.select(".l2") ];
                    _$jscmd("test/runners/test.js", "line", 1636);
                    return this.ui = Snap.select(".ui");
                }
            };
            _$jscmd("test/runners/test.js", "line", 1640);
            Whiteboard.prototype.$ = function(selector) {
                _$jscmd("test/runners/test.js", "line", 1641);
                return this.$el.find(selector);
            };
            _$jscmd("test/runners/test.js", "line", 1644);
            Whiteboard.prototype.setBackgroundHTML = function(html) {
                _$jscmd("test/runners/test.js", "line", 1645);
                var $bg, h, w;
                _$jscmd("test/runners/test.js", "line", 1646);
                $bg = this.$(".bg");
                _$jscmd("test/runners/test.js", "line", 1647);
                $bg.html(html);
                _$jscmd("test/runners/test.js", "line", 1648);
                w = $bg.width();
                _$jscmd("test/runners/test.js", "line", 1649);
                h = $bg.height();
                _$jscmd("test/runners/test.js", "line", 1650);
                return this.$svg.css({
                    width: Math.max(w, 640),
                    height: Math.max(h, 480)
                });
            };
            _$jscmd("test/runners/test.js", "line", 1656);
            return Whiteboard;
        }();
        _$jscmd("test/runners/test.js", "line", 1660);
        window.Whiteboard = Whiteboard;
    }, {
        "./gestures/circle-drawing-gesture": 3,
        "./gestures/eraser-gesture": 4,
        "./gestures/free-drawing-gesture": 5,
        "./gestures/grab-gesture": 6,
        "./gestures/line-drawing-gesture": 7,
        "./gestures/rect-drawing-gesture": 8,
        "./history-manager": 9,
        "./templates/whiteboard": 13,
        "./utils/event-emitter": 14,
        "./utils/extend": 15,
        "./utils/utils": 16
    } ],
    18: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1664);
        (function(global) {
            _$jscmd("test/runners/test.js", "line", 1665);
            !function(e) {
                if ("object" == _$jscmd("test/runners/test.js", "cond", "1665_26_14", typeof exports)) module.exports = e(); else if (_$jscmd("test/runners/test.js", "cond", "1665_68_25", "function" == _$jscmd("test/runners/test.js", "cond", "1665_80_13", typeof define)) && _$jscmd("test/runners/test.js", "cond", "1665_95_10", define.amd)) define(e); else {
                    _$jscmd("test/runners/test.js", "line", 1665);
                    var f;
                    _$jscmd("test/runners/test.js", "line", 1665);
                    "undefined" != _$jscmd("test/runners/test.js", "cond", "1665_140_13", typeof window) ? _$jscmd("test/runners/test.js", "cond", "1665_154_8", f = window) : _$jscmd("test/runners/test.js", "cond", "1665_163_70", "undefined" != _$jscmd("test/runners/test.js", "cond", "1665_176_13", typeof global) ? _$jscmd("test/runners/test.js", "cond", "1665_190_8", f = global) : _$jscmd("test/runners/test.js", "cond", "1665_199_34", _$jscmd("test/runners/test.js", "cond", "1665_199_24", "undefined" != _$jscmd("test/runners/test.js", "cond", "1665_212_11", typeof self)) && _$jscmd("test/runners/test.js", "cond", "1665_225_8", f = self))), 
                    f.jade = e();
                }
            }(function() {
                _$jscmd("test/runners/test.js", "line", 1665);
                var define, module, exports;
                _$jscmd("test/runners/test.js", "line", 1665);
                return function e(t, n, r) {
                    function s(o, u) {
                        if (!n[o]) {
                            if (!t[o]) {
                                _$jscmd("test/runners/test.js", "line", 1665);
                                var a = _$jscmd("test/runners/test.js", "cond", "1665_352_26", _$jscmd("test/runners/test.js", "cond", "1665_352_14", typeof require) == "function") && _$jscmd("test/runners/test.js", "cond", "1665_380_7", require);
                                if (_$jscmd("test/runners/test.js", "cond", "1665_391_2", !u) && _$jscmd("test/runners/test.js", "cond", "1665_395_1", a)) return a(o, !0);
                                if (i) return i(o, !0);
                                _$jscmd("test/runners/test.js", "line", 1665);
                                throw new Error(_$jscmd("test/runners/test.js", "cond", "1665_448_24", "Cannot find module '" + _$jscmd("test/runners/test.js", "cond", "1665_471_1", o)) + "'");
                            }
                            _$jscmd("test/runners/test.js", "line", 1665);
                            var f = n[o] = {
                                exports: {}
                            };
                            _$jscmd("test/runners/test.js", "line", 1665);
                            t[o][0].call(f.exports, function(e) {
                                _$jscmd("test/runners/test.js", "line", 1665);
                                var n = t[o][1][e];
                                _$jscmd("test/runners/test.js", "line", 1665);
                                return s(n ? _$jscmd("test/runners/test.js", "cond", "1665_565_1", n) : _$jscmd("test/runners/test.js", "cond", "1665_567_1", e));
                            }, f, f.exports, e, t, n, r);
                        }
                        _$jscmd("test/runners/test.js", "line", 1665);
                        return n[o].exports;
                    }
                    _$jscmd("test/runners/test.js", "line", 1665);
                    var i = _$jscmd("test/runners/test.js", "cond", "1665_618_26", _$jscmd("test/runners/test.js", "cond", "1665_618_14", typeof require) == "function") && _$jscmd("test/runners/test.js", "cond", "1665_646_7", require);
                    for (var o = 0; _$jscmd("test/runners/test.js", "cond", "1665_666_1", o) < _$jscmd("test/runners/test.js", "cond", "1665_668_8", r.length); o++) s(r[o]);
                    _$jscmd("test/runners/test.js", "line", 1665);
                    return s;
                }({
                    1: [ function(_dereq_, module, exports) {
                        _$jscmd("test/runners/test.js", "line", 1666);
                        "use strict";
                        _$jscmd("test/runners/test.js", "line", 1680);
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
                            if (_$jscmd("test/runners/test.js", "cond", "1681_6_16", arguments.length) === 1) {
                                _$jscmd("test/runners/test.js", "line", 1682);
                                var attrs = a[0];
                                for (var i = 1; _$jscmd("test/runners/test.js", "cond", "1683_20_1", i) < _$jscmd("test/runners/test.js", "cond", "1683_24_8", a.length); i++) {
                                    _$jscmd("test/runners/test.js", "line", 1684);
                                    attrs = merge(attrs, a[i]);
                                }
                                _$jscmd("test/runners/test.js", "line", 1686);
                                return attrs;
                            }
                            _$jscmd("test/runners/test.js", "line", 1688);
                            var ac = a["class"];
                            _$jscmd("test/runners/test.js", "line", 1689);
                            var bc = b["class"];
                            if (_$jscmd("test/runners/test.js", "cond", "1691_6_2", ac) || _$jscmd("test/runners/test.js", "cond", "1691_12_2", bc)) {
                                _$jscmd("test/runners/test.js", "line", 1692);
                                ac = _$jscmd("test/runners/test.js", "cond", "1692_9_2", ac) || _$jscmd("test/runners/test.js", "cond", "1692_15_2", []);
                                _$jscmd("test/runners/test.js", "line", 1693);
                                bc = _$jscmd("test/runners/test.js", "cond", "1693_9_2", bc) || _$jscmd("test/runners/test.js", "cond", "1693_15_2", []);
                                if (!Array.isArray(ac)) ac = [ ac ];
                                if (!Array.isArray(bc)) bc = [ bc ];
                                _$jscmd("test/runners/test.js", "line", 1696);
                                a["class"] = ac.concat(bc).filter(nulls);
                            }
                            for (var key in b) {
                                if (_$jscmd("test/runners/test.js", "cond", "1700_8_3", key) != "class") {
                                    _$jscmd("test/runners/test.js", "line", 1701);
                                    a[key] = b[key];
                                }
                            }
                            _$jscmd("test/runners/test.js", "line", 1705);
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
                            _$jscmd("test/runners/test.js", "line", 1717);
                            return _$jscmd("test/runners/test.js", "cond", "1717_9_11", _$jscmd("test/runners/test.js", "cond", "1717_9_3", val) != null) && _$jscmd("test/runners/test.js", "cond", "1717_24_10", _$jscmd("test/runners/test.js", "cond", "1717_24_3", val) !== "");
                        }
                        _$jscmd("test/runners/test.js", "line", 1726);
                        /**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
                        exports.joinClasses = joinClasses;
                        function joinClasses(val) {
                            _$jscmd("test/runners/test.js", "line", 1728);
                            return Array.isArray(val) ? _$jscmd("test/runners/test.js", "cond", "1728_30_44", val.map(joinClasses).filter(nulls).join(" ")) : _$jscmd("test/runners/test.js", "cond", "1728_77_3", val);
                        }
                        _$jscmd("test/runners/test.js", "line", 1738);
                        /**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
                        exports.cls = function cls(classes, escaped) {
                            _$jscmd("test/runners/test.js", "line", 1739);
                            var buf = [];
                            for (var i = 0; _$jscmd("test/runners/test.js", "cond", "1740_18_1", i) < _$jscmd("test/runners/test.js", "cond", "1740_22_14", classes.length); i++) {
                                if (_$jscmd("test/runners/test.js", "cond", "1741_8_7", escaped) && _$jscmd("test/runners/test.js", "cond", "1741_19_10", escaped[i])) {
                                    _$jscmd("test/runners/test.js", "line", 1742);
                                    buf.push(exports.escape(joinClasses([ classes[i] ])));
                                } else {
                                    _$jscmd("test/runners/test.js", "line", 1744);
                                    buf.push(joinClasses(classes[i]));
                                }
                            }
                            _$jscmd("test/runners/test.js", "line", 1747);
                            var text = joinClasses(buf);
                            if (text.length) {
                                _$jscmd("test/runners/test.js", "line", 1749);
                                return _$jscmd("test/runners/test.js", "cond", "1749_11_17", ' class="' + _$jscmd("test/runners/test.js", "cond", "1749_24_4", text)) + '"';
                            } else {
                                _$jscmd("test/runners/test.js", "line", 1751);
                                return "";
                            }
                        };
                        _$jscmd("test/runners/test.js", "line", 1764);
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
                            if (_$jscmd("test/runners/test.js", "cond", "1765_6_23", "boolean" == _$jscmd("test/runners/test.js", "cond", "1765_19_10", typeof val)) || _$jscmd("test/runners/test.js", "cond", "1765_33_11", null == _$jscmd("test/runners/test.js", "cond", "1765_41_3", val))) {
                                if (val) {
                                    _$jscmd("test/runners/test.js", "line", 1767);
                                    return " " + _$jscmd("test/runners/test.js", "cond", "1767_19_38", terse ? _$jscmd("test/runners/test.js", "cond", "1767_28_3", key) : _$jscmd("test/runners/test.js", "cond", "1767_34_22", _$jscmd("test/runners/test.js", "cond", "1767_34_16", _$jscmd("test/runners/test.js", "cond", "1767_34_10", _$jscmd("test/runners/test.js", "cond", "1767_34_3", key) + '="') + _$jscmd("test/runners/test.js", "cond", "1767_47_3", key)) + '"'));
                                } else {
                                    _$jscmd("test/runners/test.js", "line", 1769);
                                    return "";
                                }
                            } else if (_$jscmd("test/runners/test.js", "cond", "1771_13_24", 0 == _$jscmd("test/runners/test.js", "cond", "1771_18_19", key.indexOf("data"))) && _$jscmd("test/runners/test.js", "cond", "1771_41_22", "string" != _$jscmd("test/runners/test.js", "cond", "1771_53_10", typeof val))) {
                                _$jscmd("test/runners/test.js", "line", 1772);
                                return _$jscmd("test/runners/test.js", "cond", "1772_11_62", _$jscmd("test/runners/test.js", "cond", "1772_11_16", _$jscmd("test/runners/test.js", "cond", "1772_11_9", " " + _$jscmd("test/runners/test.js", "cond", "1772_17_3", key)) + "='") + _$jscmd("test/runners/test.js", "cond", "1772_30_43", JSON.stringify(val).replace(/'/g, "&apos;"))) + "'";
                            } else if (escaped) {
                                _$jscmd("test/runners/test.js", "line", 1774);
                                return _$jscmd("test/runners/test.js", "cond", "1774_11_38", _$jscmd("test/runners/test.js", "cond", "1774_11_16", _$jscmd("test/runners/test.js", "cond", "1774_11_9", " " + _$jscmd("test/runners/test.js", "cond", "1774_17_3", key)) + '="') + _$jscmd("test/runners/test.js", "cond", "1774_30_19", exports.escape(val))) + '"';
                            } else {
                                _$jscmd("test/runners/test.js", "line", 1776);
                                return _$jscmd("test/runners/test.js", "cond", "1776_11_22", _$jscmd("test/runners/test.js", "cond", "1776_11_16", _$jscmd("test/runners/test.js", "cond", "1776_11_9", " " + _$jscmd("test/runners/test.js", "cond", "1776_17_3", key)) + '="') + _$jscmd("test/runners/test.js", "cond", "1776_30_3", val)) + '"';
                            }
                        };
                        _$jscmd("test/runners/test.js", "line", 1787);
                        /**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
                        exports.attrs = function attrs(obj, terse) {
                            _$jscmd("test/runners/test.js", "line", 1788);
                            var buf = [];
                            _$jscmd("test/runners/test.js", "line", 1790);
                            var keys = Object.keys(obj);
                            if (keys.length) {
                                for (var i = 0; _$jscmd("test/runners/test.js", "cond", "1793_20_1", i) < _$jscmd("test/runners/test.js", "cond", "1793_24_11", keys.length); ++i) {
                                    _$jscmd("test/runners/test.js", "line", 1794);
                                    var key = keys[i], val = obj[key];
                                    if ("class" == _$jscmd("test/runners/test.js", "cond", "1797_21_3", key)) {
                                        if (val = joinClasses(val)) {
                                            _$jscmd("test/runners/test.js", "line", 1799);
                                            buf.push(_$jscmd("test/runners/test.js", "cond", "1799_19_22", _$jscmd("test/runners/test.js", "cond", "1799_19_16", _$jscmd("test/runners/test.js", "cond", "1799_19_9", " " + _$jscmd("test/runners/test.js", "cond", "1799_25_3", key)) + '="') + _$jscmd("test/runners/test.js", "cond", "1799_38_3", val)) + '"');
                                        }
                                    } else {
                                        _$jscmd("test/runners/test.js", "line", 1802);
                                        buf.push(exports.attr(key, val, false, terse));
                                    }
                                }
                            }
                            _$jscmd("test/runners/test.js", "line", 1807);
                            return buf.join("");
                        };
                        _$jscmd("test/runners/test.js", "line", 1818);
                        /**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */
                        exports.escape = function escape(html) {
                            _$jscmd("test/runners/test.js", "line", 1819);
                            var result = String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                            if (_$jscmd("test/runners/test.js", "cond", "1824_6_6", result) === _$jscmd("test/runners/test.js", "cond", "1824_17_9", "" + _$jscmd("test/runners/test.js", "cond", "1824_22_4", html))) return html; else return result;
                        };
                        _$jscmd("test/runners/test.js", "line", 1838);
                        /**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */
                        exports.rethrow = function rethrow(err, filename, lineno, str) {
                            if (!(_$jscmd("test/runners/test.js", "cond", "1839_8_3", err) instanceof _$jscmd("test/runners/test.js", "cond", "1839_23_5", Error))) throw err;
                            if (_$jscmd("test/runners/test.js", "cond", "1840_6_43", _$jscmd("test/runners/test.js", "cond", "1840_7_28", _$jscmd("test/runners/test.js", "cond", "1840_7_13", typeof window) != "undefined") || _$jscmd("test/runners/test.js", "cond", "1840_39_9", !filename)) && _$jscmd("test/runners/test.js", "cond", "1840_53_4", !str)) {
                                _$jscmd("test/runners/test.js", "line", 1841);
                                err.message += " on line " + _$jscmd("test/runners/test.js", "cond", "1841_33_6", lineno);
                                _$jscmd("test/runners/test.js", "line", 1842);
                                throw err;
                            }
                            try {
                                _$jscmd("test/runners/test.js", "line", 1845);
                                str = _$jscmd("test/runners/test.js", "cond", "1845_10_3", str) || _$jscmd("test/runners/test.js", "cond", "1845_17_44", _dereq_("fs").readFileSync(filename, "utf8"));
                            } catch (ex) {
                                _$jscmd("test/runners/test.js", "line", 1847);
                                rethrow(err, null, lineno);
                            }
                            _$jscmd("test/runners/test.js", "line", 1849);
                            var context = 3, lines = str.split("\n"), start = Math.max(_$jscmd("test/runners/test.js", "cond", "1851_23_6", lineno) - _$jscmd("test/runners/test.js", "cond", "1851_32_7", context), 0), end = Math.min(lines.length, _$jscmd("test/runners/test.js", "cond", "1852_35_6", lineno) + _$jscmd("test/runners/test.js", "cond", "1852_44_7", context));
                            _$jscmd("test/runners/test.js", "line", 1855);
                            // Error context
                            var context = lines.slice(start, end).map(function(line, i) {
                                _$jscmd("test/runners/test.js", "line", 1856);
                                var curr = _$jscmd("test/runners/test.js", "cond", "1856_15_9", _$jscmd("test/runners/test.js", "cond", "1856_15_1", i) + _$jscmd("test/runners/test.js", "cond", "1856_19_5", start)) + 1;
                                _$jscmd("test/runners/test.js", "line", 1857);
                                return _$jscmd("test/runners/test.js", "cond", "1857_11_60", _$jscmd("test/runners/test.js", "cond", "1857_11_47", _$jscmd("test/runners/test.js", "cond", "1857_11_34", _$jscmd("test/runners/test.js", "cond", "1857_12_4", curr) == _$jscmd("test/runners/test.js", "cond", "1857_20_6", lineno) ? _$jscmd("test/runners/test.js", "cond", "1857_29_6", "  > ") : _$jscmd("test/runners/test.js", "cond", "1857_38_6", "    ")) + _$jscmd("test/runners/test.js", "cond", "1858_8_4", curr)) + "| ") + _$jscmd("test/runners/test.js", "cond", "1860_8_4", line);
                            }).join("\n");
                            _$jscmd("test/runners/test.js", "line", 1864);
                            // Alter exception message
                            err.path = filename;
                            _$jscmd("test/runners/test.js", "line", 1865);
                            err.message = _$jscmd("test/runners/test.js", "cond", "1865_16_65", _$jscmd("test/runners/test.js", "cond", "1865_16_56", _$jscmd("test/runners/test.js", "cond", "1865_16_46", _$jscmd("test/runners/test.js", "cond", "1865_16_35", _$jscmd("test/runners/test.js", "cond", "1865_16_26", _$jscmd("test/runners/test.js", "cond", "1865_16_20", _$jscmd("test/runners/test.js", "cond", "1865_17_8", filename) || "Jade") + ":") + _$jscmd("test/runners/test.js", "cond", "1865_45_6", lineno)) + "\n") + _$jscmd("test/runners/test.js", "cond", "1866_13_7", context)) + "\n\n") + _$jscmd("test/runners/test.js", "cond", "1866_32_11", err.message);
                            _$jscmd("test/runners/test.js", "line", 1867);
                            throw err;
                        };
                    }, {
                        fs: 2
                    } ],
                    2: [ function(_dereq_, module, exports) {}, {} ]
                }, {}, [ 1 ])(1);
            });
        }).call(this, _$jscmd("test/runners/test.js", "cond", "1875_13_11", typeof self) !== "undefined" ? _$jscmd("test/runners/test.js", "cond", "1875_43_4", self) : _$jscmd("test/runners/test.js", "cond", "1875_50_43", _$jscmd("test/runners/test.js", "cond", "1875_50_13", typeof window) !== "undefined" ? _$jscmd("test/runners/test.js", "cond", "1875_82_6", window) : _$jscmd("test/runners/test.js", "cond", "1875_91_2", {})));
    }, {} ],
    19: [ function(require, module, exports) {
        if (false) {
            _$jscmd("test/runners/test.js", "line", 1878);
            "Never run";
        }
        if (_$jscmd("test/runners/test.js", "cond", "1881_4_29", _$jscmd("test/runners/test.js", "cond", "1881_4_13", typeof window) !== "undefined") && _$jscmd("test/runners/test.js", "cond", "1881_37_15", _$jscmd("test/runners/test.js", "cond", "1881_37_6", window) !== null)) {
            _$jscmd("test/runners/test.js", "line", 1882);
            window.test_run = function() {
                _$jscmd("test/runners/test.js", "line", 1883);
                require("./whiteboard");
                _$jscmd("test/runners/test.js", "line", 1884);
                return require("./utils/utils");
            };
        }
    }, {
        "./utils/utils": 20,
        "./whiteboard": 21
    } ],
    20: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1890);
        describe("app/utils/utils", function() {
            _$jscmd("test/runners/test.js", "line", 1891);
            return it("should be written");
        });
    }, {} ],
    21: [ function(require, module, exports) {
        _$jscmd("test/runners/test.js", "line", 1896);
        require("../app/whiteboard");
        _$jscmd("test/runners/test.js", "line", 1898);
        describe("app/whiteboard", function() {
            _$jscmd("test/runners/test.js", "line", 1899);
            return it("should be written", function() {
                _$jscmd("test/runners/test.js", "line", 1900);
                return new Whiteboard("body");
            });
        });
    }, {
        "../app/whiteboard": 17
    } ]
}, {}, [ 19 ]);