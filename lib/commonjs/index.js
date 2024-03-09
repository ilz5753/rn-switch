"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(
  require("react-native-reanimated")
);
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function (e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ("object" != typeof e && "function" != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e)
    if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  return (n.default = e), t && t.set(e, n), n;
}
const clamp = (value, min, max) => {
  "worklet";

  return Math.min(max, Math.max(min, value));
};
const Switch = /*#__PURE__*/ (0, _react.memo)(
  /*#__PURE__*/ (0, _react.forwardRef)(
    (
      {
        size = 30,
        panBg = "white",
        activeBg = "#07f",
        deactiveBg = "gray",
        toggleDuration = 240,
        styleDuration = 120,
        panMultiply = 0.84,
        value = false,
        onChangeValue,
        disabled = false,
        gestureDisabled = false,
      },
      ref
    ) => {
      let pz = (0, _react.useMemo)(
        () => (panMultiply >= 0.66 && panMultiply <= 0.9 ? panMultiply : 0.84),
        [panMultiply]
      );
      let panSize = (0, _react.useMemo)(() => pz * size, [pz, size]);
      let min = (0, _react.useMemo)(() => 0, []);
      let max = (0, _react.useMemo)(() => size + min, [size, min]);
      let toggleTiming = (0, _react.useMemo)(
        () => ({
          duration: toggleDuration,
        }),
        [toggleDuration]
      );
      let styleTiming = (0, _react.useMemo)(
        () => ({
          duration: styleDuration,
        }),
        [styleDuration]
      );
      let isActive = (0, _reactNativeReanimated.useSharedValue)(false);
      let start = (0, _react.useMemo)(
        () => (value ? max : min),
        [value, min, max]
      );
      let tx = (0, _reactNativeReanimated.useSharedValue)(start);
      let htx = (0, _reactNativeReanimated.useSharedValue)(start);
      let to = (0, _react.useCallback)(
        (x) => {
          tx.value = (0, _reactNativeReanimated.withTiming)(x, toggleTiming);
          htx.value = x;
          if (onChangeValue) onChangeValue(x === max);
        },
        [toggleTiming, onChangeValue, max]
      );
      let on = (0, _react.useCallback)(() => to(max), [to, max]);
      let off = (0, _react.useCallback)(() => to(min), [to, min]);
      let toggle = (0, _react.useMemo)(
        () => (value ? off : on),
        [value, off, on]
      );
      (0, _react.useImperativeHandle)(
        ref,
        () => ({
          on,
          off,
          toggle,
        }),
        [on, off, toggle]
      );
      let hasGesture = (0, _react.useMemo)(
        () => !gestureDisabled,
        [gestureDisabled]
      );
      let enabled = (0, _react.useMemo)(() => !disabled, [disabled]);
      let hasPan = (0, _react.useMemo)(
        () => hasGesture && enabled,
        [hasGesture, enabled]
      );
      let pan = (0, _react.useMemo)(
        () =>
          _reactNativeGestureHandler.Gesture.Pan()
            .onTouchesDown(() => {
              isActive.value = true;
            })
            .onTouchesUp(() => {
              isActive.value = false;
            })
            .onUpdate(({ translationX }) => {
              tx.value = clamp(translationX + htx.value, min, max);
            })
            .onEnd(() => {
              let e = tx.value >= max / 2 ? max : min;
              (0, _reactNativeReanimated.runOnJS)(to)(e);
            })
            .enabled(hasPan),
        [min, max, to, hasPan]
      );
      let tap = (0, _react.useMemo)(
        () =>
          _reactNativeGestureHandler.Gesture.Tap()
            .onStart((0, _reactNativeReanimated.runOnJS)(toggle))
            .enabled(enabled),
        [toggle, enabled]
      );
      let gesture = (0, _react.useMemo)(
        () => _reactNativeGestureHandler.Gesture.Simultaneous(tap, pan),
        [tap, pan]
      );
      let ww = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        width: (0, _reactNativeReanimated.withTiming)(size * 2, styleTiming),
      }));
      let o = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        height: (0, _reactNativeReanimated.withTiming)(size, styleTiming),
        borderRadius: (0, _reactNativeReanimated.withTiming)(
          size / 2,
          styleTiming
        ),
      }));
      let txStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        backgroundColor: (0, _reactNativeReanimated.interpolateColor)(
          tx.value,
          [0, panSize],
          [deactiveBg, activeBg]
        ),
        opacity: (0, _reactNativeReanimated.withTiming)(
          disabled ? 0.5 : 1,
          styleTiming
        ),
      }));
      let pw = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        width: (0, _reactNativeReanimated.withTiming)(size, styleTiming),
      }));
      let panStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        width: (0, _reactNativeReanimated.withTiming)(panSize, styleTiming),
        height: (0, _reactNativeReanimated.withTiming)(panSize, styleTiming),
        borderRadius: (0, _reactNativeReanimated.withTiming)(
          panSize / 2,
          styleTiming
        ),
        transform: [
          {
            translateX: tx.value,
          },
          {
            scale: (0, _reactNativeReanimated.withTiming)(
              isActive.value ? 1.075 : 1,
              styleTiming
            ),
          },
        ],
        backgroundColor: (0, _reactNativeReanimated.withTiming)(
          panBg,
          styleTiming
        ),
      }));
      let center = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
        justifyContent: "center",
        alignItems: "center",
      }));
      return /*#__PURE__*/ _react.default.createElement(
        _reactNativeGestureHandler.GestureDetector,
        {
          gesture,
        },
        /*#__PURE__*/ _react.default.createElement(
          _reactNativeReanimated.default.View,
          {
            style: [ww, o, txStyle],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNativeReanimated.default.View,
            {
              style: [pw, o, center],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNativeReanimated.default.View,
              {
                style: [panStyle],
              }
            )
          )
        )
      );
    }
  )
);
var _default = (exports.default = Switch);
//# sourceMappingURL=index.js.map
