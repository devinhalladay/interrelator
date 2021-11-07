import type { NextPage } from "next";
import { KeyboardEvent, useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  useUpdateNodeInternals,
} from "react-flow-renderer";

import { FlowElement, Elements, Connection, Edge } from "react-flow-renderer";

import { FlowNode } from "../types";

const initialElements = [
  // {
  //   id: "1",
  //   type: "input", // input node
  //   data: { label: "Input Node" },
  //   position: { x: 250, y: 25 },
  // },
  // // default node
  // {
  //   id: "2",
  //   // you can also pass a React component as a label
  //   data: { label: <div>Default Node</div> },
  //   position: { x: 100, y: 125 },
  // },
  // {
  //   id: "3",
  //   type: "output", // output node
  //   data: { label: "Output Node" },
  //   position: { x: 250, y: 250 },
  // },
  // // animated edge
  // // { id: "e1-2", source: "1", target: "2", animated: true },
  // // { id: "e2-3", source: "2", target: "3" },
];

const Home: NextPage = () => {
  // store a list of elements and edges in state
  const [elements, setElements] = useState<Elements>([]);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els: Elements) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge<any> | Connection) =>
    setElements((els: Elements) => addEdge(params, els));

  const addNode = (e: KeyboardEvent<HTMLInputElement>) => {
    setElements([
      ...elements,
      {
        id: `node-${elements.length + 1}`,
        data: { label: e.currentTarget.value },
        position: { x: 100, y: 100 },
      },
    ]);
    console.log(elements);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add a node"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNode(e);
            }
          }}
        />
        <ul>
          {elements.map(
            (node) =>
              node.data && <li key={node.data.label}>{node.data.label}</li>
          )}
        </ul>
      </div>
      <div className="h-screen w-screen">
        <ReactFlow
          elements={elements}
          minZoom={1}
          maxZoom={2}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46} /* 'delete'-key */
        />
      </div>
    </div>
  );
};

export default Home;
