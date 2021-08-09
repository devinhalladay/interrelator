import logo from "./logo.svg";
import "./App.css";
import ReactFlow, {
  addEdge,
  Background,
  getIncomers,
  getOutgoers,
  removeElements,
  StraightEdge,
} from "react-flow-renderer";
import { useState } from "react";
import { useEffect } from "react";
import { all, create } from "mathjs";
import ConnectionLine from "./components/ConnectionLine";
import CustomEdge from "./components/CustomEdge";
import { useLayoutEffect } from "react";

const initialElements = [
  {
    id: "1",
    data: { label: "Input Node" },
    // position: { x: 250, y: 25 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    // position: { x: 100, y: 125 },
  },
  {
    id: "3",
    data: { label: "Output Node" },
    // position: { x: 250, y: 250 },
  },
  {
    id: "4",
    data: { label: "Output Node" },
    // position: { x: 250, y: 250 },
  },
  {
    id: "5",
    data: { label: "Output Node" },
    // position: { x: 250, y: 250 },
  },
  {
    id: "6",
    data: { label: "Output Node" },
    // position: { x: 250, y: 250 },
  },
  // animated edge
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e2-3', source: '2', target: '3' },
];

const config = {};
const math = create(all, config);

function App() {
  let diameter = 600;
  let radius = diameter / 2;


  const [elements, setElements] = useState(
    initialElements.map((el, index) => {
      return {
        ...el,
        data: {
          label: (
            <div>
              <span
                style={{
                  marginRight: 8,
                  paddingRight: 8,
                  fontWeight: 800,
                  fontFamily: "IBM Plex Mono",
                  borderRight: "1px solid #d0d0d0",
                }}
              >
                {el.id}
              </span>
              <span
                style={{
                  marginRight: 8,
                  textTransform: "uppercase",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  color: "#999999",
                }}
              >
                IN
              </span>
              <span style={{ marginRight: 8, fontFamily: "IBM Plex Mono" }}>
                {getIncomers(el, initialElements).length}
              </span>
              <span
                style={{
                  marginRight: 8,
                  textTransform: "uppercase",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  color: "#999999",
                }}
              >
                OUT
              </span>
              <span style={{ fontFamily: "IBM Plex Mono" }}>
                {getOutgoers(el, initialElements).length}
              </span>
            </div>
          ),
        },
        style: {
          textAlign: "left",
        },
        sourcePosition: "left",
        targetPosition: "left",
        position: {
          // x: radius * Math.cos(i + (2 * Math.PI / initialElements.length * Math.sqrt(-1))),
          x:
            math.multiply(
              radius * 0.8,
              math.cos(
                math.add(
                  index,
                  math.divide(
                    math.multiply(2, math.pi),
                    math.multiply(initialElements.length, math.i)
                  )
                )
              )
            ).im + 60,
          y:
            math.multiply(
              radius * 0.8,
              math.sin(
                math.add(
                  index,
                  math.divide(
                    math.multiply(2, math.pi),
                    math.multiply(initialElements.length, math.i)
                  )
                )
              )
            ).im - 20,
          // y: radius * Math.sin(i + (2 * Math.PI / initialElements.length * Math.sqrt(-1)))
        },
      };
    })
  );

  const [rankedNodes, setRankedNodes] = useState(elements)

  // const [rankedElements, setRankedElements] = ueState(elements)

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    console.log(params);




    setElements((els) =>
      addEdge(
        {
          ...params,
          type: "custom",
          style: { strokeWidth: "1px", stroke: "black", zIndex: 900 },
        },
        elements.map((el, i) => {
          if (el.id === params.source || el.id === params.target) {
            return (
              {
                ...el,
                data: {
                  ...el.data,
                  label: (
                    <div>
                      <span
                        style={{
                          marginRight: 8,
                          paddingRight: 8,
                          fontWeight: 800,
                          fontFamily: "IBM Plex Mono",
                          borderRight: "1px solid #d0d0d0",
                        }}
                      >
                        {el.id}
                      </span>
                      <span
                        style={{
                          marginRight: 8,
                          textTransform: "uppercase",
                          fontFamily: "IBM Plex Sans",
                          fontWeight: 500,
                          letterSpacing: "1px",
                          color: "#999999",
                        }}
                      >
                        IN
                      </span>
                      <span style={{ marginRight: 8, fontFamily: "IBM Plex Mono" }}>
                        {getIncomers(el, elements).length}
                      </span>
                      <span
                        style={{
                          marginRight: 8,
                          textTransform: "uppercase",
                          fontFamily: "IBM Plex Sans",
                          fontWeight: 500,
                          letterSpacing: "1px",
                          color: "#999999",
                        }}
                      >
                        OUT
                      </span>
                      <span style={{ fontFamily: "IBM Plex Mono" }}>
                        {getOutgoers(el, elements).length}
                      </span>
                    </div>
                  )
                }
              }
            )
          } else return el})
      )
    );

    

  // setRankedNodes(elements.sort((x, y) => {
  //   var a = getOutgoers(x, elements).length;
  //   var b = getOutgoers(y, elements).length;
  //   if (a < b) {
  //     return -1;
  //   } else if (a > b) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }).reverse())


  // console.log(
  //   elements.sort((x, y) => {
  //     var a = getOutgoers(x, elements).length;
  //     var b = getOutgoers(y, elements).length;
  //     if (a < b) {
  //       return -1;
  //     } else if (a > b) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   })
  // );
  // let rankedEls = []
  // elements.forEach(element => {
  //   getOutgoers(el, elements).length
  // });

};

