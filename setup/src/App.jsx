import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <mesh position={[-0.6, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <mesh position={[0.6, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 3]} intensity={1} />
      <directionalLight position={[0, 3, 3]} intensity={0.1} />
    </Canvas>
  );
}

export default App;
