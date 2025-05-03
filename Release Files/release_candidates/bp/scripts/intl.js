const exports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/intl/lib/core.js
  var require_core = __commonJS({
    "node_modules/intl/lib/core.js"(exports, module) {
      "use strict";
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var jsx = function() {
        var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
        return function createRawReactElement(type, props, key, children) {
          var defaultProps = type && type.defaultProps;
          var childrenLength = arguments.length - 3;
          if (!props && childrenLength !== 0) {
            props = {};
          }
          if (props && defaultProps) {
            for (var propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          } else if (!props) {
            props = defaultProps || {};
          }
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 3];
            }
            props.children = childArray;
          }
          return {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key: key === void 0 ? null : "" + key,
            ref: null,
            props,
            _owner: null
          };
        };
      }();
      var asyncToGenerator = function(fn) {
        return function() {
          var gen = fn.apply(this, arguments);
          return new Promise(function(resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }
              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function(value2) {
                  return step("next", value2);
                }, function(err) {
                  return step("throw", err);
                });
              }
            }
            return step("next");
          });
        };
      };
      var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var createClass = /* @__PURE__ */ function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var defineEnumerableProperties = function(obj, descs) {
        for (var key in descs) {
          var desc = descs[key];
          desc.configurable = desc.enumerable = true;
          if ("value" in desc) desc.writable = true;
          Object.defineProperty(obj, key, desc);
        }
        return obj;
      };
      var defaults = function(obj, defaults2) {
        var keys = Object.getOwnPropertyNames(defaults2);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = Object.getOwnPropertyDescriptor(defaults2, key);
          if (value && value.configurable && obj[key] === void 0) {
            Object.defineProperty(obj, key, value);
          }
        }
        return obj;
      };
      var defineProperty$1 = function(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      };
      var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      var get = function get2(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === void 0) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return void 0;
          } else {
            return get2(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === void 0) {
            return void 0;
          }
          return getter.call(receiver);
        }
      };
      var inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };
      var _instanceof = function(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return right[Symbol.hasInstance](left);
        } else {
          return left instanceof right;
        }
      };
      var interopRequireDefault = function(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      };
      var interopRequireWildcard = function(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      };
      var newArrowCheck = function(innerThis, boundThis) {
        if (innerThis !== boundThis) {
          throw new TypeError("Cannot instantiate an arrow function");
        }
      };
      var objectDestructuringEmpty = function(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
      };
      var objectWithoutProperties = function(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0) continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          target[i] = obj[i];
        }
        return target;
      };
      var possibleConstructorReturn = function(self2, call) {
        if (!self2) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self2;
      };
      var selfGlobal = globalThis;
      var set = function set2(object, property, value, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === void 0) {
          var parent = Object.getPrototypeOf(object);
          if (parent !== null) {
            set2(parent, property, value, receiver);
          }
        } else if ("value" in desc && desc.writable) {
          desc.value = value;
        } else {
          var setter = desc.set;
          if (setter !== void 0) {
            setter.call(receiver, value);
          }
        }
        return value;
      };
      var slicedToArray = /* @__PURE__ */ function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var slicedToArrayLoose = function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          var _arr = [];
          for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done; ) {
            _arr.push(_step.value);
            if (i && _arr.length === i) break;
          }
          return _arr;
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
      var taggedTemplateLiteral = function(strings, raw) {
        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      };
      var taggedTemplateLiteralLoose = function(strings, raw) {
        strings.raw = raw;
        return strings;
      };
      var temporalRef = function(val, name, undef) {
        if (val === undef) {
          throw new ReferenceError(name + " is not defined - temporal dead zone");
        } else {
          return val;
        }
      };
      var temporalUndefined = {};
      var toArray = function(arr) {
        return Array.isArray(arr) ? arr : Array.from(arr);
      };
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var babelHelpers$1 = Object.freeze({
        jsx,
        asyncToGenerator,
        classCallCheck,
        createClass,
        defineEnumerableProperties,
        defaults,
        defineProperty: defineProperty$1,
        get,
        inherits,
        interopRequireDefault,
        interopRequireWildcard,
        newArrowCheck,
        objectDestructuringEmpty,
        objectWithoutProperties,
        possibleConstructorReturn,
        selfGlobal,
        set,
        slicedToArray,
        slicedToArrayLoose,
        taggedTemplateLiteral,
        taggedTemplateLiteralLoose,
        temporalRef,
        temporalUndefined,
        toArray,
        toConsumableArray,
        typeof: _typeof,
        extends: _extends,
        instanceof: _instanceof
      });
      var realDefineProp = function() {
        var sentinel = function sentinel2() {
        };
        try {
          Object.defineProperty(sentinel, "a", {
            get: function get2() {
              return 1;
            }
          });
          Object.defineProperty(sentinel, "prototype", { writable: false });
          return sentinel.a === 1 && sentinel.prototype instanceof Object;
        } catch (e) {
          return false;
        }
      }();
      var es3 = !realDefineProp && !Object.prototype.__defineGetter__;
      var hop = Object.prototype.hasOwnProperty;
      var defineProperty = realDefineProp ? Object.defineProperty : function(obj, name, desc) {
        if ("get" in desc && obj.__defineGetter__) obj.__defineGetter__(name, desc.get);
        else if (!hop.call(obj, name) || "value" in desc) obj[name] = desc.value;
      };
      var arrIndexOf = Array.prototype.indexOf || function(search) {
        var t = this;
        if (!t.length) return -1;
        for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
          if (t[i] === search) return i;
        }
        return -1;
      };
      var objCreate = Object.create || function(proto, props) {
        var obj = void 0;
        function F() {
        }
        F.prototype = proto;
        obj = new F();
        for (var k in props) {
          if (hop.call(props, k)) defineProperty(obj, k, props[k]);
        }
        return obj;
      };
      var arrSlice = Array.prototype.slice;
      var arrConcat = Array.prototype.concat;
      var arrPush = Array.prototype.push;
      var arrJoin = Array.prototype.join;
      var arrShift = Array.prototype.shift;
      var fnBind = Function.prototype.bind || function(thisObj) {
        var fn = this, args = arrSlice.call(arguments, 1);
        if (fn.length === 1) {
          return function() {
            return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
          };
        }
        return function() {
          return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
        };
      };
      var internals = objCreate(null);
      var secret = Math.random();
      function log10Floor(n) {
        if (typeof Math.log10 === "function") return Math.floor(Math.log10(n));
        var x = Math.round(Math.log(n) * Math.LOG10E);
        return x - (Number("1e" + x) > n);
      }
      function Record(obj) {
        for (var k in obj) {
          if (obj instanceof Record || hop.call(obj, k)) defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
        }
      }
      Record.prototype = objCreate(null);
      function List() {
        defineProperty(this, "length", { writable: true, value: 0 });
        if (arguments.length) arrPush.apply(this, arrSlice.call(arguments));
      }
      List.prototype = objCreate(null);
      function createRegExpRestore() {
        if (internals.disableRegExpRestore) {
          return function() {
          };
        }
        var regExpCache = {
          lastMatch: RegExp.lastMatch || "",
          leftContext: RegExp.leftContext,
          multiline: RegExp.multiline,
          input: RegExp.input
        }, has = false;
        for (var i = 1; i <= 9; i++) {
          has = (regExpCache["$" + i] = RegExp["$" + i]) || has;
        }
        return function() {
          var esc = /[.?*+^$[\]\\(){}|-]/g, lm = regExpCache.lastMatch.replace(esc, "\\$&"), reg = new List();
          if (has) {
            for (var _i = 1; _i <= 9; _i++) {
              var m = regExpCache["$" + _i];
              if (!m) lm = "()" + lm;
              else {
                m = m.replace(esc, "\\$&");
                lm = lm.replace(m, "(" + m + ")");
              }
              arrPush.call(reg, lm.slice(0, lm.indexOf("(") + 1));
              lm = lm.slice(lm.indexOf("(") + 1);
            }
          }
          var exprStr = arrJoin.call(reg, "") + lm;
          exprStr = exprStr.replace(/(\\\(|\\\)|[^()])+/g, function(match) {
            return "[\\s\\S]{" + match.replace("\\", "").length + "}";
          });
          var expr = new RegExp(exprStr, regExpCache.multiline ? "gm" : "g");
          expr.lastIndex = regExpCache.leftContext?.length;
          expr.exec(regExpCache.input);
        };
      }
      function toObject(arg) {
        if (arg === null) throw new TypeError("Cannot convert null or undefined to object");
        if ((typeof arg === "undefined" ? "undefined" : babelHelpers$1["typeof"](arg)) === "object") return arg;
        return Object(arg);
      }
      function toNumber(arg) {
        if (typeof arg === "number") return arg;
        return Number(arg);
      }
      function toInteger(arg) {
        var number = toNumber(arg);
        if (isNaN(number)) return 0;
        if (number === 0 || number === -0 || number === Infinity || number === -Infinity) return number;
        if (number < 0) return Math.floor(Math.abs(number)) * -1;
        return Math.floor(Math.abs(number));
      }
      function toLength(arg) {
        var len = toInteger(arg);
        if (len <= 0) return 0;
        if (len === Infinity) return Math.pow(2, 53) - 1;
        return Math.min(len, Math.pow(2, 53) - 1);
      }
      function getInternalProperties(obj) {
        if (hop.call(obj, "__getInternalProperties")) return obj.__getInternalProperties(secret);
        return objCreate(null);
      }
      var extlang = "[a-z]{3}(?:-[a-z]{3}){0,2}";
      var language = "(?:[a-z]{2,3}(?:-" + extlang + ")?|[a-z]{4}|[a-z]{5,8})";
      var script = "[a-z]{4}";
      var region = "(?:[a-z]{2}|\\d{3})";
      var variant = "(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})";
      var singleton = "[0-9a-wy-z]";
      var extension = singleton + "(?:-[a-z0-9]{2,8})+";
      var privateuse = "x(?:-[a-z0-9]{1,8})+";
      var irregular = "(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))";
      var regular = "(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-(?:guoyu|hakka|min|min-nan|xiang))";
      var grandfathered = "(?:" + irregular + "|" + regular + ")";
      var langtag = language + "(?:-" + script + ")?(?:-" + region + ")?(?:-" + variant + ")*(?:-" + extension + ")*(?:-" + privateuse + ")?";
      var expBCP47Syntax = RegExp("^(?:" + langtag + "|" + privateuse + "|" + grandfathered + ")$", "i");
      var expVariantDupes = RegExp("^(?!x).*?-(" + variant + ")-(?:\\w{4,8}-(?!x-))*\\1\\b", "i");
      var expSingletonDupes = RegExp("^(?!x).*?-(" + singleton + ")-(?:\\w+-(?!x-))*\\1\\b", "i");
      var expExtSequences = RegExp("-" + extension, "ig");
      var defaultLocale = void 0;
      function setDefaultLocale(locale) {
        defaultLocale = locale;
      }
      var redundantTags = {
        tags: {
          "art-lojban": "jbo",
          "i-ami": "ami",
          "i-bnn": "bnn",
          "i-hak": "hak",
          "i-klingon": "tlh",
          "i-lux": "lb",
          "i-navajo": "nv",
          "i-pwn": "pwn",
          "i-tao": "tao",
          "i-tay": "tay",
          "i-tsu": "tsu",
          "no-bok": "nb",
          "no-nyn": "nn",
          "sgn-BE-FR": "sfb",
          "sgn-BE-NL": "vgt",
          "sgn-CH-DE": "sgg",
          "zh-guoyu": "cmn",
          "zh-hakka": "hak",
          "zh-min-nan": "nan",
          "zh-xiang": "hsn",
          "sgn-BR": "bzs",
          "sgn-CO": "csn",
          "sgn-DE": "gsg",
          "sgn-DK": "dsl",
          "sgn-ES": "ssp",
          "sgn-FR": "fsl",
          "sgn-GB": "bfi",
          "sgn-GR": "gss",
          "sgn-IE": "isg",
          "sgn-IT": "ise",
          "sgn-JP": "jsl",
          "sgn-MX": "mfs",
          "sgn-NI": "ncs",
          "sgn-NL": "dse",
          "sgn-NO": "nsl",
          "sgn-PT": "psr",
          "sgn-SE": "swl",
          "sgn-US": "ase",
          "sgn-ZA": "sfs",
          "zh-cmn": "cmn",
          "zh-cmn-Hans": "cmn-Hans",
          "zh-cmn-Hant": "cmn-Hant",
          "zh-gan": "gan",
          "zh-wuu": "wuu",
          "zh-yue": "yue"
        },
        subtags: {
          BU: "MM",
          DD: "DE",
          FX: "FR",
          TP: "TL",
          YD: "YE",
          ZR: "CD",
          heploc: "alalc97",
          "in": "id",
          iw: "he",
          ji: "yi",
          jw: "jv",
          mo: "ro",
          ayx: "nun",
          bjd: "drl",
          ccq: "rki",
          cjr: "mom",
          cka: "cmr",
          cmk: "xch",
          drh: "khk",
          drw: "prs",
          gav: "dev",
          hrr: "jal",
          ibi: "opa",
          kgh: "kml",
          lcq: "ppr",
          mst: "mry",
          myt: "mry",
          sca: "hle",
          tie: "ras",
          tkk: "twm",
          tlw: "weo",
          tnf: "prs",
          ybd: "rki",
          yma: "lrr"
        },
        extLang: {
          aao: ["aao", "ar"],
          abh: ["abh", "ar"],
          abv: ["abv", "ar"],
          acm: ["acm", "ar"],
          acq: ["acq", "ar"],
          acw: ["acw", "ar"],
          acx: ["acx", "ar"],
          acy: ["acy", "ar"],
          adf: ["adf", "ar"],
          ads: ["ads", "sgn"],
          aeb: ["aeb", "ar"],
          aec: ["aec", "ar"],
          aed: ["aed", "sgn"],
          aen: ["aen", "sgn"],
          afb: ["afb", "ar"],
          afg: ["afg", "sgn"],
          ajp: ["ajp", "ar"],
          apc: ["apc", "ar"],
          apd: ["apd", "ar"],
          arb: ["arb", "ar"],
          arq: ["arq", "ar"],
          ars: ["ars", "ar"],
          ary: ["ary", "ar"],
          arz: ["arz", "ar"],
          ase: ["ase", "sgn"],
          asf: ["asf", "sgn"],
          asp: ["asp", "sgn"],
          asq: ["asq", "sgn"],
          asw: ["asw", "sgn"],
          auz: ["auz", "ar"],
          avl: ["avl", "ar"],
          ayh: ["ayh", "ar"],
          ayl: ["ayl", "ar"],
          ayn: ["ayn", "ar"],
          ayp: ["ayp", "ar"],
          bbz: ["bbz", "ar"],
          bfi: ["bfi", "sgn"],
          bfk: ["bfk", "sgn"],
          bjn: ["bjn", "ms"],
          bog: ["bog", "sgn"],
          bqn: ["bqn", "sgn"],
          bqy: ["bqy", "sgn"],
          btj: ["btj", "ms"],
          bve: ["bve", "ms"],
          bvl: ["bvl", "sgn"],
          bvu: ["bvu", "ms"],
          bzs: ["bzs", "sgn"],
          cdo: ["cdo", "zh"],
          cds: ["cds", "sgn"],
          cjy: ["cjy", "zh"],
          cmn: ["cmn", "zh"],
          coa: ["coa", "ms"],
          cpx: ["cpx", "zh"],
          csc: ["csc", "sgn"],
          csd: ["csd", "sgn"],
          cse: ["cse", "sgn"],
          csf: ["csf", "sgn"],
          csg: ["csg", "sgn"],
          csl: ["csl", "sgn"],
          csn: ["csn", "sgn"],
          csq: ["csq", "sgn"],
          csr: ["csr", "sgn"],
          czh: ["czh", "zh"],
          czo: ["czo", "zh"],
          doq: ["doq", "sgn"],
          dse: ["dse", "sgn"],
          dsl: ["dsl", "sgn"],
          dup: ["dup", "ms"],
          ecs: ["ecs", "sgn"],
          esl: ["esl", "sgn"],
          esn: ["esn", "sgn"],
          eso: ["eso", "sgn"],
          eth: ["eth", "sgn"],
          fcs: ["fcs", "sgn"],
          fse: ["fse", "sgn"],
          fsl: ["fsl", "sgn"],
          fss: ["fss", "sgn"],
          gan: ["gan", "zh"],
          gds: ["gds", "sgn"],
          gom: ["gom", "kok"],
          gse: ["gse", "sgn"],
          gsg: ["gsg", "sgn"],
          gsm: ["gsm", "sgn"],
          gss: ["gss", "sgn"],
          gus: ["gus", "sgn"],
          hab: ["hab", "sgn"],
          haf: ["haf", "sgn"],
          hak: ["hak", "zh"],
          hds: ["hds", "sgn"],
          hji: ["hji", "ms"],
          hks: ["hks", "sgn"],
          hos: ["hos", "sgn"],
          hps: ["hps", "sgn"],
          hsh: ["hsh", "sgn"],
          hsl: ["hsl", "sgn"],
          hsn: ["hsn", "zh"],
          icl: ["icl", "sgn"],
          ils: ["ils", "sgn"],
          inl: ["inl", "sgn"],
          ins: ["ins", "sgn"],
          ise: ["ise", "sgn"],
          isg: ["isg", "sgn"],
          isr: ["isr", "sgn"],
          jak: ["jak", "ms"],
          jax: ["jax", "ms"],
          jcs: ["jcs", "sgn"],
          jhs: ["jhs", "sgn"],
          jls: ["jls", "sgn"],
          jos: ["jos", "sgn"],
          jsl: ["jsl", "sgn"],
          jus: ["jus", "sgn"],
          kgi: ["kgi", "sgn"],
          knn: ["knn", "kok"],
          kvb: ["kvb", "ms"],
          kvk: ["kvk", "sgn"],
          kvr: ["kvr", "ms"],
          kxd: ["kxd", "ms"],
          lbs: ["lbs", "sgn"],
          lce: ["lce", "ms"],
          lcf: ["lcf", "ms"],
          liw: ["liw", "ms"],
          lls: ["lls", "sgn"],
          lsg: ["lsg", "sgn"],
          lsl: ["lsl", "sgn"],
          lso: ["lso", "sgn"],
          lsp: ["lsp", "sgn"],
          lst: ["lst", "sgn"],
          lsy: ["lsy", "sgn"],
          ltg: ["ltg", "lv"],
          lvs: ["lvs", "lv"],
          lzh: ["lzh", "zh"],
          max: ["max", "ms"],
          mdl: ["mdl", "sgn"],
          meo: ["meo", "ms"],
          mfa: ["mfa", "ms"],
          mfb: ["mfb", "ms"],
          mfs: ["mfs", "sgn"],
          min: ["min", "ms"],
          mnp: ["mnp", "zh"],
          mqg: ["mqg", "ms"],
          mre: ["mre", "sgn"],
          msd: ["msd", "sgn"],
          msi: ["msi", "ms"],
          msr: ["msr", "sgn"],
          mui: ["mui", "ms"],
          mzc: ["mzc", "sgn"],
          mzg: ["mzg", "sgn"],
          mzy: ["mzy", "sgn"],
          nan: ["nan", "zh"],
          nbs: ["nbs", "sgn"],
          ncs: ["ncs", "sgn"],
          nsi: ["nsi", "sgn"],
          nsl: ["nsl", "sgn"],
          nsp: ["nsp", "sgn"],
          nsr: ["nsr", "sgn"],
          nzs: ["nzs", "sgn"],
          okl: ["okl", "sgn"],
          orn: ["orn", "ms"],
          ors: ["ors", "ms"],
          pel: ["pel", "ms"],
          pga: ["pga", "ar"],
          pks: ["pks", "sgn"],
          prl: ["prl", "sgn"],
          prz: ["prz", "sgn"],
          psc: ["psc", "sgn"],
          psd: ["psd", "sgn"],
          pse: ["pse", "ms"],
          psg: ["psg", "sgn"],
          psl: ["psl", "sgn"],
          pso: ["pso", "sgn"],
          psp: ["psp", "sgn"],
          psr: ["psr", "sgn"],
          pys: ["pys", "sgn"],
          rms: ["rms", "sgn"],
          rsi: ["rsi", "sgn"],
          rsl: ["rsl", "sgn"],
          sdl: ["sdl", "sgn"],
          sfb: ["sfb", "sgn"],
          sfs: ["sfs", "sgn"],
          sgg: ["sgg", "sgn"],
          sgx: ["sgx", "sgn"],
          shu: ["shu", "ar"],
          slf: ["slf", "sgn"],
          sls: ["sls", "sgn"],
          sqk: ["sqk", "sgn"],
          sqs: ["sqs", "sgn"],
          ssh: ["ssh", "ar"],
          ssp: ["ssp", "sgn"],
          ssr: ["ssr", "sgn"],
          svk: ["svk", "sgn"],
          swc: ["swc", "sw"],
          swh: ["swh", "sw"],
          swl: ["swl", "sgn"],
          syy: ["syy", "sgn"],
          tmw: ["tmw", "ms"],
          tse: ["tse", "sgn"],
          tsm: ["tsm", "sgn"],
          tsq: ["tsq", "sgn"],
          tss: ["tss", "sgn"],
          tsy: ["tsy", "sgn"],
          tza: ["tza", "sgn"],
          ugn: ["ugn", "sgn"],
          ugy: ["ugy", "sgn"],
          ukl: ["ukl", "sgn"],
          uks: ["uks", "sgn"],
          urk: ["urk", "ms"],
          uzn: ["uzn", "uz"],
          uzs: ["uzs", "uz"],
          vgt: ["vgt", "sgn"],
          vkk: ["vkk", "ms"],
          vkt: ["vkt", "ms"],
          vsi: ["vsi", "sgn"],
          vsl: ["vsl", "sgn"],
          vsv: ["vsv", "sgn"],
          wuu: ["wuu", "zh"],
          xki: ["xki", "sgn"],
          xml: ["xml", "sgn"],
          xmm: ["xmm", "ms"],
          xms: ["xms", "sgn"],
          yds: ["yds", "sgn"],
          ysl: ["ysl", "sgn"],
          yue: ["yue", "zh"],
          zib: ["zib", "sgn"],
          zlm: ["zlm", "ms"],
          zmi: ["zmi", "ms"],
          zsl: ["zsl", "sgn"],
          zsm: ["zsm", "ms"]
        }
      };
      function toLatinUpperCase(str) {
        var i = str.length;
        while (i--) {
          var ch = str.charAt(i);
          if (ch >= "a" && ch <= "z") str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
        }
        return str;
      }
      function IsStructurallyValidLanguageTag(locale) {
        if (!expBCP47Syntax.test(locale)) return false;
        if (expVariantDupes.test(locale)) return false;
        if (expSingletonDupes.test(locale)) return false;
        return true;
      }
      function CanonicalizeLanguageTag(locale) {
        var match = void 0, parts = void 0;
        locale = locale.toLowerCase();
        parts = locale.split("-");
        for (var i = 1, max = parts.length; i < max; i++) {
          if (parts[i].length === 2) parts[i] = parts[i].toUpperCase();
          else if (parts[i].length === 4) parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
          else if (parts[i].length === 1 && parts[i] !== "x") break;
        }
        locale = arrJoin.call(parts, "-");
        if ((match = locale.match(expExtSequences)) && match.length > 1) {
          match.sort();
          locale = locale.replace(RegExp("(?:" + expExtSequences.source + ")+", "i"), arrJoin.call(match, ""));
        }
        if (hop.call(redundantTags.tags, locale)) locale = redundantTags.tags[locale];
        parts = locale.split("-");
        for (var _i = 1, _max = parts.length; _i < _max; _i++) {
          if (hop.call(redundantTags.subtags, parts[_i])) parts[_i] = redundantTags.subtags[parts[_i]];
          else if (hop.call(redundantTags.extLang, parts[_i])) {
            parts[_i] = redundantTags.extLang[parts[_i]][0];
            if (_i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
              parts = arrSlice.call(parts, _i++);
              _max -= 1;
            }
          }
        }
        return arrJoin.call(parts, "-");
      }
      function DefaultLocale() {
        return defaultLocale;
      }
      var expCurrencyCode = /^[A-Z]{3}$/;
      function IsWellFormedCurrencyCode(currency) {
        var c = String(currency);
        var normalized = toLatinUpperCase(c);
        if (expCurrencyCode.test(normalized) === false) return false;
        return true;
      }
      var expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi;
      function CanonicalizeLocaleList(locales) {
        if (locales === void 0) return new List();
        var seen = new List();
        locales = typeof locales === "string" ? [locales] : locales;
        var O = toObject(locales);
        var len = toLength(O.length);
        var k = 0;
        while (k < len) {
          var Pk = String(k);
          var kPresent = Pk in O;
          if (kPresent) {
            var kValue = O[Pk];
            if (kValue === null || typeof kValue !== "string" && (typeof kValue === "undefined" ? "undefined" : babelHelpers$1["typeof"](kValue)) !== "object") throw new TypeError("String or Object type expected");
            var tag = String(kValue);
            if (!IsStructurallyValidLanguageTag(tag)) throw new RangeError("'" + tag + "' is not a structurally valid language tag");
            tag = CanonicalizeLanguageTag(tag);
            if (arrIndexOf.call(seen, tag) === -1) arrPush.call(seen, tag);
          }
          k++;
        }
        return seen;
      }
      function BestAvailableLocale(availableLocales, locale) {
        var candidate = locale;
        while (candidate) {
          if (arrIndexOf.call(availableLocales, candidate) > -1) return candidate;
          var pos = candidate.lastIndexOf("-");
          if (pos < 0) return;
          if (pos >= 2 && candidate.charAt(pos - 2) === "-") pos -= 2;
          candidate = candidate.substring(0, pos);
        }
      }
      function LookupMatcher(availableLocales, requestedLocales) {
        var i = 0;
        var len = requestedLocales.length;
        var availableLocale = void 0;
        var locale = void 0, noExtensionsLocale = void 0;
        while (i < len && !availableLocale) {
          locale = requestedLocales[i];
          noExtensionsLocale = String(locale).replace(expUnicodeExSeq, "");
          availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
          i++;
        }
        var result = new Record();
        if (availableLocale !== void 0) {
          result["[[locale]]"] = availableLocale;
          if (String(locale) !== String(noExtensionsLocale)) {
            var extension2 = locale.match(expUnicodeExSeq)[0];
            var extensionIndex = locale.indexOf("-u-");
            result["[[extension]]"] = extension2;
            result["[[extensionIndex]]"] = extensionIndex;
          }
        } else
          result["[[locale]]"] = DefaultLocale();
        return result;
      }
      function BestFitMatcher(availableLocales, requestedLocales) {
        return LookupMatcher(availableLocales, requestedLocales);
      }
      function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
        if (availableLocales.length === 0) {
          throw new ReferenceError("No locale data has been provided for this object yet.");
        }
        var matcher = options["[[localeMatcher]]"];
        var r = void 0;
        if (matcher === "lookup")
          r = LookupMatcher(availableLocales, requestedLocales);
        else
          r = BestFitMatcher(availableLocales, requestedLocales);
        var foundLocale = r["[[locale]]"];
        var extensionSubtags = void 0, extensionSubtagsLength = void 0;
        if (hop.call(r, "[[extension]]")) {
          var extension2 = r["[[extension]]"];
          var split = String.prototype.split;
          extensionSubtags = split.call(extension2, "-");
          extensionSubtagsLength = extensionSubtags.length;
        }
        var result = new Record();
        result["[[dataLocale]]"] = foundLocale;
        var supportedExtension = "-u";
        var i = 0;
        var len = relevantExtensionKeys.length;
        while (i < len) {
          var key = relevantExtensionKeys[i];
          var foundLocaleData = localeData[foundLocale];
          var keyLocaleData = foundLocaleData[key];
          var value = keyLocaleData["0"];
          var supportedExtensionAddition = "";
          var indexOf = arrIndexOf;
          if (extensionSubtags !== void 0) {
            var keyPos = indexOf.call(extensionSubtags, key);
            if (keyPos !== -1) {
              if (keyPos + 1 < extensionSubtagsLength && extensionSubtags[keyPos + 1].length > 2) {
                var requestedValue = extensionSubtags[keyPos + 1];
                var valuePos = indexOf.call(keyLocaleData, requestedValue);
                if (valuePos !== -1) {
                  value = requestedValue, // ii. Let supportedExtensionAddition be the
                  //     concatenation of "-", key, "-", and value.
                  supportedExtensionAddition = "-" + key + "-" + value;
                }
              } else {
                var _valuePos = indexOf(keyLocaleData, "true");
                if (_valuePos !== -1)
                  value = "true";
              }
            }
          }
          if (hop.call(options, "[[" + key + "]]")) {
            var optionsValue = options["[[" + key + "]]"];
            if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
              if (optionsValue !== value) {
                value = optionsValue;
                supportedExtensionAddition = "";
              }
            }
          }
          result["[[" + key + "]]"] = value;
          supportedExtension += supportedExtensionAddition;
          i++;
        }
        if (supportedExtension.length > 2) {
          var privateIndex = foundLocale.indexOf("-x-");
          if (privateIndex === -1) {
            foundLocale = foundLocale + supportedExtension;
          } else {
            var preExtension = foundLocale.substring(0, privateIndex);
            var postExtension = foundLocale.substring(privateIndex);
            foundLocale = preExtension + supportedExtension + postExtension;
          }
          foundLocale = CanonicalizeLanguageTag(foundLocale);
        }
        result["[[locale]]"] = foundLocale;
        return result;
      }
      function LookupSupportedLocales(availableLocales, requestedLocales) {
        var len = requestedLocales.length;
        var subset = new List();
        var k = 0;
        while (k < len) {
          var locale = requestedLocales[k];
          var noExtensionsLocale = String(locale).replace(expUnicodeExSeq, "");
          var availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
          if (availableLocale !== void 0) arrPush.call(subset, locale);
          k++;
        }
        var subsetArray = arrSlice.call(subset);
        return subsetArray;
      }
      function BestFitSupportedLocales(availableLocales, requestedLocales) {
        return LookupSupportedLocales(availableLocales, requestedLocales);
      }
      function SupportedLocales(availableLocales, requestedLocales, options) {
        var matcher = void 0, subset = void 0;
        if (options !== void 0) {
          options = new Record(toObject(options));
          matcher = options.localeMatcher;
          if (matcher !== void 0) {
            matcher = String(matcher);
            if (matcher !== "lookup" && matcher !== "best fit") throw new RangeError('matcher should be "lookup" or "best fit"');
          }
        }
        if (matcher === void 0 || matcher === "best fit")
          subset = BestFitSupportedLocales(availableLocales, requestedLocales);
        else
          subset = LookupSupportedLocales(availableLocales, requestedLocales);
        for (var P in subset) {
          if (!hop.call(subset, P)) continue;
          defineProperty(subset, P, {
            writable: false,
            configurable: false,
            value: subset[P]
          });
        }
        defineProperty(subset, "length", { writable: false });
        return subset;
      }
      function GetOption(options, property, type, values, fallback) {
        var value = options[property];
        if (value !== void 0) {
          value = type === "boolean" ? Boolean(value) : type === "string" ? String(value) : value;
          if (values !== void 0) {
            if (arrIndexOf.call(values, value) === -1) throw new RangeError("'" + value + "' is not an allowed value for `" + property + "`");
          }
          return value;
        }
        return fallback;
      }
      function GetNumberOption(options, property, minimum, maximum, fallback) {
        var value = options[property];
        if (value !== void 0) {
          value = Number(value);
          if (isNaN(value) || value < minimum || value > maximum) throw new RangeError("Value is not a number or outside accepted range");
          return Math.floor(value);
        }
        return fallback;
      }
      var Intl = {};
      function getCanonicalLocales(locales) {
        var ll = CanonicalizeLocaleList(locales);
        {
          var result = [];
          var len = ll.length;
          var k = 0;
          while (k < len) {
            result[k] = ll[k];
            k++;
          }
          return result;
        }
      }
      Object.defineProperty(Intl, "getCanonicalLocales", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: getCanonicalLocales
      });
      var currencyMinorUnits = {
        BHD: 3,
        BYR: 0,
        XOF: 0,
        BIF: 0,
        XAF: 0,
        CLF: 4,
        CLP: 0,
        KMF: 0,
        DJF: 0,
        XPF: 0,
        GNF: 0,
        ISK: 0,
        IQD: 3,
        JPY: 0,
        JOD: 3,
        KRW: 0,
        KWD: 3,
        LYD: 3,
        OMR: 3,
        PYG: 0,
        RWF: 0,
        TND: 3,
        UGX: 0,
        UYI: 0,
        VUV: 0,
        VND: 0
      };
      function NumberFormatConstructor() {
        var locales = arguments[0];
        var options = arguments[1];
        if (!this || this === Intl) {
          return new Intl.NumberFormat(locales, options);
        }
        return InitializeNumberFormat(toObject(this), locales, options);
      }
      defineProperty(Intl, "NumberFormat", {
        configurable: true,
        writable: true,
        value: NumberFormatConstructor
      });
      defineProperty(Intl.NumberFormat, "prototype", {
        writable: false
      });
      function InitializeNumberFormat(numberFormat, locales, options) {
        var internal = getInternalProperties(numberFormat);
        var regexpRestore = createRegExpRestore();
        if (internal["[[initializedIntlObject]]"] === true) throw new TypeError("`this` object has already been initialized as an Intl object");
        defineProperty(numberFormat, "__getInternalProperties", {
          value: function value() {
            if (arguments[0] === secret) return internal;
          }
        });
        internal["[[initializedIntlObject]]"] = true;
        var requestedLocales = CanonicalizeLocaleList(locales);
        if (options === void 0)
          options = {};
        else
          options = toObject(options);
        var opt = new Record(), matcher = GetOption(options, "localeMatcher", "string", new List("lookup", "best fit"), "best fit");
        opt["[[localeMatcher]]"] = matcher;
        var localeData = internals.NumberFormat["[[localeData]]"];
        var r = ResolveLocale(internals.NumberFormat["[[availableLocales]]"], requestedLocales, opt, internals.NumberFormat["[[relevantExtensionKeys]]"], localeData);
        internal["[[locale]]"] = r["[[locale]]"];
        internal["[[numberingSystem]]"] = r["[[nu]]"];
        internal["[[dataLocale]]"] = r["[[dataLocale]]"];
        var dataLocale = r["[[dataLocale]]"];
        var s = GetOption(options, "style", "string", new List("decimal", "percent", "currency"), "decimal");
        internal["[[style]]"] = s;
        var c = GetOption(options, "currency", "string");
        if (c !== void 0 && !IsWellFormedCurrencyCode(c)) throw new RangeError("'" + c + "' is not a valid currency code");
        if (s === "currency" && c === void 0) throw new TypeError("Currency code is required when style is currency");
        var cDigits = void 0;
        if (s === "currency") {
          c = c.toUpperCase();
          internal["[[currency]]"] = c;
          cDigits = CurrencyDigits(c);
        }
        var cd = GetOption(options, "currencyDisplay", "string", new List("code", "symbol", "name"), "symbol");
        if (s === "currency") internal["[[currencyDisplay]]"] = cd;
        var mnid = GetNumberOption(options, "minimumIntegerDigits", 1, 21, 1);
        internal["[[minimumIntegerDigits]]"] = mnid;
        var mnfdDefault = s === "currency" ? cDigits : 0;
        var mnfd = GetNumberOption(options, "minimumFractionDigits", 0, 20, mnfdDefault);
        internal["[[minimumFractionDigits]]"] = mnfd;
        var mxfdDefault = s === "currency" ? Math.max(mnfd, cDigits) : s === "percent" ? Math.max(mnfd, 0) : Math.max(mnfd, 3);
        var mxfd = GetNumberOption(options, "maximumFractionDigits", mnfd, 20, mxfdDefault);
        internal["[[maximumFractionDigits]]"] = mxfd;
        var mnsd = options.minimumSignificantDigits;
        var mxsd = options.maximumSignificantDigits;
        if (mnsd !== void 0 || mxsd !== void 0) {
          mnsd = GetNumberOption(options, "minimumSignificantDigits", 1, 21, 1);
          mxsd = GetNumberOption(options, "maximumSignificantDigits", mnsd, 21, 21);
          internal["[[minimumSignificantDigits]]"] = mnsd;
          internal["[[maximumSignificantDigits]]"] = mxsd;
        }
        var g = GetOption(options, "useGrouping", "boolean", void 0, true);
        internal["[[useGrouping]]"] = g;
        var dataLocaleData = localeData[dataLocale];
        var patterns = dataLocaleData.patterns;
        var stylePatterns = patterns[s];
        internal["[[positivePattern]]"] = stylePatterns.positivePattern;
        internal["[[negativePattern]]"] = stylePatterns.negativePattern;
        internal["[[boundFormat]]"] = void 0;
        internal["[[initializedNumberFormat]]"] = true;
        if (es3) numberFormat.format = GetFormatNumber.call(numberFormat);
        regexpRestore();
        return numberFormat;
      }
      function CurrencyDigits(currency) {
        return currencyMinorUnits[currency] !== void 0 ? currencyMinorUnits[currency] : 2;
      }
      internals.NumberFormat = {
        "[[availableLocales]]": [],
        "[[relevantExtensionKeys]]": ["nu"],
        "[[localeData]]": {}
      };
      defineProperty(Intl.NumberFormat, "supportedLocalesOf", {
        configurable: true,
        writable: true,
        value: fnBind.call(function(locales) {
          if (!hop.call(this, "[[availableLocales]]")) throw new TypeError("supportedLocalesOf() is not a constructor");
          var regexpRestore = createRegExpRestore(), options = arguments[1], availableLocales = this["[[availableLocales]]"], requestedLocales = CanonicalizeLocaleList(locales);
          regexpRestore();
          return SupportedLocales(availableLocales, requestedLocales, options);
        }, internals.NumberFormat)
      });
      defineProperty(Intl.NumberFormat.prototype, "format", {
        configurable: true,
        get: GetFormatNumber
      });
      function GetFormatNumber() {
        var internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
        if (!internal || !internal["[[initializedNumberFormat]]"]) throw new TypeError("`this` value for format() is not an initialized Intl.NumberFormat object.");
        if (internal["[[boundFormat]]"] === void 0) {
          var F = function F2(value) {
            return FormatNumber(
              this,
              /* x = */
              Number(value)
            );
          };
          var bf = fnBind.call(F, this);
          internal["[[boundFormat]]"] = bf;
        }
        return internal["[[boundFormat]]"];
      }
      function formatToParts() {
        var value = arguments.length <= 0 || arguments[0] === void 0 ? void 0 : arguments[0];
        var internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
        if (!internal || !internal["[[initializedNumberFormat]]"]) throw new TypeError("`this` value for formatToParts() is not an initialized Intl.NumberFormat object.");
        var x = Number(value);
        return FormatNumberToParts(this, x);
      }
      Object.defineProperty(Intl.NumberFormat.prototype, "formatToParts", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: formatToParts
      });
      function FormatNumberToParts(numberFormat, x) {
        var parts = PartitionNumberPattern(numberFormat, x);
        var result = [];
        var n = 0;
        for (var i = 0; parts.length > i; i++) {
          var part = parts[i];
          var O = {};
          O.type = part["[[type]]"];
          O.value = part["[[value]]"];
          result[n] = O;
          n += 1;
        }
        return result;
      }
      function PartitionNumberPattern(numberFormat, x) {
        var internal = getInternalProperties(numberFormat), locale = internal["[[dataLocale]]"], nums = internal["[[numberingSystem]]"], data = internals.NumberFormat["[[localeData]]"][locale], ild = data.symbols[nums] || data.symbols.latn, pattern = void 0;
        if (!isNaN(x) && x < 0) {
          x = -x;
          pattern = internal["[[negativePattern]]"];
        } else {
          pattern = internal["[[positivePattern]]"];
        }
        var result = new List();
        var beginIndex = pattern.indexOf("{", 0);
        var endIndex = 0;
        var nextIndex = 0;
        var length = pattern.length;
        while (beginIndex > -1 && beginIndex < length) {
          endIndex = pattern.indexOf("}", beginIndex);
          if (endIndex === -1) throw new Error();
          if (beginIndex > nextIndex) {
            var literal = pattern.substring(nextIndex, beginIndex);
            arrPush.call(result, { "[[type]]": "literal", "[[value]]": literal });
          }
          var p = pattern.substring(beginIndex + 1, endIndex);
          if (p === "number") {
            if (isNaN(x)) {
              var n = ild.nan;
              arrPush.call(result, { "[[type]]": "nan", "[[value]]": n });
            } else if (!isFinite(x)) {
              var _n = ild.infinity;
              arrPush.call(result, { "[[type]]": "infinity", "[[value]]": _n });
            } else {
              if (internal["[[style]]"] === "percent" && isFinite(x)) x *= 100;
              var _n2 = void 0;
              if (hop.call(internal, "[[minimumSignificantDigits]]") && hop.call(internal, "[[maximumSignificantDigits]]")) {
                _n2 = ToRawPrecision(x, internal["[[minimumSignificantDigits]]"], internal["[[maximumSignificantDigits]]"]);
              } else {
                _n2 = ToRawFixed(x, internal["[[minimumIntegerDigits]]"], internal["[[minimumFractionDigits]]"], internal["[[maximumFractionDigits]]"]);
              }
              if (numSys[nums]) {
                (function() {
                  var digits = numSys[nums];
                  _n2 = String(_n2).replace(/\d/g, function(digit) {
                    return digits[digit];
                  });
                })();
              } else _n2 = String(_n2);
              var integer = void 0;
              var fraction = void 0;
              var decimalSepIndex = _n2.indexOf(".", 0);
              if (decimalSepIndex > 0) {
                integer = _n2.substring(0, decimalSepIndex);
                fraction = _n2.substring(decimalSepIndex + 1, decimalSepIndex.length);
              } else {
                integer = _n2;
                fraction = void 0;
              }
              if (internal["[[useGrouping]]"] === true) {
                var groupSepSymbol = ild.group;
                var groups = [];
                var pgSize = data.patterns.primaryGroupSize || 3;
                var sgSize = data.patterns.secondaryGroupSize || pgSize;
                if (integer.length > pgSize) {
                  var end = integer.length - pgSize;
                  var idx = end % sgSize;
                  var start = integer.slice(0, idx);
                  if (start.length) arrPush.call(groups, start);
                  while (idx < end) {
                    arrPush.call(groups, integer.slice(idx, idx + sgSize));
                    idx += sgSize;
                  }
                  arrPush.call(groups, integer.slice(end));
                } else {
                  arrPush.call(groups, integer);
                }
                if (groups.length === 0) throw new Error();
                while (groups.length) {
                  var integerGroup = arrShift.call(groups);
                  arrPush.call(result, { "[[type]]": "integer", "[[value]]": integerGroup });
                  if (groups.length) {
                    arrPush.call(result, { "[[type]]": "group", "[[value]]": groupSepSymbol });
                  }
                }
              } else {
                arrPush.call(result, { "[[type]]": "integer", "[[value]]": integer });
              }
              if (fraction !== void 0) {
                var decimalSepSymbol = ild.decimal;
                arrPush.call(result, { "[[type]]": "decimal", "[[value]]": decimalSepSymbol });
                arrPush.call(result, { "[[type]]": "fraction", "[[value]]": fraction });
              }
            }
          } else if (p === "plusSign") {
            var plusSignSymbol = ild.plusSign;
            arrPush.call(result, { "[[type]]": "plusSign", "[[value]]": plusSignSymbol });
          } else if (p === "minusSign") {
            var minusSignSymbol = ild.minusSign;
            arrPush.call(result, { "[[type]]": "minusSign", "[[value]]": minusSignSymbol });
          } else if (p === "percentSign" && internal["[[style]]"] === "percent") {
            var percentSignSymbol = ild.percentSign;
            arrPush.call(result, { "[[type]]": "literal", "[[value]]": percentSignSymbol });
          } else if (p === "currency" && internal["[[style]]"] === "currency") {
            var currency = internal["[[currency]]"];
            var cd = void 0;
            if (internal["[[currencyDisplay]]"] === "code") {
              cd = currency;
            } else if (internal["[[currencyDisplay]]"] === "symbol") {
              cd = data.currencies[currency] || currency;
            } else if (internal["[[currencyDisplay]]"] === "name") {
              cd = currency;
            }
            arrPush.call(result, { "[[type]]": "currency", "[[value]]": cd });
          } else {
            var _literal = pattern.substring(beginIndex, endIndex);
            arrPush.call(result, { "[[type]]": "literal", "[[value]]": _literal });
          }
          nextIndex = endIndex + 1;
          beginIndex = pattern.indexOf("{", nextIndex);
        }
        if (nextIndex < length) {
          var _literal2 = pattern.substring(nextIndex, length);
          arrPush.call(result, { "[[type]]": "literal", "[[value]]": _literal2 });
        }
        return result;
      }
      function FormatNumber(numberFormat, x) {
        var parts = PartitionNumberPattern(numberFormat, x);
        var result = "";
        for (var i = 0; parts.length > i; i++) {
          var part = parts[i];
          result += part["[[value]]"];
        }
        return result;
      }
      function ToRawPrecision(x, minPrecision, maxPrecision) {
        var p = maxPrecision;
        var m = void 0, e = void 0;
        if (x === 0) {
          m = arrJoin.call(Array(p + 1), "0");
          e = 0;
        } else {
          e = log10Floor(Math.abs(x));
          var f = Math.round(Math.exp(Math.abs(e - p + 1) * Math.LN10));
          m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
        }
        if (e >= p)
          return m + arrJoin.call(Array(e - p + 1 + 1), "0");
        else if (e === p - 1)
          return m;
        else if (e >= 0)
          m = m.slice(0, e + 1) + "." + m.slice(e + 1);
        else if (e < 0)
          m = "0." + arrJoin.call(Array(-(e + 1) + 1), "0") + m;
        if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
          var cut = maxPrecision - minPrecision;
          while (cut > 0 && m.charAt(m.length - 1) === "0") {
            m = m.slice(0, -1);
            cut--;
          }
          if (m.charAt(m.length - 1) === ".")
            m = m.slice(0, -1);
        }
        return m;
      }
      function ToRawFixed(x, minInteger, minFraction, maxFraction) {
        var f = maxFraction;
        var n = Math.pow(10, f) * x;
        var m = n === 0 ? "0" : n.toFixed(0);
        {
          var idx = void 0;
          var exp = (idx = m.indexOf("e")) > -1 ? m.slice(idx + 1) : 0;
          if (exp) {
            m = m.slice(0, idx).replace(".", "");
            m += arrJoin.call(Array(exp - (m.length - 1) + 1), "0");
          }
        }
        var int = void 0;
        if (f !== 0) {
          var k = m.length;
          if (k <= f) {
            var z = arrJoin.call(Array(f + 1 - k + 1), "0");
            m = z + m;
            k = f + 1;
          }
          var a = m.substring(0, k - f), b = m.substring(k - f, m.length);
          m = a + "." + b;
          int = a.length;
        } else int = m.length;
        var cut = maxFraction - minFraction;
        while (cut > 0 && m.slice(-1) === "0") {
          m = m.slice(0, -1);
          cut--;
        }
        if (m.slice(-1) === ".") {
          m = m.slice(0, -1);
        }
        if (int < minInteger) {
          var _z = arrJoin.call(Array(minInteger - int + 1), "0");
          m = _z + m;
        }
        return m;
      }
      var numSys = {
        arab: ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"],
        arabext: ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"],
        bali: ["\u1B50", "\u1B51", "\u1B52", "\u1B53", "\u1B54", "\u1B55", "\u1B56", "\u1B57", "\u1B58", "\u1B59"],
        beng: ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA", "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"],
        deva: ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"],
        fullwide: ["\uFF10", "\uFF11", "\uFF12", "\uFF13", "\uFF14", "\uFF15", "\uFF16", "\uFF17", "\uFF18", "\uFF19"],
        gujr: ["\u0AE6", "\u0AE7", "\u0AE8", "\u0AE9", "\u0AEA", "\u0AEB", "\u0AEC", "\u0AED", "\u0AEE", "\u0AEF"],
        guru: ["\u0A66", "\u0A67", "\u0A68", "\u0A69", "\u0A6A", "\u0A6B", "\u0A6C", "\u0A6D", "\u0A6E", "\u0A6F"],
        hanidec: ["\u3007", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"],
        khmr: ["\u17E0", "\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9"],
        knda: ["\u0CE6", "\u0CE7", "\u0CE8", "\u0CE9", "\u0CEA", "\u0CEB", "\u0CEC", "\u0CED", "\u0CEE", "\u0CEF"],
        laoo: ["\u0ED0", "\u0ED1", "\u0ED2", "\u0ED3", "\u0ED4", "\u0ED5", "\u0ED6", "\u0ED7", "\u0ED8", "\u0ED9"],
        latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        limb: ["\u1946", "\u1947", "\u1948", "\u1949", "\u194A", "\u194B", "\u194C", "\u194D", "\u194E", "\u194F"],
        mlym: ["\u0D66", "\u0D67", "\u0D68", "\u0D69", "\u0D6A", "\u0D6B", "\u0D6C", "\u0D6D", "\u0D6E", "\u0D6F"],
        mong: ["\u1810", "\u1811", "\u1812", "\u1813", "\u1814", "\u1815", "\u1816", "\u1817", "\u1818", "\u1819"],
        mymr: ["\u1040", "\u1041", "\u1042", "\u1043", "\u1044", "\u1045", "\u1046", "\u1047", "\u1048", "\u1049"],
        orya: ["\u0B66", "\u0B67", "\u0B68", "\u0B69", "\u0B6A", "\u0B6B", "\u0B6C", "\u0B6D", "\u0B6E", "\u0B6F"],
        tamldec: ["\u0BE6", "\u0BE7", "\u0BE8", "\u0BE9", "\u0BEA", "\u0BEB", "\u0BEC", "\u0BED", "\u0BEE", "\u0BEF"],
        telu: ["\u0C66", "\u0C67", "\u0C68", "\u0C69", "\u0C6A", "\u0C6B", "\u0C6C", "\u0C6D", "\u0C6E", "\u0C6F"],
        thai: ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59"],
        tibt: ["\u0F20", "\u0F21", "\u0F22", "\u0F23", "\u0F24", "\u0F25", "\u0F26", "\u0F27", "\u0F28", "\u0F29"]
      };
      defineProperty(Intl.NumberFormat.prototype, "resolvedOptions", {
        configurable: true,
        writable: true,
        value: function value() {
          var prop = void 0, descs = new Record(), props = ["locale", "numberingSystem", "style", "currency", "currencyDisplay", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "useGrouping"], internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
          if (!internal || !internal["[[initializedNumberFormat]]"]) throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.");
          for (var i = 0, max = props.length; i < max; i++) {
            if (hop.call(internal, prop = "[[" + props[i] + "]]")) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
          }
          return objCreate({}, descs);
        }
      });
      var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
      var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      var unwantedDTCs = /[rqQASjJgwWIQq]/;
      var dtKeys = ["era", "year", "month", "day", "weekday", "quarter"];
      var tmKeys = ["hour", "minute", "second", "hour12", "timeZoneName"];
      function isDateFormatOnly(obj) {
        for (var i = 0; i < tmKeys.length; i += 1) {
          if (obj.hasOwnProperty(tmKeys[i])) {
            return false;
          }
        }
        return true;
      }
      function isTimeFormatOnly(obj) {
        for (var i = 0; i < dtKeys.length; i += 1) {
          if (obj.hasOwnProperty(dtKeys[i])) {
            return false;
          }
        }
        return true;
      }
      function joinDateAndTimeFormats(dateFormatObj, timeFormatObj) {
        var o = { _: {} };
        for (var i = 0; i < dtKeys.length; i += 1) {
          if (dateFormatObj[dtKeys[i]]) {
            o[dtKeys[i]] = dateFormatObj[dtKeys[i]];
          }
          if (dateFormatObj._[dtKeys[i]]) {
            o._[dtKeys[i]] = dateFormatObj._[dtKeys[i]];
          }
        }
        for (var j = 0; j < tmKeys.length; j += 1) {
          if (timeFormatObj[tmKeys[j]]) {
            o[tmKeys[j]] = timeFormatObj[tmKeys[j]];
          }
          if (timeFormatObj._[tmKeys[j]]) {
            o._[tmKeys[j]] = timeFormatObj._[tmKeys[j]];
          }
        }
        return o;
      }
      function computeFinalPatterns(formatObj) {
        formatObj.pattern12 = formatObj.extendedPattern.replace(/'([^']*)'/g, function($0, literal) {
          return literal ? literal : "'";
        });
        formatObj.pattern = formatObj.pattern12.replace("{ampm}", "").replace(expPatternTrimmer, "");
        return formatObj;
      }
      function expDTComponentsMeta($0, formatObj) {
        switch ($0.charAt(0)) {
          // --- Era
          case "G":
            formatObj.era = ["short", "short", "short", "long", "narrow"][$0.length - 1];
            return "{era}";
          // --- Year
          case "y":
          case "Y":
          case "u":
          case "U":
          case "r":
            formatObj.year = $0.length === 2 ? "2-digit" : "numeric";
            return "{year}";
          // --- Quarter (not supported in this polyfill)
          case "Q":
          case "q":
            formatObj.quarter = ["numeric", "2-digit", "short", "long", "narrow"][$0.length - 1];
            return "{quarter}";
          // --- Month
          case "M":
          case "L":
            formatObj.month = ["numeric", "2-digit", "short", "long", "narrow"][$0.length - 1];
            return "{month}";
          // --- Week (not supported in this polyfill)
          case "w":
            formatObj.week = $0.length === 2 ? "2-digit" : "numeric";
            return "{weekday}";
          case "W":
            formatObj.week = "numeric";
            return "{weekday}";
          // --- Day
          case "d":
            formatObj.day = $0.length === 2 ? "2-digit" : "numeric";
            return "{day}";
          case "D":
          // day of the year
          case "F":
          // day of the week
          case "g":
            formatObj.day = "numeric";
            return "{day}";
          // --- Week Day
          case "E":
            formatObj.weekday = ["short", "short", "short", "long", "narrow", "short"][$0.length - 1];
            return "{weekday}";
          case "e":
            formatObj.weekday = ["numeric", "2-digit", "short", "long", "narrow", "short"][$0.length - 1];
            return "{weekday}";
          case "c":
            formatObj.weekday = ["numeric", void 0, "short", "long", "narrow", "short"][$0.length - 1];
            return "{weekday}";
          // --- Period
          case "a":
          // AM, PM
          case "b":
          // am, pm, noon, midnight
          case "B":
            formatObj.hour12 = true;
            return "{ampm}";
          // --- Hour
          case "h":
          case "H":
            formatObj.hour = $0.length === 2 ? "2-digit" : "numeric";
            return "{hour}";
          case "k":
          case "K":
            formatObj.hour12 = true;
            formatObj.hour = $0.length === 2 ? "2-digit" : "numeric";
            return "{hour}";
          // --- Minute
          case "m":
            formatObj.minute = $0.length === 2 ? "2-digit" : "numeric";
            return "{minute}";
          // --- Second
          case "s":
            formatObj.second = $0.length === 2 ? "2-digit" : "numeric";
            return "{second}";
          case "S":
          case "A":
            formatObj.second = "numeric";
            return "{second}";
          // --- Timezone
          case "z":
          // 1..3, 4: specific non-location format
          case "Z":
          // 1..3, 4, 5: The ISO8601 varios formats
          case "O":
          // 1, 4: miliseconds in day short, long
          case "v":
          // 1, 4: generic non-location format
          case "V":
          // 1, 2, 3, 4: time zone ID or city
          case "X":
          // 1, 2, 3, 4: The ISO8601 varios formats
          case "x":
            formatObj.timeZoneName = $0.length < 4 ? "short" : "long";
            return "{timeZoneName}";
        }
      }
      function createDateTimeFormat(skeleton, pattern) {
        if (unwantedDTCs.test(pattern)) return void 0;
        var formatObj = {
          originalPattern: pattern,
          _: {}
        };
        formatObj.extendedPattern = pattern.replace(expDTComponents, function($0) {
          return expDTComponentsMeta($0, formatObj._);
        });
        skeleton.replace(expDTComponents, function($0) {
          return expDTComponentsMeta($0, formatObj);
        });
        return computeFinalPatterns(formatObj);
      }
      function createDateTimeFormats(formats) {
        var availableFormats = formats.availableFormats;
        var timeFormats = formats.timeFormats;
        var dateFormats = formats.dateFormats;
        var result = [];
        var skeleton = void 0, pattern = void 0, computed = void 0, i = void 0, j = void 0;
        var timeRelatedFormats = [];
        var dateRelatedFormats = [];
        for (skeleton in availableFormats) {
          if (availableFormats.hasOwnProperty(skeleton)) {
            pattern = availableFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
              result.push(computed);
              if (isDateFormatOnly(computed)) {
                dateRelatedFormats.push(computed);
              } else if (isTimeFormatOnly(computed)) {
                timeRelatedFormats.push(computed);
              }
            }
          }
        }
        for (skeleton in timeFormats) {
          if (timeFormats.hasOwnProperty(skeleton)) {
            pattern = timeFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
              result.push(computed);
              timeRelatedFormats.push(computed);
            }
          }
        }
        for (skeleton in dateFormats) {
          if (dateFormats.hasOwnProperty(skeleton)) {
            pattern = dateFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
              result.push(computed);
              dateRelatedFormats.push(computed);
            }
          }
        }
        for (i = 0; i < timeRelatedFormats.length; i += 1) {
          for (j = 0; j < dateRelatedFormats.length; j += 1) {
            if (dateRelatedFormats[j].month === "long") {
              pattern = dateRelatedFormats[j].weekday ? formats.full : formats.long;
            } else if (dateRelatedFormats[j].month === "short") {
              pattern = formats.medium;
            } else {
              pattern = formats.short;
            }
            computed = joinDateAndTimeFormats(dateRelatedFormats[j], timeRelatedFormats[i]);
            computed.originalPattern = pattern;
            computed.extendedPattern = pattern.replace("{0}", timeRelatedFormats[i].extendedPattern).replace("{1}", dateRelatedFormats[j].extendedPattern).replace(/^[,\s]+|[,\s]+$/gi, "");
            result.push(computeFinalPatterns(computed));
          }
        }
        return result;
      }
      var validSyntheticProps = {
        second: {
          numeric: "s",
          "2-digit": "ss"
        },
        minute: {
          numeric: "m",
          "2-digit": "mm"
        },
        year: {
          numeric: "y",
          "2-digit": "yy"
        },
        day: {
          numeric: "d",
          "2-digit": "dd"
        },
        month: {
          numeric: "L",
          "2-digit": "LL",
          narrow: "LLLLL",
          short: "LLL",
          long: "LLLL"
        },
        weekday: {
          narrow: "ccccc",
          short: "ccc",
          long: "cccc"
        }
      };
      function generateSyntheticFormat(propName, propValue) {
        if (validSyntheticProps[propName] && validSyntheticProps[propName][propValue]) {
          var _ref2;
          return _ref2 = {
            originalPattern: validSyntheticProps[propName][propValue],
            _: defineProperty$1({}, propName, propValue),
            extendedPattern: "{" + propName + "}"
          }, defineProperty$1(_ref2, propName, propValue), defineProperty$1(_ref2, "pattern12", "{" + propName + "}"), defineProperty$1(_ref2, "pattern", "{" + propName + "}"), _ref2;
        }
      }
      var dateWidths = objCreate(null, { narrow: {}, short: {}, long: {} });
      function resolveDateString(data, ca, component, width, key) {
        var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component], alts = {
          narrow: ["short", "long"],
          short: ["long", "narrow"],
          long: ["short", "narrow"]
        }, resolved = hop.call(obj, width) ? obj[width] : hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];
        return key !== null ? resolved[key] : resolved;
      }
      function DateTimeFormatConstructor() {
        var locales = arguments[0];
        var options = arguments[1];
        if (!this || this === Intl) {
          return new Intl.DateTimeFormat(locales, options);
        }
        return InitializeDateTimeFormat(toObject(this), locales, options);
      }
      defineProperty(Intl, "DateTimeFormat", {
        configurable: true,
        writable: true,
        value: DateTimeFormatConstructor
      });
      defineProperty(DateTimeFormatConstructor, "prototype", {
        writable: false
      });
      function InitializeDateTimeFormat(dateTimeFormat, locales, options) {
        var internal = getInternalProperties(dateTimeFormat);
        var regexpRestore = createRegExpRestore();
        if (internal["[[initializedIntlObject]]"] === true) throw new TypeError("`this` object has already been initialized as an Intl object");
        defineProperty(dateTimeFormat, "__getInternalProperties", {
          value: function value2() {
            if (arguments[0] === secret) return internal;
          }
        });
        internal["[[initializedIntlObject]]"] = true;
        var requestedLocales = CanonicalizeLocaleList(locales);
        options = ToDateTimeOptions(options, "any", "date");
        var opt = new Record();
        var matcher = GetOption(options, "localeMatcher", "string", new List("lookup", "best fit"), "best fit");
        opt["[[localeMatcher]]"] = matcher;
        var DateTimeFormat = internals.DateTimeFormat;
        var localeData = DateTimeFormat["[[localeData]]"];
        var r = ResolveLocale(DateTimeFormat["[[availableLocales]]"], requestedLocales, opt, DateTimeFormat["[[relevantExtensionKeys]]"], localeData);
        internal["[[locale]]"] = r["[[locale]]"];
        internal["[[calendar]]"] = r["[[ca]]"];
        internal["[[numberingSystem]]"] = r["[[nu]]"];
        internal["[[dataLocale]]"] = r["[[dataLocale]]"];
        var dataLocale = r["[[dataLocale]]"];
        var tz = options.timeZone;
        if (tz !== void 0) {
          tz = toLatinUpperCase(tz);
          if (tz !== "UTC") throw new RangeError("timeZone is not supported.");
        }
        internal["[[timeZone]]"] = tz;
        opt = new Record();
        for (var prop in dateTimeComponents) {
          if (!hop.call(dateTimeComponents, prop)) continue;
          var value = GetOption(options, prop, "string", dateTimeComponents[prop]);
          opt["[[" + prop + "]]"] = value;
        }
        var bestFormat = void 0;
        var dataLocaleData = localeData[dataLocale];
        var formats = ToDateTimeFormats(dataLocaleData.formats);
        matcher = GetOption(options, "formatMatcher", "string", new List("basic", "best fit"), "best fit");
        dataLocaleData.formats = formats;
        if (matcher === "basic") {
          bestFormat = BasicFormatMatcher(opt, formats);
        } else {
          {
            var _hr = GetOption(
              options,
              "hour12",
              "boolean"
              /*, undefined, undefined*/
            );
            opt.hour12 = _hr === void 0 ? dataLocaleData.hour12 : _hr;
          }
          bestFormat = BestFitFormatMatcher(opt, formats);
        }
        for (var _prop in dateTimeComponents) {
          if (!hop.call(dateTimeComponents, _prop)) continue;
          if (hop.call(bestFormat, _prop)) {
            var p = bestFormat[_prop];
            {
              p = bestFormat._ && hop.call(bestFormat._, _prop) ? bestFormat._[_prop] : p;
            }
            internal["[[" + _prop + "]]"] = p;
          }
        }
        var pattern = void 0;
        var hr12 = GetOption(
          options,
          "hour12",
          "boolean"
          /*, undefined, undefined*/
        );
        if (internal["[[hour]]"]) {
          hr12 = hr12 === void 0 ? dataLocaleData.hour12 : hr12;
          internal["[[hour12]]"] = hr12;
          if (hr12 === true) {
            var hourNo0 = dataLocaleData.hourNo0;
            internal["[[hourNo0]]"] = hourNo0;
            pattern = bestFormat.pattern12;
          } else
            pattern = bestFormat.pattern;
        } else
          pattern = bestFormat.pattern;
        internal["[[pattern]]"] = pattern;
        internal["[[boundFormat]]"] = void 0;
        internal["[[initializedDateTimeFormat]]"] = true;
        if (es3) dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);
        regexpRestore();
        return dateTimeFormat;
      }
      var dateTimeComponents = {
        weekday: ["narrow", "short", "long"],
        era: ["narrow", "short", "long"],
        year: ["2-digit", "numeric"],
        month: ["2-digit", "numeric", "narrow", "short", "long"],
        day: ["2-digit", "numeric"],
        hour: ["2-digit", "numeric"],
        minute: ["2-digit", "numeric"],
        second: ["2-digit", "numeric"],
        timeZoneName: ["short", "long"]
      };
      function ToDateTimeFormats(formats) {
        if (Object.prototype.toString.call(formats) === "[object Array]") {
          return formats;
        }
        return createDateTimeFormats(formats);
      }
      function ToDateTimeOptions(options, required, defaults2) {
        if (options === void 0) options = null;
        else {
          var opt2 = toObject(options);
          options = new Record();
          for (var k in opt2) {
            options[k] = opt2[k];
          }
        }
        var create = objCreate;
        options = create(options);
        var needDefaults = true;
        if (required === "date" || required === "any") {
          if (options.weekday !== void 0 || options.year !== void 0 || options.month !== void 0 || options.day !== void 0) needDefaults = false;
        }
        if (required === "time" || required === "any") {
          if (options.hour !== void 0 || options.minute !== void 0 || options.second !== void 0) needDefaults = false;
        }
        if (needDefaults && (defaults2 === "date" || defaults2 === "all"))
          options.year = options.month = options.day = "numeric";
        if (needDefaults && (defaults2 === "time" || defaults2 === "all"))
          options.hour = options.minute = options.second = "numeric";
        return options;
      }
      function BasicFormatMatcher(options, formats) {
        var removalPenalty = 120;
        var additionPenalty = 20;
        var longLessPenalty = 8;
        var longMorePenalty = 6;
        var shortLessPenalty = 6;
        var shortMorePenalty = 3;
        var bestScore = -Infinity;
        var bestFormat = void 0;
        var i = 0;
        var len = formats.length;
        while (i < len) {
          var format = formats[i];
          var score = 0;
          for (var property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, property)) continue;
            var optionsProp = options["[[" + property + "]]"];
            var formatProp = hop.call(format, property) ? format[property] : void 0;
            if (optionsProp === void 0 && formatProp !== void 0) score -= additionPenalty;
            else if (optionsProp !== void 0 && formatProp === void 0) score -= removalPenalty;
            else {
              var values = ["2-digit", "numeric", "narrow", "short", "long"];
              var optionsPropIndex = arrIndexOf.call(values, optionsProp);
              var formatPropIndex = arrIndexOf.call(values, formatProp);
              var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);
              if (delta === 2) score -= longMorePenalty;
              else if (delta === 1) score -= shortMorePenalty;
              else if (delta === -1) score -= shortLessPenalty;
              else if (delta === -2) score -= longLessPenalty;
            }
          }
          if (score > bestScore) {
            bestScore = score;
            bestFormat = format;
          }
          i++;
        }
        return bestFormat;
      }
      function BestFitFormatMatcher(options, formats) {
        {
          var optionsPropNames = [];
          for (var property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, property)) continue;
            if (options["[[" + property + "]]"] !== void 0) {
              optionsPropNames.push(property);
            }
          }
          if (optionsPropNames.length === 1) {
            var _bestFormat = generateSyntheticFormat(optionsPropNames[0], options["[[" + optionsPropNames[0] + "]]"]);
            if (_bestFormat) {
              return _bestFormat;
            }
          }
        }
        var removalPenalty = 120;
        var additionPenalty = 20;
        var longLessPenalty = 8;
        var longMorePenalty = 6;
        var shortLessPenalty = 6;
        var shortMorePenalty = 3;
        var patternPenalty = 2;
        var hour12Penalty = 1;
        var bestScore = -Infinity;
        var bestFormat = void 0;
        var i = 0;
        var len = formats.length;
        while (i < len) {
          var format = formats[i];
          var score = 0;
          for (var _property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, _property)) continue;
            var optionsProp = options["[[" + _property + "]]"];
            var formatProp = hop.call(format, _property) ? format[_property] : void 0;
            var patternProp = hop.call(format._, _property) ? format._[_property] : void 0;
            if (optionsProp !== patternProp) {
              score -= patternPenalty;
            }
            if (optionsProp === void 0 && formatProp !== void 0) score -= additionPenalty;
            else if (optionsProp !== void 0 && formatProp === void 0) score -= removalPenalty;
            else {
              var values = ["2-digit", "numeric", "narrow", "short", "long"];
              var optionsPropIndex = arrIndexOf.call(values, optionsProp);
              var formatPropIndex = arrIndexOf.call(values, formatProp);
              var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);
              {
                if (formatPropIndex <= 1 && optionsPropIndex >= 2 || formatPropIndex >= 2 && optionsPropIndex <= 1) {
                  if (delta > 0) score -= longMorePenalty;
                  else if (delta < 0) score -= longLessPenalty;
                } else {
                  if (delta > 1) score -= shortMorePenalty;
                  else if (delta < -1) score -= shortLessPenalty;
                }
              }
            }
          }
          {
            if (format._.hour12 !== options.hour12) {
              score -= hour12Penalty;
            }
          }
          if (score > bestScore) {
            bestScore = score;
            bestFormat = format;
          }
          i++;
        }
        return bestFormat;
      }
      internals.DateTimeFormat = {
        "[[availableLocales]]": [],
        "[[relevantExtensionKeys]]": ["ca", "nu"],
        "[[localeData]]": {}
      };
      defineProperty(Intl.DateTimeFormat, "supportedLocalesOf", {
        configurable: true,
        writable: true,
        value: fnBind.call(function(locales) {
          if (!hop.call(this, "[[availableLocales]]")) throw new TypeError("supportedLocalesOf() is not a constructor");
          var regexpRestore = createRegExpRestore(), options = arguments[1], availableLocales = this["[[availableLocales]]"], requestedLocales = CanonicalizeLocaleList(locales);
          regexpRestore();
          return SupportedLocales(availableLocales, requestedLocales, options);
        }, internals.NumberFormat)
      });
      defineProperty(Intl.DateTimeFormat.prototype, "format", {
        configurable: true,
        get: GetFormatDateTime
      });
      function GetFormatDateTime() {
        var internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
        if (!internal || !internal["[[initializedDateTimeFormat]]"]) throw new TypeError("`this` value for format() is not an initialized Intl.DateTimeFormat object.");
        if (internal["[[boundFormat]]"] === void 0) {
          var F = function F2() {
            var date = arguments.length <= 0 || arguments[0] === void 0 ? void 0 : arguments[0];
            var x = date === void 0 ? Date.now() : toNumber(date);
            return FormatDateTime(this, x);
          };
          var bf = fnBind.call(F, this);
          internal["[[boundFormat]]"] = bf;
        }
        return internal["[[boundFormat]]"];
      }
      function formatToParts$1() {
        var date = arguments.length <= 0 || arguments[0] === void 0 ? void 0 : arguments[0];
        var internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
        if (!internal || !internal["[[initializedDateTimeFormat]]"]) throw new TypeError("`this` value for formatToParts() is not an initialized Intl.DateTimeFormat object.");
        var x = date === void 0 ? Date.now() : toNumber(date);
        return FormatToPartsDateTime(this, x);
      }
      Object.defineProperty(Intl.DateTimeFormat.prototype, "formatToParts", {
        enumerable: false,
        writable: true,
        configurable: true,
        value: formatToParts$1
      });
      function CreateDateTimeParts(dateTimeFormat, x) {
        if (!isFinite(x)) throw new RangeError("Invalid valid date passed to format");
        var internal = dateTimeFormat.__getInternalProperties(secret);
        createRegExpRestore();
        var locale = internal["[[locale]]"];
        var nf = new Intl.NumberFormat([locale], { useGrouping: false });
        var nf2 = new Intl.NumberFormat([locale], { minimumIntegerDigits: 2, useGrouping: false });
        var tm = ToLocalTime(x, internal["[[calendar]]"], internal["[[timeZone]]"]);
        var pattern = internal["[[pattern]]"];
        var result = new List();
        var index = 0;
        var beginIndex = pattern.indexOf("{");
        var endIndex = 0;
        var dataLocale = internal["[[dataLocale]]"];
        var localeData = internals.DateTimeFormat["[[localeData]]"][dataLocale].calendars;
        var ca = internal["[[calendar]]"];
        while (beginIndex !== -1) {
          var fv = void 0;
          endIndex = pattern.indexOf("}", beginIndex);
          if (endIndex === -1) {
            throw new Error("Unclosed pattern");
          }
          if (beginIndex > index) {
            arrPush.call(result, {
              type: "literal",
              value: pattern.substring(index, beginIndex)
            });
          }
          var p = pattern.substring(beginIndex + 1, endIndex);
          if (dateTimeComponents.hasOwnProperty(p)) {
            var f = internal["[[" + p + "]]"];
            var v = tm["[[" + p + "]]"];
            if (p === "year" && v <= 0) {
              v = 1 - v;
            } else if (p === "month") {
              v++;
            } else if (p === "hour" && internal["[[hour12]]"] === true) {
              v = v % 12;
              if (v === 0 && internal["[[hourNo0]]"] === true) {
                v = 12;
              }
            }
            if (f === "numeric") {
              fv = FormatNumber(nf, v);
            } else if (f === "2-digit") {
              fv = FormatNumber(nf2, v);
              if (fv.length > 2) {
                fv = fv.slice(-2);
              }
            } else if (f in dateWidths) {
              switch (p) {
                case "month":
                  fv = resolveDateString(localeData, ca, "months", f, tm["[[" + p + "]]"]);
                  break;
                case "weekday":
                  try {
                    fv = resolveDateString(localeData, ca, "days", f, tm["[[" + p + "]]"]);
                  } catch (e) {
                    throw new Error("Could not find weekday data for locale " + locale);
                  }
                  break;
                case "timeZoneName":
                  fv = "";
                  break;
                case "era":
                  try {
                    fv = resolveDateString(localeData, ca, "eras", f, tm["[[" + p + "]]"]);
                  } catch (e) {
                    throw new Error("Could not find era data for locale " + locale);
                  }
                  break;
                default:
                  fv = tm["[[" + p + "]]"];
              }
            }
            arrPush.call(result, {
              type: p,
              value: fv
            });
          } else if (p === "ampm") {
            var _v = tm["[[hour]]"];
            fv = resolveDateString(localeData, ca, "dayPeriods", _v > 11 ? "pm" : "am", null);
            arrPush.call(result, {
              type: "dayPeriod",
              value: fv
            });
          } else {
            arrPush.call(result, {
              type: "literal",
              value: pattern.substring(beginIndex, endIndex + 1)
            });
          }
          index = endIndex + 1;
          beginIndex = pattern.indexOf("{", index);
        }
        if (endIndex < pattern.length - 1) {
          arrPush.call(result, {
            type: "literal",
            value: pattern.substr(endIndex + 1)
          });
        }
        return result;
      }
      function FormatDateTime(dateTimeFormat, x) {
        var parts = CreateDateTimeParts(dateTimeFormat, x);
        var result = "";
        for (var i = 0; parts.length > i; i++) {
          var part = parts[i];
          result += part.value;
        }
        return result;
      }
      function FormatToPartsDateTime(dateTimeFormat, x) {
        var parts = CreateDateTimeParts(dateTimeFormat, x);
        var result = [];
        for (var i = 0; parts.length > i; i++) {
          var part = parts[i];
          result.push({
            type: part.type,
            value: part.value
          });
        }
        return result;
      }
      function ToLocalTime(date, calendar, timeZone) {
        var d = new Date(date), m = "get" + (timeZone || "");
        return new Record({
          "[[weekday]]": d[m + "Day"](),
          "[[era]]": +(d[m + "FullYear"]() >= 0),
          "[[year]]": d[m + "FullYear"](),
          "[[month]]": d[m + "Month"](),
          "[[day]]": d[m + "Date"](),
          "[[hour]]": d[m + "Hours"](),
          "[[minute]]": d[m + "Minutes"](),
          "[[second]]": d[m + "Seconds"](),
          "[[inDST]]": false
          // ###TODO###
        });
      }
      defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
        writable: true,
        configurable: true,
        value: function value() {
          var prop = void 0, descs = new Record(), props = ["locale", "calendar", "numberingSystem", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"], internal = this !== null && babelHelpers$1["typeof"](this) === "object" && getInternalProperties(this);
          if (!internal || !internal["[[initializedDateTimeFormat]]"]) throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.");
          for (var i = 0, max = props.length; i < max; i++) {
            if (hop.call(internal, prop = "[[" + props[i] + "]]")) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
          }
          return objCreate({}, descs);
        }
      });
      var ls = Intl.__localeSensitiveProtos = {
        Number: {},
        Date: {}
      };
      ls.Number.toLocaleString = function() {
        if (Object.prototype.toString.call(this) !== "[object Number]") throw new TypeError("`this` value must be a number for Number.prototype.toLocaleString()");
        return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
      };
      ls.Date.toLocaleString = function() {
        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleString()");
        var x = +this;
        if (isNaN(x)) return "Invalid Date";
        var locales = arguments[0];
        var options = arguments[1];
        options = ToDateTimeOptions(options, "any", "all");
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);
        return FormatDateTime(dateTimeFormat, x);
      };
      ls.Date.toLocaleDateString = function() {
        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleDateString()");
        var x = +this;
        if (isNaN(x)) return "Invalid Date";
        var locales = arguments[0], options = arguments[1];
        options = ToDateTimeOptions(options, "date", "date");
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);
        return FormatDateTime(dateTimeFormat, x);
      };
      ls.Date.toLocaleTimeString = function() {
        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleTimeString()");
        var x = +this;
        if (isNaN(x)) return "Invalid Date";
        var locales = arguments[0];
        var options = arguments[1];
        options = ToDateTimeOptions(options, "time", "time");
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);
        return FormatDateTime(dateTimeFormat, x);
      };
      defineProperty(Intl, "__applyLocaleSensitivePrototypes", {
        writable: true,
        configurable: true,
        value: function value() {
          Object.defineProperty(globalThis.Number.prototype, "toLocaleString", { writable: true, configurable: true, value: ls.Number.toLocaleString });
          Object.defineProperty(globalThis.Date.prototype, "toLocaleString", { writable: true, configurable: true, value: ls.Date.toLocaleString });
          for (var k in ls.Date) {
            if (hop.call(ls.Date, k)) Object.defineProperty(globalThis.Date.prototype, k, { writable: true, configurable: true, value: ls.Date[k] });
          }
        }
      });
      defineProperty(Intl, "__addLocaleData", {
        value: function value(data) {
          if (!IsStructurallyValidLanguageTag(data.locale)) throw new Error("Object passed doesn't identify itself with a valid language tag");
          addLocaleData(data, data.locale);
        }
      });
      function addLocaleData(data, tag) {
        if (!data.number) throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");
        var locale = void 0, locales = [tag], parts = tag.split("-");
        if (parts.length > 2 && parts[1].length === 4) arrPush.call(locales, parts[0] + "-" + parts[2]);
        while (locale = arrShift.call(locales)) {
          arrPush.call(internals.NumberFormat["[[availableLocales]]"], locale);
          internals.NumberFormat["[[localeData]]"][locale] = data.number;
          if (data.date) {
            data.date.nu = data.number.nu;
            arrPush.call(internals.DateTimeFormat["[[availableLocales]]"], locale);
            internals.DateTimeFormat["[[localeData]]"][locale] = data.date;
          }
        }
        if (defaultLocale === void 0) setDefaultLocale(tag);
      }
      defineProperty(Intl, "__disableRegExpRestore", {
        value: function value() {
          internals.disableRegExpRestore = true;
        }
      });
      module.exports = Intl;
    }
  });

  // (disabled):node_modules/intl/locale-data/complete.js
  var require_complete = __commonJS({
    "(disabled):node_modules/intl/locale-data/complete.js"() {
    }
  });

  // node_modules/intl/index.js
  var require_intl = __commonJS({
    "node_modules/intl/index.js"(exports, module) {
      globalThis.IntlPolyfill = require_core();
      require_complete();
      if (!globalThis.Intl) {
        globalThis.Intl = globalThis.IntlPolyfill;
        globalThis.IntlPolyfill.__applyLocaleSensitivePrototypes();
      }
      module.exports = globalThis.IntlPolyfill;
    }
  });

  // app.jsx
  var app_exports = {};
  __reExport(app_exports, __toESM(require_intl()));
  return app_exports;
})();
export default exports/* 
export const Number = exports.__localeSensitiveProtos.Number;
export const Date = exports.__localeSensitiveProtos.Date; */
// ${se}(async()=>{const colorCore = await import("intl"); console.log(Object.keys(colorCore.default.__localeSensitiveProtos).map(v=>`export const ${v} = exports.__localeSensitiveProtos.${v};`).join("\n"))})()
// ${se}(async()=>{globalThis.iiii = await import("intl");})()