const edgeTypes = {
  custom: CustomEdge,
};

// useEffect(() => {
//   let newEls = elements.map((el, i) => (
//     {
//       ...el,
//       data: {
//         ...el.data,
//         label: (
//           <div>
//             <span
//               style={{
//                 marginRight: 8,
//                 paddingRight: 8,
//                 fontWeight: 800,
//                 fontFamily: "IBM Plex Mono",
//                 borderRight: "1px solid #d0d0d0",
//               }}
//             >
//               {el.id}
//             </span>
//             <span
//               style={{
//                 marginRight: 8,
//                 textTransform: "uppercase",
//                 fontFamily: "IBM Plex Sans",
//                 fontWeight: 500,
//                 letterSpacing: "1px",
//                 color: "#999999",
//               }}
//             >
//               IN
//             </span>
//             <span style={{ marginRight: 8, fontFamily: "IBM Plex Mono" }}>
//               {getIncomers(el, elements).length}
//             </span>
//             <span
//               style={{
//                 marginRight: 8,
//                 textTransform: "uppercase",
//                 fontFamily: "IBM Plex Sans",
//                 fontWeight: 500,
//                 letterSpacing: "1px",
//                 color: "#999999",
//               }}
//             >
//               OUT
//             </span>
//             <span style={{ fontFamily: "IBM Plex Mono" }}>
//               {getOutgoers(el, elements).length}
//             </span>
//           </div>
//         )
//       }
//     }
//   ))

//   setElements(newEls);
// }, [elements.length, setElements]);

useEffect(() => {
  setRankedNodes(elements.sort((x, y) => {
    var a = getOutgoers(x, elements).length;
    var b = getOutgoers(y, elements).length;
    if (a < b) {
      return -1;
    } else {
      return 1
    }
  }))
}, [elements])

return (
  <div className="App">
    {/* <textarea
        name="factors"
        id="factors"
        cols="20"
        rows="10"
        style={{ fontSize: 18, fontFamily: "Minipax" }}
      ></textarea> */}

    <div
      style={{
        height: `${diameter}px`,
        width: `${diameter}px`,
        borderRadius: "50%",
        border: "1px solid black",
      }}
    >
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        connectionLineType="straight"
        connectionLineComponent={ConnectionLine}
        style={{
          overflow: "visible",
        }}
        // nodeExtent={[[-Math.abs(diameter), -Math.abs(diameter)], [diameter, diameter]]}
        defaultPosition={[radius * 0.8, radius]}
        nodesDraggable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        paneMoveable={false}
        connectionMode="loose"
        edgeTypes={edgeTypes}
      >
        <Background
          variant="dots"
          gap={12}
          size={1}
          color="#e5e5e5"
          style={{
            borderRadius: "50%",
          }}
        />
      </ReactFlow>
      <ul style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        width: 200
      }}>
        {
          rankedNodes.map(node => {
            if (node.type === undefined) return <li style={{
              margin: 0,
              padding: 10,
              border: '1px solid black',
              marginBottom: 10
            }}>{node.id}</li>
          }).reverse()
        }
      </ul>
    </div>
  </div>
);
}

export default App;
