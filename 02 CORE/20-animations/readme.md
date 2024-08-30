# Animations Starter Pack

Animations are essential for bringing your 3D scenes to life. They can be triggered by user interactions, scrolling, or be time-based, and can be applied to various elements, including 3D objects, lights, and cameras. Mastering these techniques is crucial for creating immersive experiences and expressing your creativity.

**Note:** For 3D model animations, refer to the models chapter.

## Lerp (Linear Interpolation)

Lerp is a mathematical function that interpolates between two values, allowing smooth animation between points.

### Usage
```javascript
const value = THREE.MathUtils.lerp(start, end, t);
```
- **Parameters:**
  - `start`: The initial value.
  - `end`: The target value.
  - `t`: The interpolation factor (0 to 1). 
    - A factor closer to `0` results in a slower animation.
    - A factor closer to `1` accelerates the animation.

### Example: AnimatedBox Component
To animate a box smoothly, use the following code:
```javascript
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";

export const AnimatedBox = ({ boxPositions, ...props }) => {
  const box = useRef();
  useFrame(({ clock }) => {
    const seconds = parseInt(clock.getElapsedTime());
    const targetPosition = boxPositions[seconds % boxPositions.length];
    box.current.position.x = THREE.MathUtils.lerp(box.current.position.x, targetPosition.x, 0.05);
    box.current.position.y = THREE.MathUtils.lerp(box.current.position.y, targetPosition.y, 0.05);
    box.current.position.z = THREE.MathUtils.lerp(box.current.position.z, targetPosition.z, 0.05);
  });
};
```
Alternatively, you can utilize the `Vector3` class's `lerp` method to reduce code verbosity:
```javascript
box.current.position.lerp(targetPosition, 0.05);
```

### Experimenting with Lerp
Feel free to apply `lerp` to other properties such as rotation or scale for varied effects.

## Float Component

The Float component from the Drei library creates a floating effect for objects. Key properties include:

- **speed**: Animation speed (default: 1)
- **rotationIntensity**: Intensity of rotation on the XYZ axes (default: 1)
- **floatIntensity**: Up/down float intensity (default: 1)
- **floatingRange**: The Y-axis values range for floating (default: [-0.1, 0.1])

### Example: Floating Duck
```javascript
import { Float } from "@react-three/drei";

export const Experience = () => {
  return (
    <group position-y={-0.75}>
      <Float floatIntensity={2} speed={3}>
        <Duck />
      </Float>
    </group>
  );
};
```

## GSAP (GreenSock Animation Platform)

GSAP is a powerful JavaScript animation library compatible with Three.js and React Three Fiber. It allows for animating any property of objects and supports chaining animations and user interactions.

### Installation
```bash
yarn add gsap
```

### Example: Animated Background Color
```javascript
import { gsap } from "gsap";

export const Background = () => {
  const skyMaterial = useRef();
  const tl = useRef();
  const skyData = useRef({ color: "#313131" });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current
      .to(skyData.current, { duration: 1, color: "#ffc544" })
      .to(skyData.current, { duration: 1, color: "#7c4e9f" });
  }, []);

  useFrame(() => {
    if (!tl.current) return;
    skyMaterial.current.color.set(skyData.current.color);
  });
};
```

To trigger animations based on user scrolling:
```javascript
const scrollData = useScroll();
useFrame(() => {
  if (!tl.current) return;
  tl.current.progress(scrollData.offset);
});
```

## Spring-Based Animations

Unlike linear animations, spring-based animations are more natural, simulating real-world physics. They are available through libraries like Framer Motion and React Spring.

### Framer Motion
1. **Installation**:
   ```bash
   yarn add framer-motion framer-motion-3d
   ```

2. **Example**:
   ```javascript
   import { motion } from "framer-motion-3d";

   export const Teeth = () => {
     return (
       <group>
         <motion.mesh position-x={-1} position-y={-1} animate={{ y: 0 }} transition={{ repeat: Infinity, repeatDelay: 1 }}>
           <coneGeometry args={[0.5, 1, 4]} />
           <meshStandardMaterial color="#ffffff" />
         </motion.mesh>
       </group>
     );
   };
   ```

### React Spring
1. **Installation**:
   ```bash
   yarn add @react-spring/three
   ```

2. **Example: Animated Dodecahedron**:
   ```javascript
   import { animated, useSpring } from "@react-spring/three";
   import { Dodecahedron } from "@react-three/drei";

   export const AnimatedDodecahedron = () => {
     const { x, y, rotationX, rotationZ } = useSpring({
       from: { x: -1, y: 1, rotationX: 0, rotationZ: 0 },
       to: [
         { x: 1, y: 1, delay: 500 },
         // Additional states here...
       ],
       config: { mass: 4, tension: 600, friction: 80 },
       loop: true,
       immediate: true,
     });

     return (
       <animated.group position-x={x} position-y={y} rotation-x={rotationX} rotation-z={rotationZ}>
         <Dodecahedron>
           <meshStandardMaterial color="red" transparent opacity={0.6} />
         </Dodecahedron>
       </animated.group>
     );
   };
   ```

### Version Compatibility
Ensure you install the same version of React Spring that is compatible with Drei:
```bash
yarn add @react-spring/three@~9.6.1
```
Restart the development server after installation.

## Conclusion
Experiment with these animation techniques to enhance the dynamism of your 3D projects. For further exploration, consult the documentation for [GSAP](https://greensock.com/gsap/) and [React Spring](https://react-spring.io/) for advanced features and options. 