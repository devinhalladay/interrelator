import type { NextPage } from "next";
import { KeyboardEvent, useState } from "react";
import ReactFlow, {
  addEdge, Connection, Edge, Elements, removeElements
} from "react-flow-renderer";

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
