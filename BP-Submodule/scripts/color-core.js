const exports =  (() => {
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

  // node_modules/color-core/dist/conversions/components/adobe-rgb.js
  var require_adobe_rgb = __commonJS({
    "node_modules/color-core/dist/conversions/components/adobe-rgb.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToAdobeRGB = rgbToAdobeRGB;
      exports.adobeRGBToRGB = adobeRGBToRGB;
      function rgbToAdobeRGB(rgb) {
        var linearize = function(v) {
          var c = v / 255;
          return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        var r = linearize(rgb.r);
        var g = linearize(rgb.g);
        var b = linearize(rgb.b);
        var x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
        var y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
        var z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
        var adobeR = x * 2.041369 + y * -0.5649464 + z * -0.3446944;
        var adobeG = x * -0.969266 + y * 1.8760108 + z * 0.041556;
        var adobeB = x * 0.0134474 + y * -0.1183897 + z * 1.0154096;
        adobeR = Math.max(0, adobeR);
        adobeG = Math.max(0, adobeG);
        adobeB = Math.max(0, adobeB);
        var gammaCorrect = function(v) {
          return Math.pow(v, 1 / 2.19921875);
        };
        return {
          ar: gammaCorrect(adobeR),
          ag: gammaCorrect(adobeG),
          ab: gammaCorrect(adobeB)
        };
      }
      function adobeRGBToRGB(adobeRGB) {
        var linearize = function(v) {
          return Math.pow(v, 2.19921875);
        };
        var r = linearize(adobeRGB.ar);
        var g = linearize(adobeRGB.ag);
        var b = linearize(adobeRGB.ab);
        var x = r * 0.57667 + g * 0.18556 + b * 0.18823;
        var y = r * 0.29734 + g * 0.62736 + b * 0.07529;
        var z = r * 0.02703 + g * 0.07069 + b * 0.99134;
        var srgbR = x * 3.2406 + y * -1.5372 + z * -0.4986;
        var srgbG = x * -0.9689 + y * 1.8758 + z * 0.0415;
        var srgbB = x * 0.0557 + y * -0.204 + z * 1.057;
        var gamma = function(linear) {
          if (linear <= 31308e-7) {
            return linear * 12.92;
          }
          return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
        };
        return {
          r: Math.round(Math.max(0, Math.min(255, gamma(srgbR) * 255))),
          g: Math.round(Math.max(0, Math.min(255, gamma(srgbG) * 255))),
          b: Math.round(Math.max(0, Math.min(255, gamma(srgbB) * 255)))
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/constants.js
  var require_constants = __commonJS({
    "node_modules/color-core/dist/conversions/components/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.constants = exports.D65 = exports.D50 = void 0;
      exports.D50 = {
        x: 0.96422,
        y: 1,
        z: 0.82521
      };
      exports.D65 = {
        x: 0.95047,
        y: 1,
        z: 1.08883
      };
      exports.constants = {
        refY: 1,
        refU: 0.19783000664283,
        refV: 0.46831999493879,
        kappa: 903.2962962,
        epsilonlow: 0.0088564516,
        epsilonM: 1e-6,
        epsilonhigh: 1e-10,
        m: [
          [3.240969941904521, -1.537383177570093, -0.498610760293],
          [-0.96924363628087, 1.87596750150772, 0.041555057407175],
          [0.055630079696993, -0.20397695888897, 1.056971514242878]
        ]
      };
    }
  });

  // node_modules/color-core/dist/conversions/components/xyz.js
  var require_xyz = __commonJS({
    "node_modules/color-core/dist/conversions/components/xyz.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToXyz = rgbToXyz;
      exports.xyzToRgb = xyzToRgb;
      exports.xyzD65ToD50 = xyzD65ToD50;
      exports.xyzD50ToD65 = xyzD50ToD65;
      exports.rgbToXyzD50 = rgbToXyzD50;
      exports.xyzD50ToRgb = xyzD50ToRgb;
      function rgbToXyz(rgb, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        r = r / 255;
        g = g / 255;
        b = b / 255;
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        var matrix;
        if (whitePoint === "D50") {
          matrix = [
            [0.4360747, 0.3850649, 0.1430804],
            [0.2225045, 0.7168786, 0.0606169],
            [0.0139322, 0.0971045, 0.7141733]
          ];
        } else {
          matrix = [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.072175],
            [0.0193339, 0.119192, 0.9503041]
          ];
        }
        var x = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
        var y = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
        var z = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
        return { x, y, z, whitePoint };
      }
      function xyzToRgb(xyz, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var x = xyz.x, y = xyz.y, z = xyz.z;
        var matrix;
        if (whitePoint === "D50") {
          matrix = [
            [3.1338561, -1.6168667, -0.4906146],
            [-0.9787684, 1.9161415, 0.033454],
            [0.0719453, -0.2289914, 1.4052427]
          ];
        } else {
          matrix = [
            [3.2404542, -1.5371385, -0.4985314],
            [-0.969266, 1.8760108, 0.041556],
            [0.0556434, -0.2040259, 1.0572252]
          ];
        }
        var r = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
        var g = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
        var b = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];
        r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
        g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
        b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
        return {
          r: Math.max(0, Math.min(255, Math.round(r * 255))),
          g: Math.max(0, Math.min(255, Math.round(g * 255))),
          b: Math.max(0, Math.min(255, Math.round(b * 255)))
        };
      }
      function xyzD65ToD50(xyz) {
        var matrix = [
          [1.0478112, 0.0228866, -0.050127],
          [0.0295424, 0.9904844, -0.0170491],
          [-92345e-7, 0.0150436, 0.7521316]
        ];
        var x = xyz.x, y = xyz.y, z = xyz.z;
        var xD50 = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
        var yD50 = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
        var zD50 = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];
        return { x: xD50, y: yD50, z: zD50, whitePoint: "D50" };
      }
      function xyzD50ToD65(xyz) {
        var matrix = [
          [0.9555766, -0.0230393, 0.0631636],
          [-0.0282895, 1.0099416, 0.0210077],
          [0.0122982, -0.020483, 1.3299098]
        ];
        var x = xyz.x, y = xyz.y, z = xyz.z;
        var xD65 = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
        var yD65 = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
        var zD65 = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];
        return { x: xD65, y: yD65, z: zD65, whitePoint: "D65" };
      }
      function rgbToXyzD50(rgb) {
        var xyzD65 = rgbToXyz(rgb, "D65");
        return xyzD65ToD50(xyzD65);
      }
      function xyzD50ToRgb(xyz) {
        var xyzD65 = xyzD50ToD65(xyz);
        return xyzToRgb(xyzD65, "D65");
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/cie-luv.js
  var require_cie_luv = __commonJS({
    "node_modules/color-core/dist/conversions/components/cie-luv.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToCIELuv = rgbToCIELuv;
      exports.xyzToCIELuv = xyzToCIELuv;
      exports.cieLuvToRgb = cieLuvToRgb;
      exports.cieLuvToXyz = cieLuvToXyz;
      var constants_1 = require_constants();
      var xyz_1 = require_xyz();
      function calculateUPrime(X, Y, Z) {
        var denominator = X + 15 * Y + 3 * Z;
        return denominator === 0 ? 0 : 4 * X / denominator;
      }
      function calculateVPrime(X, Y, Z) {
        var denominator = X + 15 * Y + 3 * Z;
        return denominator === 0 ? 0 : 9 * Y / denominator;
      }
      function rgbToCIELuv(rgb) {
        var xyz = (0, xyz_1.rgbToXyz)(rgb);
        return xyzToCIELuv(xyz);
      }
      function xyzToCIELuv(xyz) {
        var X = xyz.x, Y = xyz.y, Z = xyz.z;
        var yr = Y / constants_1.D65.y;
        var L = yr > constants_1.constants.epsilonlow ? 116 * Math.pow(yr, 1 / 3) - 16 : constants_1.constants.kappa * yr;
        var uPrime = calculateUPrime(X, Y, Z);
        var vPrime = calculateVPrime(X, Y, Z);
        var uPrimeR = calculateUPrime(constants_1.D65.x, constants_1.D65.y, constants_1.D65.z);
        var vPrimeR = calculateVPrime(constants_1.D65.x, constants_1.D65.y, constants_1.D65.z);
        var u = 13 * L * (uPrime - uPrimeR);
        var v = 13 * L * (vPrime - vPrimeR);
        return { L, u, v };
      }
      function cieLuvToRgb(luv) {
        var xyz = cieLuvToXyz(luv);
        return (0, xyz_1.xyzToRgb)(xyz);
      }
      function cieLuvToXyz(luv) {
        var L = luv.L, u = luv.u, v = luv.v;
        if (L === 0) {
          return { x: 0, y: 0, z: 0, whitePoint: "D65" };
        }
        var uPrimeR = calculateUPrime(constants_1.D65.x, constants_1.D65.y, constants_1.D65.z);
        var vPrimeR = calculateVPrime(constants_1.D65.x, constants_1.D65.y, constants_1.D65.z);
        var uPrime = u / (13 * L) + uPrimeR;
        var vPrime = v / (13 * L) + vPrimeR;
        var Y = L > constants_1.constants.kappa * constants_1.constants.epsilonlow ? Math.pow((L + 16) / 116, 3) : L / constants_1.constants.kappa;
        var X = Y * (9 * uPrime / (4 * vPrime));
        var Z = Y * ((12 - 3 * uPrime - 20 * vPrime) / (4 * vPrime));
        return {
          x: Math.max(0, X),
          y: Math.max(0, Y),
          z: Math.max(0, Z),
          whitePoint: "D65"
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/cie-xyy.js
  var require_cie_xyy = __commonJS({
    "node_modules/color-core/dist/conversions/components/cie-xyy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToCIExyY = rgbToCIExyY;
      exports.ciexyyToRgb = ciexyyToRgb;
      var xyz_1 = require_xyz();
      function rgbToCIExyY(rgb) {
        var xyz = (0, xyz_1.rgbToXyz)(rgb);
        return xyzToCIExyY(xyz);
      }
      function xyzToCIExyY(xyz) {
        var x = xyz.x, y = xyz.y, z = xyz.z;
        var sum = x + y + z;
        if (sum === 0) {
          return { x: 0, y: 0, Y: 0 };
        }
        return {
          x: x / sum,
          y: y / sum,
          Y: y * 100
          // Convert Y to 0-100 range
        };
      }
      function ciexyyToRgb(xyy) {
        var xyz = ciexyyToXyz(xyy);
        return (0, xyz_1.xyzToRgb)(xyz);
      }
      function ciexyyToXyz(xyy) {
        var x = xyy.x, y = xyy.y, Y = xyy.Y;
        if (y === 0) {
          return { x: 0, y: 0, z: 0, whitePoint: "D65" };
        }
        var Y_normalized = Y / 100;
        return {
          x: x * Y_normalized / y,
          y: Y_normalized,
          z: (1 - x - y) * Y_normalized / y,
          whitePoint: "D65"
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/cmyk.js
  var require_cmyk = __commonJS({
    "node_modules/color-core/dist/conversions/components/cmyk.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cmykToRgb = cmykToRgb;
      exports.rgbToCmyk = rgbToCmyk;
      function cmykToRgb(cmyk) {
        if (typeof cmyk !== "object" || cmyk === null) {
          throw new Error("Input must be an object");
        }
        var c = cmyk.c, m = cmyk.m, y = cmyk.y, k = cmyk.k;
        if (typeof c !== "number" || typeof m !== "number" || typeof y !== "number" || typeof k !== "number") {
          throw new Error("CMYK values must be numbers");
        }
        if (c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) {
          throw new Error("CMYK values must be between 0 and 100");
        }
        var r = 255 * (1 - c / 100) * (1 - k / 100);
        var g = 255 * (1 - m / 100) * (1 - k / 100);
        var b = 255 * (1 - y / 100) * (1 - k / 100);
        return {
          r: Math.round(r),
          g: Math.round(g),
          b: Math.round(b)
        };
      }
      function rgbToCmyk(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        var rRatio = r / 255;
        var gRatio = g / 255;
        var bRatio = b / 255;
        var k = 1 - Math.max(rRatio, gRatio, bRatio);
        var c = (1 - rRatio - k) / (1 - k) || 0;
        var m = (1 - gRatio - k) / (1 - k) || 0;
        var y = (1 - bRatio - k) / (1 - k) || 0;
        return {
          c: Math.round(c * 100),
          m: Math.round(m * 100),
          y: Math.round(y * 100),
          k: Math.round(k * 100)
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hex.js
  var require_hex = __commonJS({
    "node_modules/color-core/dist/conversions/components/hex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToHex = rgbToHex;
      exports.hexToRgb = hexToRgb;
      function rgbToHex(rgb, includeAlpha) {
        if (includeAlpha === void 0) {
          includeAlpha = false;
        }
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b, a = rgb.a;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        if (includeAlpha && a !== void 0 && (typeof a !== "number" || a < 0 || a > 1)) {
          throw new Error("Alpha value must be a number between 0 and 1");
        }
        var toHex = function(value) {
          return Math.round(value).toString(16).padStart(2, "0");
        };
        var hex = "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
        if (includeAlpha && a !== void 0) {
          var alphaHex = void 0;
          if (a <= 0) {
            alphaHex = "00";
          } else if (a >= 0.995) {
            alphaHex = "ff";
          } else {
            alphaHex = toHex(Math.round(a * 255));
          }
          hex += alphaHex;
        }
        return hex;
      }
      function hexToRgb(hex) {
        if (typeof hex !== "string") {
          throw new Error("Input must be a string");
        }
        var trimmedHex = hex.replace("#", "").trim();
        if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(trimmedHex)) {
          throw new Error("Invalid hex color format");
        }
        var expandedHex;
        if (trimmedHex.length === 3) {
          expandedHex = trimmedHex.split("").map(function(char) {
            return char + char;
          }).join("");
        } else {
          expandedHex = trimmedHex;
        }
        var r = parseInt(expandedHex.slice(0, 2), 16);
        var g = parseInt(expandedHex.slice(2, 4), 16);
        var b = parseInt(expandedHex.slice(4, 6), 16);
        var rgb = { r, g, b };
        if (expandedHex.length === 8) {
          var a = parseInt(expandedHex.slice(6, 8), 16) / 255;
          rgb.a = parseFloat(a.toFixed(3));
        }
        return rgb;
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/helpers.js
  var require_helpers = __commonJS({
    "node_modules/color-core/dist/conversions/components/helpers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.lToY = lToY;
      exports.yToL = yToL;
      exports.distanceFromOrigin = distanceFromOrigin;
      exports.distanceFromOriginAngle = distanceFromOriginAngle;
      exports.calcMaxChromaHsluv = calcMaxChromaHsluv;
      exports.calcMaxChromaHpluv = calcMaxChromaHpluv;
      exports.calculateBoundingLines = calculateBoundingLines;
      exports.luvToLch = luvToLch;
      exports.xyzToLuv = xyzToLuv;
      exports.lchToLuv = lchToLuv;
      exports.luvToXyz = luvToXyz;
      var constants_1 = require_constants();
      function lToY(l) {
        if (l <= 8) {
          return constants_1.constants.refY * l / constants_1.constants.kappa;
        }
        return constants_1.constants.refY * Math.pow((l + 16) / 116, 3);
      }
      function yToL(y) {
        if (y <= constants_1.constants.epsilonlow) {
          return y * constants_1.constants.kappa / constants_1.constants.refY;
        }
        return 116 * Math.pow(y / constants_1.constants.refY, 1 / 3) - 16;
      }
      function distanceFromOrigin(slope, intercept) {
        return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
      }
      function distanceFromOriginAngle(slope, intercept, angle) {
        var denominator = Math.sin(angle) - slope * Math.cos(angle);
        if (denominator === 0) {
          return Infinity;
        }
        var d = intercept / denominator;
        return d < 0 ? Infinity : d;
      }
      function calcMaxChromaHsluv(l, h) {
        var hueRad = h / 360 * Math.PI * 2;
        var lines = calculateBoundingLines(l);
        var distances = lines.map(function(line) {
          return distanceFromOriginAngle(line[0], line[1], hueRad);
        });
        return Math.min.apply(Math, distances);
      }
      function calcMaxChromaHpluv(lines) {
        var r0 = distanceFromOrigin(lines[0][0], lines[0][1]);
        var r1 = distanceFromOrigin(lines[1][0], lines[1][1]);
        var g0 = distanceFromOrigin(lines[2][0], lines[2][1]);
        var g1 = distanceFromOrigin(lines[3][0], lines[3][1]);
        var b0 = distanceFromOrigin(lines[4][0], lines[4][1]);
        var b1 = distanceFromOrigin(lines[5][0], lines[5][1]);
        return Math.min(r0, r1, g0, g1, b0, b1);
      }
      function calculateBoundingLines(l) {
        var sub1 = Math.pow(l + 16, 3) / 1560896;
        var sub2 = sub1 > constants_1.constants.epsilonlow ? sub1 : l / constants_1.constants.kappa;
        var lines = [];
        for (var i = 0; i < 3; i++) {
          var m1 = constants_1.constants.m[i][0];
          var m2 = constants_1.constants.m[i][1];
          var m3 = constants_1.constants.m[i][2];
          var s1 = sub2 * (284517 * m1 - 94839 * m3);
          var s2 = sub2 * (838422 * m3 + 769860 * m2 + 731718 * m1);
          var s3 = sub2 * (632260 * m3 - 126452 * m2);
          var s0 = s1 / s3;
          var s1_1 = s1 / (s3 + 126452);
          lines.push([s0, s2 * l / s3]);
          lines.push([s1_1, (s2 - 769860) * l / (s3 + 126452)]);
        }
        return lines;
      }
      function luvToLch(luv) {
        var c = Math.sqrt(luv.u * luv.u + luv.v * luv.v);
        var h;
        if (c < 1e-8) {
          h = 0;
        } else {
          h = Math.atan2(luv.v, luv.u) * 180 / Math.PI;
          if (h < 0) {
            h = 360 + h;
          }
        }
        return { l: luv.L, c, h };
      }
      function xyzToLuv(xyz) {
        var divider = xyz.x + 15 * xyz.y + 3 * xyz.z;
        var varU = 4 * xyz.x;
        var varV = 9 * xyz.y;
        if (divider !== 0) {
          varU /= divider;
          varV /= divider;
        } else {
          varU = NaN;
          varV = NaN;
        }
        var l = yToL(xyz.y);
        if (l === 0) {
          return { L: 0, u: 0, v: 0 };
        }
        var u = 13 * l * (varU - constants_1.constants.refU);
        var v = 13 * l * (varV - constants_1.constants.refV);
        return { L: l, u, v };
      }
      function lchToLuv(lch) {
        var hrad = lch.h / 180 * Math.PI;
        return {
          L: lch.l,
          u: Math.cos(hrad) * lch.c,
          v: Math.sin(hrad) * lch.c
        };
      }
      function luvToXyz(luv) {
        if (luv.L === 0) {
          return { x: 0, y: 0, z: 0 };
        }
        var varU = luv.u / (13 * luv.L) + constants_1.constants.refU;
        var varV = luv.v / (13 * luv.L) + constants_1.constants.refV;
        var y = lToY(luv.L);
        var x = 0 - 9 * y * varU / ((varU - 4) * varV - varU * varV);
        var z = (9 * y - 15 * varV * y - varV * x) / (3 * varV);
        return { x, y, z };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hpluv.js
  var require_hpluv = __commonJS({
    "node_modules/color-core/dist/conversions/components/hpluv.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hpluvToRgb = hpluvToRgb;
      exports.rgbToHPLuv = rgbToHPLuv;
      exports.hpluvToLch = hpluvToLch;
      exports.lchToHpluv = lchToHpluv;
      var helpers_1 = require_helpers();
      var xyz_1 = require_xyz();
      function roundAndClampRgb(value) {
        return Math.max(0, Math.min(255, Math.round(value)));
      }
      function hpluvToRgb(hpluv) {
        if (hpluv.l === 0)
          return { r: 0, g: 0, b: 0 };
        if (hpluv.l === 100)
          return { r: 255, g: 255, b: 255 };
        var lch = hpluvToLch(hpluv);
        var luv = (0, helpers_1.lchToLuv)(lch);
        var xyz = (0, helpers_1.luvToXyz)(luv);
        var rgb = (0, xyz_1.xyzToRgb)(xyz);
        return {
          r: roundAndClampRgb(rgb.r),
          g: roundAndClampRgb(rgb.g),
          b: roundAndClampRgb(rgb.b)
        };
      }
      function rgbToHPLuv(rgb) {
        if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0)
          return { h: 0, p: 0, l: 0 };
        if (rgb.r === 255 && rgb.g === 255 && rgb.b === 255)
          return { h: 0, p: 0, l: 100 };
        var xyz = (0, xyz_1.rgbToXyz)(rgb);
        var luv = (0, helpers_1.xyzToLuv)(xyz);
        var lch = (0, helpers_1.luvToLch)(luv);
        return lchToHpluv(lch);
      }
      function hpluvToLch(hpluv) {
        if (hpluv.l > 99.9999999) {
          return { l: 100, c: 0, h: hpluv.h };
        }
        if (hpluv.l < 1e-8) {
          return { l: 0, c: 0, h: hpluv.h };
        }
        var l = hpluv.l;
        var lines = (0, helpers_1.calculateBoundingLines)(l);
        var max = (0, helpers_1.calcMaxChromaHpluv)(lines);
        var c = max / 100 * hpluv.p;
        return { l, c, h: hpluv.h };
      }
      function lchToHpluv(lch) {
        if (lch.l > 99.9999999) {
          return { h: lch.h, p: 0, l: 100 };
        }
        if (lch.l < 1e-8) {
          return { h: lch.h, p: 0, l: 0 };
        }
        var lines = (0, helpers_1.calculateBoundingLines)(lch.l);
        var max = (0, helpers_1.calcMaxChromaHpluv)(lines);
        var p = lch.c / max * 100;
        return { h: lch.h, p, l: lch.l };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hsi.js
  var require_hsi = __commonJS({
    "node_modules/color-core/dist/conversions/components/hsi.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hsiToRgb = hsiToRgb;
      exports.rgbToHsi = rgbToHsi;
      function hsiToRgb(hsi) {
        var _a, _b, _c, _d, _e, _f;
        var h = hsi.h;
        var s = hsi.s / 100;
        var i = hsi.i / 100;
        var hPrime = h / 60;
        var z = 1 - Math.abs(hPrime % 2 - 1);
        var chroma = 3 * i * s / (1 + z);
        var x = chroma * z;
        var r = 0, g = 0, b = 0;
        if (hPrime >= 0 && hPrime < 1) {
          _a = [chroma, x, 0], r = _a[0], g = _a[1], b = _a[2];
        } else if (hPrime >= 1 && hPrime < 2) {
          _b = [x, chroma, 0], r = _b[0], g = _b[1], b = _b[2];
        } else if (hPrime >= 2 && hPrime < 3) {
          _c = [0, chroma, x], r = _c[0], g = _c[1], b = _c[2];
        } else if (hPrime >= 3 && hPrime < 4) {
          _d = [0, x, chroma], r = _d[0], g = _d[1], b = _d[2];
        } else if (hPrime >= 4 && hPrime < 5) {
          _e = [x, 0, chroma], r = _e[0], g = _e[1], b = _e[2];
        } else if (hPrime >= 5 && hPrime < 6) {
          _f = [chroma, 0, x], r = _f[0], g = _f[1], b = _f[2];
        }
        var m = i * (1 - s);
        return {
          r: Math.round((r + m) * 255),
          g: Math.round((g + m) * 255),
          b: Math.round((b + m) * 255)
        };
      }
      function rgbToHsi(rgb) {
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        var i = (r + g + b) / 3;
        var s = i > 0 ? 1 - Math.min(r, g, b) / i : 0;
        var h = 0;
        if (s !== 0) {
          var numerator = 0.5 * (r - g + (r - b));
          var denominator = Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
          h = Math.acos(numerator / denominator);
          if (b > g) {
            h = 2 * Math.PI - h;
          }
          h *= 180 / Math.PI;
        }
        return { h, s: s * 100, i: i * 100 };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hsl.js
  var require_hsl = __commonJS({
    "node_modules/color-core/dist/conversions/components/hsl.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hslToRgb = hslToRgb;
      exports.rgbToHsl = rgbToHsl;
      function hslToRgb(hsl) {
        if (typeof hsl !== "object" || hsl === null) {
          throw new Error("Input must be an object");
        }
        var h = hsl.h, s = hsl.s, l = hsl.l;
        if (typeof h !== "number" || typeof s !== "number" || typeof l !== "number") {
          throw new Error("HSL values must be numbers");
        }
        if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
          throw new Error("Invalid HSL values: h must be [0, 360], s and l must be [0, 100]");
        }
        var hue = h / 360;
        var saturation = s / 100;
        var lightness = l / 100;
        var hue2rgb = function(p2, q2, t) {
          if (t < 0)
            t += 1;
          if (t > 1)
            t -= 1;
          if (t < 1 / 6)
            return p2 + (q2 - p2) * 6 * t;
          if (t < 1 / 2)
            return q2;
          if (t < 2 / 3)
            return p2 + (q2 - p2) * (2 / 3 - t) * 6;
          return p2;
        };
        var r, g, b;
        if (saturation === 0) {
          r = g = b = lightness;
        } else {
          var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
          var p = 2 * lightness - q;
          r = hue2rgb(p, q, hue + 1 / 3);
          g = hue2rgb(p, q, hue);
          b = hue2rgb(p, q, hue - 1 / 3);
        }
        return {
          r: Math.round(r * 255 + 1e-3),
          // Nudge the rounding
          g: Math.round(g * 255 + 1e-3),
          b: Math.round(b * 255 + 1e-3)
        };
      }
      function rgbToHsl(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0, s, l = (max + min) / 2;
        if (max === min) {
          h = s = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hsluv.js
  var require_hsluv = __commonJS({
    "node_modules/color-core/dist/conversions/components/hsluv.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hsluvToRgb = hsluvToRgb;
      exports.rgbToHSLuv = rgbToHSLuv;
      exports.hsluvToLch = hsluvToLch;
      exports.lchToHsluv = lchToHsluv;
      var helpers_1 = require_helpers();
      var xyz_1 = require_xyz();
      function roundAndClampRgb(value) {
        return Math.max(0, Math.min(255, Math.round(value)));
      }
      function hsluvToRgb(hsluv) {
        if (hsluv.l === 0)
          return { r: 0, g: 0, b: 0 };
        if (hsluv.l === 100)
          return { r: 255, g: 255, b: 255 };
        var lch = hsluvToLch(hsluv);
        var luv = (0, helpers_1.lchToLuv)(lch);
        var xyz = (0, helpers_1.luvToXyz)(luv);
        var rgb = (0, xyz_1.xyzToRgb)(xyz);
        return {
          r: roundAndClampRgb(rgb.r),
          g: roundAndClampRgb(rgb.g),
          b: roundAndClampRgb(rgb.b)
        };
      }
      function rgbToHSLuv(rgb) {
        if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0)
          return { h: 0, s: 0, l: 0 };
        if (rgb.r === 255 && rgb.g === 255 && rgb.b === 255)
          return { h: 0, s: 0, l: 100 };
        var xyz = (0, xyz_1.rgbToXyz)(rgb);
        var luv = (0, helpers_1.xyzToLuv)(xyz);
        var lch = (0, helpers_1.luvToLch)(luv);
        return lchToHsluv(lch);
      }
      function hsluvToLch(hsluv) {
        if (hsluv.l > 99.9999999) {
          return { l: 100, c: 0, h: hsluv.h };
        }
        if (hsluv.l < 1e-8) {
          return { l: 0, c: 0, h: hsluv.h };
        }
        var l = hsluv.l;
        var max = (0, helpers_1.calcMaxChromaHsluv)(l, hsluv.h);
        var c = max / 100 * hsluv.s;
        return { l, c, h: hsluv.h };
      }
      function lchToHsluv(lch) {
        if (lch.l > 99.9999999) {
          return { h: lch.h, s: 0, l: 100 };
        }
        if (lch.l < 1e-8) {
          return { h: lch.h, s: 0, l: 0 };
        }
        var max = (0, helpers_1.calcMaxChromaHsluv)(lch.l, lch.h);
        var s = lch.c / max * 100;
        return { h: lch.h, s: Math.min(s, 100), l: lch.l };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hsv.js
  var require_hsv = __commonJS({
    "node_modules/color-core/dist/conversions/components/hsv.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hsvToRgb = hsvToRgb;
      exports.rgbToHsv = rgbToHsv;
      function hsvToRgb(hsv) {
        if (typeof hsv !== "object" || hsv === null) {
          throw new Error("Input must be an object");
        }
        var h = hsv.h, s = hsv.s, v = hsv.v;
        if (typeof h !== "number" || typeof s !== "number" || typeof v !== "number") {
          throw new Error("HSV values must be numbers");
        }
        if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
          throw new Error("Invalid HSV values: h must be [0, 360], s and v must be [0, 100]");
        }
        s /= 100;
        v /= 100;
        h /= 60;
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));
        var r = 0, g = 0, b = 0;
        switch (i % 6) {
          case 0:
            r = v, g = t, b = p;
            break;
          case 1:
            r = q, g = v, b = p;
            break;
          case 2:
            r = p, g = v, b = t;
            break;
          case 3:
            r = p, g = q, b = v;
            break;
          case 4:
            r = t, g = p, b = v;
            break;
          case 5:
            r = v, g = p, b = q;
            break;
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      }
      function rgbToHsv(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var d = max - min;
        var h = 0;
        var s = max === 0 ? 0 : d / max;
        var v = max;
        if (max !== min) {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          v: Math.round(v * 100)
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/hwb.js
  var require_hwb = __commonJS({
    "node_modules/color-core/dist/conversions/components/hwb.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hwbToRgb = hwbToRgb;
      exports.rgbToHwb = rgbToHwb;
      var hsv_1 = require_hsv();
      function hwbToRgb(hwb) {
        var h = hwb.h, w = hwb.w, b = hwb.b;
        if (w + b >= 100) {
          var gray = Math.round(w / (w + b) * 255);
          return { r: gray, g: gray, b: gray };
        }
        var s = 100 - w / (100 - b) * 100;
        var v = 100 - b;
        return (0, hsv_1.hsvToRgb)({ h, s, v });
      }
      function rgbToHwb(rgb) {
        var hsv = (0, hsv_1.rgbToHsv)(rgb);
        var w = (1 - hsv.s / 100) * hsv.v / 100 * 100;
        var b = 100 - hsv.v;
        return { h: hsv.h, w, b };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/lab.js
  var require_lab = __commonJS({
    "node_modules/color-core/dist/conversions/components/lab.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.xyzToLab = xyzToLab;
      exports.labToXyz = labToXyz;
      exports.rgbToLab = rgbToLab;
      exports.labToRgb = labToRgb;
      exports.rgbToLabD50 = rgbToLabD50;
      exports.labD50ToRgb = labD50ToRgb;
      var constants_1 = require_constants();
      var xyz_1 = require_xyz();
      var epsilon = 216 / 24389;
      var kappa = 24389 / 27;
      function xyzToLab(xyz, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var wp = whitePoint === "D50" ? constants_1.D50 : constants_1.D65;
        var x = xyz.x, y = xyz.y, z = xyz.z;
        var xr = x / wp.x;
        var yr = y / wp.y;
        var zr = z / wp.z;
        var fx = xr > epsilon ? Math.cbrt(xr) : (kappa * xr + 16) / 116;
        var fy = yr > epsilon ? Math.cbrt(yr) : (kappa * yr + 16) / 116;
        var fz = zr > epsilon ? Math.cbrt(zr) : (kappa * zr + 16) / 116;
        var L = 116 * fy - 16;
        var a = 500 * (fx - fy);
        var b = 200 * (fy - fz);
        return { l: L, a, b };
      }
      function labToXyz(lab, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var wp = whitePoint === "D50" ? constants_1.D50 : constants_1.D65;
        var L = lab.l, a = lab.a, b = lab.b;
        var fy = (L + 16) / 116;
        var fx = a / 500 + fy;
        var fz = fy - b / 200;
        var xr = Math.pow(fx, 3) > epsilon ? Math.pow(fx, 3) : (116 * fx - 16) / kappa;
        var yr = L > kappa * epsilon ? Math.pow((L + 16) / 116, 3) : L / kappa;
        var zr = Math.pow(fz, 3) > epsilon ? Math.pow(fz, 3) : (116 * fz - 16) / kappa;
        return {
          x: xr * wp.x,
          y: yr * wp.y,
          z: zr * wp.z,
          whitePoint
        };
      }
      function rgbToLab(rgb, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var xyz = (0, xyz_1.rgbToXyz)(rgb, whitePoint);
        return xyzToLab(xyz, whitePoint);
      }
      function labToRgb(lab, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var xyz = labToXyz(lab, whitePoint);
        return (0, xyz_1.xyzToRgb)(xyz, whitePoint);
      }
      function rgbToLabD50(rgb) {
        var xyzD50 = (0, xyz_1.rgbToXyzD50)(rgb);
        return xyzToLab(xyzD50, "D50");
      }
      function labD50ToRgb(lab) {
        var xyzD50 = labToXyz(lab, "D50");
        return (0, xyz_1.xyzToRgb)(xyzD50, "D50");
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/lch.js
  var require_lch = __commonJS({
    "node_modules/color-core/dist/conversions/components/lch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.labToLch = labToLch;
      exports.lchToLab = lchToLab;
      exports.xyzToLch = xyzToLch;
      exports.lchToXyz = lchToXyz;
      exports.rgbToLch = rgbToLch;
      exports.lchToRgb = lchToRgb;
      var constants_1 = require_constants();
      var lab_1 = require_lab();
      var xyz_1 = require_xyz();
      function labToLch(lab) {
        var l = lab.l, a = lab.a, b = lab.b;
        var c = Math.sqrt(a * a + b * b);
        var h = Math.atan2(b, a) * (180 / Math.PI);
        if (h < 0) {
          h += 360;
        }
        if (c < constants_1.constants.epsilonhigh) {
          h = 0;
        }
        return { l, c, h };
      }
      function lchToLab(lch) {
        var l = lch.l, c = lch.c, h = lch.h;
        var hRadians = h * (Math.PI / 180);
        return {
          l,
          a: c * Math.cos(hRadians),
          b: c * Math.sin(hRadians)
        };
      }
      function xyzToLch(xyz, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var lab = (0, lab_1.xyzToLab)(xyz, whitePoint);
        return labToLch(lab);
      }
      function lchToXyz(lch, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var lab = lchToLab(lch);
        return (0, lab_1.labToXyz)(lab, whitePoint);
      }
      function rgbToLch(rgb, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var EPSILON = 1e-4;
        if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) {
          return { l: 0, c: 0, h: 0 };
        }
        var xyz = (0, xyz_1.rgbToXyz)(rgb, whitePoint);
        var lab = (0, lab_1.xyzToLab)(xyz, whitePoint);
        var l = lab.l, a = lab.a, b = lab.b;
        var c = Math.sqrt(a * a + b * b);
        var h = Math.atan2(b, a) * (180 / Math.PI);
        if (h < 0) {
          h += 360;
        }
        if (Math.abs(l - 100) < EPSILON) {
          h = 0;
        }
        if (c < EPSILON) {
          c = 0;
          h = 0;
        }
        l = Math.max(0, Math.min(100, l));
        return { l, c, h };
      }
      function lchToRgb(lch, whitePoint) {
        if (whitePoint === void 0) {
          whitePoint = "D65";
        }
        var l = lch.l, c = lch.c, h = lch.h;
        l = Math.max(0, Math.min(100, l));
        if (l === 0) {
          return { r: 0, g: 0, b: 0 };
        }
        if (Math.abs(l - 100) < constants_1.constants.epsilonM && c < constants_1.constants.epsilonM) {
          return { r: 255, g: 255, b: 255 };
        }
        c = Math.max(0, c);
        h = (h % 360 + 360) % 360;
        var hRadians = h * (Math.PI / 180);
        var a = c * Math.cos(hRadians);
        var b = c * Math.sin(hRadians);
        var lab = { l, a, b };
        var xyz = (0, lab_1.labToXyz)(lab, whitePoint);
        var rgb = (0, xyz_1.xyzToRgb)(xyz, whitePoint);
        return {
          r: Math.round(Math.max(0, Math.min(255, rgb.r))),
          g: Math.round(Math.max(0, Math.min(255, rgb.g))),
          b: Math.round(Math.max(0, Math.min(255, rgb.b)))
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/linear-srgb-srgb.js
  var require_linear_srgb_srgb = __commonJS({
    "node_modules/color-core/dist/conversions/components/linear-srgb-srgb.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.linearSrgbToSrgb = linearSrgbToSrgb;
      exports.srgbToLinearSrgb = srgbToLinearSrgb;
      function linearSrgbToSrgb(x) {
        var normalized = x <= 31308e-7 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
        return Math.round(Math.max(0, Math.min(255, normalized * 255)));
      }
      function srgbToLinearSrgb(x) {
        if (x < 0 || x > 255) {
          throw new Error("sRGB value must be between 0 and 255");
        }
        var normalized = x / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/oklab-linear-srgb.js
  var require_oklab_linear_srgb = __commonJS({
    "node_modules/color-core/dist/conversions/components/oklab-linear-srgb.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.oklabToLinearSrgb = oklabToLinearSrgb;
      exports.linearSrgbToOklab = linearSrgbToOklab;
      function oklabToLinearSrgb(L, a, b) {
        var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        var s_ = L - 0.0894841775 * a - 1.291485548 * b;
        var l = l_ * l_ * l_;
        var m = m_ * m_ * m_;
        var s = s_ * s_ * s_;
        return [
          4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
        ];
      }
      function linearSrgbToOklab(r, g, b) {
        var l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
        var m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
        var s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
        var l_ = Math.cbrt(l);
        var m_ = Math.cbrt(m);
        var s_ = Math.cbrt(s);
        return {
          L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
          a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
          b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/oklab.js
  var require_oklab = __commonJS({
    "node_modules/color-core/dist/conversions/components/oklab.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.oklabToRgb = oklabToRgb;
      exports.rgbToOklab = rgbToOklab;
      var linear_srgb_srgb_1 = require_linear_srgb_srgb();
      var oklab_linear_srgb_1 = require_oklab_linear_srgb();
      function oklabToRgb(oklab) {
        if (typeof oklab !== "object" || oklab === null) {
          throw new Error("Input must be an object");
        }
        var L = oklab.L, a = oklab.a, b = oklab.b;
        if (typeof L !== "number" || typeof a !== "number" || typeof b !== "number") {
          throw new Error("Oklab values must be numbers");
        }
        var _a = (0, oklab_linear_srgb_1.oklabToLinearSrgb)(L, a, b), r_linear = _a[0], g_linear = _a[1], b_linear = _a[2];
        return {
          r: (0, linear_srgb_srgb_1.linearSrgbToSrgb)(r_linear),
          g: (0, linear_srgb_srgb_1.linearSrgbToSrgb)(g_linear),
          b: (0, linear_srgb_srgb_1.linearSrgbToSrgb)(b_linear)
        };
      }
      function rgbToOklab(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        var r_linear = (0, linear_srgb_srgb_1.srgbToLinearSrgb)(r);
        var g_linear = (0, linear_srgb_srgb_1.srgbToLinearSrgb)(g);
        var b_linear = (0, linear_srgb_srgb_1.srgbToLinearSrgb)(b);
        return (0, oklab_linear_srgb_1.linearSrgbToOklab)(r_linear, g_linear, b_linear);
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/oklch.js
  var require_oklch = __commonJS({
    "node_modules/color-core/dist/conversions/components/oklch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToOklch = rgbToOklch;
      exports.rgbToRawOklch = rgbToRawOklch;
      exports.oklchToRgb = oklchToRgb;
      var oklab_1 = require_oklab();
      function rgbToOklch(rgb) {
        var oklab = (0, oklab_1.rgbToOklab)(rgb);
        var L = oklab.L, a = oklab.a, b = oklab.b;
        var C = Math.sqrt(a * a + b * b);
        var h = Math.atan2(b, a) * 180 / Math.PI;
        h = (h % 360 + 360) % 360;
        if (C < 1e-6) {
          h = 0;
        }
        return {
          L: Number((L * 100).toFixed(2)),
          C: Number((C * 100).toFixed(4)),
          h: Number(h.toFixed(2))
        };
      }
      function rgbToRawOklch(rgb) {
        var oklab = (0, oklab_1.rgbToOklab)(rgb);
        var L = oklab.L, a = oklab.a, b = oklab.b;
        var C = Math.sqrt(a * a + b * b);
        var h = Math.atan2(b, a) * 180 / Math.PI;
        h = (h % 360 + 360) % 360;
        if (C < 1e-6) {
          h = 0;
        }
        return { L, C, h };
      }
      function oklchToRgb(oklch) {
        if (typeof oklch !== "object" || oklch === null) {
          throw new Error("Input must be an object");
        }
        var L = oklch.L, C = oklch.C, h = oklch.h;
        if (typeof L !== "number" || typeof C !== "number" || typeof h !== "number") {
          throw new Error("Oklch values must be numbers");
        }
        var rawL = L / 100;
        var rawC = C / 100;
        var normalizedH = (h % 360 + 360) % 360;
        var hRadians = normalizedH * Math.PI / 180;
        var a = rawC * Math.cos(hRadians);
        var b = rawC * Math.sin(hRadians);
        var oklab = { L: rawL, a, b };
        return (0, oklab_1.oklabToRgb)(oklab);
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/srgb.js
  var require_srgb = __commonJS({
    "node_modules/color-core/dist/conversions/components/srgb.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rgbToSrgb = rgbToSrgb;
      exports.srgbToRgb = srgbToRgb;
      function rgbToSrgb(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        var rNorm = r / 255;
        var gNorm = g / 255;
        var bNorm = b / 255;
        var gammaCorrect = function(c) {
          return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return {
          sr: gammaCorrect(rNorm),
          sg: gammaCorrect(gNorm),
          sb: gammaCorrect(bNorm)
        };
      }
      function srgbToRgb(srgb) {
        if (typeof srgb !== "object" || srgb === null) {
          throw new Error("Input must be an object");
        }
        var sr = srgb.sr, sg = srgb.sg, sb = srgb.sb;
        if (typeof sr !== "number" || typeof sg !== "number" || typeof sb !== "number") {
          throw new Error("sRGB values must be numbers");
        }
        if (sr < 0 || sr > 1 || sg < 0 || sg > 1 || sb < 0 || sb > 1) {
          throw new Error("sRGB values must be between 0 and 1");
        }
        var inverseGammaCorrect = function(c) {
          return c <= 31308e-7 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
        };
        return {
          r: Math.round(inverseGammaCorrect(sr) * 255),
          g: Math.round(inverseGammaCorrect(sg) * 255),
          b: Math.round(inverseGammaCorrect(sb) * 255)
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/components/yuv.js
  var require_yuv = __commonJS({
    "node_modules/color-core/dist/conversions/components/yuv.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.yuvToRgb = yuvToRgb;
      exports.rgbToYuv = rgbToYuv;
      function yuvToRgb(yuv) {
        if (typeof yuv !== "object" || yuv === null) {
          throw new Error("Input must be an object");
        }
        var y = yuv.y, u = yuv.u, v = yuv.v;
        if (typeof y !== "number" || typeof u !== "number" || typeof v !== "number") {
          throw new Error("YUV values must be numbers");
        }
        y = Math.max(-128, Math.min(255.5, y));
        u = Math.max(-128, Math.min(255.5, u));
        v = Math.max(-128, Math.min(255.5, v));
        var r = y + 1.4075 * (v - 128);
        var g = y - 0.3455 * (u - 128) - 0.7169 * (v - 128);
        var b = y + 1.779 * (u - 128);
        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));
        return { r, g, b };
      }
      function rgbToYuv(rgb) {
        if (typeof rgb !== "object" || rgb === null) {
          throw new Error("Input must be an object");
        }
        var r = rgb.r, g = rgb.g, b = rgb.b;
        if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
          throw new Error("RGB values must be numbers");
        }
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new Error("RGB values must be between 0 and 255");
        }
        var y = r * 0.299 + g * 0.587 + b * 0.114;
        var u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
        var v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;
        return {
          y: Math.round(y * 100) / 100,
          u: Math.round(u * 100) / 100,
          v: Math.round(v * 100) / 100
        };
      }
    }
  });

  // node_modules/color-core/dist/conversions/index.js
  var require_conversions = __commonJS({
    "node_modules/color-core/dist/conversions/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.yuvToRgb = exports.rgbToYuv = exports.xyzToRgb = exports.xyzD65ToD50 = exports.xyzD50ToRgb = exports.xyzD50ToD65 = exports.rgbToXyzD50 = exports.rgbToXyz = exports.srgbToRgb = exports.rgbToSrgb = exports.rgbToRawOklch = exports.rgbToOklch = exports.oklchToRgb = exports.oklabToLinearSrgb = exports.linearSrgbToOklab = exports.rgbToOklab = exports.oklabToRgb = exports.srgbToLinearSrgb = exports.linearSrgbToSrgb = exports.rgbToLch = exports.lchToRgb = exports.rgbToLabD50 = exports.rgbToLab = exports.labToRgb = exports.labD50ToRgb = exports.rgbToHwb = exports.hwbToRgb = exports.rgbToHsv = exports.hsvToRgb = exports.rgbToHSLuv = exports.hsluvToRgb = exports.rgbToHsl = exports.hslToRgb = exports.rgbToHsi = exports.hsiToRgb = exports.rgbToHPLuv = exports.hpluvToRgb = exports.rgbToHex = exports.hexToRgb = exports.rgbToCmyk = exports.cmykToRgb = exports.rgbToCIExyY = exports.ciexyyToRgb = exports.rgbToCIELuv = exports.cieLuvToRgb = exports.rgbToAdobeRGB = exports.adobeRGBToRGB = void 0;
      var adobe_rgb_1 = require_adobe_rgb();
      Object.defineProperty(exports, "adobeRGBToRGB", { enumerable: true, get: function() {
        return adobe_rgb_1.adobeRGBToRGB;
      } });
      Object.defineProperty(exports, "rgbToAdobeRGB", { enumerable: true, get: function() {
        return adobe_rgb_1.rgbToAdobeRGB;
      } });
      var cie_luv_1 = require_cie_luv();
      Object.defineProperty(exports, "cieLuvToRgb", { enumerable: true, get: function() {
        return cie_luv_1.cieLuvToRgb;
      } });
      Object.defineProperty(exports, "rgbToCIELuv", { enumerable: true, get: function() {
        return cie_luv_1.rgbToCIELuv;
      } });
      var cie_xyy_1 = require_cie_xyy();
      Object.defineProperty(exports, "ciexyyToRgb", { enumerable: true, get: function() {
        return cie_xyy_1.ciexyyToRgb;
      } });
      Object.defineProperty(exports, "rgbToCIExyY", { enumerable: true, get: function() {
        return cie_xyy_1.rgbToCIExyY;
      } });
      var cmyk_1 = require_cmyk();
      Object.defineProperty(exports, "cmykToRgb", { enumerable: true, get: function() {
        return cmyk_1.cmykToRgb;
      } });
      Object.defineProperty(exports, "rgbToCmyk", { enumerable: true, get: function() {
        return cmyk_1.rgbToCmyk;
      } });
      var hex_1 = require_hex();
      Object.defineProperty(exports, "hexToRgb", { enumerable: true, get: function() {
        return hex_1.hexToRgb;
      } });
      Object.defineProperty(exports, "rgbToHex", { enumerable: true, get: function() {
        return hex_1.rgbToHex;
      } });
      var hpluv_1 = require_hpluv();
      Object.defineProperty(exports, "hpluvToRgb", { enumerable: true, get: function() {
        return hpluv_1.hpluvToRgb;
      } });
      Object.defineProperty(exports, "rgbToHPLuv", { enumerable: true, get: function() {
        return hpluv_1.rgbToHPLuv;
      } });
      var hsi_1 = require_hsi();
      Object.defineProperty(exports, "hsiToRgb", { enumerable: true, get: function() {
        return hsi_1.hsiToRgb;
      } });
      Object.defineProperty(exports, "rgbToHsi", { enumerable: true, get: function() {
        return hsi_1.rgbToHsi;
      } });
      var hsl_1 = require_hsl();
      Object.defineProperty(exports, "hslToRgb", { enumerable: true, get: function() {
        return hsl_1.hslToRgb;
      } });
      Object.defineProperty(exports, "rgbToHsl", { enumerable: true, get: function() {
        return hsl_1.rgbToHsl;
      } });
      var hsluv_1 = require_hsluv();
      Object.defineProperty(exports, "hsluvToRgb", { enumerable: true, get: function() {
        return hsluv_1.hsluvToRgb;
      } });
      Object.defineProperty(exports, "rgbToHSLuv", { enumerable: true, get: function() {
        return hsluv_1.rgbToHSLuv;
      } });
      var hsv_1 = require_hsv();
      Object.defineProperty(exports, "hsvToRgb", { enumerable: true, get: function() {
        return hsv_1.hsvToRgb;
      } });
      Object.defineProperty(exports, "rgbToHsv", { enumerable: true, get: function() {
        return hsv_1.rgbToHsv;
      } });
      var hwb_1 = require_hwb();
      Object.defineProperty(exports, "hwbToRgb", { enumerable: true, get: function() {
        return hwb_1.hwbToRgb;
      } });
      Object.defineProperty(exports, "rgbToHwb", { enumerable: true, get: function() {
        return hwb_1.rgbToHwb;
      } });
      var lab_1 = require_lab();
      Object.defineProperty(exports, "labD50ToRgb", { enumerable: true, get: function() {
        return lab_1.labD50ToRgb;
      } });
      Object.defineProperty(exports, "labToRgb", { enumerable: true, get: function() {
        return lab_1.labToRgb;
      } });
      Object.defineProperty(exports, "rgbToLab", { enumerable: true, get: function() {
        return lab_1.rgbToLab;
      } });
      Object.defineProperty(exports, "rgbToLabD50", { enumerable: true, get: function() {
        return lab_1.rgbToLabD50;
      } });
      var lch_1 = require_lch();
      Object.defineProperty(exports, "lchToRgb", { enumerable: true, get: function() {
        return lch_1.lchToRgb;
      } });
      Object.defineProperty(exports, "rgbToLch", { enumerable: true, get: function() {
        return lch_1.rgbToLch;
      } });
      var linear_srgb_srgb_1 = require_linear_srgb_srgb();
      Object.defineProperty(exports, "linearSrgbToSrgb", { enumerable: true, get: function() {
        return linear_srgb_srgb_1.linearSrgbToSrgb;
      } });
      Object.defineProperty(exports, "srgbToLinearSrgb", { enumerable: true, get: function() {
        return linear_srgb_srgb_1.srgbToLinearSrgb;
      } });
      var oklab_1 = require_oklab();
      Object.defineProperty(exports, "oklabToRgb", { enumerable: true, get: function() {
        return oklab_1.oklabToRgb;
      } });
      Object.defineProperty(exports, "rgbToOklab", { enumerable: true, get: function() {
        return oklab_1.rgbToOklab;
      } });
      var oklab_linear_srgb_1 = require_oklab_linear_srgb();
      Object.defineProperty(exports, "linearSrgbToOklab", { enumerable: true, get: function() {
        return oklab_linear_srgb_1.linearSrgbToOklab;
      } });
      Object.defineProperty(exports, "oklabToLinearSrgb", { enumerable: true, get: function() {
        return oklab_linear_srgb_1.oklabToLinearSrgb;
      } });
      var oklch_1 = require_oklch();
      Object.defineProperty(exports, "oklchToRgb", { enumerable: true, get: function() {
        return oklch_1.oklchToRgb;
      } });
      Object.defineProperty(exports, "rgbToOklch", { enumerable: true, get: function() {
        return oklch_1.rgbToOklch;
      } });
      Object.defineProperty(exports, "rgbToRawOklch", { enumerable: true, get: function() {
        return oklch_1.rgbToRawOklch;
      } });
      var srgb_1 = require_srgb();
      Object.defineProperty(exports, "rgbToSrgb", { enumerable: true, get: function() {
        return srgb_1.rgbToSrgb;
      } });
      Object.defineProperty(exports, "srgbToRgb", { enumerable: true, get: function() {
        return srgb_1.srgbToRgb;
      } });
      var xyz_1 = require_xyz();
      Object.defineProperty(exports, "rgbToXyz", { enumerable: true, get: function() {
        return xyz_1.rgbToXyz;
      } });
      Object.defineProperty(exports, "rgbToXyzD50", { enumerable: true, get: function() {
        return xyz_1.rgbToXyzD50;
      } });
      Object.defineProperty(exports, "xyzD50ToD65", { enumerable: true, get: function() {
        return xyz_1.xyzD50ToD65;
      } });
      Object.defineProperty(exports, "xyzD50ToRgb", { enumerable: true, get: function() {
        return xyz_1.xyzD50ToRgb;
      } });
      Object.defineProperty(exports, "xyzD65ToD50", { enumerable: true, get: function() {
        return xyz_1.xyzD65ToD50;
      } });
      Object.defineProperty(exports, "xyzToRgb", { enumerable: true, get: function() {
        return xyz_1.xyzToRgb;
      } });
      var yuv_1 = require_yuv();
      Object.defineProperty(exports, "rgbToYuv", { enumerable: true, get: function() {
        return yuv_1.rgbToYuv;
      } });
      Object.defineProperty(exports, "yuvToRgb", { enumerable: true, get: function() {
        return yuv_1.yuvToRgb;
      } });
    }
  });

  // node_modules/color-core/dist/accessability/components/relative-luminance.js
  var require_relative_luminance = __commonJS({
    "node_modules/color-core/dist/accessability/components/relative-luminance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRelativeLuminance = getRelativeLuminance;
      function getRelativeLuminance(color) {
        var rgb = color.toRgb();
        var _a = [rgb.r, rgb.g, rgb.b].map(function(channel) {
          var c = channel / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        }), r = _a[0], g = _a[1], b = _a[2];
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
    }
  });

  // node_modules/color-core/dist/accessability/components/contrast-ratio.js
  var require_contrast_ratio = __commonJS({
    "node_modules/color-core/dist/accessability/components/contrast-ratio.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getContrastRatio = getContrastRatio;
      var relative_luminance_1 = require_relative_luminance();
      function getContrastRatio(color1, color2) {
        var luminance1 = (0, relative_luminance_1.getRelativeLuminance)(color1);
        var luminance2 = (0, relative_luminance_1.getRelativeLuminance)(color2);
        var lighter = Math.max(luminance1, luminance2);
        var darker = Math.min(luminance1, luminance2);
        return (lighter + 0.05) / (darker + 0.05);
      }
    }
  });

  // node_modules/color-core/dist/accessability/components/wcag-compliance.js
  var require_wcag_compliance = __commonJS({
    "node_modules/color-core/dist/accessability/components/wcag-compliance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getWCAGCompliance = getWCAGCompliance;
      var contrast_ratio_1 = require_contrast_ratio();
      function getWCAGCompliance(color1, color2, size) {
        var contrastRatio = (0, contrast_ratio_1.getContrastRatio)(color1, color2);
        var level;
        if (size === "Normal") {
          if (contrastRatio >= 7) {
            level = "AAA";
          } else if (contrastRatio >= 4.5) {
            level = "AA";
          } else if (contrastRatio >= 3) {
            level = "A";
          } else if (contrastRatio >= 2) {
            level = "Fail";
          } else {
            level = "Poor";
          }
        } else {
          if (contrastRatio >= 4.5) {
            level = "AAA";
          } else if (contrastRatio >= 3) {
            level = "AA";
          } else if (contrastRatio >= 2) {
            level = "A";
          } else if (contrastRatio >= 1.5) {
            level = "Fail";
          } else {
            level = "Poor";
          }
        }
        return { level, contrastRatio };
      }
    }
  });

  // node_modules/color-core/dist/accessability/index.js
  var require_accessability = __commonJS({
    "node_modules/color-core/dist/accessability/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getWCAGCompliance = exports.getRelativeLuminance = exports.getContrastRatio = void 0;
      var contrast_ratio_1 = require_contrast_ratio();
      Object.defineProperty(exports, "getContrastRatio", { enumerable: true, get: function() {
        return contrast_ratio_1.getContrastRatio;
      } });
      var relative_luminance_1 = require_relative_luminance();
      Object.defineProperty(exports, "getRelativeLuminance", { enumerable: true, get: function() {
        return relative_luminance_1.getRelativeLuminance;
      } });
      var wcag_compliance_1 = require_wcag_compliance();
      Object.defineProperty(exports, "getWCAGCompliance", { enumerable: true, get: function() {
        return wcag_compliance_1.getWCAGCompliance;
      } });
    }
  });

  // node_modules/color-core/dist/manipulation/components/alpha.js
  var require_alpha = __commonJS({
    "node_modules/color-core/dist/manipulation/components/alpha.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.adjustAlpha = adjustAlpha;
      var color_1 = require_color();
      function adjustAlpha(color, amount) {
        if (typeof amount !== "number" || isNaN(amount)) {
          return color;
        }
        var rgb = color.toRgb();
        var newAlpha = Math.max(0, Math.min(1, amount));
        return new color_1.Color(__assign(__assign({}, rgb), { a: newAlpha }));
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/grayscale.js
  var require_grayscale = __commonJS({
    "node_modules/color-core/dist/manipulation/components/grayscale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.grayscale = grayscale;
      var color_1 = require_color();
      function grayscale(color) {
        var _a = color.toRgb(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        var gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        return new color_1.Color({ r: gray, g: gray, b: gray, a });
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/hue.js
  var require_hue = __commonJS({
    "node_modules/color-core/dist/manipulation/components/hue.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.adjustHue = adjustHue;
      var color_1 = require_color();
      var conversions_1 = require_conversions();
      function adjustHue(color, amount) {
        var hsl = color.toHsl();
        var newHue = (hsl.h + amount + 360) % 360;
        var newRgb = (0, conversions_1.hslToRgb)(__assign(__assign({}, hsl), { h: newHue }));
        return new color_1.Color(newRgb);
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/invert.js
  var require_invert = __commonJS({
    "node_modules/color-core/dist/manipulation/components/invert.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.invert = invert;
      var color_1 = require_color();
      function invert(color) {
        var _a = color.toRgb(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        return new color_1.Color({ r: 255 - r, g: 255 - g, b: 255 - b, a });
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/lightness.js
  var require_lightness = __commonJS({
    "node_modules/color-core/dist/manipulation/components/lightness.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.adjustLightness = adjustLightness;
      var color_1 = require_color();
      var conversions_1 = require_conversions();
      function adjustLightness(color, amount) {
        var hsl = color.toHsl();
        var newLightness = Math.max(0, Math.min(100, hsl.l + amount));
        var newRgb = (0, conversions_1.hslToRgb)(__assign(__assign({}, hsl), { l: newLightness }));
        return new color_1.Color(newRgb);
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/mix.js
  var require_mix = __commonJS({
    "node_modules/color-core/dist/manipulation/components/mix.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mix = mix;
      var color_1 = require_color();
      function mix(color1, color2, amount) {
        var _a, _b;
        var rgb1 = color1.toRgb();
        var rgb2 = color2.toRgb();
        var clampedAmount = isNaN(amount) ? 0 : Math.max(0, Math.min(1, amount));
        var mixValue = function(a, b) {
          return Math.round(a * (1 - clampedAmount) + b * clampedAmount);
        };
        var mixedColor = {
          r: mixValue(rgb1.r, rgb2.r),
          g: mixValue(rgb1.g, rgb2.g),
          b: mixValue(rgb1.b, rgb2.b)
        };
        if (rgb1.a !== void 0 || rgb2.a !== void 0) {
          var alpha1 = (_a = rgb1.a) !== null && _a !== void 0 ? _a : 1;
          var alpha2 = (_b = rgb2.a) !== null && _b !== void 0 ? _b : 1;
          mixedColor.a = alpha1 * (1 - clampedAmount) + alpha2 * clampedAmount;
        }
        return new color_1.Color(mixedColor);
      }
    }
  });

  // node_modules/color-core/dist/manipulation/components/saturation.js
  var require_saturation = __commonJS({
    "node_modules/color-core/dist/manipulation/components/saturation.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.adjustSaturation = adjustSaturation;
      var color_1 = require_color();
      var conversions_1 = require_conversions();
      function adjustSaturation(color, amount) {
        var hsl = color.toHsl();
        var newSaturation = Math.max(0, Math.min(100, hsl.s + amount));
        var newRgb = (0, conversions_1.hslToRgb)(__assign(__assign({}, hsl), { s: newSaturation }));
        return new color_1.Color(newRgb);
      }
    }
  });

  // node_modules/color-core/dist/manipulation/index.js
  var require_manipulation = __commonJS({
    "node_modules/color-core/dist/manipulation/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.adjustSaturation = exports.mix = exports.adjustLightness = exports.invert = exports.adjustHue = exports.grayscale = exports.adjustAlpha = void 0;
      var alpha_1 = require_alpha();
      Object.defineProperty(exports, "adjustAlpha", { enumerable: true, get: function() {
        return alpha_1.adjustAlpha;
      } });
      var grayscale_1 = require_grayscale();
      Object.defineProperty(exports, "grayscale", { enumerable: true, get: function() {
        return grayscale_1.grayscale;
      } });
      var hue_1 = require_hue();
      Object.defineProperty(exports, "adjustHue", { enumerable: true, get: function() {
        return hue_1.adjustHue;
      } });
      var invert_1 = require_invert();
      Object.defineProperty(exports, "invert", { enumerable: true, get: function() {
        return invert_1.invert;
      } });
      var lightness_1 = require_lightness();
      Object.defineProperty(exports, "adjustLightness", { enumerable: true, get: function() {
        return lightness_1.adjustLightness;
      } });
      var mix_1 = require_mix();
      Object.defineProperty(exports, "mix", { enumerable: true, get: function() {
        return mix_1.mix;
      } });
      var saturation_1 = require_saturation();
      Object.defineProperty(exports, "adjustSaturation", { enumerable: true, get: function() {
        return saturation_1.adjustSaturation;
      } });
    }
  });

  // node_modules/color-core/dist/utils/components/brightness.js
  var require_brightness = __commonJS({
    "node_modules/color-core/dist/utils/components/brightness.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.calculateBrightness = calculateBrightness;
      exports.isLightColor = isLightColor;
      function calculateBrightness(color) {
        return Math.floor((color.r * 299 + color.g * 587 + color.b * 114) / 1e3);
      }
      function isLightColor(color, threshold) {
        if (threshold === void 0) {
          threshold = 128;
        }
        return calculateBrightness(color) >= threshold;
      }
    }
  });

  // node_modules/axios/dist/browser/axios.cjs
  var require_axios = __commonJS({
    "node_modules/axios/dist/browser/axios.cjs"(exports, module) {
      "use strict";
      function bind(fn, thisArg) {
        return function wrap() {
          return fn.apply(thisArg, arguments);
        };
      }
      var { toString } = Object.prototype;
      var { getPrototypeOf } = Object;
      var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      })(/* @__PURE__ */ Object.create(null));
      var kindOfTest = (type) => {
        type = type.toLowerCase();
        return (thing) => kindOf(thing) === type;
      };
      var typeOfTest = (type) => (thing) => typeof thing === type;
      var { isArray } = Array;
      var isUndefined = typeOfTest("undefined");
      function isBuffer(val) {
        return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
      }
      var isArrayBuffer = kindOfTest("ArrayBuffer");
      function isArrayBufferView(val) {
        let result;
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          result = ArrayBuffer.isView(val);
        } else {
          result = val && val.buffer && isArrayBuffer(val.buffer);
        }
        return result;
      }
      var isString = typeOfTest("string");
      var isFunction = typeOfTest("function");
      var isNumber = typeOfTest("number");
      var isObject = (thing) => thing !== null && typeof thing === "object";
      var isBoolean = (thing) => thing === true || thing === false;
      var isPlainObject = (val) => {
        if (kindOf(val) !== "object") {
          return false;
        }
        const prototype2 = getPrototypeOf(val);
        return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
      };
      var isDate = kindOfTest("Date");
      var isFile = kindOfTest("File");
      var isBlob = kindOfTest("Blob");
      var isFileList = kindOfTest("FileList");
      var isStream = (val) => isObject(val) && isFunction(val.pipe);
      var isFormData = (thing) => {
        let kind;
        return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
        kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
      };
      var isURLSearchParams = kindOfTest("URLSearchParams");
      var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
      var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      function forEach(obj, fn, { allOwnKeys = false } = {}) {
        if (obj === null || typeof obj === "undefined") {
          return;
        }
        let i;
        let l;
        if (typeof obj !== "object") {
          obj = [obj];
        }
        if (isArray(obj)) {
          for (i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
          }
        } else {
          const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
          const len = keys.length;
          let key;
          for (i = 0; i < len; i++) {
            key = keys[i];
            fn.call(null, obj[key], key, obj);
          }
        }
      }
      function findKey(obj, key) {
        key = key.toLowerCase();
        const keys = Object.keys(obj);
        let i = keys.length;
        let _key;
        while (i-- > 0) {
          _key = keys[i];
          if (key === _key.toLowerCase()) {
            return _key;
          }
        }
        return null;
      }
      var _global = (() => {
        if (typeof globalThis !== "undefined")
          return globalThis;
        return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      })();
      var isContextDefined = (context) => !isUndefined(context) && context !== _global;
      function merge() {
        const { caseless } = isContextDefined(this) && this || {};
        const result = {};
        const assignValue = (val, key) => {
          const targetKey = caseless && findKey(result, key) || key;
          if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
            result[targetKey] = merge(result[targetKey], val);
          } else if (isPlainObject(val)) {
            result[targetKey] = merge({}, val);
          } else if (isArray(val)) {
            result[targetKey] = val.slice();
          } else {
            result[targetKey] = val;
          }
        };
        for (let i = 0, l = arguments.length; i < l; i++) {
          arguments[i] && forEach(arguments[i], assignValue);
        }
        return result;
      }
      var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
        forEach(b, (val, key) => {
          if (thisArg && isFunction(val)) {
            a[key] = bind(val, thisArg);
          } else {
            a[key] = val;
          }
        }, { allOwnKeys });
        return a;
      };
      var stripBOM = (content) => {
        if (content.charCodeAt(0) === 65279) {
          content = content.slice(1);
        }
        return content;
      };
      var inherits = (constructor, superConstructor, props, descriptors2) => {
        constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
        constructor.prototype.constructor = constructor;
        Object.defineProperty(constructor, "super", {
          value: superConstructor.prototype
        });
        props && Object.assign(constructor.prototype, props);
      };
      var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
        let props;
        let i;
        let prop;
        const merged = {};
        destObj = destObj || {};
        if (sourceObj == null)
          return destObj;
        do {
          props = Object.getOwnPropertyNames(sourceObj);
          i = props.length;
          while (i-- > 0) {
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
              destObj[prop] = sourceObj[prop];
              merged[prop] = true;
            }
          }
          sourceObj = filter !== false && getPrototypeOf(sourceObj);
        } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
        return destObj;
      };
      var endsWith = (str, searchString, position) => {
        str = String(str);
        if (position === void 0 || position > str.length) {
          position = str.length;
        }
        position -= searchString.length;
        const lastIndex = str.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
      var toArray = (thing) => {
        if (!thing)
          return null;
        if (isArray(thing))
          return thing;
        let i = thing.length;
        if (!isNumber(i))
          return null;
        const arr = new Array(i);
        while (i-- > 0) {
          arr[i] = thing[i];
        }
        return arr;
      };
      var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
        return (thing) => {
          return TypedArray && thing instanceof TypedArray;
        };
      })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
      var forEachEntry = (obj, fn) => {
        const generator = obj && obj[Symbol.iterator];
        const iterator = generator.call(obj);
        let result;
        while ((result = iterator.next()) && !result.done) {
          const pair = result.value;
          fn.call(obj, pair[0], pair[1]);
        }
      };
      var matchAll = (regExp, str) => {
        let matches;
        const arr = [];
        while ((matches = regExp.exec(str)) !== null) {
          arr.push(matches);
        }
        return arr;
      };
      var isHTMLForm = kindOfTest("HTMLFormElement");
      var toCamelCase = (str) => {
        return str.toLowerCase().replace(
          /[-_\s]([a-z\d])(\w*)/g,
          function replacer(m, p1, p2) {
            return p1.toUpperCase() + p2;
          }
        );
      };
      var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
      var isRegExp = kindOfTest("RegExp");
      var reduceDescriptors = (obj, reducer) => {
        const descriptors2 = Object.getOwnPropertyDescriptors(obj);
        const reducedDescriptors = {};
        forEach(descriptors2, (descriptor, name) => {
          let ret;
          if ((ret = reducer(descriptor, name, obj)) !== false) {
            reducedDescriptors[name] = ret || descriptor;
          }
        });
        Object.defineProperties(obj, reducedDescriptors);
      };
      var freezeMethods = (obj) => {
        reduceDescriptors(obj, (descriptor, name) => {
          if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
            return false;
          }
          const value = obj[name];
          if (!isFunction(value))
            return;
          descriptor.enumerable = false;
          if ("writable" in descriptor) {
            descriptor.writable = false;
            return;
          }
          if (!descriptor.set) {
            descriptor.set = () => {
              throw Error("Can not rewrite read-only method '" + name + "'");
            };
          }
        });
      };
      var toObjectSet = (arrayOrString, delimiter) => {
        const obj = {};
        const define = (arr) => {
          arr.forEach((value) => {
            obj[value] = true;
          });
        };
        isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
        return obj;
      };
      var noop = () => {
      };
      var toFiniteNumber = (value, defaultValue) => {
        return value != null && Number.isFinite(value = +value) ? value : defaultValue;
      };
      var ALPHA = "abcdefghijklmnopqrstuvwxyz";
      var DIGIT = "0123456789";
      var ALPHABET = {
        DIGIT,
        ALPHA,
        ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
      };
      var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
        let str = "";
        const { length } = alphabet;
        while (size--) {
          str += alphabet[Math.random() * length | 0];
        }
        return str;
      };
      function isSpecCompliantForm(thing) {
        return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
      }
      var toJSONObject = (obj) => {
        const stack = new Array(10);
        const visit = (source, i) => {
          if (isObject(source)) {
            if (stack.indexOf(source) >= 0) {
              return;
            }
            if (!("toJSON" in source)) {
              stack[i] = source;
              const target = isArray(source) ? [] : {};
              forEach(source, (value, key) => {
                const reducedValue = visit(value, i + 1);
                !isUndefined(reducedValue) && (target[key] = reducedValue);
              });
              stack[i] = void 0;
              return target;
            }
          }
          return source;
        };
        return visit(obj, 0);
      };
      var isAsyncFn = kindOfTest("AsyncFunction");
      var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
      var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
        if (setImmediateSupported) {
          return setImmediate;
        }
        return postMessageSupported ? ((token, callbacks) => {
          _global.addEventListener("message", ({ source, data }) => {
            if (source === _global && data === token) {
              callbacks.length && callbacks.shift()();
            }
          }, false);
          return (cb) => {
            callbacks.push(cb);
            _global.postMessage(token, "*");
          };
        })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
      })(
        typeof setImmediate === "function",
        isFunction(_global.postMessage)
      );
      var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
      var utils$1 = {
        isArray,
        isArrayBuffer,
        isBuffer,
        isFormData,
        isArrayBufferView,
        isString,
        isNumber,
        isBoolean,
        isObject,
        isPlainObject,
        isReadableStream,
        isRequest,
        isResponse,
        isHeaders,
        isUndefined,
        isDate,
        isFile,
        isBlob,
        isRegExp,
        isFunction,
        isStream,
        isURLSearchParams,
        isTypedArray,
        isFileList,
        forEach,
        merge,
        extend,
        trim,
        stripBOM,
        inherits,
        toFlatObject,
        kindOf,
        kindOfTest,
        endsWith,
        toArray,
        forEachEntry,
        matchAll,
        isHTMLForm,
        hasOwnProperty,
        hasOwnProp: hasOwnProperty,
        // an alias to avoid ESLint no-prototype-builtins detection
        reduceDescriptors,
        freezeMethods,
        toObjectSet,
        toCamelCase,
        noop,
        toFiniteNumber,
        findKey,
        global: _global,
        isContextDefined,
        ALPHABET,
        generateString,
        isSpecCompliantForm,
        toJSONObject,
        isAsyncFn,
        isThenable,
        setImmediate: _setImmediate,
        asap
      };
      function AxiosError(message, code, config, request, response) {
        Error.call(this);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error().stack;
        }
        this.message = message;
        this.name = "AxiosError";
        code && (this.code = code);
        config && (this.config = config);
        request && (this.request = request);
        if (response) {
          this.response = response;
          this.status = response.status ? response.status : null;
        }
      }
      utils$1.inherits(AxiosError, Error, {
        toJSON: function toJSON() {
          return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: utils$1.toJSONObject(this.config),
            code: this.code,
            status: this.status
          };
        }
      });
      var prototype$1 = AxiosError.prototype;
      var descriptors = {};
      [
        "ERR_BAD_OPTION_VALUE",
        "ERR_BAD_OPTION",
        "ECONNABORTED",
        "ETIMEDOUT",
        "ERR_NETWORK",
        "ERR_FR_TOO_MANY_REDIRECTS",
        "ERR_DEPRECATED",
        "ERR_BAD_RESPONSE",
        "ERR_BAD_REQUEST",
        "ERR_CANCELED",
        "ERR_NOT_SUPPORT",
        "ERR_INVALID_URL"
        // eslint-disable-next-line func-names
      ].forEach((code) => {
        descriptors[code] = { value: code };
      });
      Object.defineProperties(AxiosError, descriptors);
      Object.defineProperty(prototype$1, "isAxiosError", { value: true });
      AxiosError.from = (error, code, config, request, response, customProps) => {
        const axiosError = Object.create(prototype$1);
        utils$1.toFlatObject(error, axiosError, function filter(obj) {
          return obj !== Error.prototype;
        }, (prop) => {
          return prop !== "isAxiosError";
        });
        AxiosError.call(axiosError, error.message, code, config, request, response);
        axiosError.cause = error;
        axiosError.name = error.name;
        customProps && Object.assign(axiosError, customProps);
        return axiosError;
      };
      var httpAdapter = null;
      function isVisitable(thing) {
        return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
      }
      function removeBrackets(key) {
        return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
      }
      function renderKey(path, key, dots) {
        if (!path)
          return key;
        return path.concat(key).map(function each(token, i) {
          token = removeBrackets(token);
          return !dots && i ? "[" + token + "]" : token;
        }).join(dots ? "." : "");
      }
      function isFlatArray(arr) {
        return utils$1.isArray(arr) && !arr.some(isVisitable);
      }
      var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
        return /^is[A-Z]/.test(prop);
      });
      function toFormData(obj, formData, options) {
        if (!utils$1.isObject(obj)) {
          throw new TypeError("target must be an object");
        }
        formData = formData || new FormData();
        options = utils$1.toFlatObject(options, {
          metaTokens: true,
          dots: false,
          indexes: false
        }, false, function defined(option, source) {
          return !utils$1.isUndefined(source[option]);
        });
        const metaTokens = options.metaTokens;
        const visitor = options.visitor || defaultVisitor;
        const dots = options.dots;
        const indexes = options.indexes;
        const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
        const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
        if (!utils$1.isFunction(visitor)) {
          throw new TypeError("visitor must be a function");
        }
        function convertValue(value) {
          if (value === null)
            return "";
          if (utils$1.isDate(value)) {
            return value.toISOString();
          }
          if (!useBlob && utils$1.isBlob(value)) {
            throw new AxiosError("Blob is not supported. Use a Buffer instead.");
          }
          if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
            return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
          }
          return value;
        }
        function defaultVisitor(value, key, path) {
          let arr = value;
          if (value && !path && typeof value === "object") {
            if (utils$1.endsWith(key, "{}")) {
              key = metaTokens ? key : key.slice(0, -2);
              value = JSON.stringify(value);
            } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
              key = removeBrackets(key);
              arr.forEach(function each(el, index) {
                !(utils$1.isUndefined(el) || el === null) && formData.append(
                  // eslint-disable-next-line no-nested-ternary
                  indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
                  convertValue(el)
                );
              });
              return false;
            }
          }
          if (isVisitable(value)) {
            return true;
          }
          formData.append(renderKey(path, key, dots), convertValue(value));
          return false;
        }
        const stack = [];
        const exposedHelpers = Object.assign(predicates, {
          defaultVisitor,
          convertValue,
          isVisitable
        });
        function build(value, path) {
          if (utils$1.isUndefined(value))
            return;
          if (stack.indexOf(value) !== -1) {
            throw Error("Circular reference detected in " + path.join("."));
          }
          stack.push(value);
          utils$1.forEach(value, function each(el, key) {
            const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
              formData,
              el,
              utils$1.isString(key) ? key.trim() : key,
              path,
              exposedHelpers
            );
            if (result === true) {
              build(el, path ? path.concat(key) : [key]);
            }
          });
          stack.pop();
        }
        if (!utils$1.isObject(obj)) {
          throw new TypeError("data must be an object");
        }
        build(obj);
        return formData;
      }
      function encode$1(str) {
        const charMap = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+",
          "%00": "\0"
        };
        return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
          return charMap[match];
        });
      }
      function AxiosURLSearchParams(params, options) {
        this._pairs = [];
        params && toFormData(params, this, options);
      }
      var prototype = AxiosURLSearchParams.prototype;
      prototype.append = function append(name, value) {
        this._pairs.push([name, value]);
      };
      prototype.toString = function toString2(encoder) {
        const _encode = encoder ? function(value) {
          return encoder.call(this, value, encode$1);
        } : encode$1;
        return this._pairs.map(function each(pair) {
          return _encode(pair[0]) + "=" + _encode(pair[1]);
        }, "").join("&");
      };
      function encode(val) {
        return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      }
      function buildURL(url, params, options) {
        if (!params) {
          return url;
        }
        const _encode = options && options.encode || encode;
        const serializeFn = options && options.serialize;
        let serializedParams;
        if (serializeFn) {
          serializedParams = serializeFn(params, options);
        } else {
          serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
        }
        if (serializedParams) {
          const hashmarkIndex = url.indexOf("#");
          if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
          }
          url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
        }
        return url;
      }
      var InterceptorManager = class {
        constructor() {
          this.handlers = [];
        }
        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */
        use(fulfilled, rejected, options) {
          this.handlers.push({
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
          });
          return this.handlers.length - 1;
        }
        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         *
         * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
         */
        eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        }
        /**
         * Clear all interceptors from the stack
         *
         * @returns {void}
         */
        clear() {
          if (this.handlers) {
            this.handlers = [];
          }
        }
        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         *
         * @returns {void}
         */
        forEach(fn) {
          utils$1.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        }
      };
      var InterceptorManager$1 = InterceptorManager;
      var transitionalDefaults = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      };
      var URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
      var FormData$1 = typeof FormData !== "undefined" ? FormData : null;
      var Blob$1 = typeof Blob !== "undefined" ? Blob : null;
      var platform$1 = {
        isBrowser: true,
        classes: {
          URLSearchParams: URLSearchParams$1,
          FormData: FormData$1,
          Blob: Blob$1
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
      };
      var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
      var _navigator = typeof navigator === "object" && navigator || void 0;
      var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
      var hasStandardBrowserWebWorkerEnv = (() => {
        return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
      })();
      var origin = hasBrowserEnv && window.location.href || "http://localhost";
      var utils = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        hasBrowserEnv,
        hasStandardBrowserWebWorkerEnv,
        hasStandardBrowserEnv,
        navigator: _navigator,
        origin
      });
      var platform = {
        ...utils,
        ...platform$1
      };
      function toURLEncodedForm(data, options) {
        return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
          visitor: function(value, key, path, helpers) {
            if (platform.isNode && utils$1.isBuffer(value)) {
              this.append(key, value.toString("base64"));
              return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
          }
        }, options));
      }
      function parsePropPath(name) {
        return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
          return match[0] === "[]" ? "" : match[1] || match[0];
        });
      }
      function arrayToObject(arr) {
        const obj = {};
        const keys = Object.keys(arr);
        let i;
        const len = keys.length;
        let key;
        for (i = 0; i < len; i++) {
          key = keys[i];
          obj[key] = arr[key];
        }
        return obj;
      }
      function formDataToJSON(formData) {
        function buildPath(path, value, target, index) {
          let name = path[index++];
          if (name === "__proto__")
            return true;
          const isNumericKey = Number.isFinite(+name);
          const isLast = index >= path.length;
          name = !name && utils$1.isArray(target) ? target.length : name;
          if (isLast) {
            if (utils$1.hasOwnProp(target, name)) {
              target[name] = [target[name], value];
            } else {
              target[name] = value;
            }
            return !isNumericKey;
          }
          if (!target[name] || !utils$1.isObject(target[name])) {
            target[name] = [];
          }
          const result = buildPath(path, value, target[name], index);
          if (result && utils$1.isArray(target[name])) {
            target[name] = arrayToObject(target[name]);
          }
          return !isNumericKey;
        }
        if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
          const obj = {};
          utils$1.forEachEntry(formData, (name, value) => {
            buildPath(parsePropPath(name), value, obj, 0);
          });
          return obj;
        }
        return null;
      }
      function stringifySafely(rawValue, parser, encoder) {
        if (utils$1.isString(rawValue)) {
          try {
            (parser || JSON.parse)(rawValue);
            return utils$1.trim(rawValue);
          } catch (e) {
            if (e.name !== "SyntaxError") {
              throw e;
            }
          }
        }
        return (encoder || JSON.stringify)(rawValue);
      }
      var defaults = {
        transitional: transitionalDefaults,
        adapter: ["xhr", "http", "fetch"],
        transformRequest: [function transformRequest(data, headers) {
          const contentType = headers.getContentType() || "";
          const hasJSONContentType = contentType.indexOf("application/json") > -1;
          const isObjectPayload = utils$1.isObject(data);
          if (isObjectPayload && utils$1.isHTMLForm(data)) {
            data = new FormData(data);
          }
          const isFormData2 = utils$1.isFormData(data);
          if (isFormData2) {
            return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
          }
          if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (utils$1.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils$1.isURLSearchParams(data)) {
            headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
            return data.toString();
          }
          let isFileList2;
          if (isObjectPayload) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
              return toURLEncodedForm(data, this.formSerializer).toString();
            }
            if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
              const _FormData = this.env && this.env.FormData;
              return toFormData(
                isFileList2 ? { "files[]": data } : data,
                _FormData && new _FormData(),
                this.formSerializer
              );
            }
          }
          if (isObjectPayload || hasJSONContentType) {
            headers.setContentType("application/json", false);
            return stringifySafely(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse(data) {
          const transitional = this.transitional || defaults.transitional;
          const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
          const JSONRequested = this.responseType === "json";
          if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
            const silentJSONParsing = transitional && transitional.silentJSONParsing;
            const strictJSONParsing = !silentJSONParsing && JSONRequested;
            try {
              return JSON.parse(data);
            } catch (e) {
              if (strictJSONParsing) {
                if (e.name === "SyntaxError") {
                  throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
                }
                throw e;
              }
            }
          }
          return data;
        }],
        /**
         * A timeout in milliseconds to abort a request. If set to 0 (default) a
         * timeout is not created.
         */
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: platform.classes.FormData,
          Blob: platform.classes.Blob
        },
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        },
        headers: {
          common: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": void 0
          }
        }
      };
      utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
        defaults.headers[method] = {};
      });
      var defaults$1 = defaults;
      var ignoreDuplicateOf = utils$1.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent"
      ]);
      var parseHeaders = (rawHeaders) => {
        const parsed = {};
        let key;
        let val;
        let i;
        rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
          i = line.indexOf(":");
          key = line.substring(0, i).trim().toLowerCase();
          val = line.substring(i + 1).trim();
          if (!key || parsed[key] && ignoreDuplicateOf[key]) {
            return;
          }
          if (key === "set-cookie") {
            if (parsed[key]) {
              parsed[key].push(val);
            } else {
              parsed[key] = [val];
            }
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        });
        return parsed;
      };
      var $internals = Symbol("internals");
      function normalizeHeader(header) {
        return header && String(header).trim().toLowerCase();
      }
      function normalizeValue(value) {
        if (value === false || value == null) {
          return value;
        }
        return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
      }
      function parseTokens(str) {
        const tokens = /* @__PURE__ */ Object.create(null);
        const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
        let match;
        while (match = tokensRE.exec(str)) {
          tokens[match[1]] = match[2];
        }
        return tokens;
      }
      var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
      function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
        if (utils$1.isFunction(filter)) {
          return filter.call(this, value, header);
        }
        if (isHeaderNameFilter) {
          value = header;
        }
        if (!utils$1.isString(value))
          return;
        if (utils$1.isString(filter)) {
          return value.indexOf(filter) !== -1;
        }
        if (utils$1.isRegExp(filter)) {
          return filter.test(value);
        }
      }
      function formatHeader(header) {
        return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
      }
      function buildAccessors(obj, header) {
        const accessorName = utils$1.toCamelCase(" " + header);
        ["get", "set", "has"].forEach((methodName) => {
          Object.defineProperty(obj, methodName + accessorName, {
            value: function(arg1, arg2, arg3) {
              return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
          });
        });
      }
      var AxiosHeaders = class {
        constructor(headers) {
          headers && this.set(headers);
        }
        set(header, valueOrRewrite, rewrite) {
          const self2 = this;
          function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) {
              throw new Error("header name must be a non-empty string");
            }
            const key = utils$1.findKey(self2, lHeader);
            if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
              self2[key || _header] = normalizeValue(_value);
            }
          }
          const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
          if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders(header), valueOrRewrite);
          } else if (utils$1.isHeaders(header)) {
            for (const [key, value] of header.entries()) {
              setHeader(value, key, rewrite);
            }
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }
          return this;
        }
        get(header, parser) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils$1.findKey(this, header);
            if (key) {
              const value = this[key];
              if (!parser) {
                return value;
              }
              if (parser === true) {
                return parseTokens(value);
              }
              if (utils$1.isFunction(parser)) {
                return parser.call(this, value, key);
              }
              if (utils$1.isRegExp(parser)) {
                return parser.exec(value);
              }
              throw new TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(header, matcher) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils$1.findKey(this, header);
            return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }
          return false;
        }
        delete(header, matcher) {
          const self2 = this;
          let deleted = false;
          function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
              const key = utils$1.findKey(self2, _header);
              if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
                delete self2[key];
                deleted = true;
              }
            }
          }
          if (utils$1.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }
          return deleted;
        }
        clear(matcher) {
          const keys = Object.keys(this);
          let i = keys.length;
          let deleted = false;
          while (i--) {
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }
          return deleted;
        }
        normalize(format) {
          const self2 = this;
          const headers = {};
          utils$1.forEach(this, (value, header) => {
            const key = utils$1.findKey(headers, header);
            if (key) {
              self2[key] = normalizeValue(value);
              delete self2[header];
              return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) {
              delete self2[header];
            }
            self2[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }
        concat(...targets) {
          return this.constructor.concat(this, ...targets);
        }
        toJSON(asStrings) {
          const obj = /* @__PURE__ */ Object.create(null);
          utils$1.forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
          });
          return obj;
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }
        static concat(first, ...targets) {
          const computed = new this(first);
          targets.forEach((target) => computed.set(target));
          return computed;
        }
        static accessor(header) {
          const internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          const accessors = internals.accessors;
          const prototype2 = this.prototype;
          function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
              buildAccessors(prototype2, _header);
              accessors[lHeader] = true;
            }
          }
          utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }
      };
      AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
      utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
        let mapped = key[0].toUpperCase() + key.slice(1);
        return {
          get: () => value,
          set(headerValue) {
            this[mapped] = headerValue;
          }
        };
      });
      utils$1.freezeMethods(AxiosHeaders);
      var AxiosHeaders$1 = AxiosHeaders;
      function transformData(fns, response) {
        const config = this || defaults$1;
        const context = response || config;
        const headers = AxiosHeaders$1.from(context.headers);
        let data = context.data;
        utils$1.forEach(fns, function transform(fn) {
          data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
        });
        headers.normalize();
        return data;
      }
      function isCancel(value) {
        return !!(value && value.__CANCEL__);
      }
      function CanceledError(message, config, request) {
        AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
        this.name = "CanceledError";
      }
      utils$1.inherits(CanceledError, AxiosError, {
        __CANCEL__: true
      });
      function settle(resolve, reject, response) {
        const validateStatus = response.config.validateStatus;
        if (!response.status || !validateStatus || validateStatus(response.status)) {
          resolve(response);
        } else {
          reject(new AxiosError(
            "Request failed with status code " + response.status,
            [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
            response.config,
            response.request,
            response
          ));
        }
      }
      function parseProtocol(url) {
        const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
        return match && match[1] || "";
      }
      function speedometer(samplesCount, min) {
        samplesCount = samplesCount || 10;
        const bytes = new Array(samplesCount);
        const timestamps = new Array(samplesCount);
        let head = 0;
        let tail = 0;
        let firstSampleTS;
        min = min !== void 0 ? min : 1e3;
        return function push(chunkLength) {
          const now = Date.now();
          const startedAt = timestamps[tail];
          if (!firstSampleTS) {
            firstSampleTS = now;
          }
          bytes[head] = chunkLength;
          timestamps[head] = now;
          let i = tail;
          let bytesCount = 0;
          while (i !== head) {
            bytesCount += bytes[i++];
            i = i % samplesCount;
          }
          head = (head + 1) % samplesCount;
          if (head === tail) {
            tail = (tail + 1) % samplesCount;
          }
          if (now - firstSampleTS < min) {
            return;
          }
          const passed = startedAt && now - startedAt;
          return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
        };
      }
      function throttle(fn, freq) {
        let timestamp = 0;
        let threshold = 1e3 / freq;
        let lastArgs;
        let timer;
        const invoke = (args, now = Date.now()) => {
          timestamp = now;
          lastArgs = null;
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          fn.apply(null, args);
        };
        const throttled = (...args) => {
          const now = Date.now();
          const passed = now - timestamp;
          if (passed >= threshold) {
            invoke(args, now);
          } else {
            lastArgs = args;
            if (!timer) {
              timer = setTimeout(() => {
                timer = null;
                invoke(lastArgs);
              }, threshold - passed);
            }
          }
        };
        const flush = () => lastArgs && invoke(lastArgs);
        return [throttled, flush];
      }
      var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
        let bytesNotified = 0;
        const _speedometer = speedometer(50, 250);
        return throttle((e) => {
          const loaded = e.loaded;
          const total = e.lengthComputable ? e.total : void 0;
          const progressBytes = loaded - bytesNotified;
          const rate = _speedometer(progressBytes);
          const inRange = loaded <= total;
          bytesNotified = loaded;
          const data = {
            loaded,
            total,
            progress: total ? loaded / total : void 0,
            bytes: progressBytes,
            rate: rate ? rate : void 0,
            estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? "download" : "upload"]: true
          };
          listener(data);
        }, freq);
      };
      var progressEventDecorator = (total, throttled) => {
        const lengthComputable = total != null;
        return [(loaded) => throttled[0]({
          lengthComputable,
          total,
          loaded
        }), throttled[1]];
      };
      var asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
      var isURLSameOrigin = platform.hasStandardBrowserEnv ? (
        // Standard browser envs have full support of the APIs needed to test
        // whether the request URL is of the same origin as current location.
        function standardBrowserEnv() {
          const msie = platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent);
          const urlParsingNode = document.createElement("a");
          let originURL;
          function resolveURL(url) {
            let href = url;
            if (msie) {
              urlParsingNode.setAttribute("href", href);
              href = urlParsingNode.href;
            }
            urlParsingNode.setAttribute("href", href);
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
            };
          }
          originURL = resolveURL(window.location.href);
          return function isURLSameOrigin2(requestURL) {
            const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
            return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
          };
        }()
      ) : (
        // Non standard browser envs (web workers, react-native) lack needed support.
        /* @__PURE__ */ function nonStandardBrowserEnv() {
          return function isURLSameOrigin2() {
            return true;
          };
        }()
      );
      var cookies = platform.hasStandardBrowserEnv ? (
        // Standard browser envs support document.cookie
        {
          write(name, value, expires, path, domain, secure) {
            const cookie = [name + "=" + encodeURIComponent(value)];
            utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
            utils$1.isString(path) && cookie.push("path=" + path);
            utils$1.isString(domain) && cookie.push("domain=" + domain);
            secure === true && cookie.push("secure");
            document.cookie = cookie.join("; ");
          },
          read(name) {
            const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        }
      ) : (
        // Non-standard browser env (web workers, react-native) lack needed support.
        {
          write() {
          },
          read() {
            return null;
          },
          remove() {
          }
        }
      );
      function isAbsoluteURL(url) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
      }
      function combineURLs(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
      }
      function buildFullPath(baseURL, requestedURL) {
        if (baseURL && !isAbsoluteURL(requestedURL)) {
          return combineURLs(baseURL, requestedURL);
        }
        return requestedURL;
      }
      var headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
      function mergeConfig(config1, config2) {
        config2 = config2 || {};
        const config = {};
        function getMergedValue(target, source, caseless) {
          if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
            return utils$1.merge.call({ caseless }, target, source);
          } else if (utils$1.isPlainObject(source)) {
            return utils$1.merge({}, source);
          } else if (utils$1.isArray(source)) {
            return source.slice();
          }
          return source;
        }
        function mergeDeepProperties(a, b, caseless) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(a, b, caseless);
          } else if (!utils$1.isUndefined(a)) {
            return getMergedValue(void 0, a, caseless);
          }
        }
        function valueFromConfig2(a, b) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(void 0, b);
          }
        }
        function defaultToConfig2(a, b) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(void 0, b);
          } else if (!utils$1.isUndefined(a)) {
            return getMergedValue(void 0, a);
          }
        }
        function mergeDirectKeys(a, b, prop) {
          if (prop in config2) {
            return getMergedValue(a, b);
          } else if (prop in config1) {
            return getMergedValue(void 0, a);
          }
        }
        const mergeMap = {
          url: valueFromConfig2,
          method: valueFromConfig2,
          data: valueFromConfig2,
          baseURL: defaultToConfig2,
          transformRequest: defaultToConfig2,
          transformResponse: defaultToConfig2,
          paramsSerializer: defaultToConfig2,
          timeout: defaultToConfig2,
          timeoutMessage: defaultToConfig2,
          withCredentials: defaultToConfig2,
          withXSRFToken: defaultToConfig2,
          adapter: defaultToConfig2,
          responseType: defaultToConfig2,
          xsrfCookieName: defaultToConfig2,
          xsrfHeaderName: defaultToConfig2,
          onUploadProgress: defaultToConfig2,
          onDownloadProgress: defaultToConfig2,
          decompress: defaultToConfig2,
          maxContentLength: defaultToConfig2,
          maxBodyLength: defaultToConfig2,
          beforeRedirect: defaultToConfig2,
          transport: defaultToConfig2,
          httpAgent: defaultToConfig2,
          httpsAgent: defaultToConfig2,
          cancelToken: defaultToConfig2,
          socketPath: defaultToConfig2,
          responseEncoding: defaultToConfig2,
          validateStatus: mergeDirectKeys,
          headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
        };
        utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
          const merge2 = mergeMap[prop] || mergeDeepProperties;
          const configValue = merge2(config1[prop], config2[prop], prop);
          utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
        });
        return config;
      }
      var resolveConfig = (config) => {
        const newConfig = mergeConfig({}, config);
        let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
        newConfig.headers = headers = AxiosHeaders$1.from(headers);
        newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
        if (auth) {
          headers.set(
            "Authorization",
            "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
          );
        }
        let contentType;
        if (utils$1.isFormData(data)) {
          if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
            headers.setContentType(void 0);
          } else if ((contentType = headers.getContentType()) !== false) {
            const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
            headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
          }
        }
        if (platform.hasStandardBrowserEnv) {
          withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
          if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
            const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
            if (xsrfValue) {
              headers.set(xsrfHeaderName, xsrfValue);
            }
          }
        }
        return newConfig;
      };
      var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
      var xhrAdapter = isXHRAdapterSupported && function(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          const _config = resolveConfig(config);
          let requestData = _config.data;
          const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
          let { responseType, onUploadProgress, onDownloadProgress } = _config;
          let onCanceled;
          let uploadThrottled, downloadThrottled;
          let flushUpload, flushDownload;
          function done() {
            flushUpload && flushUpload();
            flushDownload && flushDownload();
            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener("abort", onCanceled);
          }
          let request = new XMLHttpRequest();
          request.open(_config.method.toUpperCase(), _config.url, true);
          request.timeout = _config.timeout;
          function onloadend() {
            if (!request) {
              return;
            }
            const responseHeaders = AxiosHeaders$1.from(
              "getAllResponseHeaders" in request && request.getAllResponseHeaders()
            );
            const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle(function _resolve(value) {
              resolve(value);
              done();
            }, function _reject(err) {
              reject(err);
              done();
            }, response);
            request = null;
          }
          if ("onloadend" in request) {
            request.onloadend = onloadend;
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                return;
              }
              setTimeout(onloadend);
            };
          }
          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }
            reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
            request = null;
          };
          request.onerror = function handleError() {
            reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional = _config.transitional || transitionalDefaults;
            if (_config.timeoutErrorMessage) {
              timeoutErrorMessage = _config.timeoutErrorMessage;
            }
            reject(new AxiosError(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
              config,
              request
            ));
            request = null;
          };
          requestData === void 0 && requestHeaders.setContentType(null);
          if ("setRequestHeader" in request) {
            utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
              request.setRequestHeader(key, val);
            });
          }
          if (!utils$1.isUndefined(_config.withCredentials)) {
            request.withCredentials = !!_config.withCredentials;
          }
          if (responseType && responseType !== "json") {
            request.responseType = _config.responseType;
          }
          if (onDownloadProgress) {
            [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
            request.addEventListener("progress", downloadThrottled);
          }
          if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
            request.upload.addEventListener("progress", uploadThrottled);
            request.upload.addEventListener("loadend", flushUpload);
          }
          if (_config.cancelToken || _config.signal) {
            onCanceled = (cancel) => {
              if (!request) {
                return;
              }
              reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
              request.abort();
              request = null;
            };
            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
            if (_config.signal) {
              _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
            }
          }
          const protocol = parseProtocol(_config.url);
          if (protocol && platform.protocols.indexOf(protocol) === -1) {
            reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
            return;
          }
          request.send(requestData || null);
        });
      };
      var composeSignals = (signals, timeout) => {
        const { length } = signals = signals ? signals.filter(Boolean) : [];
        if (timeout || length) {
          let controller = new AbortController();
          let aborted;
          const onabort = function(reason) {
            if (!aborted) {
              aborted = true;
              unsubscribe();
              const err = reason instanceof Error ? reason : this.reason;
              controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
            }
          };
          let timer = timeout && setTimeout(() => {
            timer = null;
            onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
          }, timeout);
          const unsubscribe = () => {
            if (signals) {
              timer && clearTimeout(timer);
              timer = null;
              signals.forEach((signal2) => {
                signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
              });
              signals = null;
            }
          };
          signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
          const { signal } = controller;
          signal.unsubscribe = () => utils$1.asap(unsubscribe);
          return signal;
        }
      };
      var composeSignals$1 = composeSignals;
      var streamChunk = function* (chunk, chunkSize) {
        let len = chunk.byteLength;
        if (!chunkSize || len < chunkSize) {
          yield chunk;
          return;
        }
        let pos = 0;
        let end;
        while (pos < len) {
          end = pos + chunkSize;
          yield chunk.slice(pos, end);
          pos = end;
        }
      };
      var readBytes = async function* (iterable, chunkSize) {
        for await (const chunk of readStream(iterable)) {
          yield* streamChunk(chunk, chunkSize);
        }
      };
      var readStream = async function* (stream) {
        if (stream[Symbol.asyncIterator]) {
          yield* stream;
          return;
        }
        const reader = stream.getReader();
        try {
          for (; ; ) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            yield value;
          }
        } finally {
          await reader.cancel();
        }
      };
      var trackStream = (stream, chunkSize, onProgress, onFinish) => {
        const iterator = readBytes(stream, chunkSize);
        let bytes = 0;
        let done;
        let _onFinish = (e) => {
          if (!done) {
            done = true;
            onFinish && onFinish(e);
          }
        };
        return new ReadableStream({
          async pull(controller) {
            try {
              const { done: done2, value } = await iterator.next();
              if (done2) {
                _onFinish();
                controller.close();
                return;
              }
              let len = value.byteLength;
              if (onProgress) {
                let loadedBytes = bytes += len;
                onProgress(loadedBytes);
              }
              controller.enqueue(new Uint8Array(value));
            } catch (err) {
              _onFinish(err);
              throw err;
            }
          },
          cancel(reason) {
            _onFinish(reason);
            return iterator.return();
          }
        }, {
          highWaterMark: 2
        });
      };
      var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
      var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
      var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
      var test = (fn, ...args) => {
        try {
          return !!fn(...args);
        } catch (e) {
          return false;
        }
      };
      var supportsRequestStream = isReadableStreamSupported && test(() => {
        let duplexAccessed = false;
        const hasContentType = new Request(platform.origin, {
          body: new ReadableStream(),
          method: "POST",
          get duplex() {
            duplexAccessed = true;
            return "half";
          }
        }).headers.has("Content-Type");
        return duplexAccessed && !hasContentType;
      });
      var DEFAULT_CHUNK_SIZE = 64 * 1024;
      var supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
      var resolvers = {
        stream: supportsResponseStream && ((res) => res.body)
      };
      isFetchSupported && ((res) => {
        ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
          !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
            throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
          });
        });
      })(new Response());
      var getBodyLength = async (body) => {
        if (body == null) {
          return 0;
        }
        if (utils$1.isBlob(body)) {
          return body.size;
        }
        if (utils$1.isSpecCompliantForm(body)) {
          const _request = new Request(platform.origin, {
            method: "POST",
            body
          });
          return (await _request.arrayBuffer()).byteLength;
        }
        if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
          return body.byteLength;
        }
        if (utils$1.isURLSearchParams(body)) {
          body = body + "";
        }
        if (utils$1.isString(body)) {
          return (await encodeText(body)).byteLength;
        }
      };
      var resolveBodyLength = async (headers, body) => {
        const length = utils$1.toFiniteNumber(headers.getContentLength());
        return length == null ? getBodyLength(body) : length;
      };
      var fetchAdapter = isFetchSupported && (async (config) => {
        let {
          url,
          method,
          data,
          signal,
          cancelToken,
          timeout,
          onDownloadProgress,
          onUploadProgress,
          responseType,
          headers,
          withCredentials = "same-origin",
          fetchOptions
        } = resolveConfig(config);
        responseType = responseType ? (responseType + "").toLowerCase() : "text";
        let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
        let request;
        const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
          composedSignal.unsubscribe();
        });
        let requestContentLength;
        try {
          if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
            let _request = new Request(url, {
              method: "POST",
              body: data,
              duplex: "half"
            });
            let contentTypeHeader;
            if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
              headers.setContentType(contentTypeHeader);
            }
            if (_request.body) {
              const [onProgress, flush] = progressEventDecorator(
                requestContentLength,
                progressEventReducer(asyncDecorator(onUploadProgress))
              );
              data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
            }
          }
          if (!utils$1.isString(withCredentials)) {
            withCredentials = withCredentials ? "include" : "omit";
          }
          const isCredentialsSupported = "credentials" in Request.prototype;
          request = new Request(url, {
            ...fetchOptions,
            signal: composedSignal,
            method: method.toUpperCase(),
            headers: headers.normalize().toJSON(),
            body: data,
            duplex: "half",
            credentials: isCredentialsSupported ? withCredentials : void 0
          });
          let response = await fetch(request);
          const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
          if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
            const options = {};
            ["status", "statusText", "headers"].forEach((prop) => {
              options[prop] = response[prop];
            });
            const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
            const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
              responseContentLength,
              progressEventReducer(asyncDecorator(onDownloadProgress), true)
            ) || [];
            response = new Response(
              trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
                flush && flush();
                unsubscribe && unsubscribe();
              }),
              options
            );
          }
          responseType = responseType || "text";
          let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
          !isStreamResponse && unsubscribe && unsubscribe();
          return await new Promise((resolve, reject) => {
            settle(resolve, reject, {
              data: responseData,
              headers: AxiosHeaders$1.from(response.headers),
              status: response.status,
              statusText: response.statusText,
              config,
              request
            });
          });
        } catch (err) {
          unsubscribe && unsubscribe();
          if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
            throw Object.assign(
              new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request),
              {
                cause: err.cause || err
              }
            );
          }
          throw AxiosError.from(err, err && err.code, config, request);
        }
      });
      var knownAdapters = {
        http: httpAdapter,
        xhr: xhrAdapter,
        fetch: fetchAdapter
      };
      utils$1.forEach(knownAdapters, (fn, value) => {
        if (fn) {
          try {
            Object.defineProperty(fn, "name", { value });
          } catch (e) {
          }
          Object.defineProperty(fn, "adapterName", { value });
        }
      });
      var renderReason = (reason) => `- ${reason}`;
      var isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
      var adapters = {
        getAdapter: (adapters2) => {
          adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
          const { length } = adapters2;
          let nameOrAdapter;
          let adapter;
          const rejectedReasons = {};
          for (let i = 0; i < length; i++) {
            nameOrAdapter = adapters2[i];
            let id;
            adapter = nameOrAdapter;
            if (!isResolvedHandle(nameOrAdapter)) {
              adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
              if (adapter === void 0) {
                throw new AxiosError(`Unknown adapter '${id}'`);
              }
            }
            if (adapter) {
              break;
            }
            rejectedReasons[id || "#" + i] = adapter;
          }
          if (!adapter) {
            const reasons = Object.entries(rejectedReasons).map(
              ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
            );
            let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
            throw new AxiosError(
              `There is no suitable adapter to dispatch the request ` + s,
              "ERR_NOT_SUPPORT"
            );
          }
          return adapter;
        },
        adapters: knownAdapters
      };
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
        if (config.signal && config.signal.aborted) {
          throw new CanceledError(null, config);
        }
      }
      function dispatchRequest(config) {
        throwIfCancellationRequested(config);
        config.headers = AxiosHeaders$1.from(config.headers);
        config.data = transformData.call(
          config,
          config.transformRequest
        );
        if (["post", "put", "patch"].indexOf(config.method) !== -1) {
          config.headers.setContentType("application/x-www-form-urlencoded", false);
        }
        const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested(config);
          response.data = transformData.call(
            config,
            config.transformResponse,
            response
          );
          response.headers = AxiosHeaders$1.from(response.headers);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
              reason.response.data = transformData.call(
                config,
                config.transformResponse,
                reason.response
              );
              reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
            }
          }
          return Promise.reject(reason);
        });
      }
      var VERSION = "1.7.7";
      var validators$1 = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
        validators$1[type] = function validator2(thing) {
          return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
        };
      });
      var deprecatedWarnings = {};
      validators$1.transitional = function transitional(validator2, version, message) {
        function formatMessage(opt, desc) {
          return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
        }
        return (value, opt, opts) => {
          if (validator2 === false) {
            throw new AxiosError(
              formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
              AxiosError.ERR_DEPRECATED
            );
          }
          if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(
              formatMessage(
                opt,
                " has been deprecated since v" + version + " and will be removed in the near future"
              )
            );
          }
          return validator2 ? validator2(value, opt, opts) : true;
        };
      };
      function assertOptions(options, schema, allowUnknown) {
        if (typeof options !== "object") {
          throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
        }
        const keys = Object.keys(options);
        let i = keys.length;
        while (i-- > 0) {
          const opt = keys[i];
          const validator2 = schema[opt];
          if (validator2) {
            const value = options[opt];
            const result = value === void 0 || validator2(value, opt, options);
            if (result !== true) {
              throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
            }
            continue;
          }
          if (allowUnknown !== true) {
            throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
          }
        }
      }
      var validator = {
        assertOptions,
        validators: validators$1
      };
      var validators = validator.validators;
      var Axios = class {
        constructor(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager$1(),
            response: new InterceptorManager$1()
          };
        }
        /**
         * Dispatch a request
         *
         * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
         * @param {?Object} config
         *
         * @returns {Promise} The Promise to be fulfilled
         */
        async request(configOrUrl, config) {
          try {
            return await this._request(configOrUrl, config);
          } catch (err) {
            if (err instanceof Error) {
              let dummy;
              Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
              const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
              try {
                if (!err.stack) {
                  err.stack = stack;
                } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
                  err.stack += "\n" + stack;
                }
              } catch (e) {
              }
            }
            throw err;
          }
        }
        _request(configOrUrl, config) {
          if (typeof configOrUrl === "string") {
            config = config || {};
            config.url = configOrUrl;
          } else {
            config = configOrUrl || {};
          }
          config = mergeConfig(this.defaults, config);
          const { transitional, paramsSerializer, headers } = config;
          if (transitional !== void 0) {
            validator.assertOptions(transitional, {
              silentJSONParsing: validators.transitional(validators.boolean),
              forcedJSONParsing: validators.transitional(validators.boolean),
              clarifyTimeoutError: validators.transitional(validators.boolean)
            }, false);
          }
          if (paramsSerializer != null) {
            if (utils$1.isFunction(paramsSerializer)) {
              config.paramsSerializer = {
                serialize: paramsSerializer
              };
            } else {
              validator.assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
              }, true);
            }
          }
          config.method = (config.method || this.defaults.method || "get").toLowerCase();
          let contextHeaders = headers && utils$1.merge(
            headers.common,
            headers[config.method]
          );
          headers && utils$1.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            (method) => {
              delete headers[method];
            }
          );
          config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
          const requestInterceptorChain = [];
          let synchronousRequestInterceptors = true;
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
              return;
            }
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
          });
          const responseInterceptorChain = [];
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          });
          let promise;
          let i = 0;
          let len;
          if (!synchronousRequestInterceptors) {
            const chain = [dispatchRequest.bind(this), void 0];
            chain.unshift.apply(chain, requestInterceptorChain);
            chain.push.apply(chain, responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while (i < len) {
              promise = promise.then(chain[i++], chain[i++]);
            }
            return promise;
          }
          len = requestInterceptorChain.length;
          let newConfig = config;
          i = 0;
          while (i < len) {
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
              newConfig = onFulfilled(newConfig);
            } catch (error) {
              onRejected.call(this, error);
              break;
            }
          }
          try {
            promise = dispatchRequest.call(this, newConfig);
          } catch (error) {
            return Promise.reject(error);
          }
          i = 0;
          len = responseInterceptorChain.length;
          while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
          }
          return promise;
        }
        getUri(config) {
          config = mergeConfig(this.defaults, config);
          const fullPath = buildFullPath(config.baseURL, config.url);
          return buildURL(fullPath, config.params, config.paramsSerializer);
        }
      };
      utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            url,
            data: (config || {}).data
          }));
        };
      });
      utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
        function generateHTTPMethod(isForm) {
          return function httpMethod(url, data, config) {
            return this.request(mergeConfig(config || {}, {
              method,
              headers: isForm ? {
                "Content-Type": "multipart/form-data"
              } : {},
              url,
              data
            }));
          };
        }
        Axios.prototype[method] = generateHTTPMethod();
        Axios.prototype[method + "Form"] = generateHTTPMethod(true);
      });
      var Axios$1 = Axios;
      var CancelToken = class _CancelToken {
        constructor(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }
          let resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });
          const token = this;
          this.promise.then((cancel) => {
            if (!token._listeners)
              return;
            let i = token._listeners.length;
            while (i-- > 0) {
              token._listeners[i](cancel);
            }
            token._listeners = null;
          });
          this.promise.then = (onfulfilled) => {
            let _resolve;
            const promise = new Promise((resolve) => {
              token.subscribe(resolve);
              _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
              token.unsubscribe(_resolve);
            };
            return promise;
          };
          executor(function cancel(message, config, request) {
            if (token.reason) {
              return;
            }
            token.reason = new CanceledError(message, config, request);
            resolvePromise(token.reason);
          });
        }
        /**
         * Throws a `CanceledError` if cancellation has been requested.
         */
        throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        }
        /**
         * Subscribe to the cancel signal
         */
        subscribe(listener) {
          if (this.reason) {
            listener(this.reason);
            return;
          }
          if (this._listeners) {
            this._listeners.push(listener);
          } else {
            this._listeners = [listener];
          }
        }
        /**
         * Unsubscribe from the cancel signal
         */
        unsubscribe(listener) {
          if (!this._listeners) {
            return;
          }
          const index = this._listeners.indexOf(listener);
          if (index !== -1) {
            this._listeners.splice(index, 1);
          }
        }
        toAbortSignal() {
          const controller = new AbortController();
          const abort = (err) => {
            controller.abort(err);
          };
          this.subscribe(abort);
          controller.signal.unsubscribe = () => this.unsubscribe(abort);
          return controller.signal;
        }
        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        static source() {
          let cancel;
          const token = new _CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token,
            cancel
          };
        }
      };
      var CancelToken$1 = CancelToken;
      function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      }
      function isAxiosError(payload) {
        return utils$1.isObject(payload) && payload.isAxiosError === true;
      }
      var HttpStatusCode = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511
      };
      Object.entries(HttpStatusCode).forEach(([key, value]) => {
        HttpStatusCode[value] = key;
      });
      var HttpStatusCode$1 = HttpStatusCode;
      function createInstance(defaultConfig) {
        const context = new Axios$1(defaultConfig);
        const instance = bind(Axios$1.prototype.request, context);
        utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
        utils$1.extend(instance, context, null, { allOwnKeys: true });
        instance.create = function create(instanceConfig) {
          return createInstance(mergeConfig(defaultConfig, instanceConfig));
        };
        return instance;
      }
      var axios = createInstance(defaults$1);
      axios.Axios = Axios$1;
      axios.CanceledError = CanceledError;
      axios.CancelToken = CancelToken$1;
      axios.isCancel = isCancel;
      axios.VERSION = VERSION;
      axios.toFormData = toFormData;
      axios.AxiosError = AxiosError;
      axios.Cancel = axios.CanceledError;
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = spread;
      axios.isAxiosError = isAxiosError;
      axios.mergeConfig = mergeConfig;
      axios.AxiosHeaders = AxiosHeaders$1;
      axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
      axios.getAdapter = adapters.getAdapter;
      axios.HttpStatusCode = HttpStatusCode$1;
      axios.default = axios;
      module.exports = axios;
    }
  });

  // node_modules/color-core/dist/utils/components/color-naming.js
  var require_color_naming = __commonJS({
    "node_modules/color-core/dist/utils/components/color-naming.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.colorInfoCache = void 0;
      exports.getColorName = getColorName;
      exports.getColorInfo = getColorInfo;
      var axios_1 = __importDefault(require_axios());
      var ColorInfoCache = (
        /** @class */
        function() {
          function ColorInfoCache2() {
            this.cache = /* @__PURE__ */ new Map();
            this.cacheDuration = 5 * 60 * 1e3;
            this.useCache = true;
          }
          ColorInfoCache2.prototype.set = function(hex, info) {
            if (this.useCache) {
              this.cache.set(hex, { info, timestamp: Date.now() });
            }
          };
          ColorInfoCache2.prototype.setCacheDuration = function(duration) {
            this.cacheDuration = duration;
          };
          ColorInfoCache2.prototype.get = function(hex) {
            if (!this.useCache)
              return null;
            var entry = this.cache.get(hex);
            if (!entry)
              return null;
            if (Date.now() - entry.timestamp > this.cacheDuration) {
              this.cache.delete(hex);
              return null;
            }
            return entry.info;
          };
          ColorInfoCache2.prototype.enableCache = function() {
            this.useCache = true;
          };
          ColorInfoCache2.prototype.disableCache = function() {
            this.useCache = false;
          };
          ColorInfoCache2.prototype.clear = function() {
            this.cache.clear();
          };
          return ColorInfoCache2;
        }()
      );
      exports.colorInfoCache = new ColorInfoCache();
      function getColorName(color) {
        return __awaiter(this, void 0, void 0, function() {
          var colorInfo, error_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, getColorInfo(color)];
              case 1:
                colorInfo = _a.sent();
                return [2, colorInfo.name];
              case 2:
                error_1 = _a.sent();
                console.error("Error fetching color name:", error_1);
                return [2, "Unknown"];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      function getColorInfo(color) {
        return __awaiter(this, void 0, void 0, function() {
          var hex, cachedInfo, response, colorInfo, error_2;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                hex = color.toHex().slice(1);
                cachedInfo = exports.colorInfoCache.get(hex);
                if (cachedInfo) {
                  return [2, cachedInfo];
                }
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, axios_1.default.get("https://api.color.pizza/v1/?values=".concat(hex))];
              case 2:
                response = _a.sent();
                colorInfo = response.data.colors[0];
                exports.colorInfoCache.set(hex, colorInfo);
                return [2, colorInfo];
              case 3:
                error_2 = _a.sent();
                console.error("Error fetching color info:", error_2);
                throw new Error("Failed to fetch color information");
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
    }
  });

  // node_modules/color-core/dist/utils/components/parser.js
  var require_parser = __commonJS({
    "node_modules/color-core/dist/utils/components/parser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseValue = exports.parseAngle = void 0;
      exports.parseColor = parseColor;
      function parseColor(input) {
        input = input.trim().toLowerCase();
        var parsers = [
          parseHex,
          parseRGB,
          parseHSL,
          parseHSV,
          parseHSI,
          parseHWB,
          parseLAB,
          parseXYZ,
          parseLCH,
          parseYUV,
          parseOklab,
          parseOklch,
          parseHPLuv,
          parseHSLuv,
          parseCIELuv,
          parseCIExyY,
          parseCMYK,
          parseSRGB,
          parseAdobeRGB,
          parseGenericColor
        ];
        for (var _i = 0, parsers_1 = parsers; _i < parsers_1.length; _i++) {
          var parser = parsers_1[_i];
          var result = parser(input);
          if (result)
            return result;
        }
        return null;
      }
      var parseHex = function(input) {
        var hexRegex = /^#?([0-9a-f]{3,8})$/;
        var match = input.match(hexRegex);
        if (match) {
          var hex = match[1];
          if (hex.length === 3 || hex.length === 4) {
            hex = hex.split("").map(function(char) {
              return char + char;
            }).join("");
          }
          var r = parseInt(hex.substr(0, 2), 16);
          var g = parseInt(hex.substr(2, 2), 16);
          var b = parseInt(hex.substr(4, 2), 16);
          var a = hex.length === 8 ? parseInt(hex.substr(6, 2), 16) / 255 : 1;
          return { r, g, b, a };
        }
        return null;
      };
      var parseRGB = function(input) {
        var rgbRegex = /^rgba?\(?\s*(-?\d+%?)\s*,?\s*(-?\d+%?)\s*,?\s*(-?\d+%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var rgbMatchColon = input.match(/^rgb:?\s*r:(-?\d+%?),?\s*g:(-?\d+%?),?\s*b:(-?\d+%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(rgbRegex) || rgbMatchColon;
        if (match) {
          var r = match[1], g = match[2], b = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            r: parseValue(r, 255),
            g: parseValue(g, 255),
            b: parseValue(b, 255),
            a: parseValue(a, 1)
          };
        }
        return null;
      };
      var parseHSL = function(input) {
        var hslRegex = /^hsla?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hslMatchColon = input.match(/^hsl:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hslRegex) || hslMatchColon;
        if (match) {
          var h = match[1], s = match[2], l = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            s: parseValue(s, 100),
            l: parseValue(l, 100),
            a: parseValue(a, 1)
          };
        }
        return null;
      };
      var parseHSV = function(input) {
        var hsvRegex = /^hsva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hsvMatchColon = input.match(/^hsv:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*v:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hsvRegex) || hsvMatchColon;
        if (match) {
          var h = match[1], s = match[2], v = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            s: parseValue(s, 100),
            v: parseValue(v, 100),
            a: parseValue(a, 1)
          };
        }
        return null;
      };
      var parseHSI = function(input) {
        var hsiRegex = /^hsia?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hsiMatchColon = input.match(/^hsi:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*i:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hsiRegex) || hsiMatchColon;
        if (match) {
          var h = match[1], s = match[2], i = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            s: parseValue(s, 100),
            i: parseValue(i, 100)
          };
        }
        return null;
      };
      var parseHWB = function(input) {
        var hwbRegex = /^hwba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hwbMatchColon = input.match(/^hwb:?\s*h:(-?\d+(?:\.\d+)?),?\s*w:(-?\d+(?:\.\d+)?%?),?\s*b:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hwbRegex) || hwbMatchColon;
        if (match) {
          var h = match[1], w = match[2], b = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            w: parseValue(w, 100),
            b: parseValue(b, 100)
          };
        }
        return null;
      };
      var parseLAB = function(input) {
        var labRegex = /^laba?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var labMatchColon = input.match(/^lab:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a:(-?\d+(?:\.\d+)?),?\s*b:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(labRegex) || labMatchColon;
        if (match) {
          var l = match[1], a = match[2], b = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            l: parseValue(l, 100),
            a: parseFloat(a),
            b: parseFloat(b)
          };
        }
        return null;
      };
      var parseXYZ = function(input) {
        var xyzRegex = /^xyza?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var xyzMatchColon = input.match(/^xyz:?\s*x:(-?\d+(?:\.\d+)?%?),?\s*y:(-?\d+(?:\.\d+)?%?),?\s*z:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(xyzRegex) || xyzMatchColon;
        if (match) {
          var x = match[1], y = match[2], z = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            x: parseValue(x, 100),
            y: parseValue(y, 100),
            z: parseValue(z, 100)
          };
        }
        return null;
      };
      var parseLCH = function(input) {
        var lchRegex = /^lcha?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var lchMatchColon = input.match(/^lch:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*c:(-?\d+(?:\.\d+)?),?\s*h:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(lchRegex) || lchMatchColon;
        if (match) {
          var l = match[1], c = match[2], h = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            l: parseValue(l, 100),
            c: parseFloat(c),
            h: parseAngle(h),
            alpha: parseValue(alpha, 1)
          };
        }
        return null;
      };
      var parseYUV = function(input) {
        var yuvRegex = /^yuva?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var yuvMatchColon = input.match(/^yuv:?\s*y:(-?\d+(?:\.\d+)?%?),?\s*u:(-?\d+(?:\.\d+)?),?\s*v:(-?\d+(?:\.\d+)?),?\s*a?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(yuvRegex) || yuvMatchColon;
        if (match) {
          var y = match[1], u = match[2], v = match[3], _a = match[4], a = _a === void 0 ? "1" : _a;
          return {
            y: parseValue(y, 100),
            u: parseFloat(u),
            v: parseFloat(v)
          };
        }
        return null;
      };
      var parseOklab = function(input) {
        var oklabRegex = /^oklaba?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var oklabMatchColon = input.match(/^oklab:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a:(-?\d+(?:\.\d+)?),?\s*b:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(oklabRegex) || oklabMatchColon;
        if (match) {
          var L = match[1], a = match[2], b = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            L: parseValue(L, 1),
            a: parseFloat(a),
            b: parseFloat(b)
          };
        }
        return null;
      };
      var parseOklch = function(input) {
        var oklchRegex = /^oklcha?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var oklchMatchColon = input.match(/^oklch:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*c:(-?\d+(?:\.\d+)?),?\s*h:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(oklchRegex) || oklchMatchColon;
        if (match) {
          var L = match[1], C = match[2], h = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            L: parseValue(L, 1),
            C: parseFloat(C),
            h: parseAngle(h)
          };
        }
        return null;
      };
      var parseHPLuv = function(input) {
        var hpluvRegex = /^hpluva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hpluvMatchColon = input.match(/^hpluv:?\s*h:(-?\d+(?:\.\d+)?),?\s*p:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hpluvRegex) || hpluvMatchColon;
        if (match) {
          var h = match[1], p = match[2], l = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            p: parseValue(p, 100),
            l: parseValue(l, 100)
          };
        }
        return null;
      };
      var parseHSLuv = function(input) {
        var hsluvRegex = /^hsluva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var hsluvMatchColon = input.match(/^hsluv:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(hsluvRegex) || hsluvMatchColon;
        if (match) {
          var h = match[1], s = match[2], l = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            h: parseAngle(h),
            s: parseValue(s, 100),
            l: parseValue(l, 100)
          };
        }
        return null;
      };
      var parseCIELuv = function(input) {
        var cieluvRegex = /^cieluva?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var cieluvMatchColon = input.match(/^cieluv:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*u:(-?\d+(?:\.\d+)?),?\s*v:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(cieluvRegex) || cieluvMatchColon;
        if (match) {
          var L = match[1], u = match[2], v = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            L: parseValue(L, 100),
            u: parseFloat(u),
            v: parseFloat(v)
          };
        }
        return null;
      };
      var parseCIExyY = function(input) {
        var ciexyYRegex = /^ciexyya?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var ciexyYMatchColon = input.match(/^ciexyy:?\s*x:(-?\d+(?:\.\d+)?),?\s*y:(-?\d+(?:\.\d+)?),?\s*Y:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(ciexyYRegex) || ciexyYMatchColon;
        if (match) {
          var x = match[1], y = match[2], Y = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            x: parseFloat(x),
            y: parseFloat(y),
            Y: parseValue(Y, 100)
          };
        }
        return null;
      };
      var parseCMYK = function(input) {
        var cmykRegex = /^cmyka?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var cmykMatchColon = input.match(/^cmyk:?\s*c:(-?\d+(?:\.\d+)?%?),?\s*m:(-?\d+(?:\.\d+)?%?),?\s*y:(-?\d+(?:\.\d+)?%?),?\s*k:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(cmykRegex) || cmykMatchColon;
        if (match) {
          var c = match[1], m = match[2], y = match[3], k = match[4], _a = match[5], alpha = _a === void 0 ? "1" : _a;
          return {
            c: parseValue(c, 100),
            m: parseValue(m, 100),
            y: parseValue(y, 100),
            k: parseValue(k, 100)
          };
        }
        return null;
      };
      var parseSRGB = function(input) {
        var srgbRegex = /^srgba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var srgbMatchColon = input.match(/^srgb:?\s*sr:(-?\d+(?:\.\d+)?),?\s*sg:(-?\d+(?:\.\d+)?),?\s*sb:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(srgbRegex) || srgbMatchColon;
        if (match) {
          var sr = match[1], sg = match[2], sb = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            sr: parseFloat(sr),
            sg: parseFloat(sg),
            sb: parseFloat(sb)
          };
        }
        return null;
      };
      var parseAdobeRGB = function(input) {
        var adobeRGBRegex = /^adobergba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i;
        var adobeRGBMatchColon = input.match(/^adobergb:?\s*ar:(-?\d+(?:\.\d+)?),?\s*ag:(-?\d+(?:\.\d+)?),?\s*ab:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i);
        var match = input.match(adobeRGBRegex) || adobeRGBMatchColon;
        if (match) {
          var ar = match[1], ag = match[2], ab = match[3], _a = match[4], alpha = _a === void 0 ? "1" : _a;
          return {
            ar: parseFloat(ar),
            ag: parseFloat(ag),
            ab: parseFloat(ab)
          };
        }
        return null;
      };
      var parseGenericColor = function(input) {
        var genericRegex = /^color\(\s*--(\w+)\s+([-\d.%\s]+)\s*\)$/i;
        var match = input.match(genericRegex);
        if (match) {
          var colorSpace = match[1], values = match[2];
          var parsedValues = values.trim().split(/\s+/).map(function(v) {
            return parseValue(v, 100);
          });
          switch (colorSpace.toLowerCase()) {
            case "rgb":
              return { r: parsedValues[0], g: parsedValues[1], b: parsedValues[2], a: parsedValues[3] || 1 };
            case "hsl":
              return { h: parsedValues[0], s: parsedValues[1], l: parsedValues[2], a: parsedValues[3] || 1 };
            case "hsv":
              return { h: parsedValues[0], s: parsedValues[1], v: parsedValues[2], a: parsedValues[3] || 1 };
            case "hwb":
              return { h: parsedValues[0], w: parsedValues[1], b: parsedValues[2], a: parsedValues[3] || 1 };
            case "lab":
              return { l: parsedValues[0], a: parsedValues[1], b: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "lch":
              return { l: parsedValues[0], c: parsedValues[1], h: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "oklab":
              return { L: parsedValues[0], a: parsedValues[1], b: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "oklch":
              return { L: parsedValues[0], C: parsedValues[1], h: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "xyz":
              return { x: parsedValues[0], y: parsedValues[1], z: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "yuv":
              return { y: parsedValues[0], u: parsedValues[1], v: parsedValues[2], a: parsedValues[3] || 1 };
            case "hsi":
              return { h: parsedValues[0], s: parsedValues[1], i: parsedValues[2], a: parsedValues[3] || 1 };
            case "hsluv":
              return { h: parsedValues[0], s: parsedValues[1], l: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "hpluv":
              return { h: parsedValues[0], p: parsedValues[1], l: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "cieluv":
              return { L: parsedValues[0], u: parsedValues[1], v: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "ciexyy":
              return { x: parsedValues[0], y: parsedValues[1], Y: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "cmyk":
              return {
                c: parsedValues[0],
                m: parsedValues[1],
                y: parsedValues[2],
                k: parsedValues[3],
                alpha: parsedValues[4] || 1
              };
            case "srgb":
              return { sr: parsedValues[0], sg: parsedValues[1], sb: parsedValues[2], alpha: parsedValues[3] || 1 };
            case "adobergb":
              return { ar: parsedValues[0], ag: parsedValues[1], ab: parsedValues[2], alpha: parsedValues[3] || 1 };
            default:
              return null;
          }
        }
        return null;
      };
      var parseValue = function(value, max) {
        if (value.endsWith("%")) {
          return parseFloat(value) / 100 * max;
        }
        return parseFloat(value);
      };
      exports.parseValue = parseValue;
      var parseAngle = function(angle) {
        var value = parseFloat(angle);
        if (angle.endsWith("deg")) {
          return value % 360;
        } else if (angle.endsWith("grad")) {
          return value * 0.9 % 360;
        } else if (angle.endsWith("rad")) {
          return value * 180 / Math.PI % 360;
        } else if (angle.endsWith("turn")) {
          return value * 360 % 360;
        }
        return value % 360;
      };
      exports.parseAngle = parseAngle;
    }
  });

  // node_modules/color-core/dist/utils/index.js
  var require_utils = __commonJS({
    "node_modules/color-core/dist/utils/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseColor = exports.getColorName = exports.getColorInfo = exports.isLightColor = exports.calculateBrightness = void 0;
      var brightness_1 = require_brightness();
      Object.defineProperty(exports, "calculateBrightness", { enumerable: true, get: function() {
        return brightness_1.calculateBrightness;
      } });
      Object.defineProperty(exports, "isLightColor", { enumerable: true, get: function() {
        return brightness_1.isLightColor;
      } });
      var color_naming_1 = require_color_naming();
      Object.defineProperty(exports, "getColorInfo", { enumerable: true, get: function() {
        return color_naming_1.getColorInfo;
      } });
      Object.defineProperty(exports, "getColorName", { enumerable: true, get: function() {
        return color_naming_1.getColorName;
      } });
      var parser_1 = require_parser();
      Object.defineProperty(exports, "parseColor", { enumerable: true, get: function() {
        return parser_1.parseColor;
      } });
    }
  });

  // node_modules/color-core/dist/color.js
  var require_color = __commonJS({
    "node_modules/color-core/dist/color.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Color = void 0;
      var accessability_1 = require_accessability();
      var relative_luminance_1 = require_relative_luminance();
      var conversions_1 = require_conversions();
      var harmony_1 = require_harmony();
      var manipulation_1 = require_manipulation();
      var utils_1 = require_utils();
      var color_naming_1 = require_color_naming();
      var Color = (
        /** @class */
        function() {
          function Color2(color) {
            if (typeof color === "string") {
              var parsedColor = (0, utils_1.parseColor)(color);
              if (parsedColor) {
                this._rgb = this.convertToRgb(parsedColor);
              } else {
                throw new Error("Invalid color format");
              }
            } else {
              this._rgb = this.convertToRgb(color);
            }
            if (this._rgb.a === void 0) {
              this._rgb.a = void 0;
            }
            this._rgb = this.roundObject(this._rgb);
          }
          Color2.prototype.convertToRgb = function(color) {
            var _a;
            if ("r" in color && "g" in color && "b" in color)
              return __assign(__assign({}, color), { a: (_a = color.a) !== null && _a !== void 0 ? _a : 1 });
            if ("sr" in color && "sg" in color && "sb" in color)
              return (0, conversions_1.srgbToRgb)(color);
            if ("x" in color && "y" in color && "z" in color)
              return (0, conversions_1.xyzToRgb)(color);
            if ("l" in color && "a" in color && "b" in color)
              return (0, conversions_1.labToRgb)(color);
            if ("l" in color && "c" in color && "h" in color)
              return (0, conversions_1.lchToRgb)(color);
            if ("y" in color && "u" in color && "v" in color)
              return (0, conversions_1.yuvToRgb)(color);
            if ("L" in color && "u" in color && "v" in color)
              return (0, conversions_1.cieLuvToRgb)(color);
            if ("L" in color && "a" in color && "b" in color)
              return (0, conversions_1.oklabToRgb)(color);
            if ("L" in color && "C" in color && "h" in color)
              return (0, conversions_1.oklchToRgb)(color);
            if ("x" in color && "y" in color && "Y" in color)
              return (0, conversions_1.ciexyyToRgb)(color);
            if ("h" in color && "s" in color && "i" in color)
              return (0, conversions_1.hsiToRgb)(color);
            if ("h" in color && "w" in color && "b" in color)
              return (0, conversions_1.hwbToRgb)(color);
            if ("h" in color && "s" in color && "l" in color)
              return (0, conversions_1.hslToRgb)(color);
            if ("h" in color && "s" in color && "v" in color)
              return (0, conversions_1.hsvToRgb)(color);
            if ("h" in color && "p" in color && "l" in color)
              return (0, conversions_1.hpluvToRgb)(color);
            if ("c" in color && "m" in color && "y" in color && "k" in color)
              return (0, conversions_1.cmykToRgb)(color);
            if ("ar" in color && "ag" in color && "ab" in color)
              return (0, conversions_1.adobeRGBToRGB)(color);
            throw new Error("Invalid color format");
          };
          Object.defineProperty(Color2.prototype, "r", {
            // Getters and setters
            get: function() {
              return this._rgb.r;
            },
            set: function(value) {
              this._rgb.r = Math.max(0, Math.min(255, Math.round(value)));
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Color2.prototype, "g", {
            get: function() {
              return this._rgb.g;
            },
            set: function(value) {
              this._rgb.g = Math.max(0, Math.min(255, Math.round(value)));
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Color2.prototype, "b", {
            get: function() {
              return this._rgb.b;
            },
            set: function(value) {
              this._rgb.b = Math.max(0, Math.min(255, Math.round(value)));
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Color2.prototype, "a", {
            get: function() {
              return this._rgb.a;
            },
            set: function(value) {
              if (value === void 0) {
                this._rgb.a = void 0;
              } else {
                this._rgb.a = Math.max(0, Math.min(1, value));
              }
            },
            enumerable: false,
            configurable: true
          });
          Color2.prototype.toRgb = function() {
            var _a = this._rgb, r = _a.r, g = _a.g, b = _a.b, a = _a.a;
            return a === void 0 ? { r, g, b } : { r, g, b, a };
          };
          Color2.prototype.toHex = function(includeAlpha) {
            if (includeAlpha === void 0) {
              includeAlpha = this._rgb.a !== 1;
            }
            return (0, conversions_1.rgbToHex)(this._rgb, includeAlpha);
          };
          Color2.prototype.toSrgb = function() {
            return this.roundObject((0, conversions_1.rgbToSrgb)(this._rgb));
          };
          Color2.prototype.toHsl = function() {
            return this.roundObject((0, conversions_1.rgbToHsl)(this._rgb));
          };
          Color2.prototype.toHsv = function() {
            return this.roundObject((0, conversions_1.rgbToHsv)(this._rgb));
          };
          Color2.prototype.toHsi = function() {
            return this.roundObject((0, conversions_1.rgbToHsi)(this._rgb));
          };
          Color2.prototype.toHwb = function() {
            return this.roundObject((0, conversions_1.rgbToHwb)(this._rgb));
          };
          Color2.prototype.toLch = function() {
            return this.roundObject((0, conversions_1.rgbToLch)(this._rgb));
          };
          Color2.prototype.toYuv = function() {
            return this.roundObject((0, conversions_1.rgbToYuv)(this._rgb));
          };
          Color2.prototype.toCmyk = function() {
            return this.roundObject((0, conversions_1.rgbToCmyk)(this._rgb));
          };
          Color2.prototype.toOklab = function() {
            return this.roundObject((0, conversions_1.rgbToOklab)(this._rgb));
          };
          Color2.prototype.toOklch = function() {
            return this.roundObject((0, conversions_1.rgbToOklch)(this._rgb));
          };
          Color2.prototype.toHSLuv = function() {
            return this.roundObject((0, conversions_1.rgbToHSLuv)(this._rgb));
          };
          Color2.prototype.toHPLuv = function() {
            return this.roundObject((0, conversions_1.rgbToHPLuv)(this._rgb));
          };
          Color2.prototype.toCIELuv = function() {
            return this.roundObject((0, conversions_1.rgbToCIELuv)(this._rgb));
          };
          Color2.prototype.toCIExyY = function() {
            return this.roundObject((0, conversions_1.rgbToCIExyY)(this._rgb));
          };
          Color2.prototype.toAdobeRGB = function() {
            return this.roundObject((0, conversions_1.rgbToAdobeRGB)(this._rgb));
          };
          Color2.prototype.toXyz = function() {
            return this.roundObject((0, conversions_1.rgbToXyz)(this._rgb));
          };
          Color2.prototype.toXyzD50 = function() {
            return this.roundObject((0, conversions_1.rgbToXyzD50)(this._rgb));
          };
          Color2.prototype.toLab = function() {
            return this.roundObject((0, conversions_1.rgbToLab)(this._rgb));
          };
          Color2.prototype.toLabD50 = function() {
            return this.roundObject((0, conversions_1.rgbToLabD50)(this._rgb));
          };
          Color2.prototype.complementary = function() {
            return (0, harmony_1.complementary)(this);
          };
          Color2.prototype.analogous = function(angle) {
            return (0, harmony_1.analogous)(this, angle);
          };
          Color2.prototype.triadic = function() {
            return (0, harmony_1.triadic)(this);
          };
          Color2.prototype.tetradic = function(angle) {
            return (0, harmony_1.tetradic)(this);
          };
          Color2.prototype.splitComplementary = function(angle) {
            return (0, harmony_1.splitComplementary)(this, angle);
          };
          Color2.prototype.monochromatic = function(count) {
            return (0, harmony_1.monochromatic)(this, count);
          };
          Color2.prototype.square = function() {
            return (0, harmony_1.square)(this);
          };
          Color2.prototype.doubleSplitComplementary = function(angle) {
            return (0, harmony_1.doubleSplitComplementary)(this);
          };
          Color2.prototype.shades = function(count) {
            return (0, harmony_1.shades)(this, count);
          };
          Color2.prototype.tints = function(count) {
            return (0, harmony_1.tints)(this, count);
          };
          Color2.prototype.tones = function(count) {
            return (0, harmony_1.tones)(this, count);
          };
          Color2.prototype.adjustLightness = function(amount) {
            return (0, manipulation_1.adjustLightness)(this, amount);
          };
          Color2.prototype.adjustSaturation = function(amount) {
            return (0, manipulation_1.adjustSaturation)(this, amount);
          };
          Color2.prototype.adjustHue = function(amount) {
            return (0, manipulation_1.adjustHue)(this, amount);
          };
          Color2.prototype.adjustAlpha = function(amount) {
            return (0, manipulation_1.adjustAlpha)(this, amount);
          };
          Color2.prototype.invert = function() {
            return (0, manipulation_1.invert)(this);
          };
          Color2.prototype.grayscale = function() {
            return (0, manipulation_1.grayscale)(this);
          };
          Color2.prototype.mix = function(color, amount) {
            return (0, manipulation_1.mix)(this, color, amount);
          };
          Color2.setPrecision = function(precision) {
            Color2.PRECISION = precision;
          };
          Color2.prototype.toString = function(includeAlpha) {
            if (includeAlpha === void 0) {
              includeAlpha = false;
            }
            return this.toHex(includeAlpha);
          };
          Color2.prototype.setAlpha = function(value) {
            this.a = value;
            return this;
          };
          Color2.prototype.getEffectiveAlpha = function() {
            var _a;
            return (_a = this.a) !== null && _a !== void 0 ? _a : 1;
          };
          Color2.prototype.getName = function() {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2, (0, color_naming_1.getColorName)(this)];
              });
            });
          };
          Color2.prototype.getInfo = function() {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2, (0, color_naming_1.getColorInfo)(this)];
              });
            });
          };
          Color2.prototype.getBrightness = function() {
            return (0, utils_1.calculateBrightness)(this._rgb);
          };
          Color2.prototype.isLight = function(threshold) {
            if (threshold === void 0) {
              threshold = 128;
            }
            return (0, utils_1.isLightColor)(this._rgb, threshold);
          };
          Color2.prototype.getRelativeLuminance = function() {
            return (0, relative_luminance_1.getRelativeLuminance)(this);
          };
          Color2.prototype.getContrastRatio = function(otherColor) {
            return (0, accessability_1.getContrastRatio)(this, otherColor);
          };
          Color2.prototype.getWCAGCompliance = function(otherColor, size) {
            return (0, accessability_1.getWCAGCompliance)(this, otherColor, size);
          };
          Color2.prototype.equals = function(other) {
            var rgb1 = this.toRgb();
            var rgb2 = other.toRgb();
            return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b && rgb1.a === rgb2.a;
          };
          Color2.prototype.roundNumber = function(num) {
            return Number(num.toFixed(Color2.PRECISION));
          };
          Color2.prototype.roundObject = function(obj) {
            var _this = this;
            return Object.fromEntries(Object.entries(obj).map(function(_a) {
              var key = _a[0], value = _a[1];
              return [key, typeof value === "number" ? _this.roundNumber(value) : value];
            }));
          };
          Color2.PRECISION = 6;
          return Color2;
        }()
      );
      exports.Color = Color;
    }
  });

  // node_modules/color-core/dist/harmony/components/analogous.js
  var require_analogous = __commonJS({
    "node_modules/color-core/dist/harmony/components/analogous.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.analogous = analogous;
      var color_1 = require_color();
      function analogous(color, angle) {
        if (angle === void 0) {
          angle = 30;
        }
        var hsl = color.toHsl();
        var color1 = {
          h: (hsl.h + 360 - angle) % 360,
          s: hsl.s,
          l: hsl.l
        };
        var color2 = {
          h: (hsl.h + angle) % 360,
          s: hsl.s,
          l: hsl.l
        };
        return [new color_1.Color(color1), color, new color_1.Color(color2)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/complementary.js
  var require_complementary = __commonJS({
    "node_modules/color-core/dist/harmony/components/complementary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.complementary = complementary;
      var color_1 = require_color();
      function complementary(color) {
        var hsl = color.toHsl();
        var complement = {
          h: (hsl.h + 180) % 360,
          s: hsl.s,
          l: hsl.l
        };
        return [color, new color_1.Color(complement)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/double-split-complementary.js
  var require_double_split_complementary = __commonJS({
    "node_modules/color-core/dist/harmony/components/double-split-complementary.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doubleSplitComplementary = doubleSplitComplementary;
      var color_1 = require_color();
      function doubleSplitComplementary(color) {
        var hsl = color.toHsl();
        var color1 = __assign(__assign({}, hsl), { h: (hsl.h + 150) % 360 });
        var color2 = __assign(__assign({}, hsl), { h: (hsl.h + 210) % 360 });
        var color3 = __assign(__assign({}, hsl), { h: (hsl.h + 330) % 360 });
        var color4 = __assign(__assign({}, hsl), { h: (hsl.h + 30) % 360 });
        return [
          color,
          new color_1.Color(color1),
          new color_1.Color(color2),
          new color_1.Color(color3),
          new color_1.Color(color4)
        ];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/monochromatic.js
  var require_monochromatic = __commonJS({
    "node_modules/color-core/dist/harmony/components/monochromatic.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.monochromatic = monochromatic;
      var color_1 = require_color();
      function monochromatic(color, count) {
        if (count === void 0) {
          count = 5;
        }
        var hsl = color.toHsl();
        var step = 100 / (count - 1);
        return Array.from({ length: count }, function(_, i) {
          var newColor = {
            h: hsl.h,
            s: hsl.s,
            l: Math.min(100, Math.max(0, i * step))
          };
          return new color_1.Color(newColor);
        });
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/shades.js
  var require_shades = __commonJS({
    "node_modules/color-core/dist/harmony/components/shades.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shades = shades;
      var color_1 = require_color();
      function shades(color, count) {
        if (count === void 0) {
          count = 5;
        }
        var hsl = color.toHsl();
        var step = hsl.l / (count - 1);
        return Array.from({ length: count }, function(_, i) {
          var newHsl = {
            h: hsl.h,
            s: hsl.s,
            l: Math.max(0, Math.min(100, hsl.l - i * step))
          };
          return new color_1.Color(newHsl);
        });
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/split-complementary.js
  var require_split_complementary = __commonJS({
    "node_modules/color-core/dist/harmony/components/split-complementary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.splitComplementary = splitComplementary;
      var color_1 = require_color();
      function splitComplementary(color, angle) {
        if (angle === void 0) {
          angle = 30;
        }
        var hsl = color.toHsl();
        var color1 = {
          h: (hsl.h + 180 - angle) % 360,
          s: hsl.s,
          l: hsl.l
        };
        var color2 = {
          h: (hsl.h + 180 + angle) % 360,
          s: hsl.s,
          l: hsl.l
        };
        return [color, new color_1.Color(color1), new color_1.Color(color2)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/square.js
  var require_square = __commonJS({
    "node_modules/color-core/dist/harmony/components/square.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.square = square;
      var color_1 = require_color();
      function square(color) {
        var hsl = color.toHsl();
        var color1 = __assign(__assign({}, hsl), { h: (hsl.h + 90) % 360 });
        var color2 = __assign(__assign({}, hsl), { h: (hsl.h + 180) % 360 });
        var color3 = __assign(__assign({}, hsl), { h: (hsl.h + 270) % 360 });
        return [color, new color_1.Color(color1), new color_1.Color(color2), new color_1.Color(color3)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/tetradic.js
  var require_tetradic = __commonJS({
    "node_modules/color-core/dist/harmony/components/tetradic.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tetradic = tetradic;
      var color_1 = require_color();
      function tetradic(color) {
        var hsl = color.toHsl();
        var color1 = {
          h: (hsl.h + 90) % 360,
          s: hsl.s,
          l: hsl.l
        };
        var color2 = {
          h: (hsl.h + 180) % 360,
          s: hsl.s,
          l: hsl.l
        };
        var color3 = {
          h: (hsl.h + 270) % 360,
          s: hsl.s,
          l: hsl.l
        };
        return [color, new color_1.Color(color1), new color_1.Color(color2), new color_1.Color(color3)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/tints.js
  var require_tints = __commonJS({
    "node_modules/color-core/dist/harmony/components/tints.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tints = tints;
      var color_1 = require_color();
      function tints(color, count) {
        if (count === void 0) {
          count = 5;
        }
        var hsl = color.toHsl();
        var step = (100 - hsl.l) / (count - 1);
        return Array.from({ length: count }, function(_, i) {
          var newColor = __assign(__assign({}, hsl), { l: Math.min(100, hsl.l + i * step) });
          return new color_1.Color(newColor);
        });
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/tones.js
  var require_tones = __commonJS({
    "node_modules/color-core/dist/harmony/components/tones.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tones = tones;
      var color_1 = require_color();
      function tones(color, count) {
        if (count === void 0) {
          count = 5;
        }
        var hsl = color.toHsl();
        var step = hsl.s / (count - 1);
        return Array.from({ length: count }, function(_, i) {
          var newColor = __assign(__assign({}, hsl), { s: Math.max(0, hsl.s - i * step) });
          return new color_1.Color(newColor);
        });
      }
    }
  });

  // node_modules/color-core/dist/harmony/components/triadic.js
  var require_triadic = __commonJS({
    "node_modules/color-core/dist/harmony/components/triadic.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.triadic = triadic;
      var color_1 = require_color();
      function triadic(color) {
        var hsl = color.toHsl();
        var color1 = {
          h: (hsl.h + 120) % 360,
          s: hsl.s,
          l: hsl.l
        };
        var color2 = {
          h: (hsl.h + 240) % 360,
          s: hsl.s,
          l: hsl.l
        };
        return [color, new color_1.Color(color1), new color_1.Color(color2)];
      }
    }
  });

  // node_modules/color-core/dist/harmony/index.js
  var require_harmony = __commonJS({
    "node_modules/color-core/dist/harmony/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.triadic = exports.tones = exports.tints = exports.tetradic = exports.square = exports.splitComplementary = exports.shades = exports.monochromatic = exports.doubleSplitComplementary = exports.complementary = exports.analogous = void 0;
      var analogous_1 = require_analogous();
      Object.defineProperty(exports, "analogous", { enumerable: true, get: function() {
        return analogous_1.analogous;
      } });
      var complementary_1 = require_complementary();
      Object.defineProperty(exports, "complementary", { enumerable: true, get: function() {
        return complementary_1.complementary;
      } });
      var double_split_complementary_1 = require_double_split_complementary();
      Object.defineProperty(exports, "doubleSplitComplementary", { enumerable: true, get: function() {
        return double_split_complementary_1.doubleSplitComplementary;
      } });
      var monochromatic_1 = require_monochromatic();
      Object.defineProperty(exports, "monochromatic", { enumerable: true, get: function() {
        return monochromatic_1.monochromatic;
      } });
      var shades_1 = require_shades();
      Object.defineProperty(exports, "shades", { enumerable: true, get: function() {
        return shades_1.shades;
      } });
      var split_complementary_1 = require_split_complementary();
      Object.defineProperty(exports, "splitComplementary", { enumerable: true, get: function() {
        return split_complementary_1.splitComplementary;
      } });
      var square_1 = require_square();
      Object.defineProperty(exports, "square", { enumerable: true, get: function() {
        return square_1.square;
      } });
      var tetradic_1 = require_tetradic();
      Object.defineProperty(exports, "tetradic", { enumerable: true, get: function() {
        return tetradic_1.tetradic;
      } });
      var tints_1 = require_tints();
      Object.defineProperty(exports, "tints", { enumerable: true, get: function() {
        return tints_1.tints;
      } });
      var tones_1 = require_tones();
      Object.defineProperty(exports, "tones", { enumerable: true, get: function() {
        return tones_1.tones;
      } });
      var triadic_1 = require_triadic();
      Object.defineProperty(exports, "triadic", { enumerable: true, get: function() {
        return triadic_1.triadic;
      } });
    }
  });

  // node_modules/color-core/dist/scales/components/diverging-scale.js
  var require_diverging_scale = __commonJS({
    "node_modules/color-core/dist/scales/components/diverging-scale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createDivergingScale = createDivergingScale;
      function createDivergingScale(options) {
        var startColor = options.startColor, midColor = options.midColor, endColor = options.endColor, steps = options.steps;
        if (steps < 3) {
          throw new Error("Steps must be at least 3 to create a diverging scale");
        }
        var scale = [];
        var halfSteps = Math.floor(steps / 2);
        var hasMiddleStep = steps % 2 !== 0;
        for (var i = 0; i <= halfSteps; i++) {
          var t = i / halfSteps;
          scale.push(startColor.mix(midColor, t));
        }
        if (!hasMiddleStep) {
          scale.pop();
        }
        for (var i = 1; i <= halfSteps; i++) {
          var t = i / halfSteps;
          scale.push(midColor.mix(endColor, t));
        }
        return scale;
      }
    }
  });

  // node_modules/color-core/dist/scales/components/sequential-scale.js
  var require_sequential_scale = __commonJS({
    "node_modules/color-core/dist/scales/components/sequential-scale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createSequentialScale = createSequentialScale;
      function createSequentialScale(options) {
        var startColor = options.startColor, endColor = options.endColor, steps = options.steps;
        if (steps < 2) {
          throw new Error("Steps must be at least 2 to create a scale");
        }
        var scale = [];
        for (var i = 0; i < steps; i++) {
          var t = i / (steps - 1);
          scale.push(startColor.mix(endColor, t));
        }
        return scale;
      }
    }
  });

  // node_modules/color-core/dist/scales/components/multi-hue-sequential-scale.js
  var require_multi_hue_sequential_scale = __commonJS({
    "node_modules/color-core/dist/scales/components/multi-hue-sequential-scale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createMultiHueSequentialScale = createMultiHueSequentialScale;
      function createMultiHueSequentialScale(options) {
        var colorStops = options.colorStops, steps = options.steps;
        if (colorStops.length < 2) {
          throw new Error("At least two color stops are required");
        }
        if (steps < 2) {
          throw new Error("Number of steps must be at least 2");
        }
        var scale = [];
        var segmentSize = (steps - 1) / (colorStops.length - 1);
        for (var i = 0; i < colorStops.length - 1; i++) {
          var start = colorStops[i];
          var end = colorStops[i + 1];
          var segmentSteps = i === colorStops.length - 2 ? Math.ceil(segmentSize) : Math.floor(segmentSize);
          for (var j = 0; j < segmentSteps; j++) {
            var t = j / segmentSteps;
            scale.push(start.mix(end, t));
          }
        }
        if (scale.length < steps) {
          scale.push(colorStops[colorStops.length - 1]);
        }
        return scale;
      }
    }
  });

  // node_modules/color-core/dist/scales/components/perceptually-uniform-scale.js
  var require_perceptually_uniform_scale = __commonJS({
    "node_modules/color-core/dist/scales/components/perceptually-uniform-scale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createPerceptuallyUniformScale = createPerceptuallyUniformScale;
      var color_1 = require_color();
      var conversions_1 = require_conversions();
      function createPerceptuallyUniformScale(startColor, endColor, steps) {
        if (steps < 2) {
          throw new Error("Number of steps must be at least 2");
        }
        var startLab = (0, conversions_1.rgbToLab)(startColor.toRgb());
        var endLab = (0, conversions_1.rgbToLab)(endColor.toRgb());
        var scale = [];
        for (var i = 0; i < steps; i++) {
          var t = i / (steps - 1);
          var lab = {
            l: startLab.l + t * (endLab.l - startLab.l),
            a: startLab.a + t * (endLab.a - startLab.a),
            b: startLab.b + t * (endLab.b - startLab.b)
          };
          var rgb = (0, conversions_1.labToRgb)(lab);
          scale.push(new color_1.Color(rgb));
        }
        return scale;
      }
    }
  });

  // node_modules/color-core/dist/scales/components/qualitative-scale.js
  var require_qualitative_scale = __commonJS({
    "node_modules/color-core/dist/scales/components/qualitative-scale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createQualitativeScale = createQualitativeScale;
      var color_1 = require_color();
      var conversions_1 = require_conversions();
      function createQualitativeScale(numberOfColors) {
        if (numberOfColors < 1) {
          throw new Error("Number of colors must be at least 1");
        }
        var goldenRatioConjugate = 0.618033988749895;
        var scale = [];
        for (var i = 0; i < numberOfColors; i++) {
          var hue = i * goldenRatioConjugate % 1;
          var saturation = 0.5 + Math.random() * 0.3;
          var lightness = 0.4 + Math.random() * 0.2;
          var rgb = (0, conversions_1.hslToRgb)({ h: hue * 360, s: saturation * 100, l: lightness * 100 });
          scale.push(new color_1.Color(rgb));
        }
        return scale;
      }
    }
  });

  // node_modules/color-core/dist/scales/index.js
  var require_scales = __commonJS({
    "node_modules/color-core/dist/scales/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createQualitativeScale = exports.createPerceptuallyUniformScale = exports.createMultiHueSequentialScale = exports.createSequentialScale = exports.createDivergingScale = void 0;
      var diverging_scale_1 = require_diverging_scale();
      Object.defineProperty(exports, "createDivergingScale", { enumerable: true, get: function() {
        return diverging_scale_1.createDivergingScale;
      } });
      var sequential_scale_1 = require_sequential_scale();
      Object.defineProperty(exports, "createSequentialScale", { enumerable: true, get: function() {
        return sequential_scale_1.createSequentialScale;
      } });
      var multi_hue_sequential_scale_1 = require_multi_hue_sequential_scale();
      Object.defineProperty(exports, "createMultiHueSequentialScale", { enumerable: true, get: function() {
        return multi_hue_sequential_scale_1.createMultiHueSequentialScale;
      } });
      var perceptually_uniform_scale_1 = require_perceptually_uniform_scale();
      Object.defineProperty(exports, "createPerceptuallyUniformScale", { enumerable: true, get: function() {
        return perceptually_uniform_scale_1.createPerceptuallyUniformScale;
      } });
      var qualitative_scale_1 = require_qualitative_scale();
      Object.defineProperty(exports, "createQualitativeScale", { enumerable: true, get: function() {
        return qualitative_scale_1.createQualitativeScale;
      } });
    }
  });

  // node_modules/color-core/dist/index.js
  var require_dist = __commonJS({
    "node_modules/color-core/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tetradic = exports.square = exports.splitComplementary = exports.shades = exports.monochromatic = exports.doubleSplitComplementary = exports.complementary = exports.analogous = exports.yuvToRgb = exports.xyzToRgb = exports.xyzD65ToD50 = exports.xyzD50ToD65 = exports.srgbToRgb = exports.srgbToLinearSrgb = exports.rgbToYuv = exports.rgbToXyz = exports.rgbToSrgb = exports.rgbToOklch = exports.rgbToOklab = exports.rgbToLch = exports.rgbToLab = exports.rgbToHwb = exports.rgbToHsv = exports.rgbToHsl = exports.rgbToHsi = exports.rgbToHex = exports.rgbToHSLuv = exports.rgbToHPLuv = exports.rgbToCmyk = exports.rgbToCIExyY = exports.rgbToCIELuv = exports.rgbToAdobeRGB = exports.oklchToRgb = exports.oklabToRgb = exports.oklabToLinearSrgb = exports.linearSrgbToSrgb = exports.linearSrgbToOklab = exports.lchToRgb = exports.labToRgb = exports.hwbToRgb = exports.hsvToRgb = exports.hsluvToRgb = exports.hslToRgb = exports.hsiToRgb = exports.hpluvToRgb = exports.hexToRgb = exports.cmykToRgb = exports.ciexyyToRgb = exports.cieLuvToRgb = exports.adobeRGBToRGB = void 0;
      exports.getWCAGCompliance = exports.getRelativeLuminance = exports.getContrastRatio = exports.getColorName = exports.getColorInfo = exports.Color = exports.createSequentialScale = exports.createQualitativeScale = exports.createPerceptuallyUniformScale = exports.createMultiHueSequentialScale = exports.createDivergingScale = exports.mix = exports.invert = exports.grayscale = exports.adjustSaturation = exports.adjustLightness = exports.adjustHue = exports.adjustAlpha = exports.triadic = exports.tones = exports.tints = void 0;
      var conversions_1 = require_conversions();
      Object.defineProperty(exports, "adobeRGBToRGB", { enumerable: true, get: function() {
        return conversions_1.adobeRGBToRGB;
      } });
      Object.defineProperty(exports, "cieLuvToRgb", { enumerable: true, get: function() {
        return conversions_1.cieLuvToRgb;
      } });
      Object.defineProperty(exports, "ciexyyToRgb", { enumerable: true, get: function() {
        return conversions_1.ciexyyToRgb;
      } });
      Object.defineProperty(exports, "cmykToRgb", { enumerable: true, get: function() {
        return conversions_1.cmykToRgb;
      } });
      Object.defineProperty(exports, "hexToRgb", { enumerable: true, get: function() {
        return conversions_1.hexToRgb;
      } });
      Object.defineProperty(exports, "hpluvToRgb", { enumerable: true, get: function() {
        return conversions_1.hpluvToRgb;
      } });
      Object.defineProperty(exports, "hsiToRgb", { enumerable: true, get: function() {
        return conversions_1.hsiToRgb;
      } });
      Object.defineProperty(exports, "hslToRgb", { enumerable: true, get: function() {
        return conversions_1.hslToRgb;
      } });
      Object.defineProperty(exports, "hsluvToRgb", { enumerable: true, get: function() {
        return conversions_1.hsluvToRgb;
      } });
      Object.defineProperty(exports, "hsvToRgb", { enumerable: true, get: function() {
        return conversions_1.hsvToRgb;
      } });
      Object.defineProperty(exports, "hwbToRgb", { enumerable: true, get: function() {
        return conversions_1.hwbToRgb;
      } });
      Object.defineProperty(exports, "labToRgb", { enumerable: true, get: function() {
        return conversions_1.labToRgb;
      } });
      Object.defineProperty(exports, "lchToRgb", { enumerable: true, get: function() {
        return conversions_1.lchToRgb;
      } });
      Object.defineProperty(exports, "linearSrgbToOklab", { enumerable: true, get: function() {
        return conversions_1.linearSrgbToOklab;
      } });
      Object.defineProperty(exports, "linearSrgbToSrgb", { enumerable: true, get: function() {
        return conversions_1.linearSrgbToSrgb;
      } });
      Object.defineProperty(exports, "oklabToLinearSrgb", { enumerable: true, get: function() {
        return conversions_1.oklabToLinearSrgb;
      } });
      Object.defineProperty(exports, "oklabToRgb", { enumerable: true, get: function() {
        return conversions_1.oklabToRgb;
      } });
      Object.defineProperty(exports, "oklchToRgb", { enumerable: true, get: function() {
        return conversions_1.oklchToRgb;
      } });
      Object.defineProperty(exports, "rgbToAdobeRGB", { enumerable: true, get: function() {
        return conversions_1.rgbToAdobeRGB;
      } });
      Object.defineProperty(exports, "rgbToCIELuv", { enumerable: true, get: function() {
        return conversions_1.rgbToCIELuv;
      } });
      Object.defineProperty(exports, "rgbToCIExyY", { enumerable: true, get: function() {
        return conversions_1.rgbToCIExyY;
      } });
      Object.defineProperty(exports, "rgbToCmyk", { enumerable: true, get: function() {
        return conversions_1.rgbToCmyk;
      } });
      Object.defineProperty(exports, "rgbToHPLuv", { enumerable: true, get: function() {
        return conversions_1.rgbToHPLuv;
      } });
      Object.defineProperty(exports, "rgbToHSLuv", { enumerable: true, get: function() {
        return conversions_1.rgbToHSLuv;
      } });
      Object.defineProperty(exports, "rgbToHex", { enumerable: true, get: function() {
        return conversions_1.rgbToHex;
      } });
      Object.defineProperty(exports, "rgbToHsi", { enumerable: true, get: function() {
        return conversions_1.rgbToHsi;
      } });
      Object.defineProperty(exports, "rgbToHsl", { enumerable: true, get: function() {
        return conversions_1.rgbToHsl;
      } });
      Object.defineProperty(exports, "rgbToHsv", { enumerable: true, get: function() {
        return conversions_1.rgbToHsv;
      } });
      Object.defineProperty(exports, "rgbToHwb", { enumerable: true, get: function() {
        return conversions_1.rgbToHwb;
      } });
      Object.defineProperty(exports, "rgbToLab", { enumerable: true, get: function() {
        return conversions_1.rgbToLab;
      } });
      Object.defineProperty(exports, "rgbToLch", { enumerable: true, get: function() {
        return conversions_1.rgbToLch;
      } });
      Object.defineProperty(exports, "rgbToOklab", { enumerable: true, get: function() {
        return conversions_1.rgbToOklab;
      } });
      Object.defineProperty(exports, "rgbToOklch", { enumerable: true, get: function() {
        return conversions_1.rgbToOklch;
      } });
      Object.defineProperty(exports, "rgbToSrgb", { enumerable: true, get: function() {
        return conversions_1.rgbToSrgb;
      } });
      Object.defineProperty(exports, "rgbToXyz", { enumerable: true, get: function() {
        return conversions_1.rgbToXyz;
      } });
      Object.defineProperty(exports, "rgbToYuv", { enumerable: true, get: function() {
        return conversions_1.rgbToYuv;
      } });
      Object.defineProperty(exports, "srgbToLinearSrgb", { enumerable: true, get: function() {
        return conversions_1.srgbToLinearSrgb;
      } });
      Object.defineProperty(exports, "srgbToRgb", { enumerable: true, get: function() {
        return conversions_1.srgbToRgb;
      } });
      Object.defineProperty(exports, "xyzD50ToD65", { enumerable: true, get: function() {
        return conversions_1.xyzD50ToD65;
      } });
      Object.defineProperty(exports, "xyzD65ToD50", { enumerable: true, get: function() {
        return conversions_1.xyzD65ToD50;
      } });
      Object.defineProperty(exports, "xyzToRgb", { enumerable: true, get: function() {
        return conversions_1.xyzToRgb;
      } });
      Object.defineProperty(exports, "yuvToRgb", { enumerable: true, get: function() {
        return conversions_1.yuvToRgb;
      } });
      var harmony_1 = require_harmony();
      Object.defineProperty(exports, "analogous", { enumerable: true, get: function() {
        return harmony_1.analogous;
      } });
      Object.defineProperty(exports, "complementary", { enumerable: true, get: function() {
        return harmony_1.complementary;
      } });
      Object.defineProperty(exports, "doubleSplitComplementary", { enumerable: true, get: function() {
        return harmony_1.doubleSplitComplementary;
      } });
      Object.defineProperty(exports, "monochromatic", { enumerable: true, get: function() {
        return harmony_1.monochromatic;
      } });
      Object.defineProperty(exports, "shades", { enumerable: true, get: function() {
        return harmony_1.shades;
      } });
      Object.defineProperty(exports, "splitComplementary", { enumerable: true, get: function() {
        return harmony_1.splitComplementary;
      } });
      Object.defineProperty(exports, "square", { enumerable: true, get: function() {
        return harmony_1.square;
      } });
      Object.defineProperty(exports, "tetradic", { enumerable: true, get: function() {
        return harmony_1.tetradic;
      } });
      Object.defineProperty(exports, "tints", { enumerable: true, get: function() {
        return harmony_1.tints;
      } });
      Object.defineProperty(exports, "tones", { enumerable: true, get: function() {
        return harmony_1.tones;
      } });
      Object.defineProperty(exports, "triadic", { enumerable: true, get: function() {
        return harmony_1.triadic;
      } });
      var manipulation_1 = require_manipulation();
      Object.defineProperty(exports, "adjustAlpha", { enumerable: true, get: function() {
        return manipulation_1.adjustAlpha;
      } });
      Object.defineProperty(exports, "adjustHue", { enumerable: true, get: function() {
        return manipulation_1.adjustHue;
      } });
      Object.defineProperty(exports, "adjustLightness", { enumerable: true, get: function() {
        return manipulation_1.adjustLightness;
      } });
      Object.defineProperty(exports, "adjustSaturation", { enumerable: true, get: function() {
        return manipulation_1.adjustSaturation;
      } });
      Object.defineProperty(exports, "grayscale", { enumerable: true, get: function() {
        return manipulation_1.grayscale;
      } });
      Object.defineProperty(exports, "invert", { enumerable: true, get: function() {
        return manipulation_1.invert;
      } });
      Object.defineProperty(exports, "mix", { enumerable: true, get: function() {
        return manipulation_1.mix;
      } });
      var scales_1 = require_scales();
      Object.defineProperty(exports, "createDivergingScale", { enumerable: true, get: function() {
        return scales_1.createDivergingScale;
      } });
      Object.defineProperty(exports, "createMultiHueSequentialScale", { enumerable: true, get: function() {
        return scales_1.createMultiHueSequentialScale;
      } });
      Object.defineProperty(exports, "createPerceptuallyUniformScale", { enumerable: true, get: function() {
        return scales_1.createPerceptuallyUniformScale;
      } });
      Object.defineProperty(exports, "createQualitativeScale", { enumerable: true, get: function() {
        return scales_1.createQualitativeScale;
      } });
      Object.defineProperty(exports, "createSequentialScale", { enumerable: true, get: function() {
        return scales_1.createSequentialScale;
      } });
      var color_1 = require_color();
      Object.defineProperty(exports, "Color", { enumerable: true, get: function() {
        return color_1.Color;
      } });
      var utils_1 = require_utils();
      Object.defineProperty(exports, "getColorInfo", { enumerable: true, get: function() {
        return utils_1.getColorInfo;
      } });
      Object.defineProperty(exports, "getColorName", { enumerable: true, get: function() {
        return utils_1.getColorName;
      } });
      var accessability_1 = require_accessability();
      Object.defineProperty(exports, "getContrastRatio", { enumerable: true, get: function() {
        return accessability_1.getContrastRatio;
      } });
      Object.defineProperty(exports, "getRelativeLuminance", { enumerable: true, get: function() {
        return accessability_1.getRelativeLuminance;
      } });
      Object.defineProperty(exports, "getWCAGCompliance", { enumerable: true, get: function() {
        return accessability_1.getWCAGCompliance;
      } });
    }
  });

  // app.jsx
  var app_exports = {};
  __reExport(app_exports, __toESM(require_dist()));
  return app_exports
})();
export default exports;
export const adobeRGBToRGB = exports.adobeRGBToRGB;
export const cieLuvToRgb = exports.cieLuvToRgb;
export const ciexyyToRgb = exports.ciexyyToRgb;
export const cmykToRgb = exports.cmykToRgb;
export const hexToRgb = exports.hexToRgb;
export const hpluvToRgb = exports.hpluvToRgb;
export const hsiToRgb = exports.hsiToRgb;
export const hslToRgb = exports.hslToRgb;
export const hsluvToRgb = exports.hsluvToRgb;
export const hsvToRgb = exports.hsvToRgb;
export const hwbToRgb = exports.hwbToRgb;
export const labToRgb = exports.labToRgb;
export const lchToRgb = exports.lchToRgb;
export const linearSrgbToOklab = exports.linearSrgbToOklab;
export const linearSrgbToSrgb = exports.linearSrgbToSrgb;
export const oklabToLinearSrgb = exports.oklabToLinearSrgb;
export const oklabToRgb = exports.oklabToRgb;
export const oklchToRgb = exports.oklchToRgb;
export const rgbToAdobeRGB = exports.rgbToAdobeRGB;
export const rgbToCIELuv = exports.rgbToCIELuv;
export const rgbToCIExyY = exports.rgbToCIExyY;
export const rgbToCmyk = exports.rgbToCmyk;
export const rgbToHPLuv = exports.rgbToHPLuv;
export const rgbToHSLuv = exports.rgbToHSLuv;
export const rgbToHex = exports.rgbToHex;
export const rgbToHsi = exports.rgbToHsi;
export const rgbToHsl = exports.rgbToHsl;
export const rgbToHsv = exports.rgbToHsv;
export const rgbToHwb = exports.rgbToHwb;
export const rgbToLab = exports.rgbToLab;
export const rgbToLch = exports.rgbToLch;
export const rgbToOklab = exports.rgbToOklab;
export const rgbToOklch = exports.rgbToOklch;
export const rgbToSrgb = exports.rgbToSrgb;
export const rgbToXyz = exports.rgbToXyz;
export const rgbToYuv = exports.rgbToYuv;
export const srgbToLinearSrgb = exports.srgbToLinearSrgb;
export const srgbToRgb = exports.srgbToRgb;
export const xyzD50ToD65 = exports.xyzD50ToD65;
export const xyzD65ToD50 = exports.xyzD65ToD50;
export const xyzToRgb = exports.xyzToRgb;
export const yuvToRgb = exports.yuvToRgb;
export const analogous = exports.analogous;
export const complementary = exports.complementary;
export const doubleSplitComplementary = exports.doubleSplitComplementary;
export const monochromatic = exports.monochromatic;
export const shades = exports.shades;
export const splitComplementary = exports.splitComplementary;
export const square = exports.square;
export const tetradic = exports.tetradic;
export const tints = exports.tints;
export const tones = exports.tones;
export const triadic = exports.triadic;
export const adjustAlpha = exports.adjustAlpha;
export const adjustHue = exports.adjustHue;
export const adjustLightness = exports.adjustLightness;
export const adjustSaturation = exports.adjustSaturation;
export const grayscale = exports.grayscale;
export const invert = exports.invert;
export const mix = exports.mix;
export const createDivergingScale = exports.createDivergingScale;
export const createMultiHueSequentialScale = exports.createMultiHueSequentialScale;
export const createPerceptuallyUniformScale = exports.createPerceptuallyUniformScale;
export const createQualitativeScale = exports.createQualitativeScale;
export const createSequentialScale = exports.createSequentialScale;
export const Color = exports.Color;
export const getColorInfo = exports.getColorInfo;
export const getColorName = exports.getColorName;
export const getContrastRatio = exports.getContrastRatio;
export const getRelativeLuminance = exports.getRelativeLuminance;
export const getWCAGCompliance = exports.getWCAGCompliance;
// run in the debugger console (this was used to convert all the exports to named exports): (async()=>{const colorCore = await import("color-core"); console.log(Object.keys(colorCore.default).map(v=>`export const ${v} = exports.${v};`).join("\n"))})()
// from 8Crafter's Debug Sticks, Chat Ranks, Custom UI, and JavaScript Commands/Script REPL and Server Utilities v1.26.0-rc.2+BULID.1: https://modbay.org/mods/1240-8crafters-debug-sticks.html