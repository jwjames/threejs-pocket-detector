import * as THREE from "three";

export interface ModelEntity {
  bufferGeometry: THREE.BufferGeometry;
  entityId: string;
  color: string;
}

export interface PocketVisualizationProps {
  initialCamera?: [number, number, number];
  onPocketSelect?: (pocketId: string) => void;
  colorScheme?: Record<string, string>;
}
