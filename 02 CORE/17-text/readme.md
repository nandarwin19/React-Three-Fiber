### Note on Adding Text in React Three Fiber

#### 2D Text
To add simple 2D text, we can utilize the `Text` component from the Drei library. Here's how to display "Hyrule Castle" on a wooden sign:

```javascript
import { Text } from "drei";

export const Experience = () => { 
  const woodenSign = useGLTF("models/Wooden Sign.glb");
  return (
    <>
      <group position-x={-1.5} rotation-y={THREE.MathUtils.degToRad(15)}>
        <primitive object={woodenSign.scene} />
        <Text fontSize={0.3} position={[0, 1.2, 0.01]} maxWidth={1} textAlign="center">
          Hyrule Castle
          <meshStandardMaterial color={"#803d1c"} />
        </Text>
      </group>
    </>
  );
};
```
**Tips for Adjusting Text Size and Position**:
- Use the `fontSize`, `maxWidth`, and `textAlign` properties to properly scale and align the text.
- Consider using the Chrome color picker to find and apply precise colors easily.

#### Custom Fonts
Enhance immersion with custom fonts. For this, download a font (e.g., MedievalSharp) and store it in a `fonts` folder in your `public` directory. Use the font in your `Text` component:

```javascript
<Text fontSize={0.3} position={[0, 1.2, 0.01]} maxWidth={1} textAlign="center" font="fonts/MedievalSharp-Regular.ttf">
  Hyrule Castle
  <meshStandardMaterial color={"#803d1c"} />
</Text>
```
To optimize loading times, specify only the characters you need using the `characters` prop:

```javascript
<Text characters="Hyrule Castle"> Hyrule Castle <meshStandardMaterial color={"#803d1c"} /> </Text>
```

#### Text Anchoring
To display labels related to characters without issues, utilize the `anchorY` property to ensure correct alignment:

```javascript
<group position={[1.5, 0, 0]} rotation-y={-Math.PI / 4}>
  <group position-y={3}>
    <Text fontSize={0.2} anchorY={"bottom"}> Link <meshStandardMaterial color={"black"} /> </Text>
    <Text fontSize={0.2} anchorY={"top"}> Zelda personal hero <meshStandardMaterial color={"grey"} /> </Text>
  </group>
  <Character />
</group>
```

#### Billboarding
To keep text facing the camera, utilize the `Billboard` component from Drei:

```javascript
<Billboard position-y={3}>
  <Text fontSize={0.2} anchorY={"bottom"}> Link <meshStandardMaterial color={"black"} /> </Text>
  <Text fontSize={0.2} anchorY={"top"}> Zelda personal hero <meshStandardMaterial color={"grey"} /> </Text>
</Billboard>
```

#### 3D Text
For creating 3D text, we need to work with a typeface font. Generate a typeface JSON file from a standard font (e.g., using the Typeface Font Generator).

1. Download and convert the desired font:
   - Upload the TTF file to the Typeface generator.
   - Download the resulting JSON file to the `public/fonts` directory.

2. Use the `Text3D` component with the imported font:

```javascript
<Text3D font={"fonts/Inter_Bold.json"} rotation-y={THREE.MathUtils.degToRad(30)} position={[-8, 0, -5]} size={4}>
  ZELDA
  <meshStandardMaterial color={"#a1bb6f"} />
</Text3D>
```

#### Bevel Effects
To enhance the realism of 3D text, apply bevel settings:

```javascript
<Text3D bevelEnabled bevelThickness={0.5} bevelSize={0.1} bevelSegments={10} // other props />
```
This technique rounds the edges, creating a smoother appearance. Remember to keep values as low as possible to minimize GPU load.
