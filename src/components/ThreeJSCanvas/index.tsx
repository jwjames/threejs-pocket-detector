import "./styles.css";

import { memo } from "react";

import { ThreeJSCanvasProps } from "@components/PocketVisualization/types";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const ThreeJSCanvas = memo(
  ({ modelEnts, colors }: ThreeJSCanvasProps): JSX.Element => {
    return (
      <div className="canvas-container">
        <Canvas camera={{ position: [300, 200, -400], far: 10000 }}>
          <color attach="background" args={["#f0f0f0"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <OrbitControls makeDefault target={[0, -100, 0]} />
          <group>
            {modelEnts.map((ent) => {
              const color = colors[ent.entityId] || ent.color;
              return (
                <mesh geometry={ent.bufferGeometry} key={ent.entityId}>
                  <meshStandardMaterial
                    color={color}
                    metalness={0.7}
                    roughness={0.2}
                    envMapIntensity={1}
                  />
                </mesh>
              );
            })}
          </group>
        </Canvas>
      </div>
    );
  }
);

ThreeJSCanvas.displayName = "ThreeJSCanvas";
