import "./styles.css";

import { useCallback, useEffect, useState } from "react";

import { PocketList } from "@components/PocketList";
import { ThreeJSCanvas } from "@components/ThreeJSCanvas";
import { useModelLoader } from "@hooks";

export const PocketVisualization = (): JSX.Element => {
  const { modelEnts, colors, originalColors, pockets } = useModelLoader();
  const [currentColors, setCurrentColors] = useState(colors);
  const [clickedEntities, setClickedEntities] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setCurrentColors(colors);
  }, [colors]);

  const handleEntityClick = useCallback(
    (entityId: string) => {
      setClickedEntities((prev) => {
        const newSet = new Set(prev);
        if (prev.has(entityId)) {
          newSet.delete(entityId);
        } else {
          newSet.add(entityId);
        }
        return newSet;
      });

      setCurrentColors((prevColors) => ({
        ...prevColors,
        [entityId]:
          prevColors[entityId] === "#FFF" ? originalColors[entityId] : "#FFF",
      }));
    },
    [originalColors]
  );

  const handlePocketClick = useCallback(
    (pocketEntities: string[]) => {
      setClickedEntities((prev) => {
        const newSet = new Set(prev);
        const allInPocket = pocketEntities.every((id) => prev.has(id));

        if (allInPocket) {
          pocketEntities.forEach((id) => newSet.delete(id));
        } else {
          pocketEntities.forEach((id) => newSet.add(id));
        }
        return newSet;
      });

      setCurrentColors((prevColors) => {
        const newColors = { ...prevColors };
        const allWhite = pocketEntities.every(
          (id) => prevColors[id] === "#FFF"
        );

        pocketEntities.forEach((entityId) => {
          newColors[entityId] = allWhite ? originalColors[entityId] : "#FFF";
        });
        return newColors;
      });
    },
    [originalColors]
  );

  return (
    <>
      <ThreeJSCanvas modelEnts={modelEnts} colors={currentColors} />
      <PocketList
        pockets={pockets}
        clickedEntities={clickedEntities}
        onEntityClick={handleEntityClick}
        onPocketClick={handlePocketClick}
      />
    </>
  );
};
