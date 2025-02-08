export interface PocketDetectionResult {
  pockets: string[][];
}

export interface PocketValidationConfig {
  areaMin: number;
  areaMax: number;
  uvHeightThreshold: number;
  uvHighThreshold: number;
}
