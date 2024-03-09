import React from "react";
export interface SwitchRef {
  on(): void;
  off(): void;
  toggle(): void;
}
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
declare const Switch: React.MemoExoticComponent<
  React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<SwitchRef>>
>;
export default Switch;
//# sourceMappingURL=index.d.ts.map
