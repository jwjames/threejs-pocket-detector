import "./styles.css";

import React, { memo } from "react";

import { PocketListProps } from "@components/PocketVisualization/types";

export const PocketList = memo(
  ({
    pockets,
    clickedEntities,
    onEntityClick,
    onPocketClick,
  }: PocketListProps): JSX.Element => {
    const renderPocketIds = () => {
      let pocketNum = 1;
      const pocketsById = pockets.map((pocketIdArr) => (
        <div className="pocket-item" key={`${pocketIdArr[0]}`}>
          <span
            onClick={() => onPocketClick(pocketIdArr)}
            className="pocket-label"
            role="button"
            aria-label={`Select Pocket ${pocketNum}`}
            aria-pressed={pocketIdArr.every((id) => clickedEntities.has(id))}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPocketClick(pocketIdArr);
              }
            }}
            style={{
              opacity: pocketIdArr.every((id) => clickedEntities.has(id))
                ? 0.5
                : 1,
            }}
          >{`Pocket ${pocketNum++}: `}</span>
          {pocketIdArr.map((info, index) => (
            <React.Fragment key={info}>
              <span
                onClick={() => onEntityClick(info)}
                className="entity-label"
                role="button"
                aria-label={`Select Entity ${info}`}
                aria-pressed={clickedEntities.has(info)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onEntityClick(info);
                  }
                }}
                style={{
                  color: clickedEntities.has(info) ? "#FF38A9" : "#B88CF2",
                }}
              >
                {info}
              </span>
              {index < pocketIdArr.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      ));

      return pocketsById.length ? (
        pocketsById
      ) : (
        <div>{"No Pockets Detected"}</div>
      );
    };

    return (
      <div className="data-container">
        <h1 className="title">Pocket List:</h1>
        {renderPocketIds()}
        <div className="note">Note: You can click on them! Try it out.</div>
      </div>
    );
  }
);

PocketList.displayName = "PocketList";
