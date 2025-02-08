import { entityInfo } from "@data";
import { EntityGeometry } from "@typings/geometry";

/**
 * Filters and validates pockets based on geometric and UV characteristics.
 * @param pockets - Array of pocket arrays, where each pocket array contains entity IDs.
 * @returns Filtered array of valid pockets, removing those that don't meet criteria.
 *
 * @remarks
 * A pocket is considered valid when:
 * 1. Its UV height characteristics are within bounds:
 *    - Average UV height < 40
 *    - No entities with UV height > 50
 * 2. Contains only valid plane entities:
 *    - Entity type between 0-3
 *    - Surface area between 5-20000
 * 3. Contains at least 2 entities after filtering
 */

const UV_HEIGHT_THRESHOLD = 40;
const UV_HIGH_THRESHOLD = 50;
const MIN_AREA = 5;
const MAX_AREA = 20000;

export function filterPockets(pockets: string[][]): string[][] {
  return pockets
    .map((pocket) => {
      const entities = pocket
        .map((entityId) =>
          entityInfo.find((entity) => entity.entityId === entityId)
        )
        .filter((entity): entity is EntityGeometry => entity !== undefined);

      const avgUvHeight =
        entities.reduce(
          (sum, entity) => sum + Math.abs(entity.centerUv[1]),
          0
        ) / entities.length;
      const hasHighUv = entities.some(
        (entity) => Math.abs(entity.centerUv[1]) > UV_HIGH_THRESHOLD
      );

      if (avgUvHeight > UV_HEIGHT_THRESHOLD || hasHighUv) {
        return [];
      }

      const filteredEntities = (entities as EntityGeometry[]).filter(
        (entity) => {
          const isPlane = entity.entityType >= 0 && entity.entityType <= 3;
          const validArea = entity.area > MIN_AREA && entity.area <= MAX_AREA;
          return isPlane && validArea;
        }
      );

      return filteredEntities.map((entity) => entity.entityId);
    })
    .filter((filteredPocket) => filteredPocket.length > 1);
}
