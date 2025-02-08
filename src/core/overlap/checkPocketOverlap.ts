import { edgeMetadata } from "@data";
import { EdgeKey, GraphEdgeType } from "@typings/geometry";

/**
 * Generates a consistent edge key for two entities.
 * @param entityA - The first entity ID.
 * @param entityB - The second entity ID.
 * @returns EdgeKey in the format "entityA-entityB".
 */
function createEdgeKey(entityA: string, entityB: string): EdgeKey {
  return `${entityA}-${entityB}` as const;
}

/**
 * Checks if two pockets overlap based on edge metadata.
 * @param pocketA - Array of entity IDs in pocket A.
 * @param pocketB - Array of entity IDs in pocket B.
 * @returns True if pockets overlap; otherwise, false.
 */
export function checkPocketOverlap(
  pocketA: string[],
  pocketB: string[]
): boolean {
  const hasType2Connection = pocketA.some((entityA) =>
    pocketB.some((entityB) => {
      const edgeKey = createEdgeKey(entityA, entityB);
      const reverseEdgeKey = createEdgeKey(entityB, entityA);
      const edgeType = edgeMetadata[edgeKey] || edgeMetadata[reverseEdgeKey];

      return edgeType?.includes(GraphEdgeType.TANGENTIAL);
    })
  );

  let parallelConnections = 0;
  const entityConnections = new Map<string, number>();

  for (const entityA of pocketA) {
    for (const entityB of pocketB) {
      const edgeKey = createEdgeKey(entityA, entityB);
      const reverseEdgeKey = createEdgeKey(entityB, entityA);

      const isType1Connection =
        (edgeMetadata[edgeKey]?.length === 1 &&
          edgeMetadata[edgeKey][0] === GraphEdgeType.CONVEX) ||
        (edgeMetadata[reverseEdgeKey]?.length === 1 &&
          edgeMetadata[reverseEdgeKey][0] === GraphEdgeType.CONVEX);

      if (isType1Connection) {
        entityConnections.set(
          entityA,
          (entityConnections.get(entityA) || 0) + 1
        );
        parallelConnections++;
      }
    }
  }

  const validParallelConnections = Array.from(entityConnections.values()).every(
    (count) => count === 1
  );

  return (
    hasType2Connection || (parallelConnections >= 3 && validParallelConnections)
  );
}
