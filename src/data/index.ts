import { EdgeMetadata } from "@typings/geometry";

import adjacencyGraph from "./adjacency_graph.json";
import rawEdgeMetadata from "./adjacency_graph_edge_metadata.json";
import entityInfo from "./entity_geometry_info.json";
import rgbToEntityMap from "./rgb_id_to_entity_id_map.json";

const edgeMetadata: EdgeMetadata = rawEdgeMetadata as EdgeMetadata;

export { adjacencyGraph, edgeMetadata, entityInfo, rgbToEntityMap };
