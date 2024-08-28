# README for Drei Controls Implementation

## Overview

This project utilizes the Drei library to enhance interactivity within a Three.js scene. It includes various control components that allow users to navigate and interact with 3D objects seamlessly. The primary controls featured are `OrbitControls`, `PresentationControls`, and `PivotControls`, each providing unique functionalities suited for different interactions.

## Controls

### 1. OrbitControls

`OrbitControls` allows users to rotate, zoom, and pan around a 3D scene with customizable options.

#### Usage

To implement `OrbitControls`, you can use the following code snippet:

```jsx
<OrbitControls 
    enablePan={false} 
    maxPolarAngle={Math.PI / 2} 
    minAzimuthAngle={-Math.PI / 2} 
    maxAzimuthAngle={Math.PI / 2} 
    minDistance={3} 
    maxDistance={10} 
/>
```

- **Props:**
  - `enableZoom`: Toggle zoom functionality.
  - `enableRotate`: Enable rotation.
  - `enablePan`: Control panning ability.
  - `zoomSpeed`, `rotateSpeed`, `panSpeed`: Adjust respective speeds.
  - `minZoom`, `maxZoom`: Set zoom limits.
  - `minPolarAngle`, `maxPolarAngle`: Control vertical rotation limits.
  - `minAzimuthAngle`, `maxAzimuthAngle`: Control horizontal rotation limits.
  - `minDistance`, `maxDistance`: Define space constraints for panning.

Using these settings can help create a more limited but visually focused experience, ensuring the user does not view the interior of objects or goes below ground level.

### 2. PresentationControls

`PresentationControls` is designed to interact with the objects instead of the camera, making it ideal for showcasing models.

#### Implementation

Here's how to replace `OrbitControls` with `PresentationControls`:

```jsx
import { PresentationControls } from "@react-three/drei";

function App() {
    return (
        <>
            <Canvas camera={{ position: [-1.5, 3, 10], fov: 42 }}>
                <PresentationControls 
                    enabled={true}
                    global={false}
                    cursor={true}
                    snap={true}
                    speed={1}
                    zoom={1}
                    rotation={[0, 0, 0]}
                    polar={[0, Math.PI / 2]}
                    azimuth={[-Infinity, Infinity]}
                    config={{ mass: 2, tension: 250, friction: 16 }}
                >
                    <Lighthouse position-y={-1} scale={[0.2, 0.2, 0.2]} />
                </PresentationControls>
            </Canvas>
        </>
    );
}
```

- **Props:**
  - `enabled`: Ability to toggle controls.
  - `global`: Enables global spin or drag interaction.
  - `cursor`: Toggles cursor style during drag.
  - `snap`: Allows the object to return to default position post-interaction.
  - `speed`, `zoom`: Control the responsiveness and zoom characteristics.

### 3. PivotControls

`PivotControls` enables moving and rotating objects around a specific pivot point, which simplifies drag-and-drop experiences.

#### Example Usage

Here’s how to implement `PivotControls`:

```jsx
import { PivotControls } from "@react-three/drei";

function App() {
    return (
        <>
            <Canvas camera={{ position: [-1.5, 3, 10], fov: 42 }}>
                <PivotControls>
                    <Lighthouse position-y={-1} scale={[0.2, 0.2, 0.2]} />
                </PivotControls>
            </Canvas>
        </>
    );
}
```

You can enhance the functionality by creating a reusable component for positioning:

```jsx
import { useRef } from "react";
import { PivotControls } from "@react-three/drei";
import * as THREE from "three";

export const MoveableItem = (props) => {
    const { children } = props;
    const ref = useRef();

    const displayItemNewPosition = () => {
        const newWorldPosition = new THREE.Vector3();
        ref.current.getWorldPosition(newWorldPosition);
        console.log("New position: ", [newWorldPosition.x, newWorldPosition.y, newWorldPosition.z]);

        const newWorldRotation = new THREE.Euler();
        ref.current.getWorldQuaternion(newWorldRotation);
        console.log("New rotation: ", [newWorldRotation.x, newWorldRotation.y, newWorldRotation.z]);
    };

    return (
        <PivotControls 
            depthTest={false} 
            onDragEnd={displayItemNewPosition}>
            <group ref={ref}>{children}</group>
        </PivotControls>
    );
};
```

### Integrating MoveableItem

Replace `PivotControls` with `MoveableItem` to capture the final position and rotation dynamically:

```jsx
import { MoveableItem } from "./components/MoveableItem";

function App() {
    return (
        <>
            <Canvas camera={{ position: [-1.5, 3, 10], fov: 42 }}>
                <MoveableItem>
                    <Lighthouse position-y={-1} scale={[0.2, 0.2, 0.2]} />
                </MoveableItem>
            </Canvas>
        </>
    );
}
```
