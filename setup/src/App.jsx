import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function App() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <mesh position-x={-0.6}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" side={THREE.FrontSide} />
      </mesh>
      <mesh position-x={-0.6} position-z={-2}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" side={THREE.BackSide} />
      </mesh>
      <mesh
        position-x={-5}
        scale={[1, 0.5, 0.5]}
        rotation={[0, THREE.MathUtils.degToRad(30), 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      
      {/* 180/4 = 45 */}
      <mesh scale-y={4} position-x={2} rotation-y={Math.PI / 4}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 3]} intensity={1} />
      <directionalLight position={[0, 3, 3]} intensity={0.5} />
    </Canvas>
  );
}

export default App;
