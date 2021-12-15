/**
 * This example shows how to use different programs to render nodes.
 * This works in two steps:
 * 1. You must declare all the different rendering programs to sigma when you
 *    instantiate it
 * 2. You must give to each node and edge a "type" value that matches a declared
 *    program
 * The programs offered by default by sigma are in src/rendering/webgl/programs,
 * but you can add your own.
 *
 * Here in this example, some nodes are drawn with images in them using the
 * the getNodeProgramImage provided by Sigma. Some others are drawn as white
 * disc with a border, and the custom program to draw them is in this directory:
 * - "./node.border.ts" is the node program. It tells sigma what data to give to
 *   the GPU and how.
 * - "./node.border.vert.glsl" is the vertex shader. It tells the GPU how to
 *   interpret the data provided by the program to obtain a node position,
 *   mostly.
 * - "./node.border.frag.glsl" is the fragment shader. It tells for each pixel
 *   what color it should get, relatively to data given by the program and its
 *   position inside the shape. Basically, the GPU wants to draw a square, but
 *   we "carve" a disc in it.
 */

import Graph from "graphology";
import Sigma from "sigma";

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import NodeProgramBorder from "./node.border";

//import ForceSupervisor from "graphology-layout-force/worker";

const container = document.getElementById("sigma-container") as HTMLElement;

// cluster definition
interface Cluster {
  label: string;
  x?: number;
  y?: number;
  color?: string;
  positions: { x: number; y: number }[];
}

const graph = new Graph();

graph.addNode("1", { size: 50, label: "PV - informeren verdachte", type: "image", image: "./sticker.svg", color: "#E44234" });
graph.addNode("2", { size: 50, label: "Bronnenlijst NFI", type: "image", image: "./sticker.svg", color: "#80E5B1" });
graph.addNode("3", { size: 50, label: "Munitie - foto2", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("4", { size: 50, label: "Munitie - foto3", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("5", { size: 50, label: "PV - verhoor getuige - Personalia", type: "image", image: "./sticker.svg", color: "#2E4B8B" });
graph.addNode("6", { size: 50, label: "art 9, lid 4 PolW 2012", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("7", { size: 50, label: "PV - identificatie", type: "image", image: "./sticker.svg", color: "#E44234" });
graph.addNode("8", { size: 50, label: "PVB - gang van zaken - schoten", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("9", { size: 50, label: "art 94 Sv", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("10", { size: 50, label: "Munitie - onderzoek inleiding", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("11", { size: 50, label: "Munitie - onderzoek algemeen", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("12", { size: 50, label: "Munitie - nfi vuurwapens", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("13", { size: 50, label: "Munitie - foto4", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("14", { size: 50, label: "Verdachte - PV personalia", type: "image", image: "./sticker.svg", color: "#FFE6A2" });
graph.addNode("15", { size: 50, label: "PV - Grond aanhouding", type: "image", image: "./sticker.svg", color: "#E44234" });
graph.addNode("16", { size: 50, label: "Woordenlijst NFI vuurwapens", type: "image", image: "./sticker.svg", color: "#E2A1E6" });
graph.addNode("17", { size: 50, label: "PV - bevindingen", type: "image", image: "./sticker.svg", color: "#E44234" });
graph.addNode("18", { size: 50, label: "art 7, lid 4, PolW 2012", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("19", { size: 50, label: "Art 7, lid 3, PolW 2012", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("20", { size: 50, label: "Munitie - politieonderzoek", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("21", { size: 50, label: "PV - Verhoor getuige - Niet NL-talig", type: "image", image: "./sticker.svg", color: "#2E4B8B" });
graph.addNode("22", { size: 50, label: "Munitie - PO labeling beslag hulzen", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("23", { size: 50, label: "PVB - gang van zaken - mes", type: "image", image: "./sticker.svg", color: "#9C9C9C" });
graph.addNode("24", { size: 50, label: "KVI - Fileermes", type: "image", image: "./sticker.svg", color: "#9C9C9C" });
graph.addNode("25", { size: 50, label: "PVB - politie onderzoek - kogelfragment", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("26", { size: 50, label: "PVB - politie onderzoek - mes", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("27", { size: 50, label: "PVB - politieonderzoek - patroonhouders", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("28", { size: 50, label: "Munitie - vergelijkend onderzoek", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("29", { size: 50, label: "Munitie - vooronderzoek", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("30", { size: 50, label: "Munitie pv", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("31", { size: 50, label: "Munitie - foto1", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("32", { size: 50, label: "Munitie - nfi sporen", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("33", { size: 50, label: "Verdachte PV Aanhouding", type: "image", image: "./sticker.svg", color: "#FFE6A2" });
graph.addNode("34", { size: 50, label: "art. 56 Sv", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("35", { size: 50, label: "art. 9 lid 2 Opw", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("36", { size: 50, label: "art 52, lid 2 WWM", type: "image", image: "./sticker.svg", color: "#88271F" });
graph.addNode("37", { size: 50, label: "Verdachte - PV verhoor", type: "image", image: "./sticker.svg", color: "#FFE6A2" });
graph.addNode("38", { size: 50, label: "Munitie - PO bloedsporen", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("39", { size: 50, label: "Munitie - PO kogelhuls plaats delict", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("40", { size: 50, label: "Munitie - PO detailopname kogel", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("41", { size: 50, label: "Munitie - PO - kogelhuls", type: "image", image: "./sticker.svg", color: "#FFC67B" });
graph.addNode("42", { size: 50, label: "Munitie - KVI hulzen", type: "image", image: "./sticker.svg", color: "#FFC67B" });

graph.nodes().forEach((node, i) => {
  const angle = (i * 2 * Math.PI) / graph.order;
  graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
  graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderer = new Sigma(graph, container, {
  // We don't have to declare edgeProgramClasses here, because we only use the default ones ("line" and "arrow")
  nodeProgramClasses: {
    image: getNodeProgramImage(),
    border: NodeProgramBorder,
  },
  renderEdgeLabels: true,
});

//
// Drag'n'drop feature
// ~~~~~~~~~~~~~~~~~~~
//

// State for drag'n'drop
let draggedNode: string | null = null;
let isDragging = false;

// On mouse down on a node
//  - we enable the drag mode
//  - save in the dragged node in the state
//  - highlight the node
//  - disable the camera so its state is not updated
renderer.on("downNode", (e) => {
  isDragging = true;
  draggedNode = e.node;
  graph.setNodeAttribute(draggedNode, "highlighted", true);
  renderer.getCamera().disable();
});

renderer.on("clickNode", (e) => {
  console.log(graph.getNodeAttributes(e.node))
});

// On mouse move, if the drag mode is enabled, we change the position of the draggedNode
renderer.getMouseCaptor().on("mousemovebody", (e) => {
  if (!isDragging || !draggedNode) return;

  // Get new position of node
  const pos = renderer.viewportToGraph(e);

  graph.setNodeAttribute(draggedNode, "x", pos.x);
  graph.setNodeAttribute(draggedNode, "y", pos.y);
});

// On mouse up, we reset the autoscale and the dragging mode
renderer.getMouseCaptor().on("mouseup", () => {
  if (draggedNode) {
    graph.removeNodeAttribute(draggedNode, "highlighted");
  }
  isDragging = false;
  draggedNode = null;
  renderer.getCamera().enable();
});

// Disable the autoscale at the first down interaction
renderer.getMouseCaptor().on("mousedown", () => {
  if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());
});
