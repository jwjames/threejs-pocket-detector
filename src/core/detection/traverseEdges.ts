import { adjacencyGraph } from "@data";

/**
 * DFS edge traversal to find connected entities.
 * @param entityId - The starting entity ID for traversal.
 * @param visited - Set of already visited entity IDs to prevent cycles.
 * @param group - Array collecting connected entity IDs during traversal.
 * @param edgeSet - Set of qualified edge IDs (typically CONCAVE edges) that can be traversed.
 */

export function traverseEdges(
  entityId: string,
  visited: Set<string>,
  group: string[],
  edgeSet: Set<string>
): void {
  if (!entityId || visited.has(entityId)) return;

  if (!(adjacencyGraph as Record<string, string[]>)[entityId]) {
    console.warn(`Entity ${entityId} not found in adjacency graph`);
    return;
  }

  visited.add(entityId);
  group.push(entityId);

  const neighbors = (adjacencyGraph as Record<string, string[]>)[entityId];
  neighbors.forEach((neighbor: string) => {
    const edgeKey = `${entityId}-${neighbor}`;
    const reverseEdgeKey = `${neighbor}-${entityId}`;

    if (edgeSet.has(edgeKey) || edgeSet.has(reverseEdgeKey)) {
      traverseEdges(neighbor, visited, group, edgeSet);
    }
  });
}
