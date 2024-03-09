import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
export interface SwitchRef {
  on(): void;
  off(): void;
  toggle(): void;
}
const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(max, Math.max(min, value));
};

export interface SwitchProps {
  size?: number;
  /**
   * a number between 0.66 and 0.9
   * @default 0.84
   */
  panMultiply?: number;
  toggleDuration?: number;
  styleDuration?: number;
  panBg?: string;
  activeBg?: string;
  deactiveBg?: string;
  value?: boolean;
  onChangeValue?(value: boolean): void;
  gestureDisabled?: boolean;
  disabled?: boolean;
}
const Switch = memo(
  forwardRef<SwitchRef, SwitchProps>(
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
      let pz = useMemo(
        () => (panMultiply >= 0.66 && panMultiply <= 0.9 ? panMultiply : 0.84),
        [panMultiply]
      );
      let panSize = useMemo(() => pz * size, [pz, size]);
      let min = useMemo(() => 0, []);
      let max = useMemo(() => size + min, [size, min]);
      let toggleTiming = useMemo(
        () => ({ duration: toggleDuration }),
        [toggleDuration]
      );
      let styleTiming = useMemo(
        () => ({ duration: styleDuration }),
        [styleDuration]
      );
      let isActive = useSharedValue(false);
      let start = useMemo(() => (value ? max : min), [value, min, max]);
      let tx = useSharedValue(start);
      let htx = useSharedValue(start);
      let to = useCallback(
        (x: number) => {
          tx.value = withTiming(x, toggleTiming);
          htx.value = x;
          if (onChangeValue) onChangeValue(x === max);
        },
        [toggleTiming, onChangeValue, max]
      );
      let on = useCallback(() => to(max), [to, max]);
      let off = useCallback(() => to(min), [to, min]);
      let toggle = useMemo(() => (value ? off : on), [value, off, on]);
      useImperativeHandle(
        ref,
        () => ({
          on,
          off,
          toggle,
        }),
        [on, off, toggle]
      );
      let hasGesture = useMemo(() => !gestureDisabled, [gestureDisabled]);
      let enabled = useMemo(() => !disabled, [disabled]);
      let hasPan = useMemo(() => hasGesture && enabled, [hasGesture, enabled]);
      let pan = useMemo(
        () =>
          Gesture.Pan()
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
              runOnJS(to)(e);
            })
            .enabled(hasPan),
        [min, max, to, hasPan]
      );
      let tap = useMemo(
        () => Gesture.Tap().onStart(runOnJS(toggle)).enabled(enabled),
        [toggle, enabled]
      );
      let gesture = useMemo(() => Gesture.Simultaneous(tap, pan), [tap, pan]);
      let ww = useAnimatedStyle(() => ({
        width: withTiming(size * 2, styleTiming),
      }));
      let o = useAnimatedStyle(() => ({
        height: withTiming(size, styleTiming),
        borderRadius: withTiming(size / 2, styleTiming),
      }));
      let txStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
          tx.value,
          [0, panSize],
          [deactiveBg, activeBg]
        ),
        opacity: withTiming(disabled ? 0.5 : 1, styleTiming),
      }));
      let pw = useAnimatedStyle(() => ({
        width: withTiming(size, styleTiming),
      }));
      let panStyle = useAnimatedStyle(() => ({
        width: withTiming(panSize, styleTiming),
        height: withTiming(panSize, styleTiming),
        borderRadius: withTiming(panSize / 2, styleTiming),
        transform: [
          {
            translateX: tx.value,
          },
          {
            scale: withTiming(isActive.value ? 1.075 : 1, styleTiming),
          },
        ],
        backgroundColor: withTiming(panBg, styleTiming),
      }));
      let center = useAnimatedStyle(() => ({
        justifyContent: "center",
        alignItems: "center",
      }));
      return (
        <GestureDetector {...{ gesture }}>
          <Animated.View
            {...{
              style: [ww, o, txStyle],
            }}
          >
            <Animated.View {...{ style: [pw, o, center] }}>
              <Animated.View
                {...{
                  style: [panStyle],
                }}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      );
    }
  )
);
export default Switch;
