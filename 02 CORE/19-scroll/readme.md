# Scroll Controls with React Three Fiber

## Starter Pack - Final Code

In pure HTML, the page scroll is handled by the browser based on the content. However, in Three.js and React Three Fiber, the `<Canvas/>` typically occupies the entire screen, meaning the page's scroll events do not affect the 3D scene by default. To bridge this gap, we utilize the `ScrollControls` component from `@react-three/drei`.

### ScrollControls

The `<ScrollControls/>` component creates an HTML scroll container in front of the canvas. The size of this container is determined by the `pages` prop, where one page equals the height of the screen (100vh). Here's how to integrate it:

```javascript
import { ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 4, 12], fov: 30 }}>
        <ScrollControls pages={5}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
```

At this point, we have a scrollable container before our 3D scene, but scrolling does not yet affect the scene.

### Updating the Scene Based on Scroll Position

There are two primary methods to update scene elements based on the scroll position.

#### Scroll Component

The first method involves using the `<Scroll/>` component, which wraps its children to update their positions in accordance with the scroll position. For instance, to wrap food items in your `Experience.jsx`:

```javascript
import { Scroll } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      {/* ... */}
      <Scroll>
        {foodItems.map((foodItem, idx) => (
          <FoodItem key={idx} {...foodItem} />
        ))}
      </Scroll>
    </>
  );
};
```

This setup ensures that the positions of the food items are updated with scrolling. However, we want one item per page, starting from the second page. To achieve this, we can leverage the `viewport` object from the `useThree` hook:

```javascript
import { useThree } from "@react-three/fiber";

const FoodItem = ({ model, page }) => {
  const gltf = useGLTF(model);
  const viewport = useThree((state) => state.viewport);
  
  return (
    <group>
      <primitive object={gltf.scene} position={[0, -viewport.height * page, 0]} />
    </group>
  );
};
```

### Adding HTML Elements with Scroll

To sync HTML elements with scroll, we wrap our HTML content inside a `<Scroll/>` component with the `html` prop. Create an `Interface.jsx` in the components folder:

```javascript
import { foodItems } from "../App";

export const Interface = () => {
  return (
    <>
      <section className="page">
        <div className="introduction">
          <p className="introduction__label">
            Welcome to Panda Sushi, scroll down to discover our delicious dishes! 
            <br /> 👇
          </p>
        </div>
      </section>
      {foodItems.map((foodItem, index) => (
        <section key={index} className="page">
          <div className="food">
            <h2 className="food__title">{foodItem.name}</h2>
            <p className="food__description">{foodItem.description}</p>
          </div>
        </section>
      ))}
    </>
  );
};
```

Import this `Interface` in `App.jsx` and wrap it with the `<Scroll>` component:

```javascript
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 4, 12], fov: 30 }}>
        <ScrollControls pages={5}>
          <Experience />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
```

Add some CSS in `index.css` to style the pages:

```css
.page {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
.introduction {
  padding-top: 25vh;
}
.introduction__label {
  font-size: 1.5rem;
  text-align: center;
  line-height: 3rem;
}
.food {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  border-radius: 0.5rem;
  padding: 2rem;
  width: 420px;
  max-width: 100%;
}
```

### Synchronizing 3D Elements with Scroll

#### Using useScroll Hook

To further enhance interactions, we can use the `useScroll` hook within the `<ScrollControls/>`. By tracking the scroll progress, we can animate the 3D model based on the scroll position. First, we instantiate a ref in the `FoodItem` component:

```javascript
const ref = useRef();
```

Then, use the `useScroll` hook to acquire scroll data:

```javascript
import { useScroll } from "@react-three/drei";

const FoodItem = ({ model, page }) => {
  const gltf = useGLTF(model);
  const viewport = useThree((state) => state.viewport);
  const ref = useRef();
  const scrollData = useScroll();

  useFrame(() => {
    ref.current.position.x = 2; // Temporarily visible
    const pageScroll = scrollData.offset;
    ref.current.rotation.y = pageScroll * Math.PI * 2;
  });

  return (
    <group ref={ref}>
      <primitive object={gltf.scene} position={[0, -viewport.height * page, 0]} />
    </group>
  );
};
```

### Additional Dynamism

To slide the food item and rotate it based on scroll position, update the `useFrame` as follows:

```javascript
useFrame(() => {
  ref.current.rotation.y = scrollData.offset * Math.PI * 2;
  const pages = scrollData.pages - 1;
  const offsetX = 2;
  ref.current.position.x = scrollData.range((page - 1) / pages, 1 / pages) * offsetX;
});
```

To create a smooth retraction effect, you can also use the `curve` function:

```javascript
ref.current.position.x = scrollData.curve((page - 1) / pages, 2 / pages) * offsetX;
```

### Cumulative Effects on HTML Interface

You can also modify the HTML interface’s style based on scroll position. For instance, fade out an introduction section based on scrolling:

```javascript
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Interface = () => {
  const introductionRef = useRef();
  const scrollData = useScroll();

  useFrame(() => {
    introductionRef.current.style.opacity = 1 - scrollData.range(0, 0.1);
  });

  return (
    <>
      <section className="page" ref={introductionRef}>
        {/* ... */}
      </section>
    </>
  );
};
```

With this setup, the introduction fades out as you scroll down, enhancing the interaction quality further.

## Conclusion

By employing the `ScrollControls` component and the `useScroll` hook, we can effectively synchronize scroll events between the 3D scene and the HTML interface. This coordination allows for a fluid and dynamic user experience that mirrors scrolling actions within the 3D environment. 