import {
  PocketDetectionResult,
  filterPockets,
  mergeOverlappingPockets,
  traverseEdges,
} from "@core";
import { adjacencyGraph, edgeMetadata } from "@data";
import { EdgeKey, GraphEdgeType } from "@typings/geometry";

/**
 * Detects and processes pockets in the geometry based on edge relationships.
 * @returns PocketDetectionResult containing an array of valid pocket groups.
 *
 * @remarks
 * The pocket detection process:
 * 1. Identifies CONCAVE edges from the edge metadata
 * 2. Traverses the adjacency graph to find connected groups
 * 3. Merges overlapping pocket groups based on edge relationships
 * 4. Filters pockets based on geometric and UV characteristics
 *
 * A valid pocket must:
 * - Contain at least 2 entities
 * - Be connected by CONCAVE edges
 * - Meet geometric criteria (area, UV coordinates)
 * - Not overlap with other pockets unless they share specific edge types
 */
export function findPockets(): PocketDetectionResult {
  const visited = new Set<string>();
  const pockets: string[][] = [];

  const concaveEdges: Set<EdgeKey> = new Set(
    Object.entries(edgeMetadata)
      .filter(([, types]) => types.includes(GraphEdgeType.CONCAVE))
      .map(([key]) => key as EdgeKey)
  );

  Object.keys(adjacencyGraph).forEach((entityId) => {
    if (!visited.has(entityId)) {
      const group: string[] = [];
      traverseEdges(entityId, visited, group, concaveEdges);
      if (group.length > 1) pockets.push(group);
    }
  });

  const mergedPockets = mergeOverlappingPockets(pockets);
  const filteredPockets = filterPockets(mergedPockets);

  return { pockets: filteredPockets };
}
