# React Native Switch
This is a React Native component that creates a customizable switch (toggle) UI element.

## Installation
To install the component:

```bash
npm i @ilz5753/rn-switch
# yarn
yarn add @ilz5753/rn-switch
# bun
bun add @ilz5753/rn-switch
```

## Usage
Import the `Switch` component and use it in your components:

```tsx
import Switch from '@ilz5753/rn-switch';
import { useState } from 'react';

function MyComponent() {
  let [active, setActive] = useState(false);
  return (
    <Switch
      value={active}
      onChangeValue={setActive}
    />
  );
}
```

### Props

The `Switch` component accepts the following props:

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| size | number | The size of the switch. | 30 |
| panMultiply | number | A number between 0.66 and 0.9 that determines the panning distance required to toggle the switch. | 0.84 |
| toggleDuration | number | The duration (in milliseconds) of the toggle animation. | 240 |
| styleDuration | number | The duration (in milliseconds) of the style transition. | 120 |
| panBg | string | The background color of the panning area of the switch. | white |
| activeBg | string | The background color of the switch when it's active (turned on). | #07f |
| deactiveBg | string | The background color of the switch when it's deactive (turned off). | gray |
| value | boolean | The current state of the switch (`true` for active, `false` for deactive). | false |
| onChangeValue | function | A callback function that is executed whenever the switch value changes. It receives the new value as an argument. | - |
| gestureDisabled | boolean | If set to `true`, disables the switch toggle on gesture (panning). | false |
| disabled | boolean | If set to `true`, disables the switch. It cannot be interacted with when disabled. | false |


## License

Switch is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more details.
