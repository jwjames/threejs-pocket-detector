import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

import { findPockets } from "@core";
import { rgbToEntityMap } from "@data";
import { ModelEntity } from "@typings/visualization";
import { generateColorForPocket } from "@utils";

interface UseModelLoaderResult {
  modelEnts: ModelEntity[];
  colors: Record<string, string>;
  originalColors: Record<string, string>;
  pockets: string[][];
}

export function useModelLoader(): UseModelLoaderResult {
  const [modelEnts, setModelEnts] = useState<ModelEntity[]>([]);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [originalColors, setOriginalColors] = useState<Record<string, string>>(
    {}
  );
  const [pockets, setPockets] = useState<string[][]>([]);

  useEffect(() => {
    new GLTFLoader().load("./colored_glb.glb", (gltf) => {
      const newModuleEntities: ModelEntity[] = [];
      gltf.scene.traverse((element) => {
        if (element.type !== "Mesh") return;

        const meshElement = element as THREE.Mesh;
        const material = meshElement.material as THREE.MeshStandardMaterial;
        const color = material.color;
        const rgbKey = `${Math.round(color.r * 255)}-${Math.round(
          color.g * 255
        )}-${Math.round(color.b * 255)}`;
        const entityId = (rgbToEntityMap as Record<string, string>)[rgbKey];

        if (entityId) {
          newModuleEntities.push({
            bufferGeometry: meshElement.geometry as THREE.BufferGeometry,
            entityId,
            color: colors[entityId] || "rgb(20, 20, 20)",
          });
        }
      });
      setModelEnts(newModuleEntities);

      const { pockets: validPockets } = findPockets();
      const newColors: Record<string, string> = {};

      validPockets.forEach((pocket: string[], index: number) => {
        const color = generateColorForPocket(index);
        pocket.forEach((entityId: string) => {
          newColors[entityId] = color;
        });
      });

      setColors(newColors);
      setOriginalColors(newColors);
      setPockets(validPockets);
    });
  }, []);

  return { modelEnts, colors, originalColors, pockets };
}
