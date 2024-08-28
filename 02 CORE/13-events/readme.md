# README for Event Handling in React Three Fiber

## Overview

This project demonstrates how to handle various events, including mouse, keyboard, and touch events, in React Three Fiber to enhance interactivity within a 3D scene. The implementation provides responsive behaviors for objects, enabling a more immersive user experience.

## Features

- Mouse events to detect hovering, clicking, and coloring of objects.
- Keyboard events for moving objects using arrow keys or W/A/S/D keys.
- Bubbling event prevention to manage interactions between overlapping objects.
- Cursor changes to indicate interactivity.
- Support for single-object selection and deselection using mouse clicks.

## Event Handling Components

### 1. Mouse Events

To make a mesh responsive to mouse events, we use the `onPointerEnter`, `onPointerLeave`, and `onClick` events.

#### Example Implementation

```jsx
import { useState } from "react";
import { useCursor } from "@react-three/drei";

export const MoveableSphere = (props) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    useCursor(hovered);

    let color = hovered ? "pink" : "white";
    if (selected) {
        color = "hotpink";
    }

    return (
        <mesh
            {...props}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => setSelected(!selected)}
        >
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};
```

### 2. Bubbling Events

To prevent event bubbling between overlapping objects, we utilize `stopPropagation()`.

#### Updated Event Handling

```jsx
<mesh
    {...props}
    onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
    }}
    onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
    }}
    onClick={(e) => {
        e.stopPropagation();
        setSelected(!selected);
    }}
>
    <sphereGeometry args={[0.5, 64, 64]} />
    <meshStandardMaterial color={color} />
</mesh>
```

### 3. Keyboard Events

To move the selected object using keyboard controls, we utilize the `KeyboardControls` component from Drei.

#### Implementation

```jsx
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const MOVEMENT_SPEED = 0.05;

export const MoveableSphere = (props) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    const ref = useRef();

    const forwardPressed = useKeyboardControls(state => state.forward);
    const backPressed = useKeyboardControls(state => state.back);
    const leftPressed = useKeyboardControls(state => state.left);
    const rightPressed = useKeyboardControls(state => state.right);

    useFrame(() => {
        if (!selected) return;
        if (forwardPressed) ref.current.position.y += MOVEMENT_SPEED;
        if (backPressed) ref.current.position.y -= MOVEMENT_SPEED;
        if (leftPressed) ref.current.position.x -= MOVEMENT_SPEED;
        if (rightPressed) ref.current.position.x += MOVEMENT_SPEED;
    });

    return (
        <mesh
            {...props}
            ref={ref}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => setSelected(!selected)}
            onPointerMissed={() => setSelected(false)}
        >
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};
```

### 4. Using KeyboardControls

Wrap your scene with `KeyboardControls` to enable keyboard interactions.

```jsx
import { KeyboardControls } from "@react-three/drei";

function App() {
    return (
        <>
            <KeyboardControls map={map}>
                <Canvas camera={{ position: [0, 3, 8], fov: 42 }}>
                    <Experience />
                </Canvas>
            </KeyboardControls>
        </>
    );
}
```

