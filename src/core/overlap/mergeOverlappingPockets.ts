import { checkPocketOverlap } from "./checkPocketOverlap";

/**
 * Merges pockets that share overlapping characteristics based on edge metadata.
 * @param pockets - Array of pocket arrays, where each pocket array contains entity IDs.
 * @returns New array of merged pockets, where overlapping pockets are combined.
 *
 * @remarks
 * Pockets are merged when they:
 * 1. Share TANGENTIAL connections between their entities
 * 2. Have parallel CONVEX connections (3 or more)
 *
 * The merging process:
 * - Iterates through all pockets
 * - For each unvisited pocket, checks for overlap with remaining pockets
 * - Combines overlapping pockets into a single pocket
 * - Ensures each pocket is only merged once
 */
export function mergeOverlappingPockets(pockets: string[][]): string[][] {
  const merged: string[][] = [];
  const visited = new Set<number>();

  for (let i = 0; i < pockets.length; i++) {
    if (visited.has(i)) continue;

    const currentPocket = new Set(pockets[i]);
    visited.add(i);

    for (let j = i + 1; j < pockets.length; j++) {
      if (visited.has(j)) continue;

      if (checkPocketOverlap(pockets[i], pockets[j])) {
        pockets[j].forEach((id) => currentPocket.add(id));
        visited.add(j);
      }
    }

    merged.push([...currentPocket]);
  }
  return merged;
}
