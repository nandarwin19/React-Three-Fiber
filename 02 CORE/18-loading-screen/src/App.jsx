import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";

import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
      <div className="loading-screen__container">
        <h1 className="loading-screen__title">3D Web Agency</h1>
        <div className="progress__container">
          <div
            className="progress__bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ position: [-4, 4, 12], fov: 30 }}>
        <Suspense>
          <group position-y={-1}>
            <Experience />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
