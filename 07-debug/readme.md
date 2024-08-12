# Debugging

## Introduction

In 3D graphics, it can be difficult to understand what is happening in the scene. Remember, we see a 3D world on a 2D screen. Based on the different settings on the camera and objects, the scene can be rendered in different ways. To help us debug our scenes, Three.js and R3F provide us with a few tools.

## Helpers

Helpers are components that help us visualize non-visible options.

### AxesHelper

The `AxesHelper` displays the X, Y, and Z axes in the scene. It can be very useful once you start moving and rotating the camera and objects.

**Usage:**

```jsx
<Canvas>
  <axesHelper />
  {/* ... */}
</Canvas>
```

![alt text](/public/axes-helper.jpg)

This will give you a visual representation of the axes in your scene.

### GridHelper

The `GridHelper` displays a grid in the scene.

**Usage:**

```jsx
<gridHelper args={[10, 10, "green", "blue"]} />
```

![alt text](/public/grid-helper.jpg)

You can now see a grid in your scene. As with any other 3D object, you can move, scale, and rotate it.

### Grid (R3F)

R3F also provides its own `Grid` component, which offers more options than `GridHelper`, such as the ability to add a fade effect and choose the size of the sections and cells.

**Usage:**

```jsx
<Grid
  sectionSize={3}
  sectionColor={"purple"}
  sectionThickness={1}
  cellSize={1}
  cellColor={"#6f6f6f"}
  cellThickness={0.6}
  infiniteGrid
  fadeDistance={50}
  fadeStrength={5}
/>
```

![alt text](/public/grid.jpg)
This will render a fading grid in your scene.

### BoxHelper

The `BoxHelper` displays a box around an object. With R3F, we can use the `useHelper` hook to add a `BoxHelper` to an object.

**Usage:**

```jsx
const Box = () => {
  const ref = useRef();
  useHelper(ref, THREE.BoxHelper, "red");
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="white" transparent opacity={0} />
    </mesh>
  );
};
```

![alt text](/public/box-helper.jpg)
This will allow you to see your previously invisible box. The `useHelper` hook handles updates and removal of the helper on unmount automatically.

## Leva

Leva is a library that provides a UI to edit values in your scene. It is very useful to tweak values and see the result in real time. It is also maintained by pmndrs.

To add it to our project, we need to install the `leva` package:

```bash
yarn add leva
```

The `leva` package provides a `useControls` hook that we can use to add controls to our scene.

**Example:**

```jsx
import { useControls } from "leva";

const Box = () => {
  const ref = useRef();
  useHelper(ref, THREE.BoxHelper, "red");

  const { position } = useControls({
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  });

  return (
    <mesh ref={ref} position={[position.x, position.y, position.z]}>
      <boxGeometry />
      <meshBasicMaterial color="white" transparent opacity={0} />
    </mesh>
  );
};
```

![alt text](/public/leva-position.jpg)
This allows you to edit the position of your box in real time.

### Advanced Controls

Leva provides various controls. Here's an example of adding a color picker, a checkbox for transparency, and a slider for opacity:

```jsx
const { position, color, opacity, transparent } = useControls({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  color: "#ff0000",
  opacity: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
  transparent: true,
});

return (
  <mesh ref={ref} position={[position.x, position.y, position.z]}>
    <boxGeometry />
    <meshBasicMaterial
      color={color}
      transparent={transparent}
      opacity={opacity}
    />
  </mesh>
);
```

![alt text](/public/leva-full-controls.jpg)

This will allow you to play with the controls and see the result in real time.


If you keep the controls, you can hide Leva globally and make it appear only when needed by adding the `Leva` component to your project:

```jsx
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [3, 3, 3] }}>
      {/* ... */}
    </>
  );
}
```

You now know the essentials of Leva. Check the documentation to learn more about it.

## Stats

The Drei library provides a `Stats` component that displays a simple info box to help you monitor your code performance:

- **FPS**: Frames rendered in the last second. The higher the number, the better.
- **MS**: Milliseconds needed to render a frame. The lower the number, the better.
- **MB**: Megabytes of allocated memory.

Click on the box to change the current info displayed.

**Usage:**

```jsx
import { Stats } from "@react-three/drei";

<Canvas camera={{ position: [3, 3, 3] }}>
  <Stats />
  {/* ... */}
</Canvas>;
```

![alt text](/public/stats.jpg)
