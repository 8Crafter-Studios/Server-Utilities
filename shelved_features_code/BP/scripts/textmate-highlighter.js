import "./MessageChannelPolyfill.js"
import { findClosestColorMatch, mcFormattingCodesToHexColorMap } from "./modules/utilities/functions/findClosestColorMatch.js";

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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/vscode-oniguruma/release/main.js
  var require_main = __commonJS({
    "node_modules/vscode-oniguruma/release/main.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.onig = t() : e.onig = t();
      }(exports, () => {
        return e = { 770: function(e2, t2, n) {
          "use strict";
          var r = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.setDefaultDebugCall = t2.createOnigScanner = t2.createOnigString = t2.loadWASM = t2.OnigScanner = t2.OnigString = void 0;
          const i = r(n(418));
          let o = null, a = false;
          class s {
            static _utf8ByteLength(e3) {
              let t3 = 0;
              for (let n2 = 0, r2 = e3.length; n2 < r2; n2++) {
                const i2 = e3.charCodeAt(n2);
                let o2 = i2, a2 = false;
                if (i2 >= 55296 && i2 <= 56319 && n2 + 1 < r2) {
                  const t4 = e3.charCodeAt(n2 + 1);
                  t4 >= 56320 && t4 <= 57343 && (o2 = 65536 + (i2 - 55296 << 10) | t4 - 56320, a2 = true);
                }
                t3 += o2 <= 127 ? 1 : o2 <= 2047 ? 2 : o2 <= 65535 ? 3 : 4, a2 && n2++;
              }
              return t3;
            }
            constructor(e3) {
              const t3 = e3.length, n2 = s._utf8ByteLength(e3), r2 = n2 !== t3, i2 = r2 ? new Uint32Array(t3 + 1) : null;
              r2 && (i2[t3] = n2);
              const o2 = r2 ? new Uint32Array(n2 + 1) : null;
              r2 && (o2[n2] = t3);
              const a2 = new Uint8Array(n2);
              let f2 = 0;
              for (let n3 = 0; n3 < t3; n3++) {
                const s2 = e3.charCodeAt(n3);
                let u2 = s2, c2 = false;
                if (s2 >= 55296 && s2 <= 56319 && n3 + 1 < t3) {
                  const t4 = e3.charCodeAt(n3 + 1);
                  t4 >= 56320 && t4 <= 57343 && (u2 = 65536 + (s2 - 55296 << 10) | t4 - 56320, c2 = true);
                }
                r2 && (i2[n3] = f2, c2 && (i2[n3 + 1] = f2), u2 <= 127 ? o2[f2 + 0] = n3 : u2 <= 2047 ? (o2[f2 + 0] = n3, o2[f2 + 1] = n3) : u2 <= 65535 ? (o2[f2 + 0] = n3, o2[f2 + 1] = n3, o2[f2 + 2] = n3) : (o2[f2 + 0] = n3, o2[f2 + 1] = n3, o2[f2 + 2] = n3, o2[f2 + 3] = n3)), u2 <= 127 ? a2[f2++] = u2 : u2 <= 2047 ? (a2[f2++] = 192 | (1984 & u2) >>> 6, a2[f2++] = 128 | (63 & u2) >>> 0) : u2 <= 65535 ? (a2[f2++] = 224 | (61440 & u2) >>> 12, a2[f2++] = 128 | (4032 & u2) >>> 6, a2[f2++] = 128 | (63 & u2) >>> 0) : (a2[f2++] = 240 | (1835008 & u2) >>> 18, a2[f2++] = 128 | (258048 & u2) >>> 12, a2[f2++] = 128 | (4032 & u2) >>> 6, a2[f2++] = 128 | (63 & u2) >>> 0), c2 && n3++;
              }
              this.utf16Length = t3, this.utf8Length = n2, this.utf16Value = e3, this.utf8Value = a2, this.utf16OffsetToUtf8 = i2, this.utf8OffsetToUtf16 = o2;
            }
            createString(e3) {
              const t3 = e3._omalloc(this.utf8Length);
              return e3.HEAPU8.set(this.utf8Value, t3), t3;
            }
          }
          class f {
            constructor(e3) {
              if (this.id = ++f.LAST_ID, !o) throw new Error("Must invoke loadWASM first.");
              this._onigBinding = o, this.content = e3;
              const t3 = new s(e3);
              this.utf16Length = t3.utf16Length, this.utf8Length = t3.utf8Length, this.utf16OffsetToUtf8 = t3.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = t3.utf8OffsetToUtf16, this.utf8Length < 1e4 && !f._sharedPtrInUse ? (f._sharedPtr || (f._sharedPtr = o._omalloc(1e4)), f._sharedPtrInUse = true, o.HEAPU8.set(t3.utf8Value, f._sharedPtr), this.ptr = f._sharedPtr) : this.ptr = t3.createString(o);
            }
            convertUtf8OffsetToUtf16(e3) {
              return this.utf8OffsetToUtf16 ? e3 < 0 ? 0 : e3 > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[e3] : e3;
            }
            convertUtf16OffsetToUtf8(e3) {
              return this.utf16OffsetToUtf8 ? e3 < 0 ? 0 : e3 > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[e3] : e3;
            }
            dispose() {
              this.ptr === f._sharedPtr ? f._sharedPtrInUse = false : this._onigBinding._ofree(this.ptr);
            }
          }
          t2.OnigString = f, f.LAST_ID = 0, f._sharedPtr = 0, f._sharedPtrInUse = false;
          class u {
            constructor(e3, t3) {
              var n2, r2;
              if (!o) throw new Error("Must invoke loadWASM first.");
              const i2 = [], a2 = [];
              for (let t4 = 0, n3 = e3.length; t4 < n3; t4++) {
                const n4 = new s(e3[t4]);
                i2[t4] = n4.createString(o), a2[t4] = n4.utf8Length;
              }
              const f2 = o._omalloc(4 * e3.length);
              o.HEAPU32.set(i2, f2 / 4);
              const u2 = o._omalloc(4 * e3.length);
              o.HEAPU32.set(a2, u2 / 4), this._onigBinding = o, this._options = null !== (n2 = null == t3 ? void 0 : t3.options) && void 0 !== n2 ? n2 : [10];
              const c2 = this.onigOptions(this._options), _2 = this.onigSyntax(null !== (r2 = null == t3 ? void 0 : t3.syntax) && void 0 !== r2 ? r2 : 0), d = o._createOnigScanner(f2, u2, e3.length, c2, _2);
              this._ptr = d;
              for (let t4 = 0, n3 = e3.length; t4 < n3; t4++) o._ofree(i2[t4]);
              o._ofree(u2), o._ofree(f2), 0 === d && function(e4) {
                throw new Error(e4.UTF8ToString(e4._getLastOnigError()));
              }(o);
            }
            dispose() {
              this._onigBinding._freeOnigScanner(this._ptr);
            }
            findNextMatchSync(e3, t3, n2) {
              let r2 = a, i2 = this._options;
              if (Array.isArray(n2) ? (n2.includes(25) && (r2 = true), i2 = i2.concat(n2)) : "boolean" == typeof n2 && (r2 = n2), "string" == typeof e3) {
                e3 = new f(e3);
                const n3 = this._findNextMatchSync(e3, t3, r2, i2);
                return e3.dispose(), n3;
              }
              return this._findNextMatchSync(e3, t3, r2, i2);
            }
            _findNextMatchSync(e3, t3, n2, r2) {
              const i2 = this._onigBinding, o2 = this.onigOptions(r2);
              let a2;
              if (a2 = n2 ? i2._findNextOnigScannerMatchDbg(this._ptr, e3.id, e3.ptr, e3.utf8Length, e3.convertUtf16OffsetToUtf8(t3), o2) : i2._findNextOnigScannerMatch(this._ptr, e3.id, e3.ptr, e3.utf8Length, e3.convertUtf16OffsetToUtf8(t3), o2), 0 === a2) return null;
              const s2 = i2.HEAPU32;
              let f2 = a2 / 4;
              const u2 = s2[f2++], c2 = s2[f2++];
              let _2 = [];
              for (let t4 = 0; t4 < c2; t4++) {
                const n3 = e3.convertUtf8OffsetToUtf16(s2[f2++]), r3 = e3.convertUtf8OffsetToUtf16(s2[f2++]);
                _2[t4] = { start: n3, end: r3, length: r3 - n3 };
              }
              return { index: u2, captureIndices: _2 };
            }
            onigOptions(e3) {
              return e3.map((e4) => this.onigOption(e4)).reduce((e4, t3) => e4 | t3, this._onigBinding.ONIG_OPTION_NONE);
            }
            onigSyntax(e3) {
              switch (e3) {
                case 0:
                  return this._onigBinding.ONIG_SYNTAX_DEFAULT;
                case 1:
                  return this._onigBinding.ONIG_SYNTAX_ASIS;
                case 2:
                  return this._onigBinding.ONIG_SYNTAX_POSIX_BASIC;
                case 3:
                  return this._onigBinding.ONIG_SYNTAX_POSIX_EXTENDED;
                case 4:
                  return this._onigBinding.ONIG_SYNTAX_EMACS;
                case 5:
                  return this._onigBinding.ONIG_SYNTAX_GREP;
                case 6:
                  return this._onigBinding.ONIG_SYNTAX_GNU_REGEX;
                case 7:
                  return this._onigBinding.ONIG_SYNTAX_JAVA;
                case 8:
                  return this._onigBinding.ONIG_SYNTAX_PERL;
                case 9:
                  return this._onigBinding.ONIG_SYNTAX_PERL_NG;
                case 10:
                  return this._onigBinding.ONIG_SYNTAX_RUBY;
                case 11:
                  return this._onigBinding.ONIG_SYNTAX_PYTHON;
                case 12:
                  return this._onigBinding.ONIG_SYNTAX_ONIGURUMA;
              }
            }
            onigOption(e3) {
              switch (e3) {
                case 1:
                  return this._onigBinding.ONIG_OPTION_NONE;
                case 0:
                case 25:
                  return this._onigBinding.ONIG_OPTION_DEFAULT;
                case 2:
                  return this._onigBinding.ONIG_OPTION_IGNORECASE;
                case 3:
                  return this._onigBinding.ONIG_OPTION_EXTEND;
                case 4:
                  return this._onigBinding.ONIG_OPTION_MULTILINE;
                case 5:
                  return this._onigBinding.ONIG_OPTION_SINGLELINE;
                case 6:
                  return this._onigBinding.ONIG_OPTION_FIND_LONGEST;
                case 7:
                  return this._onigBinding.ONIG_OPTION_FIND_NOT_EMPTY;
                case 8:
                  return this._onigBinding.ONIG_OPTION_NEGATE_SINGLELINE;
                case 9:
                  return this._onigBinding.ONIG_OPTION_DONT_CAPTURE_GROUP;
                case 10:
                  return this._onigBinding.ONIG_OPTION_CAPTURE_GROUP;
                case 11:
                  return this._onigBinding.ONIG_OPTION_NOTBOL;
                case 12:
                  return this._onigBinding.ONIG_OPTION_NOTEOL;
                case 13:
                  return this._onigBinding.ONIG_OPTION_CHECK_VALIDITY_OF_STRING;
                case 14:
                  return this._onigBinding.ONIG_OPTION_IGNORECASE_IS_ASCII;
                case 15:
                  return this._onigBinding.ONIG_OPTION_WORD_IS_ASCII;
                case 16:
                  return this._onigBinding.ONIG_OPTION_DIGIT_IS_ASCII;
                case 17:
                  return this._onigBinding.ONIG_OPTION_SPACE_IS_ASCII;
                case 18:
                  return this._onigBinding.ONIG_OPTION_POSIX_IS_ASCII;
                case 19:
                  return this._onigBinding.ONIG_OPTION_TEXT_SEGMENT_EXTENDED_GRAPHEME_CLUSTER;
                case 20:
                  return this._onigBinding.ONIG_OPTION_TEXT_SEGMENT_WORD;
                case 21:
                  return this._onigBinding.ONIG_OPTION_NOT_BEGIN_STRING;
                case 22:
                  return this._onigBinding.ONIG_OPTION_NOT_END_STRING;
                case 23:
                  return this._onigBinding.ONIG_OPTION_NOT_BEGIN_POSITION;
                case 24:
                  return this._onigBinding.ONIG_OPTION_CALLBACK_EACH_MATCH;
              }
            }
          }
          t2.OnigScanner = u;
          let c = false, _ = null;
          t2.loadWASM = function(e3) {
            if (c) return _;
            let t3, n2, r2, a2;
            if (c = true, function(e4) {
              return "function" == typeof e4.instantiator;
            }(e3)) t3 = e3.instantiator, n2 = e3.print;
            else {
              let r3;
              !function(e4) {
                return void 0 !== e4.data;
              }(e3) ? r3 = e3 : (r3 = e3.data, n2 = e3.print), t3 = function(e4) {
                return "undefined" != typeof Response && e4 instanceof Response;
              }(r3) ? "function" == typeof WebAssembly.instantiateStreaming ? /* @__PURE__ */ function(e4) {
                return (t4) => WebAssembly.instantiateStreaming(e4, t4);
              }(r3) : /* @__PURE__ */ function(e4) {
                return async (t4) => {
                  const n3 = await e4.arrayBuffer();
                  return WebAssembly.instantiate(n3, t4);
                };
              }(r3) : /* @__PURE__ */ function(e4) {
                return (t4) => WebAssembly.instantiate(e4, t4);
              }(r3);
            }
            return _ = new Promise((e4, t4) => {
              r2 = e4, a2 = t4;
            }), function(e4, t4, n3, r3) {
              (0, i.default)({ print: t4, instantiateWasm: (t5, n4) => {
                if ("undefined" == typeof performance) {
                  const e5 = () => Date.now();
                  t5.env.emscripten_get_now = e5, t5.wasi_snapshot_preview1.emscripten_get_now = e5;
                }
                return e4(t5).then((e5) => n4(e5.instance), r3), {};
              } }).then((e5) => {
                o = e5, n3();
              });
            }(t3, n2, r2, a2), _;
          }, t2.createOnigString = function(e3) {
            return new f(e3);
          }, t2.createOnigScanner = function(e3) {
            return new u(e3);
          }, t2.setDefaultDebugCall = function(e3) {
            a = e3;
          };
        }, 418: (e2) => {
          var t2 = ("undefined" != typeof document && document.currentScript && document.currentScript.src, function(e3 = {}) {
            var t3, n, r = e3;
            r.ready = new Promise((e4, r2) => {
              t3 = e4, n = r2;
            });
            var i, o = Object.assign({}, r);
            "undefined" != typeof read && read, i = (e4) => {
              if ("function" == typeof readbuffer) return new Uint8Array(readbuffer(e4));
              let t4 = read(e4, "binary");
              return "object" == typeof t4 || P(n2), t4;
              var n2;
            }, "undefined" == typeof clearTimeout && (globalThis.clearTimeout = (e4) => {
            }), "undefined" == typeof setTimeout && (globalThis.setTimeout = (e4) => "function" == typeof e4 ? e4() : P()), "undefined" != typeof scriptArgs && scriptArgs, "undefined" != typeof onig_print && ("undefined" == typeof console && (console = {}), console.log = onig_print, console.warn = console.error = "undefined" != typeof printErr ? printErr : onig_print);
            var a, s, f = r.print || console.log.bind(console), u = r.printErr || console.error.bind(console);
            Object.assign(r, o), o = null, r.arguments && r.arguments, r.thisProgram && r.thisProgram, r.quit && r.quit, r.wasmBinary && (a = r.wasmBinary), r.noExitRuntime, "object" != typeof WebAssembly && P("no native wasm support detected");
            var c, _, d, g, l, h, p, O, v = false;
            function m() {
              var e4 = s.buffer;
              r.HEAP8 = c = new Int8Array(e4), r.HEAP16 = d = new Int16Array(e4), r.HEAPU8 = _ = new Uint8Array(e4), r.HEAPU16 = g = new Uint16Array(e4), r.HEAP32 = l = new Int32Array(e4), r.HEAPU32 = h = new Uint32Array(e4), r.HEAPF32 = p = new Float32Array(e4), r.HEAPF64 = O = new Float64Array(e4);
            }
            var y = [], I = [], T = [];
            var N = 0, A = null, S = null;
            function P(e4) {
              r.onAbort && r.onAbort(e4), u(e4 = "Aborted(" + e4 + ")"), v = true, e4 += ". Build with -sASSERTIONS for more info.";
              var t4 = new WebAssembly.RuntimeError(e4);
              throw n(t4), t4;
            }
            var E, w;
            function b(e4) {
              return e4.startsWith("data:application/octet-stream;base64,");
            }
            function C(e4) {
              if (e4 == E && a) return new Uint8Array(a);
              if (i) return i(e4);
              throw "both async and sync fetching of the wasm failed";
            }
            function U(e4, t4, n2) {
              return function(e5) {
                return Promise.resolve().then(() => C(e5));
              }(e4).then((e5) => WebAssembly.instantiate(e5, t4)).then((e5) => e5).then(n2, (e5) => {
                u(`failed to asynchronously prepare wasm: ${e5}`), P(e5);
              });
            }
            b(E = "onig.wasm") || (w = E, E = r.locateFile ? r.locateFile(w, "") : "" + w);
            var G = (e4) => {
              for (; e4.length > 0; ) e4.shift()(r);
            }, B = void 0, R = (e4) => {
              for (var t4 = "", n2 = e4; _[n2]; ) t4 += B[_[n2++]];
              return t4;
            }, W = {}, L = {}, D = {}, x = void 0, M = (e4) => {
              throw new x(e4);
            }, F = void 0, X = (e4, t4, n2) => {
              function r2(t5) {
                var r3 = n2(t5);
                r3.length !== e4.length && ((e5) => {
                  throw new F(e5);
                })("Mismatched type converter count");
                for (var i3 = 0; i3 < e4.length; ++i3) k(e4[i3], r3[i3]);
              }
              e4.forEach(function(e5) {
                D[e5] = t4;
              });
              var i2 = new Array(t4.length), o2 = [], a2 = 0;
              t4.forEach((e5, t5) => {
                L.hasOwnProperty(e5) ? i2[t5] = L[e5] : (o2.push(e5), W.hasOwnProperty(e5) || (W[e5] = []), W[e5].push(() => {
                  i2[t5] = L[e5], ++a2 === o2.length && r2(i2);
                }));
              }), 0 === o2.length && r2(i2);
            };
            function k(e4, t4, n2 = {}) {
              if (!("argPackAdvance" in t4)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
              return function(e5, t5, n3 = {}) {
                var r2 = t5.name;
                if (e5 || M(`type "${r2}" must have a positive integer typeid pointer`), L.hasOwnProperty(e5)) {
                  if (n3.ignoreDuplicateRegistrations) return;
                  M(`Cannot register type '${r2}' twice`);
                }
                if (L[e5] = t5, delete D[e5], W.hasOwnProperty(e5)) {
                  var i2 = W[e5];
                  delete W[e5], i2.forEach((e6) => e6());
                }
              }(e4, t4, n2);
            }
            function H() {
              this.allocated = [void 0], this.freelist = [];
            }
            var Y = new H(), j = () => {
              for (var e4 = 0, t4 = Y.reserved; t4 < Y.allocated.length; ++t4) void 0 !== Y.allocated[t4] && ++e4;
              return e4;
            }, V = (e4) => (e4 || M("Cannot use deleted val. handle = " + e4), Y.get(e4).value), $ = (e4) => {
              switch (e4) {
                case void 0:
                  return 1;
                case null:
                  return 2;
                case true:
                  return 3;
                case false:
                  return 4;
                default:
                  return Y.allocate({ refcount: 1, value: e4 });
              }
            };
            function z(e4) {
              return this.fromWireType(l[e4 >> 2]);
            }
            var q = (e4, t4) => {
              switch (t4) {
                case 4:
                  return function(e5) {
                    return this.fromWireType(p[e5 >> 2]);
                  };
                case 8:
                  return function(e5) {
                    return this.fromWireType(O[e5 >> 3]);
                  };
                default:
                  throw new TypeError(`invalid float width (${t4}): ${e4}`);
              }
            }, K = (e4, t4, n2) => {
              switch (t4) {
                case 1:
                  return n2 ? (e5) => c[e5 >> 0] : (e5) => _[e5 >> 0];
                case 2:
                  return n2 ? (e5) => d[e5 >> 1] : (e5) => g[e5 >> 1];
                case 4:
                  return n2 ? (e5) => l[e5 >> 2] : (e5) => h[e5 >> 2];
                default:
                  throw new TypeError(`invalid integer width (${t4}): ${e4}`);
              }
            };
            function J(e4) {
              return this.fromWireType(h[e4 >> 2]);
            }
            var Q, Z = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, ee = (e4, t4, n2) => {
              for (var r2 = t4 + n2, i2 = t4; e4[i2] && !(i2 >= r2); ) ++i2;
              if (i2 - t4 > 16 && e4.buffer && Z) return Z.decode(e4.subarray(t4, i2));
              for (var o2 = ""; t4 < i2; ) {
                var a2 = e4[t4++];
                if (128 & a2) {
                  var s2 = 63 & e4[t4++];
                  if (192 != (224 & a2)) {
                    var f2 = 63 & e4[t4++];
                    if ((a2 = 224 == (240 & a2) ? (15 & a2) << 12 | s2 << 6 | f2 : (7 & a2) << 18 | s2 << 12 | f2 << 6 | 63 & e4[t4++]) < 65536) o2 += String.fromCharCode(a2);
                    else {
                      var u2 = a2 - 65536;
                      o2 += String.fromCharCode(55296 | u2 >> 10, 56320 | 1023 & u2);
                    }
                  } else o2 += String.fromCharCode((31 & a2) << 6 | s2);
                } else o2 += String.fromCharCode(a2);
              }
              return o2;
            }, te = (e4, t4) => e4 ? ee(_, e4, t4) : "", ne = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, re = (e4, t4) => {
              for (var n2 = e4, r2 = n2 >> 1, i2 = r2 + t4 / 2; !(r2 >= i2) && g[r2]; ) ++r2;
              if ((n2 = r2 << 1) - e4 > 32 && ne) return ne.decode(_.subarray(e4, n2));
              for (var o2 = "", a2 = 0; !(a2 >= t4 / 2); ++a2) {
                var s2 = d[e4 + 2 * a2 >> 1];
                if (0 == s2) break;
                o2 += String.fromCharCode(s2);
              }
              return o2;
            }, ie = (e4, t4, n2) => {
              if (void 0 === n2 && (n2 = 2147483647), n2 < 2) return 0;
              for (var r2 = t4, i2 = (n2 -= 2) < 2 * e4.length ? n2 / 2 : e4.length, o2 = 0; o2 < i2; ++o2) {
                var a2 = e4.charCodeAt(o2);
                d[t4 >> 1] = a2, t4 += 2;
              }
              return d[t4 >> 1] = 0, t4 - r2;
            }, oe = (e4) => 2 * e4.length, ae = (e4, t4) => {
              for (var n2 = 0, r2 = ""; !(n2 >= t4 / 4); ) {
                var i2 = l[e4 + 4 * n2 >> 2];
                if (0 == i2) break;
                if (++n2, i2 >= 65536) {
                  var o2 = i2 - 65536;
                  r2 += String.fromCharCode(55296 | o2 >> 10, 56320 | 1023 & o2);
                } else r2 += String.fromCharCode(i2);
              }
              return r2;
            }, se = (e4, t4, n2) => {
              if (void 0 === n2 && (n2 = 2147483647), n2 < 4) return 0;
              for (var r2 = t4, i2 = r2 + n2 - 4, o2 = 0; o2 < e4.length; ++o2) {
                var a2 = e4.charCodeAt(o2);
                if (a2 >= 55296 && a2 <= 57343 && (a2 = 65536 + ((1023 & a2) << 10) | 1023 & e4.charCodeAt(++o2)), l[t4 >> 2] = a2, (t4 += 4) + 4 > i2) break;
              }
              return l[t4 >> 2] = 0, t4 - r2;
            }, fe = (e4) => {
              for (var t4 = 0, n2 = 0; n2 < e4.length; ++n2) {
                var r2 = e4.charCodeAt(n2);
                r2 >= 55296 && r2 <= 57343 && ++n2, t4 += 4;
              }
              return t4;
            };
            Q = () => performance.now();
            var ue = (e4) => {
              var t4 = (e4 - s.buffer.byteLength + 65535) / 65536;
              try {
                return s.grow(t4), m(), 1;
              } catch (e5) {
              }
            }, ce = [null, [], []];
            (() => {
              for (var e4 = new Array(256), t4 = 0; t4 < 256; ++t4) e4[t4] = String.fromCharCode(t4);
              B = e4;
            })(), x = r.BindingError = class extends Error {
              constructor(e4) {
                super(e4), this.name = "BindingError";
              }
            }, F = r.InternalError = class extends Error {
              constructor(e4) {
                super(e4), this.name = "InternalError";
              }
            }, Object.assign(H.prototype, { get(e4) {
              return this.allocated[e4];
            }, has(e4) {
              return void 0 !== this.allocated[e4];
            }, allocate(e4) {
              var t4 = this.freelist.pop() || this.allocated.length;
              return this.allocated[t4] = e4, t4;
            }, free(e4) {
              this.allocated[e4] = void 0, this.freelist.push(e4);
            } }), Y.allocated.push({ value: void 0 }, { value: null }, { value: true }, { value: false }), Y.reserved = Y.allocated.length, r.count_emval_handles = j;
            var _e, de = { _embind_register_bigint: (e4, t4, n2, r2, i2) => {
            }, _embind_register_bool: (e4, t4, n2, r2) => {
              k(e4, { name: t4 = R(t4), fromWireType: function(e5) {
                return !!e5;
              }, toWireType: function(e5, t5) {
                return t5 ? n2 : r2;
              }, argPackAdvance: 8, readValueFromPointer: function(e5) {
                return this.fromWireType(_[e5]);
              }, destructorFunction: null });
            }, _embind_register_constant: (e4, t4, n2) => {
              e4 = R(e4), X([], [t4], function(t5) {
                return t5 = t5[0], r[e4] = t5.fromWireType(n2), [];
              });
            }, _embind_register_emval: (e4, t4) => {
              k(e4, { name: t4 = R(t4), fromWireType: (e5) => {
                var t5 = V(e5);
                return ((e6) => {
                  e6 >= Y.reserved && 0 == --Y.get(e6).refcount && Y.free(e6);
                })(e5), t5;
              }, toWireType: (e5, t5) => $(t5), argPackAdvance: 8, readValueFromPointer: z, destructorFunction: null });
            }, _embind_register_float: (e4, t4, n2) => {
              k(e4, { name: t4 = R(t4), fromWireType: (e5) => e5, toWireType: (e5, t5) => t5, argPackAdvance: 8, readValueFromPointer: q(t4, n2), destructorFunction: null });
            }, _embind_register_integer: (e4, t4, n2, r2, i2) => {
              t4 = R(t4), -1 === i2 && (i2 = 4294967295);
              var o2 = (e5) => e5;
              if (0 === r2) {
                var a2 = 32 - 8 * n2;
                o2 = (e5) => e5 << a2 >>> a2;
              }
              var s2 = t4.includes("unsigned");
              k(e4, { name: t4, fromWireType: o2, toWireType: s2 ? function(e5, t5) {
                return this.name, t5 >>> 0;
              } : function(e5, t5) {
                return this.name, t5;
              }, argPackAdvance: 8, readValueFromPointer: K(t4, n2, 0 !== r2), destructorFunction: null });
            }, _embind_register_memory_view: (e4, t4, n2) => {
              var r2 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][t4];
              function i2(e5) {
                var t5 = h[e5 >> 2], n3 = h[e5 + 4 >> 2];
                return new r2(c.buffer, n3, t5);
              }
              k(e4, { name: n2 = R(n2), fromWireType: i2, argPackAdvance: 8, readValueFromPointer: i2 }, { ignoreDuplicateRegistrations: true });
            }, _embind_register_std_string: (e4, t4) => {
              var n2 = "std::string" === (t4 = R(t4));
              k(e4, { name: t4, fromWireType: (e5) => {
                var t5, r2 = h[e5 >> 2], i2 = e5 + 4;
                if (n2) for (var o2 = i2, a2 = 0; a2 <= r2; ++a2) {
                  var s2 = i2 + a2;
                  if (a2 == r2 || 0 == _[s2]) {
                    var f2 = te(o2, s2 - o2);
                    void 0 === t5 ? t5 = f2 : (t5 += String.fromCharCode(0), t5 += f2), o2 = s2 + 1;
                  }
                }
                else {
                  var u2 = new Array(r2);
                  for (a2 = 0; a2 < r2; ++a2) u2[a2] = String.fromCharCode(_[i2 + a2]);
                  t5 = u2.join("");
                }
                return he(e5), t5;
              }, toWireType: (e5, t5) => {
                var r2;
                t5 instanceof ArrayBuffer && (t5 = new Uint8Array(t5));
                var i2 = "string" == typeof t5;
                i2 || t5 instanceof Uint8Array || t5 instanceof Uint8ClampedArray || t5 instanceof Int8Array || M("Cannot pass non-string to std::string"), r2 = n2 && i2 ? ((e6) => {
                  for (var t6 = 0, n3 = 0; n3 < e6.length; ++n3) {
                    var r3 = e6.charCodeAt(n3);
                    r3 <= 127 ? t6++ : r3 <= 2047 ? t6 += 2 : r3 >= 55296 && r3 <= 57343 ? (t6 += 4, ++n3) : t6 += 3;
                  }
                  return t6;
                })(t5) : t5.length;
                var o2 = le(4 + r2 + 1), a2 = o2 + 4;
                if (h[o2 >> 2] = r2, n2 && i2) ((e6, t6, n3, r3) => {
                  if (!(r3 > 0)) return 0;
                  for (var i3 = n3, o3 = n3 + r3 - 1, a3 = 0; a3 < e6.length; ++a3) {
                    var s3 = e6.charCodeAt(a3);
                    if (s3 >= 55296 && s3 <= 57343 && (s3 = 65536 + ((1023 & s3) << 10) | 1023 & e6.charCodeAt(++a3)), s3 <= 127) {
                      if (n3 >= o3) break;
                      t6[n3++] = s3;
                    } else if (s3 <= 2047) {
                      if (n3 + 1 >= o3) break;
                      t6[n3++] = 192 | s3 >> 6, t6[n3++] = 128 | 63 & s3;
                    } else if (s3 <= 65535) {
                      if (n3 + 2 >= o3) break;
                      t6[n3++] = 224 | s3 >> 12, t6[n3++] = 128 | s3 >> 6 & 63, t6[n3++] = 128 | 63 & s3;
                    } else {
                      if (n3 + 3 >= o3) break;
                      t6[n3++] = 240 | s3 >> 18, t6[n3++] = 128 | s3 >> 12 & 63, t6[n3++] = 128 | s3 >> 6 & 63, t6[n3++] = 128 | 63 & s3;
                    }
                  }
                  t6[n3] = 0;
                })(t5, _, a2, r2 + 1);
                else if (i2) for (var s2 = 0; s2 < r2; ++s2) {
                  var f2 = t5.charCodeAt(s2);
                  f2 > 255 && (he(a2), M("String has UTF-16 code units that do not fit in 8 bits")), _[a2 + s2] = f2;
                }
                else for (s2 = 0; s2 < r2; ++s2) _[a2 + s2] = t5[s2];
                return null !== e5 && e5.push(he, o2), o2;
              }, argPackAdvance: 8, readValueFromPointer: J, destructorFunction: (e5) => he(e5) });
            }, _embind_register_std_wstring: (e4, t4, n2) => {
              var r2, i2, o2, a2, s2;
              n2 = R(n2), 2 === t4 ? (r2 = re, i2 = ie, a2 = oe, o2 = () => g, s2 = 1) : 4 === t4 && (r2 = ae, i2 = se, a2 = fe, o2 = () => h, s2 = 2), k(e4, { name: n2, fromWireType: (e5) => {
                for (var n3, i3 = h[e5 >> 2], a3 = o2(), f2 = e5 + 4, u2 = 0; u2 <= i3; ++u2) {
                  var c2 = e5 + 4 + u2 * t4;
                  if (u2 == i3 || 0 == a3[c2 >> s2]) {
                    var _2 = r2(f2, c2 - f2);
                    void 0 === n3 ? n3 = _2 : (n3 += String.fromCharCode(0), n3 += _2), f2 = c2 + t4;
                  }
                }
                return he(e5), n3;
              }, toWireType: (e5, r3) => {
                "string" != typeof r3 && M(`Cannot pass non-string to C++ string type ${n2}`);
                var o3 = a2(r3), f2 = le(4 + o3 + t4);
                return h[f2 >> 2] = o3 >> s2, i2(r3, f2 + 4, o3 + t4), null !== e5 && e5.push(he, f2), f2;
              }, argPackAdvance: 8, readValueFromPointer: z, destructorFunction: (e5) => he(e5) });
            }, _embind_register_void: (e4, t4) => {
              k(e4, { isVoid: true, name: t4 = R(t4), argPackAdvance: 0, fromWireType: () => {
              }, toWireType: (e5, t5) => {
              } });
            }, emscripten_get_now: Q, emscripten_memcpy_big: (e4, t4, n2) => _.copyWithin(e4, t4, t4 + n2), emscripten_resize_heap: (e4) => {
              var t4 = _.length, n2 = 2147483648;
              if ((e4 >>>= 0) > n2) return false;
              for (var r2, i2 = 1; i2 <= 4; i2 *= 2) {
                var o2 = t4 * (1 + 0.2 / i2);
                o2 = Math.min(o2, e4 + 100663296);
                var a2 = Math.min(n2, (r2 = Math.max(e4, o2)) + (65536 - r2 % 65536) % 65536);
                if (ue(a2)) return true;
              }
              return false;
            }, fd_write: (e4, t4, n2, r2) => {
              for (var i2 = 0, o2 = 0; o2 < n2; o2++) {
                var a2 = h[t4 >> 2], s2 = h[t4 + 4 >> 2];
                t4 += 8;
                for (var c2 = 0; c2 < s2; c2++) d2 = e4, g2 = _[a2 + c2], l2 = void 0, l2 = ce[d2], 0 === g2 || 10 === g2 ? ((1 === d2 ? f : u)(ee(l2, 0)), l2.length = 0) : l2.push(g2);
                i2 += s2;
              }
              var d2, g2, l2;
              return h[r2 >> 2] = i2, 0;
            } }, ge = function() {
              var e4, t4, i2, o2, f2 = { env: de, wasi_snapshot_preview1: de };
              function c2(e5, t5) {
                var n2, i3 = e5.exports;
                return s = (ge = i3).memory, m(), ge.__indirect_function_table, n2 = ge.__wasm_call_ctors, I.unshift(n2), function(e6) {
                  if (N--, r.monitorRunDependencies && r.monitorRunDependencies(N), 0 == N && (null !== A && (clearInterval(A), A = null), S)) {
                    var t6 = S;
                    S = null, t6();
                  }
                }(), i3;
              }
              if (N++, r.monitorRunDependencies && r.monitorRunDependencies(N), r.instantiateWasm) try {
                return r.instantiateWasm(f2, c2);
              } catch (e5) {
                u(`Module.instantiateWasm callback failed with error: ${e5}`), n(e5);
              }
              return (e4 = a, t4 = E, i2 = f2, o2 = function(e5) {
                c2(e5.instance);
              }, e4 || "function" != typeof WebAssembly.instantiateStreaming || b(t4) || "function" != typeof fetch ? U(t4, i2, o2) : fetch(t4, { credentials: "same-origin" }).then((e5) => WebAssembly.instantiateStreaming(e5, i2).then(o2, function(e6) {
                return u(`wasm streaming compile failed: ${e6}`), u("falling back to ArrayBuffer instantiation"), U(t4, i2, o2);
              }))).catch(n), {};
            }(), le = (e4) => (le = ge.malloc)(e4), he = (e4) => (he = ge.free)(e4);
            function pe() {
              function e4() {
                _e || (_e = true, r.calledRun = true, v || (G(I), t3(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), function() {
                  if (r.postRun) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length; ) e5 = r.postRun.shift(), T.unshift(e5);
                  var e5;
                  G(T);
                }()));
              }
              N > 0 || (function() {
                if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length; ) e5 = r.preRun.shift(), y.unshift(e5);
                var e5;
                G(y);
              }(), N > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function() {
                setTimeout(function() {
                  r.setStatus("");
                }, 1), e4();
              }, 1)) : e4()));
            }
            if (r._omalloc = (e4) => (r._omalloc = ge.omalloc)(e4), r._ofree = (e4) => (r._ofree = ge.ofree)(e4), r._getLastOnigError = () => (r._getLastOnigError = ge.getLastOnigError)(), r._createOnigScanner = (e4, t4, n2, i2, o2) => (r._createOnigScanner = ge.createOnigScanner)(e4, t4, n2, i2, o2), r._freeOnigScanner = (e4) => (r._freeOnigScanner = ge.freeOnigScanner)(e4), r._findNextOnigScannerMatch = (e4, t4, n2, i2, o2, a2) => (r._findNextOnigScannerMatch = ge.findNextOnigScannerMatch)(e4, t4, n2, i2, o2, a2), r._findNextOnigScannerMatchDbg = (e4, t4, n2, i2, o2, a2) => (r._findNextOnigScannerMatchDbg = ge.findNextOnigScannerMatchDbg)(e4, t4, n2, i2, o2, a2), r.__embind_initialize_bindings = () => (r.__embind_initialize_bindings = ge._embind_initialize_bindings)(), r.dynCall_jiji = (e4, t4, n2, i2, o2) => (r.dynCall_jiji = ge.dynCall_jiji)(e4, t4, n2, i2, o2), r.UTF8ToString = te, S = function e4() {
              _e || pe(), _e || (S = e4);
            }, r.preInit) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); r.preInit.length > 0; ) r.preInit.pop()();
            return pe(), e3.ready;
          });
          e2.exports = t2;
        } }, t = {}, function n(r) {
          var i = t[r];
          if (void 0 !== i) return i.exports;
          var o = t[r] = { exports: {} };
          return e[r].call(o.exports, o, o.exports, n), o.exports;
        }(770);
        var e, t;
      });
    }
  });

  // node_modules/vscode-textmate/release/main.js
  var require_main2 = __commonJS({
    "node_modules/vscode-textmate/release/main.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vscodetextmate = t() : e.vscodetextmate = t();
      }(exports, () => (() => {
        "use strict";
        var e = { 185: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.UseOnigurumaFindOptions = t2.DebugFlags = void 0, t2.DebugFlags = { InDebugMode: "undefined" != typeof process && !!process.env.VSCODE_TEXTMATE_DEBUG }, t2.UseOnigurumaFindOptions = false;
        }, 151: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.applyStateStackDiff = t2.diffStateStacksRefEq = void 0;
          const s = n(752);
          t2.diffStateStacksRefEq = function(e3, t3) {
            let n2 = 0;
            const s2 = [];
            let r = e3, i = t3;
            for (; r !== i; ) r && (!i || r.depth >= i.depth) ? (n2++, r = r.parent) : (s2.push(i.toStateStackFrame()), i = i.parent);
            return { pops: n2, newFrames: s2.reverse() };
          }, t2.applyStateStackDiff = function(e3, t3) {
            let n2 = e3;
            for (let e4 = 0; e4 < t3.pops; e4++) n2 = n2.parent;
            for (const e4 of t3.newFrames) n2 = s.StateStackImpl.pushFrame(n2, e4);
            return n2;
          };
        }, 490: (e2, t2) => {
          var n;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.toOptionalTokenType = t2.EncodedTokenAttributes = void 0, (n = t2.EncodedTokenAttributes || (t2.EncodedTokenAttributes = {})).toBinaryStr = function(e3) {
            return e3.toString(2).padStart(32, "0");
          }, n.print = function(e3) {
            const t3 = n.getLanguageId(e3), s = n.getTokenType(e3), r = n.getFontStyle(e3), i = n.getForeground(e3), o = n.getBackground(e3);
            console.log({ languageId: t3, tokenType: s, fontStyle: r, foreground: i, background: o });
          }, n.getLanguageId = function(e3) {
            return (255 & e3) >>> 0;
          }, n.getTokenType = function(e3) {
            return (768 & e3) >>> 8;
          }, n.containsBalancedBrackets = function(e3) {
            return !!(1024 & e3);
          }, n.getFontStyle = function(e3) {
            return (30720 & e3) >>> 11;
          }, n.getForeground = function(e3) {
            return (16744448 & e3) >>> 15;
          }, n.getBackground = function(e3) {
            return (4278190080 & e3) >>> 24;
          }, n.set = function(e3, t3, s, r, i, o, a) {
            let c = n.getLanguageId(e3), l = n.getTokenType(e3), u = n.containsBalancedBrackets(e3) ? 1 : 0, h = n.getFontStyle(e3), p = n.getForeground(e3), d = n.getBackground(e3);
            return 0 !== t3 && (c = t3), 8 !== s && (l = s), null !== r && (u = r ? 1 : 0), -1 !== i && (h = i), 0 !== o && (p = o), 0 !== a && (d = a), (c | l << 8 | u << 10 | h << 11 | p << 15 | d << 24) >>> 0;
          }, t2.toOptionalTokenType = function(e3) {
            return e3;
          };
        }, 214: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BasicScopeAttributesProvider = t2.BasicScopeAttributes = void 0;
          const s = n(807);
          class r {
            constructor(e3, t3) {
              this.languageId = e3, this.tokenType = t3;
            }
          }
          t2.BasicScopeAttributes = r;
          class i {
            constructor(e3, t3) {
              this._getBasicScopeAttributes = new s.CachedFn((e4) => {
                const t4 = this._scopeToLanguage(e4), n2 = this._toStandardTokenType(e4);
                return new r(t4, n2);
              }), this._defaultAttributes = new r(e3, 8), this._embeddedLanguagesMatcher = new o(Object.entries(t3 || {}));
            }
            getDefaultAttributes() {
              return this._defaultAttributes;
            }
            getBasicScopeAttributes(e3) {
              return null === e3 ? i._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e3);
            }
            _scopeToLanguage(e3) {
              return this._embeddedLanguagesMatcher.match(e3) || 0;
            }
            _toStandardTokenType(e3) {
              const t3 = e3.match(i.STANDARD_TOKEN_TYPE_REGEXP);
              if (!t3) return 8;
              switch (t3[1]) {
                case "comment":
                  return 1;
                case "string":
                  return 2;
                case "regex":
                  return 3;
                case "meta.embedded":
                  return 0;
              }
              throw new Error("Unexpected match for standard token type!");
            }
          }
          t2.BasicScopeAttributesProvider = i, i._NULL_SCOPE_METADATA = new r(0, 0), i.STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
          class o {
            constructor(e3) {
              if (0 === e3.length) this.values = null, this.scopesRegExp = null;
              else {
                this.values = new Map(e3);
                const t3 = e3.map(([e4, t4]) => s.escapeRegExpCharacters(e4));
                t3.sort(), t3.reverse(), this.scopesRegExp = new RegExp(`^((${t3.join(")|(")}))($|\\.)`, "");
              }
            }
            match(e3) {
              if (!this.scopesRegExp) return;
              const t3 = e3.match(this.scopesRegExp);
              return t3 ? this.values.get(t3[1]) : void 0;
            }
          }
        }, 929: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.LineTokens = t2.BalancedBracketSelectors = t2.StateStackImpl = t2.AttributedScopeStack = t2.Grammar = t2.createGrammar = void 0;
          const s = n(185), r = n(490), i = n(916), o = n(810), a = n(666), c = n(63), l = n(807), u = n(214), h = n(398);
          function p(e3, t3, n2, s2, r2) {
            const o2 = i.createMatchers(t3, d), c2 = a.RuleFactory.getCompiledRuleId(n2, s2, r2.repository);
            for (const n3 of o2) e3.push({ debugSelector: t3, matcher: n3.matcher, ruleId: c2, grammar: r2, priority: n3.priority });
          }
          function d(e3, t3) {
            if (t3.length < e3.length) return false;
            let n2 = 0;
            return e3.every((e4) => {
              for (let s2 = n2; s2 < t3.length; s2++) if (f(t3[s2], e4)) return n2 = s2 + 1, true;
              return false;
            });
          }
          function f(e3, t3) {
            if (!e3) return false;
            if (e3 === t3) return true;
            const n2 = t3.length;
            return e3.length > n2 && e3.substr(0, n2) === t3 && "." === e3[n2];
          }
          t2.createGrammar = function(e3, t3, n2, s2, r2, i2, o2, a2) {
            return new m(e3, t3, n2, s2, r2, i2, o2, a2);
          };
          class m {
            constructor(e3, t3, n2, s2, r2, o2, a2, c2) {
              if (this._rootScopeName = e3, this.balancedBracketSelectors = o2, this._onigLib = c2, this._basicScopeAttributesProvider = new u.BasicScopeAttributesProvider(n2, s2), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = a2, this._grammar = g(t3, null), this._injections = null, this._tokenTypeMatchers = [], r2) for (const e4 of Object.keys(r2)) {
                const t4 = i.createMatchers(e4, d);
                for (const n3 of t4) this._tokenTypeMatchers.push({ matcher: n3.matcher, type: r2[e4] });
              }
            }
            get themeProvider() {
              return this._grammarRepository;
            }
            dispose() {
              for (const e3 of this._ruleId2desc) e3 && e3.dispose();
            }
            createOnigScanner(e3) {
              return this._onigLib.createOnigScanner(e3);
            }
            createOnigString(e3) {
              return this._onigLib.createOnigString(e3);
            }
            getMetadataForScope(e3) {
              return this._basicScopeAttributesProvider.getBasicScopeAttributes(e3);
            }
            _collectInjections() {
              const e3 = [], t3 = this._rootScopeName, n2 = ((e4) => e4 === this._rootScopeName ? this._grammar : this.getExternalGrammar(e4))(t3);
              if (n2) {
                const s2 = n2.injections;
                if (s2) for (let t4 in s2) p(e3, t4, s2[t4], this, n2);
                const r2 = this._grammarRepository.injections(t3);
                r2 && r2.forEach((t4) => {
                  const n3 = this.getExternalGrammar(t4);
                  if (n3) {
                    const t5 = n3.injectionSelector;
                    t5 && p(e3, t5, n3, this, n3);
                  }
                });
              }
              return e3.sort((e4, t4) => e4.priority - t4.priority), e3;
            }
            getInjections() {
              if (null === this._injections && (this._injections = this._collectInjections(), s.DebugFlags.InDebugMode && this._injections.length > 0)) {
                console.log(`Grammar ${this._rootScopeName} contains the following injections:`);
                for (const e3 of this._injections) console.log(`  - ${e3.debugSelector}`);
              }
              return this._injections;
            }
            registerRule(e3) {
              const t3 = ++this._lastRuleId, n2 = e3(a.ruleIdFromNumber(t3)); // Stackoverflow error here
              return this._ruleId2desc[t3] = n2, n2;
            }
            getRule(e3) {
              return this._ruleId2desc[a.ruleIdToNumber(e3)];
            }
            getExternalGrammar(e3, t3) {
              if (this._includedGrammars[e3]) return this._includedGrammars[e3];
              if (this._grammarRepository) {
                const n2 = this._grammarRepository.lookup(e3);
                if (n2) return this._includedGrammars[e3] = g(n2, t3 && t3.$base), this._includedGrammars[e3];
              }
            }
            tokenizeLine(e3, t3, n2 = 0) {
              const s2 = this._tokenize(e3, t3, false, n2);
              return { tokens: s2.lineTokens.getResult(s2.ruleStack, s2.lineLength), ruleStack: s2.ruleStack, stoppedEarly: s2.stoppedEarly };
            }
            tokenizeLine2(e3, t3, n2 = 0) {
              const s2 = this._tokenize(e3, t3, true, n2);
              return { tokens: s2.lineTokens.getBinaryResult(s2.ruleStack, s2.lineLength), ruleStack: s2.ruleStack, stoppedEarly: s2.stoppedEarly };
            }
            _tokenize(e3, t3, n2, s2) {
              let i2;
              if (-1 === this._rootId && (this._rootId = a.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository), this.getInjections()), t3 && t3 !== b.NULL) i2 = false, t3.reset();
              else {
                i2 = true;
                const e4 = this._basicScopeAttributesProvider.getDefaultAttributes(), n3 = this.themeProvider.getDefaults(), s3 = r.EncodedTokenAttributes.set(0, e4.languageId, e4.tokenType, null, n3.fontStyle, n3.foregroundId, n3.backgroundId), o2 = this.getRule(this._rootId).getName(null, null);
                let a2;
                a2 = o2 ? _.createRootAndLookUpScopeName(o2, s3, this) : _.createRoot("unknown", s3), t3 = new b(null, this._rootId, -1, -1, false, null, a2, a2);
              }
              e3 += "\n";
              console.log(e3);
              const c2 = this.createOnigString(e3), l2 = c2.content.length, u2 = new y(n2, e3, this._tokenTypeMatchers, this.balancedBracketSelectors), p2 = h._tokenizeString(this, c2, i2, 0, t3, u2, true, s2);
              return o.disposeOnigString(c2), { lineLength: l2, lineTokens: u2, ruleStack: p2.stack, stoppedEarly: p2.stoppedEarly };
            }
          }
          function g(e3, t3) {
            return (e3 = l.clone(e3)).repository = e3.repository || {}, e3.repository.$self = { $vscodeTextmateLocation: e3.$vscodeTextmateLocation, patterns: e3.patterns, name: e3.scopeName }, e3.repository.$base = t3 || e3.repository.$self, e3;
          }
          t2.Grammar = m;
          class _ {
            constructor(e3, t3, n2) {
              this.parent = e3, this.scopePath = t3, this.tokenAttributes = n2;
            }
            static fromExtension(e3, t3) {
              let n2 = e3, s2 = e3?.scopePath ?? null;
              for (const e4 of t3) s2 = c.ScopeStack.push(s2, e4.scopeNames), n2 = new _(n2, s2, e4.encodedTokenAttributes);
              return n2;
            }
            static createRoot(e3, t3) {
              return new _(null, new c.ScopeStack(null, e3), t3);
            }
            static createRootAndLookUpScopeName(e3, t3, n2) {
              const s2 = n2.getMetadataForScope(e3), r2 = new c.ScopeStack(null, e3), i2 = n2.themeProvider.themeMatch(r2), o2 = _.mergeAttributes(t3, s2, i2);
              return new _(null, r2, o2);
            }
            get scopeName() {
              return this.scopePath.scopeName;
            }
            toString() {
              return this.getScopeNames().join(" ");
            }
            equals(e3) {
              return _.equals(this, e3);
            }
            static equals(e3, t3) {
              for (; ; ) {
                if (e3 === t3) return true;
                if (!e3 && !t3) return true;
                if (!e3 || !t3) return false;
                if (e3.scopeName !== t3.scopeName || e3.tokenAttributes !== t3.tokenAttributes) return false;
                e3 = e3.parent, t3 = t3.parent;
              }
            }
            static mergeAttributes(e3, t3, n2) {
              let s2 = -1, i2 = 0, o2 = 0;
              return null !== n2 && (s2 = n2.fontStyle, i2 = n2.foregroundId, o2 = n2.backgroundId), r.EncodedTokenAttributes.set(e3, t3.languageId, t3.tokenType, null, s2, i2, o2);
            }
            pushAttributed(e3, t3) {
              if (null === e3) return this;
              if (-1 === e3.indexOf(" ")) return _._pushAttributed(this, e3, t3);
              const n2 = e3.split(/ /g);
              let s2 = this;
              for (const e4 of n2) s2 = _._pushAttributed(s2, e4, t3);
              return s2;
            }
            static _pushAttributed(e3, t3, n2) {
              const s2 = n2.getMetadataForScope(t3), r2 = e3.scopePath.push(t3), i2 = n2.themeProvider.themeMatch(r2), o2 = _.mergeAttributes(e3.tokenAttributes, s2, i2);
              return new _(e3, r2, o2);
            }
            getScopeNames() {
              return this.scopePath.getSegments();
            }
            getExtensionIfDefined(e3) {
              const t3 = [];
              let n2 = this;
              for (; n2 && n2 !== e3; ) t3.push({ encodedTokenAttributes: n2.tokenAttributes, scopeNames: n2.scopePath.getExtensionIfDefined(n2.parent?.scopePath ?? null) }), n2 = n2.parent;
              return n2 === e3 ? t3.reverse() : void 0;
            }
          }
          t2.AttributedScopeStack = _;
          class b {
            constructor(e3, t3, n2, s2, r2, i2, o2, a2) {
              this.parent = e3, this.ruleId = t3, this.beginRuleCapturedEOL = r2, this.endRule = i2, this.nameScopesList = o2, this.contentNameScopesList = a2, this._stackElementBrand = void 0, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = n2, this._anchorPos = s2;
            }
            equals(e3) {
              return null !== e3 && b._equals(this, e3);
            }
            static _equals(e3, t3) {
              return e3 === t3 || !!this._structuralEquals(e3, t3) && _.equals(e3.contentNameScopesList, t3.contentNameScopesList);
            }
            static _structuralEquals(e3, t3) {
              for (; ; ) {
                if (e3 === t3) return true;
                if (!e3 && !t3) return true;
                if (!e3 || !t3) return false;
                if (e3.depth !== t3.depth || e3.ruleId !== t3.ruleId || e3.endRule !== t3.endRule) return false;
                e3 = e3.parent, t3 = t3.parent;
              }
            }
            clone() {
              return this;
            }
            static _reset(e3) {
              for (; e3; ) e3._enterPos = -1, e3._anchorPos = -1, e3 = e3.parent;
            }
            reset() {
              b._reset(this);
            }
            pop() {
              return this.parent;
            }
            safePop() {
              return this.parent ? this.parent : this;
            }
            push(e3, t3, n2, s2, r2, i2, o2) {
              return new b(this, e3, t3, n2, s2, r2, i2, o2);
            }
            getEnterPos() {
              return this._enterPos;
            }
            getAnchorPos() {
              return this._anchorPos;
            }
            getRule(e3) {
              return e3.getRule(this.ruleId);
            }
            toString() {
              const e3 = [];
              return this._writeString(e3, 0), "[" + e3.join(",") + "]";
            }
            _writeString(e3, t3) {
              return this.parent && (t3 = this.parent._writeString(e3, t3)), e3[t3++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`, t3;
            }
            withContentNameScopesList(e3) {
              return this.contentNameScopesList === e3 ? this : this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, e3);
            }
            withEndRule(e3) {
              return this.endRule === e3 ? this : new b(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, e3, this.nameScopesList, this.contentNameScopesList);
            }
            hasSameRuleAs(e3) {
              let t3 = this;
              for (; t3 && t3._enterPos === e3._enterPos; ) {
                if (t3.ruleId === e3.ruleId) return true;
                t3 = t3.parent;
              }
              return false;
            }
            toStateStackFrame() {
              return { ruleId: a.ruleIdToNumber(this.ruleId), beginRuleCapturedEOL: this.beginRuleCapturedEOL, endRule: this.endRule, nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [], contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? [] };
            }
            static pushFrame(e3, t3) {
              const n2 = _.fromExtension(e3?.nameScopesList ?? null, t3.nameScopesList);
              return new b(e3, a.ruleIdFromNumber(t3.ruleId), t3.enterPos ?? -1, t3.anchorPos ?? -1, t3.beginRuleCapturedEOL, t3.endRule, n2, _.fromExtension(n2, t3.contentNameScopesList));
            }
          }
          t2.StateStackImpl = b, b.NULL = new b(null, 0, 0, 0, false, null, null, null), t2.BalancedBracketSelectors = class {
            constructor(e3, t3) {
              this.allowAny = false, this.balancedBracketScopes = e3.flatMap((e4) => "*" === e4 ? (this.allowAny = true, []) : i.createMatchers(e4, d).map((e5) => e5.matcher)), this.unbalancedBracketScopes = t3.flatMap((e4) => i.createMatchers(e4, d).map((e5) => e5.matcher));
            }
            get matchesAlways() {
              return this.allowAny && 0 === this.unbalancedBracketScopes.length;
            }
            get matchesNever() {
              return 0 === this.balancedBracketScopes.length && !this.allowAny;
            }
            match(e3) {
              for (const t3 of this.unbalancedBracketScopes) if (t3(e3)) return false;
              for (const t3 of this.balancedBracketScopes) if (t3(e3)) return true;
              return this.allowAny;
            }
          };
          class y {
            constructor(e3, t3, n2, r2) {
              this.balancedBracketSelectors = r2, this._emitBinaryTokens = e3, this._tokenTypeOverrides = n2, s.DebugFlags.InDebugMode ? this._lineText = t3 : this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
            }
            produce(e3, t3) {
              this.produceFromScopes(e3.contentNameScopesList, t3);
            }
            produceFromScopes(e3, t3) {
              if (this._lastTokenEndIndex >= t3) return;
              if (this._emitBinaryTokens) {
                let n3 = e3?.tokenAttributes ?? 0, i2 = false;
                if (this.balancedBracketSelectors?.matchesAlways && (i2 = true), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
                  const t4 = e3?.getScopeNames() ?? [];
                  for (const e4 of this._tokenTypeOverrides) e4.matcher(t4) && (n3 = r.EncodedTokenAttributes.set(n3, 0, r.toOptionalTokenType(e4.type), null, -1, 0, 0));
                  this.balancedBracketSelectors && (i2 = this.balancedBracketSelectors.match(t4));
                }
                if (i2 && (n3 = r.EncodedTokenAttributes.set(n3, 0, 8, i2, -1, 0, 0)), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === n3) return void (this._lastTokenEndIndex = t3);
                if (s.DebugFlags.InDebugMode) {
                  const n4 = e3?.getScopeNames() ?? [];
                  console.log("  token: |" + this._lineText.substring(this._lastTokenEndIndex, t3).replace(/\n$/, "\\n") + "|");
                  for (let e4 = 0; e4 < n4.length; e4++) console.log("      * " + n4[e4]);
                }
                return this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(n3), void (this._lastTokenEndIndex = t3);
              }
              const n2 = e3?.getScopeNames() ?? [];
              if (s.DebugFlags.InDebugMode) {
                console.log("  token: |" + this._lineText.substring(this._lastTokenEndIndex, t3).replace(/\n$/, "\\n") + "|");
                for (let e4 = 0; e4 < n2.length; e4++) console.log("      * " + n2[e4]);
              }
              this._tokens.push({ startIndex: this._lastTokenEndIndex, endIndex: t3, scopes: n2 }), this._lastTokenEndIndex = t3;
            }
            getResult(e3, t3) {
              return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === t3 - 1 && this._tokens.pop(), 0 === this._tokens.length && (this._lastTokenEndIndex = -1, this.produce(e3, t3), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
            }
            getBinaryResult(e3, t3) {
              this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === t3 - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), 0 === this._binaryTokens.length && (this._lastTokenEndIndex = -1, this.produce(e3, t3), this._binaryTokens[this._binaryTokens.length - 2] = 0);
              const n2 = new Uint32Array(this._binaryTokens.length);
              for (let e4 = 0, t4 = this._binaryTokens.length; e4 < t4; e4++) n2[e4] = this._binaryTokens[e4];
              return n2;
            }
          }
          t2.LineTokens = y;
        }, 784: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.parseInclude = t2.TopLevelRepositoryReference = t2.TopLevelReference = t2.RelativeReference = t2.SelfReference = t2.BaseReference = t2.ScopeDependencyProcessor = t2.ExternalReferenceCollector = t2.TopLevelRepositoryRuleReference = t2.TopLevelRuleReference = void 0;
          const s = n(807);
          class r {
            constructor(e3) {
              this.scopeName = e3;
            }
            toKey() {
              return this.scopeName;
            }
          }
          t2.TopLevelRuleReference = r;
          class i {
            constructor(e3, t3) {
              this.scopeName = e3, this.ruleName = t3;
            }
            toKey() {
              return `${this.scopeName}#${this.ruleName}`;
            }
          }
          t2.TopLevelRepositoryRuleReference = i;
          class o {
            constructor() {
              this._references = [], this._seenReferenceKeys = /* @__PURE__ */ new Set(), this.visitedRule = /* @__PURE__ */ new Set();
            }
            get references() {
              return this._references;
            }
            add(e3) {
              const t3 = e3.toKey();
              this._seenReferenceKeys.has(t3) || (this._seenReferenceKeys.add(t3), this._references.push(e3));
            }
          }
          function a(e3, t3, n2, s2) {
            const i2 = n2.lookup(e3.scopeName);
            if (!i2) {
              if (e3.scopeName === t3) throw new Error(`No grammar provided for <${t3}>`);
              return;
            }
            const o2 = n2.lookup(t3);
            e3 instanceof r ? l({ baseGrammar: o2, selfGrammar: i2 }, s2) : c(e3.ruleName, { baseGrammar: o2, selfGrammar: i2, repository: i2.repository }, s2);
            const a2 = n2.injections(e3.scopeName);
            if (a2) for (const e4 of a2) s2.add(new r(e4));
          }
          function c(e3, t3, n2) {
            if (!(t3.repository && t3.repository[e3])) {
              return
            };
            return u([t3.repository[e3]], t3, n2);
          }
          function l(e3, t3) {
            e3.selfGrammar.patterns && Array.isArray(e3.selfGrammar.patterns) && u(e3.selfGrammar.patterns, { ...e3, repository: e3.selfGrammar.repository }, t3), e3.selfGrammar.injections && u(Object.values(e3.selfGrammar.injections), { ...e3, repository: e3.selfGrammar.repository }, t3);
          }
          function u(e3, t3, n2) { // Modified to fix stack overflow errors.
            const queue = [...e3];
          
            while (queue.length > 0) {
              const o2 = queue.shift();
          
              if (n2.visitedRule.has(o2)) continue;
              n2.visitedRule.add(o2);
          
              const e4 = o2.repository ? s.mergeObjects({}, t3.repository, o2.repository) : t3.repository;
          
              if (Array.isArray(o2.patterns)) {
                queue.push(...o2.patterns);
              }
          
              const a2 = o2.include;
              if (!a2) continue;
          
              const h2 = g(a2);
              switch (h2.kind) {
                case 0:
                  l({ ...t3, selfGrammar: t3.baseGrammar }, n2);
                  break;
                case 1:
                  l(t3, n2);
                  break;
                case 2:
                  c(h2.ruleName, { ...t3, repository: e4 }, n2);
                  break;
                case 3:
                case 4:
                  const s2 = h2.scopeName === t3.selfGrammar.scopeName ? t3.selfGrammar : h2.scopeName === t3.baseGrammar.scopeName ? t3.baseGrammar : void 0;
                  if (s2) {
                    const r2 = { baseGrammar: t3.baseGrammar, selfGrammar: s2, repository: e4 };
                    4 === h2.kind ? c(h2.ruleName, r2, n2) : l(r2, n2);
                  } else 4 === h2.kind ? n2.add(new i(h2.scopeName, h2.ruleName)) : n2.add(new r(h2.scopeName));
              }
            }
          }/* 
          function u(e3, t3, n2) {
            for (const o2 of e3) {
              if (n2.visitedRule.has(o2)) continue;
              n2.visitedRule.add(o2);
              const e4 = o2.repository ? s.mergeObjects({}, t3.repository, o2.repository) : t3.repository;
              Array.isArray(o2.patterns) && u(o2.patterns, { ...t3, repository: e4 }, n2);
              const a2 = o2.include;
              if (!a2) continue;
              const h2 = g(a2);
              switch (h2.kind) {
                case 0:
                  l({ ...t3, selfGrammar: t3.baseGrammar }, n2);
                  break;
                case 1:
                  l(t3, n2);
                  break;
                case 2:
                  c(h2.ruleName, { ...t3, repository: e4 }, n2);
                  break;
                case 3:
                case 4:
                  const s2 = h2.scopeName === t3.selfGrammar.scopeName ? t3.selfGrammar : h2.scopeName === t3.baseGrammar.scopeName ? t3.baseGrammar : void 0;
                  if (s2) {
                    const r2 = { baseGrammar: t3.baseGrammar, selfGrammar: s2, repository: e4 };
                    4 === h2.kind ? c(h2.ruleName, r2, n2) : l(r2, n2);
                  } else 4 === h2.kind ? n2.add(new i(h2.scopeName, h2.ruleName)) : n2.add(new r(h2.scopeName));
              }
            }
          } */
          t2.ExternalReferenceCollector = o, t2.ScopeDependencyProcessor = class {
            constructor(e3, t3) {
              this.repo = e3, this.initialScopeName = t3, this.seenFullScopeRequests = /* @__PURE__ */ new Set(), this.seenPartialScopeRequests = /* @__PURE__ */ new Set(), this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new r(this.initialScopeName)];
            }
            processQueue() {
              const e3 = this.Q;
              this.Q = [];
              const t3 = new o();
              for (const n2 of e3) a(n2, this.initialScopeName, this.repo, t3);
              for (const e4 of t3.references) if (e4 instanceof r) {
                if (this.seenFullScopeRequests.has(e4.scopeName)) continue;
                this.seenFullScopeRequests.add(e4.scopeName), this.Q.push(e4);
              } else {
                if (this.seenFullScopeRequests.has(e4.scopeName)) continue;
                if (this.seenPartialScopeRequests.has(e4.toKey())) continue;
                this.seenPartialScopeRequests.add(e4.toKey()), this.Q.push(e4);
              }
            }
          };
          class h {
            constructor() {
              this.kind = 0;
            }
          }
          t2.BaseReference = h;
          class p {
            constructor() {
              this.kind = 1;
            }
          }
          t2.SelfReference = p;
          class d {
            constructor(e3) {
              this.ruleName = e3, this.kind = 2;
            }
          }
          t2.RelativeReference = d;
          class f {
            constructor(e3) {
              this.scopeName = e3, this.kind = 3;
            }
          }
          t2.TopLevelReference = f;
          class m {
            constructor(e3, t3) {
              this.scopeName = e3, this.ruleName = t3, this.kind = 4;
            }
          }
          function g(e3) {
            if ("$base" === e3) return new h();
            if ("$self" === e3) return new p();
            const t3 = e3.indexOf("#");
            if (-1 === t3) return new f(e3);
            if (0 === t3) return new d(e3.substring(1));
            {
              const n2 = e3.substring(0, t3), s2 = e3.substring(t3 + 1);
              return new m(n2, s2);
            }
          }
          t2.TopLevelRepositoryReference = m, t2.parseInclude = g;
        }, 752: function(e2, t2, n) {
          var s = this && this.__createBinding || (Object.create ? function(e3, t3, n2, s2) {
            void 0 === s2 && (s2 = n2), Object.defineProperty(e3, s2, { enumerable: true, get: function() {
              return t3[n2];
            } });
          } : function(e3, t3, n2, s2) {
            void 0 === s2 && (s2 = n2), e3[s2] = t3[n2];
          }), r = this && this.__exportStar || function(e3, t3) {
            for (var n2 in e3) "default" === n2 || Object.prototype.hasOwnProperty.call(t3, n2) || s(t3, e3, n2);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), r(n(929), t2);
        }, 398: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.LocalStackElement = t2._tokenizeString = void 0;
          const s = n(185), r = n(810), i = n(666), o = n(807);
          class a {
            constructor(e3, t3) {
              this.stack = e3, this.stoppedEarly = t3;
            }
          }
          function c(e3, t3, n2, r2, c2, h2, d2, f) {
            const m = t3.content.length;
            let g = false, _ = -1;
            if (d2) {
              const o2 = function(e4, t4, n3, r3, o3, a2) {
                let c3 = o3.beginRuleCapturedEOL ? 0 : -1;
                const l2 = [];
                for (let t5 = o3; t5; t5 = t5.pop()) {
                  const n4 = t5.getRule(e4);
                  n4 instanceof i.BeginWhileRule && l2.push({ rule: n4, stack: t5 });
                }
                for (let h3 = l2.pop(); h3; h3 = l2.pop()) {
                  const { ruleScanner: l3, findOptions: d3 } = u(h3.rule, e4, h3.stack.endRule, n3, r3 === c3), f2 = l3.findNextMatchSync(t4, r3, d3);
                  if (s.DebugFlags.InDebugMode && (console.log("  scanning for while rule"), console.log(l3.toString())), !f2) {
                    s.DebugFlags.InDebugMode && console.log("  popping " + h3.rule.debugName + " - " + h3.rule.debugWhileRegExp), o3 = h3.stack.pop();
                    break;
                  }
                  if (f2.ruleId !== i.whileRuleId) {
                    o3 = h3.stack.pop();
                    break;
                  }
                  f2.captureIndices && f2.captureIndices.length && (a2.produce(h3.stack, f2.captureIndices[0].start), p(e4, t4, n3, h3.stack, a2, h3.rule.whileCaptures, f2.captureIndices), a2.produce(h3.stack, f2.captureIndices[0].end), c3 = f2.captureIndices[0].end, f2.captureIndices[0].end > r3 && (r3 = f2.captureIndices[0].end, n3 = false));
                }
                return { stack: o3, linePos: r3, anchorPosition: c3, isFirstLine: n3 };
              }(e3, t3, n2, r2, c2, h2);
              c2 = o2.stack, r2 = o2.linePos, n2 = o2.isFirstLine, _ = o2.anchorPosition;
            }
            const b = Date.now();
            for (; !g; ) {
              if (0 !== f && Date.now() - b > f) return new a(c2, true);
              y();
            }
            return new a(c2, false);
            function y() {
              s.DebugFlags.InDebugMode && (console.log(""), console.log(`@@scanNext ${r2}: |${t3.content.substr(r2).replace(/\n$/, "\\n")}|`));
              const a2 = function(e4, t4, n3, r3, i2, a3) {
                const c3 = function(e5, t5, n4, r4, i3, a4) {
                  const c4 = i3.getRule(e5), { ruleScanner: u4, findOptions: h4 } = l(c4, e5, i3.endRule, n4, r4 === a4);
                  let p3 = 0;
                  s.DebugFlags.InDebugMode && (p3 = o.performanceNow());
                  const d5 = u4.findNextMatchSync(t5, r4, h4);
                  if (s.DebugFlags.InDebugMode) {
                    const e6 = o.performanceNow() - p3;
                    e6 > 5 && console.warn(`Rule ${c4.debugName} (${c4.id}) matching took ${e6} against '${t5}'`), console.log(`  scanning for (linePos: ${r4}, anchorPosition: ${a4})`), console.log(u4.toString()), d5 && console.log(`matched rule id: ${d5.ruleId} from ${d5.captureIndices[0].start} to ${d5.captureIndices[0].end}`);
                  }
                  return d5 ? { captureIndices: d5.captureIndices, matchedRuleId: d5.ruleId } : null;
                }(e4, t4, n3, r3, i2, a3), u3 = e4.getInjections();
                if (0 === u3.length) return c3;
                const h3 = function(e5, t5, n4, r4, i3, o2, a4) {
                  let c4, u4 = Number.MAX_VALUE, h4 = null, p3 = 0;
                  const d5 = o2.contentNameScopesList.getScopeNames();
                  for (let o3 = 0, f3 = e5.length; o3 < f3; o3++) {
                    const f4 = e5[o3];
                    if (!f4.matcher(d5)) continue;
                    const m2 = t5.getRule(f4.ruleId), { ruleScanner: g2, findOptions: _2 } = l(m2, t5, null, r4, i3 === a4), b2 = g2.findNextMatchSync(n4, i3, _2);
                    if (!b2) continue;
                    s.DebugFlags.InDebugMode && (console.log(`  matched injection: ${f4.debugSelector}`), console.log(g2.toString()));
                    const y2 = b2.captureIndices[0].start;
                    if (!(y2 >= u4) && (u4 = y2, h4 = b2.captureIndices, c4 = b2.ruleId, p3 = f4.priority, u4 === i3)) break;
                  }
                  return h4 ? { priorityMatch: -1 === p3, captureIndices: h4, matchedRuleId: c4 } : null;
                }(u3, e4, t4, n3, r3, i2, a3);
                if (!h3) return c3;
                if (!c3) return h3;
                const p2 = c3.captureIndices[0].start, d4 = h3.captureIndices[0].start;
                return d4 < p2 || h3.priorityMatch && d4 === p2 ? h3 : c3;
              }(e3, t3, n2, r2, c2, _);
              if (!a2) return s.DebugFlags.InDebugMode && console.log("  no more matches."), h2.produce(c2, m), void (g = true);
              const u2 = a2.captureIndices, d3 = a2.matchedRuleId, f2 = !!(u2 && u2.length > 0) && u2[0].end > r2;
              if (d3 === i.endRuleId) {
                const i2 = c2.getRule(e3);
                s.DebugFlags.InDebugMode && console.log("  popping " + i2.debugName + " - " + i2.debugEndRegExp), h2.produce(c2, u2[0].start), c2 = c2.withContentNameScopesList(c2.nameScopesList), p(e3, t3, n2, c2, h2, i2.endCaptures, u2), h2.produce(c2, u2[0].end);
                const o2 = c2;
                if (c2 = c2.parent, _ = o2.getAnchorPos(), !f2 && o2.getEnterPos() === r2) return s.DebugFlags.InDebugMode && console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing"), c2 = o2, h2.produce(c2, m), void (g = true);
              } else {
                const o2 = e3.getRule(d3);
                h2.produce(c2, u2[0].start);
                const a3 = c2, l2 = o2.getName(t3.content, u2), b2 = c2.contentNameScopesList.pushAttributed(l2, e3);
                if (c2 = c2.push(d3, r2, _, u2[0].end === m, null, b2, b2), o2 instanceof i.BeginEndRule) {
                  const r3 = o2;
                  s.DebugFlags.InDebugMode && console.log("  pushing " + r3.debugName + " - " + r3.debugBeginRegExp), p(e3, t3, n2, c2, h2, r3.beginCaptures, u2), h2.produce(c2, u2[0].end), _ = u2[0].end;
                  const i2 = r3.getContentName(t3.content, u2), l3 = b2.pushAttributed(i2, e3);
                  if (c2 = c2.withContentNameScopesList(l3), r3.endHasBackReferences && (c2 = c2.withEndRule(r3.getEndWithResolvedBackReferences(t3.content, u2))), !f2 && a3.hasSameRuleAs(c2)) return s.DebugFlags.InDebugMode && console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), c2 = c2.pop(), h2.produce(c2, m), void (g = true);
                } else if (o2 instanceof i.BeginWhileRule) {
                  const r3 = o2;
                  s.DebugFlags.InDebugMode && console.log("  pushing " + r3.debugName), p(e3, t3, n2, c2, h2, r3.beginCaptures, u2), h2.produce(c2, u2[0].end), _ = u2[0].end;
                  const i2 = r3.getContentName(t3.content, u2), l3 = b2.pushAttributed(i2, e3);
                  if (c2 = c2.withContentNameScopesList(l3), r3.whileHasBackReferences && (c2 = c2.withEndRule(r3.getWhileWithResolvedBackReferences(t3.content, u2))), !f2 && a3.hasSameRuleAs(c2)) return s.DebugFlags.InDebugMode && console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), c2 = c2.pop(), h2.produce(c2, m), void (g = true);
                } else {
                  const r3 = o2;
                  if (s.DebugFlags.InDebugMode && console.log("  matched " + r3.debugName + " - " + r3.debugMatchRegExp), p(e3, t3, n2, c2, h2, r3.captures, u2), h2.produce(c2, u2[0].end), c2 = c2.pop(), !f2) return s.DebugFlags.InDebugMode && console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping"), c2 = c2.safePop(), h2.produce(c2, m), void (g = true);
                }
              }
              u2[0].end > r2 && (r2 = u2[0].end, n2 = false);
            }
          }
          function l(e3, t3, n2, r2, i2) {
            return s.UseOnigurumaFindOptions ? { ruleScanner: e3.compile(t3, n2), findOptions: h(r2, i2) } : { ruleScanner: e3.compileAG(t3, n2, r2, i2), findOptions: 0 };
          }
          function u(e3, t3, n2, r2, i2) {
            return s.UseOnigurumaFindOptions ? { ruleScanner: e3.compileWhile(t3, n2), findOptions: h(r2, i2) } : { ruleScanner: e3.compileWhileAG(t3, n2, r2, i2), findOptions: 0 };
          }
          function h(e3, t3) {
            let n2 = 0;
            return e3 || (n2 |= 1), t3 || (n2 |= 4), n2;
          }
          function p(e3, t3, n2, s2, i2, o2, a2) {
            if (0 === o2.length) return;
            const l2 = t3.content, u2 = Math.min(o2.length, a2.length), h2 = [], p2 = a2[0].end;
            for (let t4 = 0; t4 < u2; t4++) {
              const u3 = o2[t4];
              if (null === u3) continue;
              const f = a2[t4];
              if (0 === f.length) continue;
              if (f.start > p2) break;
              for (; h2.length > 0 && h2[h2.length - 1].endPos <= f.start; ) i2.produceFromScopes(h2[h2.length - 1].scopes, h2[h2.length - 1].endPos), h2.pop();
              if (h2.length > 0 ? i2.produceFromScopes(h2[h2.length - 1].scopes, f.start) : i2.produce(s2, f.start), u3.retokenizeCapturedWithRuleId) {
                const t5 = u3.getName(l2, a2), o3 = s2.contentNameScopesList.pushAttributed(t5, e3), h3 = u3.getContentName(l2, a2), p3 = o3.pushAttributed(h3, e3), d2 = s2.push(u3.retokenizeCapturedWithRuleId, f.start, -1, false, null, o3, p3), m2 = e3.createOnigString(l2.substring(0, f.end));
                c(e3, m2, n2 && 0 === f.start, f.start, d2, i2, false, 0), r.disposeOnigString(m2);
                continue;
              }
              const m = u3.getName(l2, a2);
              if (null !== m) {
                const t5 = (h2.length > 0 ? h2[h2.length - 1].scopes : s2.contentNameScopesList).pushAttributed(m, e3);
                h2.push(new d(t5, f.end));
              }
            }
            for (; h2.length > 0; ) i2.produceFromScopes(h2[h2.length - 1].scopes, h2[h2.length - 1].endPos), h2.pop();
          }
          t2._tokenizeString = c;
          class d {
            constructor(e3, t3) {
              this.scopes = e3, this.endPos = t3;
            }
          }
          t2.LocalStackElement = d;
        }, 726: (e2, t2) => {
          function n(e3, t3) {
            throw new Error("Near offset " + e3.pos + ": " + t3 + " ~~~" + e3.source.substr(e3.pos, 50) + "~~~");
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.parseJSON = void 0, t2.parseJSON = function(e3, t3, o) {
            let a = new s(e3), c = new r(), l = 0, u = null, h = [], p = [];
            function d() {
              h.push(l), p.push(u);
            }
            function f() {
              l = h.pop(), u = p.pop();
            }
            function m(e4) {
              n(a, e4);
            }
            for (; i(a, c); ) {
              if (0 === l) {
                if (null !== u && m("too many constructs in root"), 3 === c.type) {
                  u = {}, o && (u.$vscodeTextmateLocation = c.toLocation(t3)), d(), l = 1;
                  continue;
                }
                if (2 === c.type) {
                  u = [], d(), l = 4;
                  continue;
                }
                m("unexpected token in root");
              }
              if (2 === l) {
                if (5 === c.type) {
                  f();
                  continue;
                }
                if (7 === c.type) {
                  l = 3;
                  continue;
                }
                m("expected , or }");
              }
              if (1 === l || 3 === l) {
                if (1 === l && 5 === c.type) {
                  f();
                  continue;
                }
                if (1 === c.type) {
                  let e4 = c.value;
                  if (i(a, c) && 6 === c.type || m("expected colon"), i(a, c) || m("expected value"), l = 2, 1 === c.type) {
                    u[e4] = c.value;
                    continue;
                  }
                  if (8 === c.type) {
                    u[e4] = null;
                    continue;
                  }
                  if (9 === c.type) {
                    u[e4] = true;
                    continue;
                  }
                  if (10 === c.type) {
                    u[e4] = false;
                    continue;
                  }
                  if (11 === c.type) {
                    u[e4] = parseFloat(c.value);
                    continue;
                  }
                  if (2 === c.type) {
                    let t4 = [];
                    u[e4] = t4, d(), l = 4, u = t4;
                    continue;
                  }
                  if (3 === c.type) {
                    let n2 = {};
                    o && (n2.$vscodeTextmateLocation = c.toLocation(t3)), u[e4] = n2, d(), l = 1, u = n2;
                    continue;
                  }
                }
                m("unexpected token in dict");
              }
              if (5 === l) {
                if (4 === c.type) {
                  f();
                  continue;
                }
                if (7 === c.type) {
                  l = 6;
                  continue;
                }
                m("expected , or ]");
              }
              if (4 === l || 6 === l) {
                if (4 === l && 4 === c.type) {
                  f();
                  continue;
                }
                if (l = 5, 1 === c.type) {
                  u.push(c.value);
                  continue;
                }
                if (8 === c.type) {
                  u.push(null);
                  continue;
                }
                if (9 === c.type) {
                  u.push(true);
                  continue;
                }
                if (10 === c.type) {
                  u.push(false);
                  continue;
                }
                if (11 === c.type) {
                  u.push(parseFloat(c.value));
                  continue;
                }
                if (2 === c.type) {
                  let e4 = [];
                  u.push(e4), d(), l = 4, u = e4;
                  continue;
                }
                if (3 === c.type) {
                  let e4 = {};
                  o && (e4.$vscodeTextmateLocation = c.toLocation(t3)), u.push(e4), d(), l = 1, u = e4;
                  continue;
                }
                m("unexpected token in array");
              }
              m("unknown state");
            }
            return 0 !== p.length && m("unclosed constructs"), u;
          };
          class s {
            constructor(e3) {
              this.source = e3, this.pos = 0, this.len = e3.length, this.line = 1, this.char = 0;
            }
          }
          class r {
            constructor() {
              this.value = null, this.type = 0, this.offset = -1, this.len = -1, this.line = -1, this.char = -1;
            }
            toLocation(e3) {
              return { filename: e3, line: this.line, char: this.char };
            }
          }
          function i(e3, t3) {
            t3.value = null, t3.type = 0, t3.offset = -1, t3.len = -1, t3.line = -1, t3.char = -1;
            let s2, r2 = e3.source, i2 = e3.pos, o = e3.len, a = e3.line, c = e3.char;
            for (; ; ) {
              if (i2 >= o) return false;
              if (s2 = r2.charCodeAt(i2), 32 !== s2 && 9 !== s2 && 13 !== s2) {
                if (10 !== s2) break;
                i2++, a++, c = 0;
              } else i2++, c++;
            }
            if (t3.offset = i2, t3.line = a, t3.char = c, 34 === s2) {
              for (t3.type = 1, i2++, c++; ; ) {
                if (i2 >= o) return false;
                if (s2 = r2.charCodeAt(i2), i2++, c++, 92 !== s2) {
                  if (34 === s2) break;
                } else i2++, c++;
              }
              t3.value = r2.substring(t3.offset + 1, i2 - 1).replace(/\\u([0-9A-Fa-f]{4})/g, (e4, t4) => String.fromCodePoint(parseInt(t4, 16))).replace(/\\(.)/g, (t4, s3) => {
                switch (s3) {
                  case '"':
                    return '"';
                  case "\\":
                    return "\\";
                  case "/":
                    return "/";
                  case "b":
                    return "\b";
                  case "f":
                    return "\f";
                  case "n":
                    return "\n";
                  case "r":
                    return "\r";
                  case "t":
                    return "	";
                  default:
                    n(e3, "invalid escape sequence");
                }
                throw new Error("unreachable");
              });
            } else if (91 === s2) t3.type = 2, i2++, c++;
            else if (123 === s2) t3.type = 3, i2++, c++;
            else if (93 === s2) t3.type = 4, i2++, c++;
            else if (125 === s2) t3.type = 5, i2++, c++;
            else if (58 === s2) t3.type = 6, i2++, c++;
            else if (44 === s2) t3.type = 7, i2++, c++;
            else if (110 === s2) {
              if (t3.type = 8, i2++, c++, s2 = r2.charCodeAt(i2), 117 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 108 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 108 !== s2) return false;
              i2++, c++;
            } else if (116 === s2) {
              if (t3.type = 9, i2++, c++, s2 = r2.charCodeAt(i2), 114 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 117 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 101 !== s2) return false;
              i2++, c++;
            } else if (102 === s2) {
              if (t3.type = 10, i2++, c++, s2 = r2.charCodeAt(i2), 97 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 108 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 115 !== s2) return false;
              if (i2++, c++, s2 = r2.charCodeAt(i2), 101 !== s2) return false;
              i2++, c++;
            } else for (t3.type = 11; ; ) {
              if (i2 >= o) return false;
              if (s2 = r2.charCodeAt(i2), !(46 === s2 || s2 >= 48 && s2 <= 57 || 101 === s2 || 69 === s2 || 45 === s2 || 43 === s2)) break;
              i2++, c++;
            }
            return t3.len = i2 - t3.offset, null === t3.value && (t3.value = r2.substr(t3.offset, t3.len)), e3.pos = i2, e3.line = a, e3.char = c, true;
          }
        }, 625: function(e2, t2, n) {
          var s = this && this.__createBinding || (Object.create ? function(e3, t3, n2, s2) {
            void 0 === s2 && (s2 = n2), Object.defineProperty(e3, s2, { enumerable: true, get: function() {
              return t3[n2];
            } });
          } : function(e3, t3, n2, s2) {
            void 0 === s2 && (s2 = n2), e3[s2] = t3[n2];
          }), r = this && this.__exportStar || function(e3, t3) {
            for (var n2 in e3) "default" === n2 || Object.prototype.hasOwnProperty.call(t3, n2) || s(t3, e3, n2);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.applyStateStackDiff = t2.diffStateStacksRefEq = t2.parseRawGrammar = t2.INITIAL = t2.Registry = void 0;
          const i = n(752), o = n(150), a = n(583), c = n(63), l = n(784), u = n(151);
          Object.defineProperty(t2, "applyStateStackDiff", { enumerable: true, get: function() {
            return u.applyStateStackDiff;
          } }), Object.defineProperty(t2, "diffStateStacksRefEq", { enumerable: true, get: function() {
            return u.diffStateStacksRefEq;
          } }), r(n(810), t2), t2.Registry = class {
            constructor(e3) {
              this._options = e3, this._syncRegistry = new a.SyncRegistry(c.Theme.createFromRawTheme(e3.theme, e3.colorMap), e3.onigLib), this._ensureGrammarCache = /* @__PURE__ */ new Map();
            }
            dispose() {
              this._syncRegistry.dispose();
            }
            setTheme(e3, t3) {
              this._syncRegistry.setTheme(c.Theme.createFromRawTheme(e3, t3));
            }
            getColorMap() {
              return this._syncRegistry.getColorMap();
            }
            loadGrammarWithEmbeddedLanguages(e3, t3, n2) {
              return this.loadGrammarWithConfiguration(e3, t3, { embeddedLanguages: n2 });
            }
            loadGrammarWithConfiguration(e3, t3, n2) {
              return this._loadGrammar(e3, t3, n2.embeddedLanguages, n2.tokenTypes, new i.BalancedBracketSelectors(n2.balancedBracketSelectors || [], n2.unbalancedBracketSelectors || []));
            }
            loadGrammar(e3) {
              return this._loadGrammar(e3, 0, null, null, null);
            }
            async _loadGrammar(e3, t3, n2, s2, r2) {
              const i2 = new l.ScopeDependencyProcessor(this._syncRegistry, e3);
              for (; i2.Q.length > 0; ) await Promise.all(i2.Q.map((e4) => this._loadSingleGrammar(e4.scopeName))), i2.processQueue();
              return this._grammarForScopeName(e3, t3, n2, s2, r2);
            }
            async _loadSingleGrammar(e3) {
              return this._ensureGrammarCache.has(e3) || this._ensureGrammarCache.set(e3, this._doLoadSingleGrammar(e3)), this._ensureGrammarCache.get(e3);
            }
            async _doLoadSingleGrammar(e3) {
              const t3 = await this._options.loadGrammar(e3);
              if (t3) {
                const n2 = "function" == typeof this._options.getInjections ? this._options.getInjections(e3) : void 0;
                this._syncRegistry.addGrammar(t3, n2);
              }
            }
            async addGrammar(e3, t3 = [], n2 = 0, s2 = null) {
              return this._syncRegistry.addGrammar(e3, t3), await this._grammarForScopeName(e3.scopeName, n2, s2);
            }
            _grammarForScopeName(e3, t3 = 0, n2 = null, s2 = null, r2 = null) {
              return this._syncRegistry.grammarForScopeName(e3, t3, n2, s2, r2);
            }
          }, t2.INITIAL = i.StateStackImpl.NULL, t2.parseRawGrammar = o.parseRawGrammar;
        }, 916: (e2, t2) => {
          function n(e3) {
            return !!e3 && !!e3.match(/[\w\.:]+/);
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createMatchers = void 0, t2.createMatchers = function(e3, t3) {
            const s = [], r = function(e4) {
              let t4 = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, n2 = t4.exec(e4);
              return { next: () => {
                if (!n2) return null;
                const s2 = n2[0];
                return n2 = t4.exec(e4), s2;
              } };
            }(e3);
            let i = r.next();
            for (; null !== i; ) {
              let e4 = 0;
              if (2 === i.length && ":" === i.charAt(1)) {
                switch (i.charAt(0)) {
                  case "R":
                    e4 = 1;
                    break;
                  case "L":
                    e4 = -1;
                    break;
                  default:
                    console.log(`Unknown priority ${i} in scope selector`);
                }
                i = r.next();
              }
              let t4 = a();
              if (s.push({ matcher: t4, priority: e4 }), "," !== i) break;
              i = r.next();
            }
            return s;
            function o() {
              if ("-" === i) {
                i = r.next();
                const e4 = o();
                return (t4) => !!e4 && !e4(t4);
              }
              if ("(" === i) {
                i = r.next();
                const e4 = function() {
                  const e5 = [];
                  let t4 = a();
                  for (; t4 && (e5.push(t4), "|" === i || "," === i); ) {
                    do {
                      i = r.next();
                    } while ("|" === i || "," === i);
                    t4 = a();
                  }
                  return (t5) => e5.some((e6) => e6(t5));
                }();
                return ")" === i && (i = r.next()), e4;
              }
              if (n(i)) {
                const e4 = [];
                do {
                  e4.push(i), i = r.next();
                } while (n(i));
                return (n2) => t3(e4, n2);
              }
              return null;
            }
            function a() {
              const e4 = [];
              let t4 = o();
              for (; t4; ) e4.push(t4), t4 = o();
              return (t5) => e4.every((e5) => e5(t5));
            }
          };
        }, 810: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.disposeOnigString = void 0, t2.disposeOnigString = function(e3) {
            "function" == typeof e3.dispose && e3.dispose();
          };
        }, 150: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.parseRawGrammar = void 0;
          const s = n(578), r = n(185), i = n(726);
          t2.parseRawGrammar = function(e3, t3 = null) {
            return null !== t3 && /\.json$/.test(t3) ? (n2 = e3, o = t3, r.DebugFlags.InDebugMode ? i.parseJSON(n2, o, true) : JSON.parse(n2)) : function(e4, t4) {
              return r.DebugFlags.InDebugMode ? s.parseWithLocation(e4, t4, "$vscodeTextmateLocation") : s.parsePLIST(e4);
            }(e3, t3);
            var n2, o;
          };
        }, 578: (e2, t2) => {
          function n(e3, t3, n2) {
            const s = e3.length;
            let r = 0, i = 1, o = 0;
            function a(t4) {
              if (null === n2) r += t4;
              else for (; t4 > 0; ) 10 === e3.charCodeAt(r) ? (r++, i++, o = 0) : (r++, o++), t4--;
            }
            function c(e4) {
              null === n2 ? r = e4 : a(e4 - r);
            }
            function l() {
              for (; r < s; ) {
                let t4 = e3.charCodeAt(r);
                if (32 !== t4 && 9 !== t4 && 13 !== t4 && 10 !== t4) break;
                a(1);
              }
            }
            function u(t4) {
              return e3.substr(r, t4.length) === t4 && (a(t4.length), true);
            }
            function h(t4) {
              let n3 = e3.indexOf(t4, r);
              c(-1 !== n3 ? n3 + t4.length : s);
            }
            function p(t4) {
              let n3 = e3.indexOf(t4, r);
              if (-1 !== n3) {
                let s2 = e3.substring(r, n3);
                return c(n3 + t4.length), s2;
              }
              {
                let t5 = e3.substr(r);
                return c(s), t5;
              }
            }
            s > 0 && 65279 === e3.charCodeAt(0) && (r = 1);
            let d = 0, f = null, m = [], g = [], _ = null;
            function b(e4, t4) {
              m.push(d), g.push(f), d = e4, f = t4;
            }
            function y() {
              if (0 === m.length) return S("illegal state stack");
              d = m.pop(), f = g.pop();
            }
            function S(t4) {
              throw new Error("Near offset " + r + ": " + t4 + " ~~~" + e3.substr(r, 50) + "~~~");
            }
            const k = function() {
              if (null === _) return S("missing <key>");
              let e4 = {};
              null !== n2 && (e4[n2] = { filename: t3, line: i, char: o }), f[_] = e4, _ = null, b(1, e4);
            }, C = function() {
              if (null === _) return S("missing <key>");
              let e4 = [];
              f[_] = e4, _ = null, b(2, e4);
            }, R = function() {
              let e4 = {};
              null !== n2 && (e4[n2] = { filename: t3, line: i, char: o }), f.push(e4), b(1, e4);
            }, A = function() {
              let e4 = [];
              f.push(e4), b(2, e4);
            };
            function w() {
              if (1 !== d) return S("unexpected </dict>");
              y();
            }
            function P() {
              return 1 === d || 2 !== d ? S("unexpected </array>") : void y();
            }
            function I(e4) {
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function v(e4) {
              if (isNaN(e4)) return S("cannot parse float");
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function N(e4) {
              if (isNaN(e4)) return S("cannot parse integer");
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function x(e4) {
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function T(e4) {
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function G(e4) {
              if (1 === d) {
                if (null === _) return S("missing <key>");
                f[_] = e4, _ = null;
              } else 2 === d ? f.push(e4) : f = e4;
            }
            function E() {
              let e4 = p(">"), t4 = false;
              return 47 === e4.charCodeAt(e4.length - 1) && (t4 = true, e4 = e4.substring(0, e4.length - 1)), { name: e4.trim(), isClosed: t4 };
            }
            function L(e4) {
              if (e4.isClosed) return "";
              let t4 = p("</");
              return h(">"), t4.replace(/&#([0-9]+);/g, function(e5, t5) {
                return String.fromCodePoint(parseInt(t5, 10));
              }).replace(/&#x([0-9a-f]+);/g, function(e5, t5) {
                return String.fromCodePoint(parseInt(t5, 16));
              }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function(e5) {
                switch (e5) {
                  case "&amp;":
                    return "&";
                  case "&lt;":
                    return "<";
                  case "&gt;":
                    return ">";
                  case "&quot;":
                    return '"';
                  case "&apos;":
                    return "'";
                }
                return e5;
              });
            }
            for (; r < s && (l(), !(r >= s)); ) {
              const c2 = e3.charCodeAt(r);
              if (a(1), 60 !== c2) return S("expected <");
              if (r >= s) return S("unexpected end of input");
              const p2 = e3.charCodeAt(r);
              if (63 === p2) {
                a(1), h("?>");
                continue;
              }
              if (33 === p2) {
                if (a(1), u("--")) {
                  h("-->");
                  continue;
                }
                h(">");
                continue;
              }
              if (47 === p2) {
                if (a(1), l(), u("plist")) {
                  h(">");
                  continue;
                }
                if (u("dict")) {
                  h(">"), w();
                  continue;
                }
                if (u("array")) {
                  h(">"), P();
                  continue;
                }
                return S("unexpected closed tag");
              }
              let m2 = E();
              switch (m2.name) {
                case "dict":
                  1 === d ? k() : 2 === d ? R() : (f = {}, null !== n2 && (f[n2] = { filename: t3, line: i, char: o }), b(1, f)), m2.isClosed && w();
                  continue;
                case "array":
                  1 === d ? C() : 2 === d ? A() : (f = [], b(2, f)), m2.isClosed && P();
                  continue;
                case "key":
                  M = L(m2), 1 !== d ? S("unexpected <key>") : null !== _ ? S("too many <key>") : _ = M;
                  continue;
                case "string":
                  I(L(m2));
                  continue;
                case "real":
                  v(parseFloat(L(m2)));
                  continue;
                case "integer":
                  N(parseInt(L(m2), 10));
                  continue;
                case "date":
                  x(new Date(L(m2)));
                  continue;
                case "data":
                  T(L(m2));
                  continue;
                case "true":
                  L(m2), G(true);
                  continue;
                case "false":
                  L(m2), G(false);
                  continue;
              }
              if (!/^plist/.test(m2.name)) return S("unexpected opened tag " + m2.name);
            }
            var M;
            return f;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.parsePLIST = t2.parseWithLocation = void 0, t2.parseWithLocation = function(e3, t3, s) {
            return n(e3, t3, s);
          }, t2.parsePLIST = function(e3) {
            return n(e3, null, null);
          };
        }, 583: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SyncRegistry = void 0;
          const s = n(752);
          t2.SyncRegistry = class {
            constructor(e3, t3) {
              this._onigLibPromise = t3, this._grammars = /* @__PURE__ */ new Map(), this._rawGrammars = /* @__PURE__ */ new Map(), this._injectionGrammars = /* @__PURE__ */ new Map(), this._theme = e3;
            }
            dispose() {
              for (const e3 of this._grammars.values()) e3.dispose();
            }
            setTheme(e3) {
              this._theme = e3;
            }
            getColorMap() {
              return this._theme.getColorMap();
            }
            addGrammar(e3, t3) {
              this._rawGrammars.set(e3.scopeName, e3), t3 && this._injectionGrammars.set(e3.scopeName, t3);
            }
            lookup(e3) {
              return this._rawGrammars.get(e3);
            }
            injections(e3) {
              return this._injectionGrammars.get(e3);
            }
            getDefaults() {
              return this._theme.getDefaults();
            }
            themeMatch(e3) {
              return this._theme.match(e3);
            }
            async grammarForScopeName(e3, t3, n2, r, i) {
              if (!this._grammars.has(e3)) {
                let o = this._rawGrammars.get(e3);
                if (!o) return null;
                this._grammars.set(e3, s.createGrammar(e3, o, t3, n2, r, i, this, await this._onigLibPromise));
              }
              return this._grammars.get(e3);
            }
          };
        }, 666: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CompiledRule = t2.RegExpSourceList = t2.RegExpSource = t2.RuleFactory = t2.BeginWhileRule = t2.BeginEndRule = t2.IncludeOnlyRule = t2.MatchRule = t2.CaptureRule = t2.Rule = t2.ruleIdToNumber = t2.ruleIdFromNumber = t2.whileRuleId = t2.endRuleId = void 0;
          const s = n(807), r = n(784), i = /\\(\d+)/, o = /\\(\d+)/g;
          Symbol("RuleId"), t2.endRuleId = -1, t2.whileRuleId = -2, t2.ruleIdFromNumber = function(e3) {
            return e3;
          }, t2.ruleIdToNumber = function(e3) {
            return e3;
          };
          class a {
            constructor(e3, t3, n2, r2) {
              this.$location = e3, this.id = t3, this._name = n2 || null, this._nameIsCapturing = s.RegexSource.hasCaptures(this._name), this._contentName = r2 || null, this._contentNameIsCapturing = s.RegexSource.hasCaptures(this._contentName);
            }
            get debugName() {
              const e3 = this.$location ? `${s.basename(this.$location.filename)}:${this.$location.line}` : "unknown";
              return `${this.constructor.name}#${this.id} @ ${e3}`;
            }
            getName(e3, t3) {
              return this._nameIsCapturing && null !== this._name && null !== e3 && null !== t3 ? s.RegexSource.replaceCaptures(this._name, e3, t3) : this._name;
            }
            getContentName(e3, t3) {
              return this._contentNameIsCapturing && null !== this._contentName ? s.RegexSource.replaceCaptures(this._contentName, e3, t3) : this._contentName;
            }
          }
          t2.Rule = a;
          class c extends a {
            constructor(e3, t3, n2, s2, r2) {
              super(e3, t3, n2, s2), this.retokenizeCapturedWithRuleId = r2;
            }
            dispose() {
            }
            collectPatterns(e3, t3) {
              throw new Error("Not supported!");
            }
            compile(e3, t3) {
              throw new Error("Not supported!");
            }
            compileAG(e3, t3, n2, s2) {
              throw new Error("Not supported!");
            }
          }
          t2.CaptureRule = c;
          class l extends a {
            constructor(e3, t3, n2, s2, r2) {
              super(e3, t3, n2, null), this._match = new f(s2, this.id), this.captures = r2, this._cachedCompiledPatterns = null;
            }
            dispose() {
              this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
            }
            get debugMatchRegExp() {
              return `${this._match.source}`;
            }
            collectPatterns(e3, t3) {
              t3.push(this._match);
            }
            compile(e3, t3) {
              return this._getCachedCompiledPatterns(e3).compile(e3);
            }
            compileAG(e3, t3, n2, s2) {
              return this._getCachedCompiledPatterns(e3).compileAG(e3, n2, s2);
            }
            _getCachedCompiledPatterns(e3) {
              return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new m(), this.collectPatterns(e3, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
            }
          }
          t2.MatchRule = l;
          class u extends a {
            constructor(e3, t3, n2, s2, r2) {
              super(e3, t3, n2, s2), this.patterns = r2.patterns, this.hasMissingPatterns = r2.hasMissingPatterns, this._cachedCompiledPatterns = null;
            }
            dispose() {
              this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
            }
            collectPatterns(e3, t3) {
              for (const n2 of this.patterns) e3.getRule(n2).collectPatterns(e3, t3);
            }
            compile(e3, t3) {
              return this._getCachedCompiledPatterns(e3).compile(e3);
            }
            compileAG(e3, t3, n2, s2) {
              return this._getCachedCompiledPatterns(e3).compileAG(e3, n2, s2);
            }
            _getCachedCompiledPatterns(e3) {
              return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new m(), this.collectPatterns(e3, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
            }
          }
          t2.IncludeOnlyRule = u;
          class h extends a {
            constructor(e3, t3, n2, s2, r2, i2, o2, a2, c2, l2) {
              super(e3, t3, n2, s2), this._begin = new f(r2, this.id), this.beginCaptures = i2, this._end = new f(o2 || "\uFFFF", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = a2, this.applyEndPatternLast = c2 || false, this.patterns = l2.patterns, this.hasMissingPatterns = l2.hasMissingPatterns, this._cachedCompiledPatterns = null;
            }
            dispose() {
              this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
            }
            get debugBeginRegExp() {
              return `${this._begin.source}`;
            }
            get debugEndRegExp() {
              return `${this._end.source}`;
            }
            getEndWithResolvedBackReferences(e3, t3) {
              return this._end.resolveBackReferences(e3, t3);
            }
            collectPatterns(e3, t3) {
              t3.push(this._begin);
            }
            compile(e3, t3) {
              return this._getCachedCompiledPatterns(e3, t3).compile(e3);
            }
            compileAG(e3, t3, n2, s2) {
              return this._getCachedCompiledPatterns(e3, t3).compileAG(e3, n2, s2);
            }
            _getCachedCompiledPatterns(e3, t3) {
              if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new m();
                for (const t4 of this.patterns) e3.getRule(t4).collectPatterns(e3, this._cachedCompiledPatterns);
                this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
              }
              return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t3) : this._cachedCompiledPatterns.setSource(0, t3)), this._cachedCompiledPatterns;
            }
          }
          t2.BeginEndRule = h;
          class p extends a {
            constructor(e3, n2, s2, r2, i2, o2, a2, c2, l2) {
              super(e3, n2, s2, r2), this._begin = new f(i2, this.id), this.beginCaptures = o2, this.whileCaptures = c2, this._while = new f(a2, t2.whileRuleId), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = l2.patterns, this.hasMissingPatterns = l2.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
            }
            dispose() {
              this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
            }
            get debugBeginRegExp() {
              return `${this._begin.source}`;
            }
            get debugWhileRegExp() {
              return `${this._while.source}`;
            }
            getWhileWithResolvedBackReferences(e3, t3) {
              return this._while.resolveBackReferences(e3, t3);
            }
            collectPatterns(e3, t3) {
              t3.push(this._begin);
            }
            compile(e3, t3) {
              return this._getCachedCompiledPatterns(e3).compile(e3);
            }
            compileAG(e3, t3, n2, s2) {
              return this._getCachedCompiledPatterns(e3).compileAG(e3, n2, s2);
            }
            _getCachedCompiledPatterns(e3) {
              if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new m();
                for (const t3 of this.patterns) e3.getRule(t3).collectPatterns(e3, this._cachedCompiledPatterns);
              }
              return this._cachedCompiledPatterns;
            }
            compileWhile(e3, t3) {
              return this._getCachedCompiledWhilePatterns(e3, t3).compile(e3);
            }
            compileWhileAG(e3, t3, n2, s2) {
              return this._getCachedCompiledWhilePatterns(e3, t3).compileAG(e3, n2, s2);
            }
            _getCachedCompiledWhilePatterns(e3, t3) {
              return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new m(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t3 || "\uFFFF"), this._cachedCompiledWhilePatterns;
            }
          }
          t2.BeginWhileRule = p;
          class d {/* 
            static createCaptureRule(e3, t3, n2, s2, r2) {
              return e3.registerRule((e4) => new c(t3, e4, n2, s2, r2)); // Stackoverflow error here
            } */
            static createCaptureRule(e3, t3, n2, s2, r2) {
              const ruleId = ++this._lastRuleId;
              const rule = new c(t3, ruleId, n2, s2, r2);
              return rule;
            }/* 
            static getCompiledRuleId(e3, t3, n2) {
              return e3.id || t3.registerRule((r2) => {
                if (e3.id = r2, e3.match) return new l(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.match, d._compileCaptures(e3.captures, t3, n2)); // Stackoverflow error here
                if (void 0 === e3.begin) {
                  e3.repository && (n2 = s.mergeObjects({}, n2, e3.repository));
                  let r3 = e3.patterns;
                  return void 0 === r3 && e3.include && (r3 = [{ include: e3.include }]), new u(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, d._compilePatterns(r3, t3, n2)); // Stackoverflow error here
                }
                return e3.while ? new p(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, e3.begin, d._compileCaptures(e3.beginCaptures || e3.captures, t3, n2), e3.while, d._compileCaptures(e3.whileCaptures || e3.captures, t3, n2), d._compilePatterns(e3.patterns, t3, n2)) : new h(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, e3.begin, d._compileCaptures(e3.beginCaptures || e3.captures, t3, n2), e3.end, d._compileCaptures(e3.endCaptures || e3.captures, t3, n2), e3.applyEndPatternLast, d._compilePatterns(e3.patterns, t3, n2)); // Stackoverflow error here
              }), e3.id;
            } */
            static getCompiledRuleId(e3, t3, n2) {
              let id = e3?.id;
              if(!e3){
                console.warn("ID MISSING at getCompiledRuleId; args: ", e3, t3, n2);
                return;
              }
              if (!id) {
                const rule = t3.registerRule((r2) => {
                  if (e3.id = r2, e3.match) {
                    const captures = d._compileCaptures(e3.captures, t3, n2);
                    return new l(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.match, captures);
                  }
                  if (void 0 === e3.begin) {
                    e3.repository && (n2 = s.mergeObjects({}, n2, e3.repository));
                    let patterns = e3.patterns;
                    if (void 0 === patterns && e3.include) {
                      patterns = [{ include: e3.include }];
                    }
                    return new u(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, d._compilePatterns(patterns, t3, n2));
                  }
                  if (e3.while) {
                    const beginCaptures = d._compileCaptures(e3.beginCaptures || e3.captures, t3, n2);
                    const whileCaptures = d._compileCaptures(e3.whileCaptures || e3.captures, t3, n2);
                    const patterns = d._compilePatterns(e3.patterns, t3, n2);
                    return new p(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, e3.begin, beginCaptures, e3.while, whileCaptures, patterns);
                  }
                  const beginCaptures = d._compileCaptures(e3.beginCaptures || e3.captures, t3, n2);
                  const endCaptures = d._compileCaptures(e3.endCaptures || e3.captures, t3, n2);
                  const patterns = d._compilePatterns(e3.patterns, t3, n2);
                  return new h(e3.$vscodeTextmateLocation, e3.id, e3.name, e3.contentName, e3.begin, beginCaptures, e3.end, endCaptures, e3.applyEndPatternLast, patterns);
                });
                id = rule.id;
              }
              return id;
            }
            static _compileCaptures(e3, t3, n2) {
              let s2 = [];
              if (e3) {
                let r2 = 0;
                for (const t4 in e3) {
                  if ("$vscodeTextmateLocation" === t4) continue;
                  const e4 = parseInt(t4, 10);
                  e4 > r2 && (r2 = e4);
                }
                for (let e4 = 0; e4 <= r2; e4++) s2[e4] = null;
                for (const r3 in e3) {
                  if ("$vscodeTextmateLocation" === r3) continue;
                  const i2 = parseInt(r3, 10);
                  let o2 = 0;
                  e3[r3].patterns && (o2 = d.getCompiledRuleId(e3[r3], t3, n2)), s2[i2] = d.createCaptureRule(t3, e3[r3].$vscodeTextmateLocation, e3[r3].name, e3[r3].contentName, o2); // Stackoverflow error here
                }
              }
              return s2;
            }/* 
            static _compilePatterns(e3, t3, n2) {
              let s2 = [];
              if (e3) for (let i2 = 0, o2 = e3.length; i2 < o2; i2++) {
                const o3 = e3[i2];
                let a2 = -1;
                if (o3.include) {
                  const e4 = r.parseInclude(o3.include);
                  switch (e4.kind) {
                    case 0:
                    case 1:
                      a2 = d.getCompiledRuleId(n2[o3.include], t3, n2);
                      break;
                    case 2:
                      let s3 = n2[e4.ruleName];
                      s3 && (a2 = d.getCompiledRuleId(s3, t3, n2)); // Stackoverflow error here
                      break;
                    case 3:
                    case 4:
                      const r2 = e4.scopeName, i3 = 4 === e4.kind ? e4.ruleName : null, c2 = t3.getExternalGrammar(r2, n2);
                      if (c2) if (i3) {
                        let e5 = c2.repository[i3];
                        e5 && (a2 = d.getCompiledRuleId(e5, t3, c2.repository));
                      } else a2 = d.getCompiledRuleId(c2.repository.$self, t3, c2.repository);
                  }
                } else a2 = d.getCompiledRuleId(o3, t3, n2); // Stackoverflow error here
                if (-1 !== a2) {
                  const e4 = t3.getRule(a2);
                  let n3 = false;
                  if ((e4 instanceof u || e4 instanceof h || e4 instanceof p) && e4.hasMissingPatterns && 0 === e4.patterns.length && (n3 = true), n3) continue;
                  s2.push(a2);
                }
              }
              return { patterns: s2, hasMissingPatterns: (e3 ? e3.length : 0) !== s2.length };
            } */
            static _compilePatterns(e3, t3, n2) {
              const patterns = [];
              const queue = [...e3];
              while (queue.length > 0) {
                const pattern = queue.shift();
                if (pattern.include) {
                  const includeId = d.getCompiledRuleId(n2[pattern.include], t3, n2);
                  patterns.push(includeId);
                } else {
                  const ruleId = d.getCompiledRuleId(pattern, t3, n2);
                  patterns.push(ruleId);
                }
              }
              return { patterns, hasMissingPatterns: false };
            }
          }
          t2.RuleFactory = d;
          class f {
            constructor(e3, t3) {
              if (e3) {
                const t4 = e3.length;
                let n2 = 0, s2 = [], r2 = false;
                for (let i2 = 0; i2 < t4; i2++) if ("\\" === e3.charAt(i2) && i2 + 1 < t4) {
                  const t5 = e3.charAt(i2 + 1);
                  "z" === t5 ? (s2.push(e3.substring(n2, i2)), s2.push("$(?!\\n)(?<!\\n)"), n2 = i2 + 2) : "A" !== t5 && "G" !== t5 || (r2 = true), i2++;
                }
                this.hasAnchor = r2, 0 === n2 ? this.source = e3 : (s2.push(e3.substring(n2, t4)), this.source = s2.join(""));
              } else this.hasAnchor = false, this.source = e3;
              this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t3, this.hasBackReferences = i.test(this.source);
            }
            clone() {
              return new f(this.source, this.ruleId);
            }
            setSource(e3) {
              this.source !== e3 && (this.source = e3, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
            }
            resolveBackReferences(e3, t3) {
              let n2 = t3.map((t4) => e3.substring(t4.start, t4.end));
              return o.lastIndex = 0, this.source.replace(o, (e4, t4) => s.escapeRegExpCharacters(n2[parseInt(t4, 10)] || ""));
            }
            _buildAnchorCache() {
              let e3, t3, n2, s2, r2 = [], i2 = [], o2 = [], a2 = [];
              for (e3 = 0, t3 = this.source.length; e3 < t3; e3++) n2 = this.source.charAt(e3), r2[e3] = n2, i2[e3] = n2, o2[e3] = n2, a2[e3] = n2, "\\" === n2 && e3 + 1 < t3 && (s2 = this.source.charAt(e3 + 1), "A" === s2 ? (r2[e3 + 1] = "\uFFFF", i2[e3 + 1] = "\uFFFF", o2[e3 + 1] = "A", a2[e3 + 1] = "A") : "G" === s2 ? (r2[e3 + 1] = "\uFFFF", i2[e3 + 1] = "G", o2[e3 + 1] = "\uFFFF", a2[e3 + 1] = "G") : (r2[e3 + 1] = s2, i2[e3 + 1] = s2, o2[e3 + 1] = s2, a2[e3 + 1] = s2), e3++);
              return { A0_G0: r2.join(""), A0_G1: i2.join(""), A1_G0: o2.join(""), A1_G1: a2.join("") };
            }
            resolveAnchors(e3, t3) {
              return this.hasAnchor && this._anchorCache ? e3 ? t3 ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t3 ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0 : this.source;
            }
          }
          t2.RegExpSource = f;
          class m {
            constructor() {
              this._items = [], this._hasAnchors = false, this._cached = null, this._anchorCache = { A0_G0: null, A0_G1: null, A1_G0: null, A1_G1: null };
            }
            dispose() {
              this._disposeCaches();
            }
            _disposeCaches() {
              this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
            }
            push(e3) {
              this._items.push(e3), this._hasAnchors = this._hasAnchors || e3.hasAnchor;
            }
            unshift(e3) {
              this._items.unshift(e3), this._hasAnchors = this._hasAnchors || e3.hasAnchor;
            }
            length() {
              return this._items.length;
            }
            setSource(e3, t3) {
              this._items[e3].source !== t3 && (this._disposeCaches(), this._items[e3].setSource(t3));
            }
            compile(e3) {
              if (!this._cached) {
                let t3 = this._items.map((e4) => e4.source);
                this._cached = new g(e3, t3, this._items.map((e4) => e4.ruleId));
              }
              return this._cached;
            }
            compileAG(e3, t3, n2) {
              return this._hasAnchors ? t3 ? n2 ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(e3, t3, n2)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(e3, t3, n2)), this._anchorCache.A1_G0) : n2 ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(e3, t3, n2)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(e3, t3, n2)), this._anchorCache.A0_G0) : this.compile(e3);
            }
            _resolveAnchors(e3, t3, n2) {
              let s2 = this._items.map((e4) => e4.resolveAnchors(t3, n2));
              return new g(e3, s2, this._items.map((e4) => e4.ruleId));
            }
          }
          t2.RegExpSourceList = m;
          class g {
            constructor(e3, t3, n2) {
              this.regExps = t3, this.rules = n2, this.scanner = e3.createOnigScanner(t3);
            }
            dispose() {
              "function" == typeof this.scanner.dispose && this.scanner.dispose();
            }
            toString() {
              const e3 = [];
              for (let t3 = 0, n2 = this.rules.length; t3 < n2; t3++) e3.push("   - " + this.rules[t3] + ": " + this.regExps[t3]);
              return e3.join("\n");
            }
            findNextMatchSync(e3, t3, n2) {
              const s2 = this.scanner.findNextMatchSync(e3, t3, n2);
              return s2 ? { ruleId: this.rules[s2.index], captureIndices: s2.captureIndices } : null;
            }
          }
          t2.CompiledRule = g;
        }, 63: (e2, t2, n) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ThemeTrieElement = t2.ThemeTrieElementRule = t2.ColorMap = t2.fontStyleToString = t2.ParsedThemeRule = t2.parseTheme = t2.StyleAttributes = t2.ScopeStack = t2.Theme = void 0;
          const s = n(807);
          class r {
            constructor(e3, t3, n2) {
              this._colorMap = e3, this._defaults = t3, this._root = n2, this._cachedMatchRoot = new s.CachedFn((e4) => this._root.match(e4));
            }
            static createFromRawTheme(e3, t3) {
              return this.createFromParsedTheme(c(e3), t3);
            }
            static createFromParsedTheme(e3, t3) {
              return function(e4, t4) {
                e4.sort((e5, t5) => {
                  let n3 = s.strcmp(e5.scope, t5.scope);
                  return 0 !== n3 ? n3 : (n3 = s.strArrCmp(e5.parentScopes, t5.parentScopes), 0 !== n3 ? n3 : e5.index - t5.index);
                });
                let n2 = 0, i2 = "#000000", o2 = "#ffffff";
                for (; e4.length >= 1 && "" === e4[0].scope; ) {
                  let t5 = e4.shift();
                  -1 !== t5.fontStyle && (n2 = t5.fontStyle), null !== t5.foreground && (i2 = t5.foreground), null !== t5.background && (o2 = t5.background);
                }
                let c2 = new u(t4), l2 = new a(n2, c2.getId(i2), c2.getId(o2)), h2 = new d(new p(0, null, -1, 0, 0), []);
                for (let t5 = 0, n3 = e4.length; t5 < n3; t5++) {
                  let n4 = e4[t5];
                  h2.insert(0, n4.scope, n4.parentScopes, n4.fontStyle, c2.getId(n4.foreground), c2.getId(n4.background));
                }
                return new r(c2, l2, h2);
              }(e3, t3);
            }
            getColorMap() {
              return this._colorMap.getColorMap();
            }
            getDefaults() {
              return this._defaults;
            }
            match(e3) {
              if (null === e3) return this._defaults;
              const t3 = e3.scopeName, n2 = this._cachedMatchRoot.get(t3).find((t4) => function(e4, t5) {
                if (0 === t5.length) return true;
                for (let n3 = 0; n3 < t5.length; n3++) {
                  let s2 = t5[n3], r2 = false;
                  if (">" === s2) {
                    if (n3 === t5.length - 1) return false;
                    s2 = t5[++n3], r2 = true;
                  }
                  for (; e4 && !o(e4.scopeName, s2); ) {
                    if (r2) return false;
                    e4 = e4.parent;
                  }
                  if (!e4) return false;
                  e4 = e4.parent;
                }
                return true;
              }(e3.parent, t4.parentScopes));
              return n2 ? new a(n2.fontStyle, n2.foreground, n2.background) : null;
            }
          }
          t2.Theme = r;
          class i {
            constructor(e3, t3) {
              this.parent = e3, this.scopeName = t3;
            }
            static push(e3, t3) {
              for (const n2 of t3) e3 = new i(e3, n2);
              return e3;
            }
            static from(...e3) {
              let t3 = null;
              for (let n2 = 0; n2 < e3.length; n2++) t3 = new i(t3, e3[n2]);
              return t3;
            }
            push(e3) {
              return new i(this, e3);
            }
            getSegments() {
              let e3 = this;
              const t3 = [];
              for (; e3; ) t3.push(e3.scopeName), e3 = e3.parent;
              return t3.reverse(), t3;
            }
            toString() {
              return this.getSegments().join(" ");
            }
            extends(e3) {
              return this === e3 || null !== this.parent && this.parent.extends(e3);
            }
            getExtensionIfDefined(e3) {
              const t3 = [];
              let n2 = this;
              for (; n2 && n2 !== e3; ) t3.push(n2.scopeName), n2 = n2.parent;
              return n2 === e3 ? t3.reverse() : void 0;
            }
          }
          function o(e3, t3) {
            return t3 === e3 || e3.startsWith(t3) && "." === e3[t3.length];
          }
          t2.ScopeStack = i;
          class a {
            constructor(e3, t3, n2) {
              this.fontStyle = e3, this.foregroundId = t3, this.backgroundId = n2;
            }
          }
          function c(e3) {
            if (!e3) return [];
            if (!e3.settings || !Array.isArray(e3.settings)) return [];
            let t3 = e3.settings, n2 = [], r2 = 0;
            for (let e4 = 0, i2 = t3.length; e4 < i2; e4++) {
              let i3, o2 = t3[e4];
              if (!o2.settings) continue;
              if ("string" == typeof o2.scope) {
                let e5 = o2.scope;
                e5 = e5.replace(/^[,]+/, ""), e5 = e5.replace(/[,]+$/, ""), i3 = e5.split(",");
              } else i3 = Array.isArray(o2.scope) ? o2.scope : [""];
              let a2 = -1;
              if ("string" == typeof o2.settings.fontStyle) {
                a2 = 0;
                let e5 = o2.settings.fontStyle.split(" ");
                for (let t4 = 0, n3 = e5.length; t4 < n3; t4++) switch (e5[t4]) {
                  case "italic":
                    a2 |= 1;
                    break;
                  case "bold":
                    a2 |= 2;
                    break;
                  case "underline":
                    a2 |= 4;
                    break;
                  case "strikethrough":
                    a2 |= 8;
                }
              }
              let c2 = null;
              "string" == typeof o2.settings.foreground && s.isValidHexColor(o2.settings.foreground) && (c2 = o2.settings.foreground);
              let u2 = null;
              "string" == typeof o2.settings.background && s.isValidHexColor(o2.settings.background) && (u2 = o2.settings.background);
              for (let t4 = 0, s2 = i3.length; t4 < s2; t4++) {
                let s3 = i3[t4].trim().split(" "), o3 = s3[s3.length - 1], h2 = null;
                s3.length > 1 && (h2 = s3.slice(0, s3.length - 1), h2.reverse()), n2[r2++] = new l(o3, h2, e4, a2, c2, u2);
              }
            }
            return n2;
          }
          t2.StyleAttributes = a, t2.parseTheme = c;
          class l {
            constructor(e3, t3, n2, s2, r2, i2) {
              this.scope = e3, this.parentScopes = t3, this.index = n2, this.fontStyle = s2, this.foreground = r2, this.background = i2;
            }
          }
          t2.ParsedThemeRule = l, t2.fontStyleToString = function(e3) {
            if (-1 === e3) return "not set";
            let t3 = "";
            return 1 & e3 && (t3 += "italic "), 2 & e3 && (t3 += "bold "), 4 & e3 && (t3 += "underline "), 8 & e3 && (t3 += "strikethrough "), "" === t3 && (t3 = "none"), t3.trim();
          };
          class u {
            constructor(e3) {
              if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(e3)) {
                this._isFrozen = true;
                for (let t3 = 0, n2 = e3.length; t3 < n2; t3++) this._color2id[e3[t3]] = t3, this._id2color[t3] = e3[t3];
              } else this._isFrozen = false;
            }
            getId(e3) {
              if (null === e3) return 0;
              e3 = e3.toUpperCase();
              let t3 = this._color2id[e3];
              if (t3) return t3;
              if (this._isFrozen) throw new Error(`Missing color in color map - ${e3}`);
              return t3 = ++this._lastColorId, this._color2id[e3] = t3, this._id2color[t3] = e3, t3;
            }
            getColorMap() {
              return this._id2color.slice(0);
            }
          }
          t2.ColorMap = u;
          const h = Object.freeze([]);
          class p {
            constructor(e3, t3, n2, s2, r2) {
              this.scopeDepth = e3, this.parentScopes = t3 || h, this.fontStyle = n2, this.foreground = s2, this.background = r2;
            }
            clone() {
              return new p(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
            }
            static cloneArr(e3) {
              let t3 = [];
              for (let n2 = 0, s2 = e3.length; n2 < s2; n2++) t3[n2] = e3[n2].clone();
              return t3;
            }
            acceptOverwrite(e3, t3, n2, s2) {
              this.scopeDepth > e3 ? console.log("how did this happen?") : this.scopeDepth = e3, -1 !== t3 && (this.fontStyle = t3), 0 !== n2 && (this.foreground = n2), 0 !== s2 && (this.background = s2);
            }
          }
          t2.ThemeTrieElementRule = p;
          class d {
            constructor(e3, t3 = [], n2 = {}) {
              this._mainRule = e3, this._children = n2, this._rulesWithParentScopes = t3;
            }
            static _cmpBySpecificity(e3, t3) {
              if (e3.scopeDepth !== t3.scopeDepth) return t3.scopeDepth - e3.scopeDepth;
              let n2 = 0, s2 = 0;
              for (; ">" === e3.parentScopes[n2] && n2++, ">" === t3.parentScopes[s2] && s2++, !(n2 >= e3.parentScopes.length || s2 >= t3.parentScopes.length); ) {
                const r2 = t3.parentScopes[s2].length - e3.parentScopes[n2].length;
                if (0 !== r2) return r2;
                n2++, s2++;
              }
              return t3.parentScopes.length - e3.parentScopes.length;
            }
            match(e3) {
              if ("" !== e3) {
                let t4, n2, s2 = e3.indexOf(".");
                if (-1 === s2 ? (t4 = e3, n2 = "") : (t4 = e3.substring(0, s2), n2 = e3.substring(s2 + 1)), this._children.hasOwnProperty(t4)) return this._children[t4].match(n2);
              }
              const t3 = this._rulesWithParentScopes.concat(this._mainRule);
              return t3.sort(d._cmpBySpecificity), t3;
            }
            insert(e3, t3, n2, s2, r2, i2) {
              if ("" === t3) return void this._doInsertHere(e3, n2, s2, r2, i2);
              let o2, a2, c2, l2 = t3.indexOf(".");
              -1 === l2 ? (o2 = t3, a2 = "") : (o2 = t3.substring(0, l2), a2 = t3.substring(l2 + 1)), this._children.hasOwnProperty(o2) ? c2 = this._children[o2] : (c2 = new d(this._mainRule.clone(), p.cloneArr(this._rulesWithParentScopes)), this._children[o2] = c2), c2.insert(e3 + 1, a2, n2, s2, r2, i2);
            }
            _doInsertHere(e3, t3, n2, r2, i2) {
              if (null !== t3) {
                for (let o2 = 0, a2 = this._rulesWithParentScopes.length; o2 < a2; o2++) {
                  let a3 = this._rulesWithParentScopes[o2];
                  if (0 === s.strArrCmp(a3.parentScopes, t3)) return void a3.acceptOverwrite(e3, n2, r2, i2);
                }
                -1 === n2 && (n2 = this._mainRule.fontStyle), 0 === r2 && (r2 = this._mainRule.foreground), 0 === i2 && (i2 = this._mainRule.background), this._rulesWithParentScopes.push(new p(e3, t3, n2, r2, i2));
              } else this._mainRule.acceptOverwrite(e3, n2, r2, i2);
            }
          }
          t2.ThemeTrieElement = d;
        }, 807: (e2, t2) => {
          function n(e3) {
            return Array.isArray(e3) ? function(e4) {
              let t3 = [];
              for (let s2 = 0, r2 = e4.length; s2 < r2; s2++) t3[s2] = n(e4[s2]);
              return t3;
            }(e3) : "object" == typeof e3 ? function(e4) {
              let t3 = {};
              for (let s2 in e4) t3[s2] = n(e4[s2]);
              return t3;
            }(e3) : e3;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.performanceNow = t2.CachedFn = t2.escapeRegExpCharacters = t2.isValidHexColor = t2.strArrCmp = t2.strcmp = t2.RegexSource = t2.basename = t2.mergeObjects = t2.clone = void 0, t2.clone = function(e3) {
            return n(e3);
          }, t2.mergeObjects = function(e3, ...t3) {
            return t3.forEach((t4) => {
              for (let n2 in t4) e3[n2] = t4[n2];
            }), e3;
          }, t2.basename = function e3(t3) {
            const n2 = ~t3.lastIndexOf("/") || ~t3.lastIndexOf("\\");
            return 0 === n2 ? t3 : ~n2 == t3.length - 1 ? e3(t3.substring(0, t3.length - 1)) : t3.substr(1 + ~n2);
          };
          let s = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
          function r(e3, t3) {
            return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
          }
          t2.RegexSource = class {
            static hasCaptures(e3) {
              return null !== e3 && (s.lastIndex = 0, s.test(e3));
            }
            static replaceCaptures(e3, t3, n2) {
              return e3.replace(s, (e4, s2, r2, i) => {
                let o = n2[parseInt(s2 || r2, 10)];
                if (!o) return e4;
                {
                  let e5 = t3.substring(o.start, o.end);
                  for (; "." === e5[0]; ) e5 = e5.substring(1);
                  switch (i) {
                    case "downcase":
                      return e5.toLowerCase();
                    case "upcase":
                      return e5.toUpperCase();
                    default:
                      return e5;
                  }
                }
              });
            }
          }, t2.strcmp = r, t2.strArrCmp = function(e3, t3) {
            if (null === e3 && null === t3) return 0;
            if (!e3) return -1;
            if (!t3) return 1;
            let n2 = e3.length, s2 = t3.length;
            if (n2 === s2) {
              for (let s3 = 0; s3 < n2; s3++) {
                let n3 = r(e3[s3], t3[s3]);
                if (0 !== n3) return n3;
              }
              return 0;
            }
            return n2 - s2;
          }, t2.isValidHexColor = function(e3) {
            return !!(/^#[0-9a-f]{6}$/i.test(e3) || /^#[0-9a-f]{8}$/i.test(e3) || /^#[0-9a-f]{3}$/i.test(e3) || /^#[0-9a-f]{4}$/i.test(e3));
          }, t2.escapeRegExpCharacters = function(e3) {
            return e3.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
          }, t2.CachedFn = class {
            constructor(e3) {
              this.fn = e3, this.cache = /* @__PURE__ */ new Map();
            }
            get(e3) {
              if (this.cache.has(e3)) return this.cache.get(e3);
              const t3 = this.fn(e3);
              return this.cache.set(e3, t3), t3;
            }
          }, t2.performanceNow = "undefined" == typeof performance ? function() {
            return Date.now();
          } : function() {
            return performance.now();
          };
        } }, t = {};
        return function n(s) {
          var r = t[s];
          if (void 0 !== r) return r.exports;
          var i = t[s] = { exports: {} };
          return e[s].call(i.exports, i, i.exports, n), i.exports;
        }(625);
      })());
    }
  });

  // node_modules/tokens-highlighter/dist/constants.js
  var BACKGROUND_COLOR = "transparent";
  var CLASS = "highlighter";
  var NEWLINE = "\n";

  // node_modules/tokens-highlighter/dist/to_ansi.js
  var hex2rgb = (hex) => {
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(`${hex[0]}${hex[0]}`, 16);
      const g = parseInt(`${hex[1]}${hex[1]}`, 16);
      const b = parseInt(`${hex[2]}${hex[2]}`, 16);
      return { r, g, b };
    } else if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    } else {
      return;
    }
  };
  var withForeground = (value, color) => {
    const rgb = hex2rgb(color.slice(1));
    if (!rgb)
      return value;
    return `\x1B[38;2;${rgb.r};${rgb.g};${rgb.b}m${value}\x1B[39m`;
  };
  var withBackground = (value, color) => {
    const rgb = hex2rgb(color.slice(1));
    if (!rgb)
      return value;
    return `\x1B[48;2;${rgb.r};${rgb.g};${rgb.b}m${value}\x1B[49m`;
  };
  var withItalic = (value) => {
    return `\x1B[3m${value}\x1B[0m`;
  };
  var withBold = (value) => {
    return `\x1B[1m${value}\x1B[0m`;
  };
  var withUnderline = (value) => {
    return `\x1B[4m${value}\x1B[0m`;
  };
  
  var toANSI = (tokens) => {
    let output = "";
    for (let li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        const token = lineTokens[ti];
        output += withStyle(token.value, token);
      }
      if (li < ll - 1) {
        output += NEWLINE;
      }
    }
    return output;
  };
  var to_ansi_default = toANSI;
  var withForeground_MCFC = (value, color) => {
    const rgb = hex2rgb(color.slice(1));
    if (!rgb)
      return value;
    return `§${findClosestColorMatch([rgb.r, rgb.g, rgb.b], mcFormattingCodesToHexColorMap) ?? "r"}${value}§r`;
  };
  var withBackground_MCFC = (value, color) => {
    // const rgb = hex2rgb(color.slice(1));
    // if (!rgb)
      // return value;
    return value; // Background colors are not supported by Minecraft Bedrock Edition.
  };
  var withItalic_MCFC = (value) => {
    return `§o${value}§r`;
  };
  var withBold_MCFC = (value) => {
    return `§l${value}§r`;
  };
  var withUnderline_MCFC = (value) => {
    return value; // Underlines are not supported by Minecraft Bedrock Edition.
  };
  var withObfuscated_MCFC = (value) => {
    return `§k${value}§r`;
  };
  var withStyle = (value, token) => {
    if (token.color)
      value = withForeground(value, token.color);
    if (token.backgroundColor)
      value = withBackground(value, token.backgroundColor);
    if (token.fontStyle === "italic")
      value = withItalic(value);
    if (token.fontWeight === "bold")
      value = withBold(value);
    if (token.textDecoration === "underline")
      value = withUnderline(value);
    return value;
  };
  var withStyle_MCFC = (value, token) => {
    if (token.color)
      value = withForeground_MCFC(value, token.color);
    if (token.backgroundColor)
      value = withBackground_MCFC(value, token.backgroundColor);
    if (token.fontStyle === "italic")
      value = withItalic_MCFC(value);
    if (token.fontWeight === "bold")
      value = withBold_MCFC(value);
    if (token.textDecoration === "underline")
      value = withUnderline_MCFC(value);
    if(token.obfuscated || token.textDecoration === "obfuscated" || token.fontStyle === "obfuscated")
      value = withObfuscated_MCFC(value);
    return value;
  };
  var toMCFC = (tokens) => {
    let output = "";
    for (let li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        const token = lineTokens[ti];
        output += withStyle_MCFC(token.value, token);
      }
      if (li < ll - 1) {
        output += NEWLINE;
      }
    }
    return output;
  };
  var to_mcfc_default = toMCFC;

  // node_modules/tokens-highlighter/dist/to_dom.js
  var toDOM = (tokens, options) => {
    const output = document.createElement("pre");
    output.classList.add(CLASS);
    output.style.backgroundColor = options?.backgroundColor || BACKGROUND_COLOR;
    for (let li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        const token = lineTokens[ti];
        if (!token.value)
          continue;
        const node = document.createElement("span");
        node.innerText = token.value;
        if (token.color)
          node.style.color = token.color;
        if (token.backgroundColor)
          node.style.backgroundColor = token.backgroundColor;
        if (token.fontStyle)
          node.style.fontStyle = token.fontStyle;
        if (token.fontWeight)
          node.style.fontWeight = token.fontWeight;
        if (token.textDecoration)
          node.style.textDecoration = token.textDecoration;
        output.appendChild(node);
      }
      if (li < ll - 1) {
        output.appendChild(document.createTextNode(NEWLINE));
      }
    }
    return output;
  };
  var to_dom_default = toDOM;

  // node_modules/kasi/dist/to_space_case.js
  var splitRe = /([a-z])([A-Z]+)(?=([a-z])?)|([.:/_-])/g;
  var toSpaceCase = (value) => {
    return value.replace(splitRe, (_, $1, $2, $3, $4) => $4 ? " " : $3 && $2.length > 1 ? `${$1} ${$2.slice(0, -1)} ${$2.slice(-1)}` : `${$1} ${$2}`).toLowerCase().trim();
  };
  var to_space_case_default = toSpaceCase;

  // node_modules/kasi/dist/to_kebab_case.js
  var toKebabCase = (value) => {
    return to_space_case_default(value).replaceAll(" ", "-");
  };
  var to_kebab_case_default = toKebabCase;

  // node_modules/tokens-highlighter/dist/utils.js
  var escapeHTML = /* @__PURE__ */ (() => {
    const replacementsRe = /[&<>"]/g;
    const replacements = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    const replaceChar = (char) => {
      return replacements[char];
    };
    const replaceChars = (str) => {
      return str.replace(replacementsRe, replaceChar);
    };
    return replaceChars;
  })();
  var memoize = (fn) => {
    const cache = /* @__PURE__ */ new Map();
    return (...args) => {
      const id = args[0];
      const resultCached = cache.get(id);
      if (resultCached !== void 0 || cache.has(id))
        return resultCached;
      const result = fn.apply(void 0, args);
      cache.set(id, result);
      return result;
    };
  };

  // node_modules/tokens-highlighter/dist/highlights.js
  var Highlight = globalThis.Highlight || Set;
  var HighlightsRegistry = globalThis.CSS?.highlights || /* @__PURE__ */ new Map();
  var HighlightsSupported = !!globalThis.CSS?.highlights;
  var Highlights = {
    /* API */
    getStyle: memoize(() => {
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute(`data-${CLASS}`, "");
      document.head.append(style);
      return style;
    }),
    getHighlights: (() => {
      let highlightsCounter = 0;
      return memoize((identifier, styles) => {
        const highlight = new Highlight();
        const highlightName = `${CLASS}-${highlightsCounter++}`;
        HighlightsRegistry.set(highlightName, highlight);
        const highlightsStyle = Highlights.getStyle();
        const highlightRule = `::highlight(${highlightName}){${Object.entries(styles).filter(([key, value]) => !!value).map(([key, value]) => `${to_kebab_case_default(key)}:${value};`).join("")}}`;
        highlightsStyle.innerText += highlightRule;
        return highlight;
      });
    })(),
    isSupported: () => {
      return HighlightsSupported;
    }
  };
  var highlights_default = Highlights;

  // node_modules/tokens-highlighter/dist/to_string.js
  var toString = (tokens) => {
    let output = "";
    for (let li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        output += lineTokens[ti].value;
      }
      if (li < ll - 1) {
        output += NEWLINE;
      }
    }
    return output;
  };
  var to_string_default = toString;

  // node_modules/tokens-highlighter/dist/to_highlights.js
  var toHighlights = (tokens, options) => {
    const output = document.createElement("pre");
    output.classList.add(CLASS);
    output.style.backgroundColor = options?.backgroundColor || BACKGROUND_COLOR;
    const string = to_string_default(tokens);
    const text = document.createTextNode(string);
    output.appendChild(text);
    if (!highlights_default.isSupported())
      return [output, () => {
      }];
    const disposers = [];
    const dispose = () => disposers.forEach((dispose2) => dispose2());
    for (let s = 0, li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        const token = lineTokens[ti];
        const { color, backgroundColor, fontStyle, fontWeight, textDecoration } = token;
        const highlightId = `${color}-${backgroundColor}-${fontStyle}-${fontWeight}-${textDecoration}`;
        const highlights = highlights_default.getHighlights(highlightId, { color, backgroundColor, fontStyle, fontWeight, textDecoration });
        const range = new Range();
        range.setStart(text, s);
        range.setEnd(text, s + token.value.length);
        highlights.add(range);
        disposers.push(() => highlights.delete(range));
        s += token.value.length;
      }
      if (li < ll - 1) {
        s += NEWLINE.length;
      }
    }
    return [output, dispose];
  };
  var to_highlights_default = toHighlights;

  // node_modules/tokens-highlighter/dist/to_html.js
  var toHTML = (tokens, options) => {
    const backgroundColor = `background-color:${options?.backgroundColor || BACKGROUND_COLOR}`;
    let output = `<pre class="${CLASS}" style="${backgroundColor}">`;
    for (let li = 0, ll = tokens.length; li < ll; li++) {
      const lineTokens = tokens[li];
      for (let ti = 0, tl = lineTokens.length; ti < tl; ti++) {
        const token = lineTokens[ti];
        if (!token.value)
          continue;
        const color = token.color ? `color:${token.color}` : "";
        const backgroundColor2 = token.backgroundColor ? `;background-color:${token.backgroundColor}` : "";
        const fontStyle = token.fontStyle ? `;font-style:${token.fontStyle}` : "";
        const fontWeight = token.fontWeight ? `;font-weight:${token.fontWeight}` : "";
        const textDecoration = token.textDecoration ? `;text-decoration:${token.textDecoration}` : "";
        const value = escapeHTML(token.value);
        output += `<span style="${color}${backgroundColor2}${fontStyle}${fontWeight}${textDecoration}">${value}</span>`;
      }
      if (li < ll - 1) {
        output += NEWLINE;
      }
    }
    output += "</pre>";
    return output;
  };
  var to_html_default = toHTML;

  // node_modules/textmate-highlighter/dist/textmate/vendor.js
  // var oniguruma = __toESM(require_main(), 1);
  var textmate = __toESM(require_main2(), 1);
  var INITIAL2 = textmate.INITIAL || textmate["default"].INITIAL;
  var TMRegistry = textmate.Registry || textmate["default"].Registry;
  // var loadOniguruma = oniguruma.loadWASM || oniguruma["default"].loadWASM;
  // var OnigurumaScanner = oniguruma.OnigScanner || oniguruma["default"].OnigScanner;
  // var OnigurumaString = oniguruma.OnigString || oniguruma["default"].OnigString;

  // node_modules/are-shallow-equal/dist/utils.js
  var { isArray } = Array;
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isStriclyEqual = (x, y) => {
    return x === y || x !== x && y !== y;
  };

  // node_modules/are-shallow-equal/dist/index.js
  var areShallowEqual = (x, y) => {
    if (isStriclyEqual(x, y))
      return true;
    if (!isObject(x) || !isObject(y))
      return false;
    if (isArray(x) && isArray(y)) {
      if (x.length !== y.length)
        return false;
      for (let i = 0, l = x.length; i < l; i++) {
        if (!isStriclyEqual(x[i], y[i]))
          return false;
      }
    } else {
      for (const key in x) {
        if (!(key in y))
          return false;
        if (!isStriclyEqual(x[key], y[key]))
          return false;
      }
      for (const key in y) {
        if (!(key in x))
          return false;
      }
    }
    return true;
  };
  var dist_default = areShallowEqual;

  // node_modules/textmate-highlighter/dist/utils.js
  var isString = (value) => {
    return typeof value === "string";
  };
  var memoize2 = (fn) => {
    const cache = /* @__PURE__ */ new Map();
    return (...args) => {
      const id = args[0];
      const resultCached = cache.get(id);
      if (resultCached !== void 0 || cache.has(id))
        return resultCached;
      const result = fn.apply(void 0, args);
      cache.set(id, result);
      return result;
    };
  };
  var once = (fn) => {
    let called = false;
    let result;
    return () => {
      if (!called) {
        called = true;
        result = fn();
      }
      return result;
    };
  };

  // node_modules/textmate-highlighter/dist/textmate/oniguruma.js
  // var Oniguruma = class {
  //   /* CONSTRUCTOR */
  //   constructor(options) {
  //     this.fetch = once(async () => {
  //       const source = await this.options.getOniguruma();
  //       if (isString(source)) {
  //         console.error("Fetch is not supported!", new Error().stack)
  //         return null;
  //         // return await (await fetch(source)).arrayBuffer();
  //       } else {
  //         return source;
  //       }
  //     });
  //     this.load = once(async () => {
  //       const buffer = await this.fetch();
  //       await loadOniguruma(buffer);
  //       const cache = [];
  //       return {
  //         createOnigScanner: (patterns) => {
  //           const cacheLv1 = patterns.length;
  //           const cacheLv2 = patterns[0] || "";
  //           const scannersLv1 = cache[cacheLv1] || (cache[cacheLv1] = {});
  //           const scannersLv2 = scannersLv1[cacheLv2] || (scannersLv1[cacheLv2] = []);
  //           const cached = scannersLv2.find(([cached2]) => dist_default(patterns, cached2));
  //           if (cached)
  //             return cached[1];
  //           const scanner = new OnigurumaScanner(patterns);
  //           scannersLv2.push([patterns, scanner]);
  //           return scanner;
  //         },
  //         createOnigString: (content) => {
  //           return new OnigurumaString(content);
  //         }
  //       };
  //     });
  //     this.options = options;
  //   }
  // };
  // var oniguruma_default = Oniguruma;

  // node_modules/textmate-highlighter/dist/textmate/registry.js
  var Registry2 = class {
    /* CONSTRUCTOR */
    constructor(options) {
      this.fetchGrammar = memoize2(async (name) => {
        const source = await this.options.getGrammar(name);
        if (isString(source)) {
          return (await import(source)).default[0];
        } else if (source) {
          return source;
        } else {
          console.warn(`Missing grammar: "${name}"`);
        }
      });
      this.fetchTheme = memoize2(async (name) => {
        const source = await this.options.getTheme(name);
        if (isString(source)) {
          return (await import(source)).default;
        } else if (source) {
          return source;
        } else {
          console.warn(`Missing theme: "${name}"`);
        }
      });
      this.loadGrammar = memoize2(async (name) => {
        return await this.registry.loadGrammar(name) || void 0;
      });
      this.loadTheme = memoize2(async (name) => {
        const theme = await this.fetchTheme(name);
        if (!theme)
          return;
        const themeNormalized = this.normalizeTheme(theme);
        return themeNormalized;
      });
      this.loadThemeColors = memoize2(async (name) => {
        const theme = await this.loadTheme(name);
        if (!theme)
          return [];
        this.registry.setTheme(theme);
        const colors = this.registry.getColorMap();
        return colors;
      });
      this.loadThemeColorsDefault = memoize2(async (name) => {
        const theme = await this.fetchTheme(name);
        const background = theme?.colors?.["editor.background"] || theme?.colors?.["background"] || "#000000";
        const foreground = theme?.colors?.["editor.foreground"] || theme?.colors?.["foreground"] || "#ffffff";
        return { background, foreground };
      });
      this.loadThemeDecorations = once(() => {
        return ["", "", "", "", "underline"];
      });
      this.loadThemeStyles = once(() => {
        return ["", "italic", "", "", ""];
      });
      this.loadThemeWeights = once(() => {
        return ["", "", "bold", "", ""];
      });
      this.normalizeTheme = memoize2(async (theme) => {
        theme || (theme = {
          name: "Fallback",
          settings: []
        });
        theme.settings || (theme.settings = theme.tokenColors || []);
        theme.settings.unshift?.({
          settings: {
            background: theme.colors?.["editor.background"] || theme.colors?.["background"] || "#000000",
            foreground: theme.colors?.["editor.foreground"] || theme.colors?.["foreground"] || "#ffffff"
          }
        });
        return theme;
      });
      this.setTheme = (theme) => {
        if (this.theme === theme)
          return;
        this.theme = theme;
        this.registry.setTheme(theme);
      };
      this.options = options;
      this.registry = new TMRegistry({
        // onigLib: options.getOniguruma(),
        loadGrammar: this.fetchGrammar
      });
    }
  };
  var registry_default = Registry2;

  // node_modules/immediato/dist/index.js
  var callbacksId = 0;
  var callbacksExecuting = false;
  var callbacksMap = /* @__PURE__ */ new Map();
  var { port1, port2 } = new MessageChannel();
  var setImmediate = (callback, ...args) => {
    const callbackId = callbacksId += 1;
    const callbackWithArgs = () => callback(...args);
    callbacksMap.set(callbackId, callbackWithArgs);
    port1.onmessage = runImmediate;
    port2.postMessage(callbackId);
    return callbackId;
  };
  var clearImmediate = (callbackId) => {
    callbacksMap.delete(callbackId);
    if (callbacksMap.size)
      return;
    port1.onmessage = null;
  };
  var runImmediate = (event) => {
    const callbackId = event.data;
    const callback = callbacksMap.get(callbackId);
    if (!callback)
      return;
    if (callbacksExecuting) {
      setTimeout(runImmediate, 0, callbackId);
    } else {
      try {
        callbacksExecuting = true;
        callback();
      } finally {
        callbacksExecuting = false;
        clearImmediate(callbackId);
      }
    }
  };

  // node_modules/event-loop-yielder/dist/yielders/immediate.js
  var makeImmediateYielder = () => {
    return () => {
      return new Promise(setImmediate);
    };
  };
  var immediate_default = makeImmediateYielder;

  // node_modules/event-loop-yielder/dist/yielders/timeout.js
  var makeTimeoutYielder = () => {
    return () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    };
  };
  var timeout_default = makeTimeoutYielder;

  // node_modules/event-loop-yielder/dist/yielders/interval.js
  var makeIntervalYielder = (interval, strategy = "timeout") => {
    const yieldNow = strategy === "timeout" ? timeout_default() : immediate_default();
    let start = 0;
    return () => {
      const now = Date.now();
      start = start || now;
      const elapsed = now - start;
      if (elapsed < interval)
        return;
      start = 0;
      return yieldNow();
    };
  };
  var interval_default = makeIntervalYielder;

  // node_modules/textmate-highlighter/dist/textmate/tokenizer.js
  var yieldToEventLoop = interval_default(10);
  var Tokenizer = class {
    /* CONSTRUCTOR */
    constructor(registry) {
      this.tokenize = async (lines, grammar, theme, signal, onTokens) => {
        const linesTokens = new Array(lines.length).fill([]);
        const tokenizer = await this.registry.loadGrammar(grammar);
        const themer = await this.registry.loadTheme(theme);
        const colors = await this.registry.loadThemeColors(theme);
        const decorations = this.registry.loadThemeDecorations();
        const styles = this.registry.loadThemeStyles();
        const weights = this.registry.loadThemeWeights();
        if (!tokenizer)
          return linesTokens;
        if (!themer)
          return linesTokens;
        let state = INITIAL2;
        for (let i = 0, l = lines.length; i < l; i++) {
          if (i % 10 === 0)
            await yieldToEventLoop();
          if (signal?.aborted)
            return linesTokens;
          this.registry.setTheme(themer);
          const line = lines[i];
          const lineLength = line.length;
          const lineResult = tokenizer.tokenizeLine2(line, state);
          const lineTokens = new Array(lineResult.tokens.length / 2);
          const tokens = lineResult.tokens;
          for (let ti = 0, tj = 0, tl = tokens.length; ti < tl; ti += 2, tj += 1) {
            if (ti % 100 === 0)
              await yieldToEventLoop();
            if (signal?.aborted)
              return linesTokens;
            const startIndex = tokens[ti];
            const endIndex = tokens[ti + 2] || lineLength;
            const value = line.substring(startIndex, endIndex);
            const bits = tokens[ti + 1];
            const colorBits = (bits & 8372224) >>> 15;
            const backgroundColorBits = (bits & 4286578688) >>> 24;
            const fontBits = (bits & 14336) >>> 11;
            const color = colors[colorBits] || "";
            const backgroundColor = colors[backgroundColorBits] || "";
            const fontStyle = styles[fontBits] || "";
            const fontWeight = weights[fontBits] || "";
            const textDecoration = decorations[fontBits] || "";
            const token = { value, startIndex, endIndex, color, backgroundColor, fontStyle, fontWeight, textDecoration };
            lineTokens[tj] = token;
          }
          state = lineResult.ruleStack;
          const lineTokensTransformed = onTokens?.(lineTokens, i) || lineTokens;
          linesTokens[i] = lineTokensTransformed;
        }
        return linesTokens;
      };
      this.registry = registry;
    }
  };
  var tokenizer_default = Tokenizer;

  // node_modules/textmate-highlighter/dist/index.js
  var TextMateHighlighter = class {
    /* CONSTRUCTOR */
    constructor(options) {
      this.highlightToAbstract = async (options2, highlighter) => {
        const lines = options2.code.replace(/^(\r?\n|\r)+|(\r?\n|\r)+$/g, "").split(/\r?\n|\r/g);
        const tokens = new Array(lines.length).fill([]);
        await this.tokenize(lines, options2.grammar, options2.theme, options2.signal, (lineTokens, lineIndex) => {
          tokens[lineIndex] = lineTokens;
        });
        const backgroundColor = options2.background || (await this.registry.loadThemeColorsDefault(options2.theme)).background;
        const result = highlighter(tokens, { backgroundColor });
        return result;
      };
      this.highlightToANSI = (options2) => {
        return this.highlightToAbstract(options2, to_ansi_default);
      };
      this.highlightToMCFC = (options2) => {
        return this.highlightToAbstract(options2, to_MC);
      };
      this.highlightToDOM = (options2) => {
        return this.highlightToAbstract(options2, to_dom_default);
      };
      this.highlightToHighlights = (options2) => {
        return this.highlightToAbstract(options2, to_highlights_default);
      };
      this.highlightToHTML = (options2) => {
        return this.highlightToAbstract(options2, to_html_default);
      };
      this.tokenize = (lines, grammar, theme, signal, onTokens) => {
        return this.tokenizer.tokenize(lines, grammar, theme, signal, onTokens);
      };
      const { getGrammar/* , getOniguruma */, getTheme } = options;
      // this.oniguruma = new oniguruma_default({ getOniguruma });
      this.registry = new registry_default({ getGrammar, getTheme, getOniguruma: () => {} });
      this.tokenizer = new tokenizer_default(this.registry);
    }
  };
  var dist_default2 = TextMateHighlighter;

  return { default: dist_default2 };
})();

export default exports.default;
export const TextMateHighlighter = exports.default;
