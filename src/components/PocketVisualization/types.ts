import { ModelEntity } from "@typings/visualization";

export interface PocketListProps {
  pockets: string[][];
  clickedEntities: Set<string>;
  onEntityClick: (entityId: string) => void;
  onPocketClick: (pocketEntities: string[]) => void;
}

export interface ThreeJSCanvasProps {
  modelEnts: ModelEntity[];
  colors: Record<string, string>;
}

export interface PocketVisualizationState {
  modelEnts: ModelEntity[];
  colors: Record<string, string>;
  pockets: string[][];
  originalColors: Record<string, string>;
  clickedEntities: Set<string>;
}
