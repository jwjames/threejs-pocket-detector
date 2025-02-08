export interface EntityGeometry {
  entityId: string;
  entityType: number;
  centerPoint: number[];
  centerNormal: number[];
  area: number;
  minRadius: number;
  minPosRadius: number;
  centerUv: number[];
  minNegRadius: number;
  edgeCurveChains: never[];
}

export enum GraphEdgeType {
  CONCAVE = 0,
  CONVEX = 1,
  TANGENTIAL = 2,
}

export type EdgeKey = `${string}-${string}`;
export type EdgeMetadata = Record<EdgeKey, number[]>;
