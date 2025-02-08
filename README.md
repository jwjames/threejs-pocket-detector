# Pocket Detection Visualization

A React application that detects and visualizes pockets in 3D geometry using Three.js. This tool helps identify and analyze connected geometric entities based on their edge relationships.

## Features

- **Pocket Detection**: Identifies connected entities through concave edges
- **3D Visualization**: Interactive 3D model viewing with Three.js
- **Interactive Selection**: Click to highlight individual entities or entire pockets
- **Edge Analysis**: Processes different edge types (concave, convex, tangential)

## **How It Works**

The pocket detection algorithm follows these steps:

1. **Identify Concave Edges**: Extract edge metadata to locate concave edges.
2. **Build Adjacency Graph**: Find connected groups of entities.
3. **Merge Pockets**: Combine overlapping groups based on edge relationships.
4. **Filter Results**: Ensure pockets meet geometric and UV criteria.

### **What Defines a Valid Pocket?**

A pocket must:

- Contain at least **2 entities**.
- Be connected through **concave edges**.
- Meet **geometric criteria** (e.g., area, UV coordinates).
- Avoid overlapping with other pockets unless specific edge types are shared.

---

## **Technology Stack**

- React
- TypeScript
- Three.js
- React Three Fiber
- React Three Drei

---

## **Getting Started**

### **Prerequisites**

Before starting, ensure you have:

- [Node.js](https://nodejs.org/) (v16 or higher).
- npm (v8 or higher).
- A modern browser with [WebGL support](https://get.webgl.org/).

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/jwjames/threejs-pocket-detector.git
```

2. Navigate to the project directory:

```bash
cd threejs-pocket-detector
```

4. Install dependencies:

```bash
npm install
```

### **Running the Application**

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

## **[Optional] Upload Custom Model**

### **Adding Your 3D Model**

1. Place your `.glb` file in the `public` directory.
2. Ensure the file is named **`colored_glb.glb`**.
3. The model must include **RGB colors** mapped to **entity IDs**.

### **Adding Your Data Files**

Place your JSON files in the `src/data` directory:

- **`adjacency_graph.json`**: Connectivity information for entities.
- **`adjacency_graph_edge_metadata.json`**: Definitions for edge types.
- **`entity_geometry_info.json`**: Geometric properties of entities.
- **`rgb_id_to_entity_id_map.json`**: RGB-to-entity ID mappings.
