### Note on Textures in 3D Rendering

#### Loading Textures with useTexture
The `useTexture` hook from the Drei library enables dynamic texture loading in React Three Fiber projects. Here’s a basic example:

```javascript
import { useTexture } from "@react-three/drei"; 

export const Experience = () => { 
  const texture = useTexture("textures/PavingStones130_1K_Color.jpg"); 
  return ( 
    <> 
      <mesh> 
        <boxGeometry /> 
        <meshStandardMaterial map={texture} /> 
      </mesh> 
    </> 
  ); 
};
```
This code applies a paving stone texture to a cube, using the `map` property of `meshStandardMaterial`.

#### Texture Manipulation
Textures can be manipulated in several ways for different effects:

- **Scaling the Texture:**
  Use the `repeat` property to change texture scaling.
  ```javascript
  texture.repeat.set(3, 3);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
  ```

- **Stretching the Texture:**
  Decrease the repeat value for stretching:
  ```javascript
  texture.repeat.set(0.2, 0.2);
  ```

- **Rotating the Texture:**
  Adjust the `rotation` property:
  ```javascript
  texture.rotation = Math.PI / 6;
  ```

Always ensure `wrapS` and `wrapT` are set to `THREE.RepeatWrapping` to avoid texture issues.

#### Physically Based Rendering (PBR)
PBR is a technique that allows for rendering realistic materials by simulating how light interacts with surfaces. For PBR, multiple texture maps are used:
- `normalMap`: Enhances surface detail.
- `roughnessMap`: Defines surface roughness.
- `metalnessMap`: Sets surface metalness.
- `aoMap`: Adds ambient occlusion to simulate depth.
- `displacementMap`: Alters the mesh geometry.

Example for loading multiple texture maps:
```javascript
const props = useTexture({
  map: "textures/PavingStones130_1K_Color.jpg",
  normalMap: "textures/PavingStones130_1K_NormalGL.jpg",
  roughnessMap: "textures/PavingStones130_1K_Roughness.jpg",
  aoMap: "textures/PavingStones130_1K_AmbientOcclusion.jpg",
});
```
This combination creates a more realistic interaction with light, highlighting surface details.

#### Finding Textures
For PBR textures, consider these resources:
- [3DTextures.me](https://3dtextures.me)
- [AmbientCG.com](https://ambientcg.com)
- [Polyhaven.com](https://polyhaven.com)
- [ShareTextures.com](https://sharetextures.com)

Ensure to choose smaller sizes to improve performance, as PBR textures can be resource-intensive.

#### MatCap Textures
MatCap (Material Capture) textures simulate materials without complex lighting setups. They are particularly useful in real-time applications like games. Here’s how to use a MatCap texture:

```javascript
import { useTexture } from "@react-three/drei"; 

export const Experience = () => { 
  const texture = useTexture("textures/matcapTexture.png"); 
  return ( 
    <> 
      <mesh> 
        <boxGeometry /> 
        <meshMatcapMaterial matcap={texture} /> 
      </mesh> 
    </> 
  ); 
};
```
In this case, no external lighting affects the mesh—its appearance relies solely on the MatCap texture.

#### Texture Compression
To optimize performance, always select the smallest texture size that meets quality requirements. Tools like [Squoosh](https://squoosh.app) can help compress textures effectively while maintaining visual fidelity.

#### Using Video Textures
The `useVideoTexture` hook allows you to apply a video as a texture:
```javascript
import { useVideoTexture } from "@react-three/drei"; 

export const Experience = () => { 
  const videoTexture = useVideoTexture("textures/spongebob-squarepants.mp4"); 
  return ( 
    <> 
      <mesh> 
        <boxGeometry /> 
        <meshBasicMaterial map={videoTexture} /> 
      </mesh> 
    </> 
  ); 
};
```
