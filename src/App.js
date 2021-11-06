import {
  closestCenter, DndContext, KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { all, create } from "mathjs";
import { useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  getIncomers,
  getOutgoers,
  removeElements
} from "react-flow-renderer";
import "./App.css";
import ConnectionLine from "./components/ConnectionLine";
import CustomEdge from "./components/CustomEdge";
import { SortableItem } from "./components/SortableItem";

// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`

let initialElements = Array.from({ length: 15 }, (v, i) => ({
  id: `${i}`,
  data: { label: "Input Node" },
}));

console.log(initialElements);

// // default node
// {
//   id: "2",
//   // you can also pass a React component as a label
//   data: { label: <div>Default Node</div> },
//   // position: { x: 100, y: 125 },
// },
// {
//   id: "3",
//   data: { label: "Output Node" },
//   // position: { x: 250, y: 250 },
// },
// {
//   id: "4",
//   data: { label: "Output Node" },
//   // position: { x: 250, y: 250 },
// },
// {
//   id: "5",
//   data: { label: "Output Node" },
//   // position: { x: 250, y: 250 },
// },
// {
//   id: "6",
//   data: { label: "Output Node" },
//   // position: { x: 250, y: 250 },
// },
// animated edge
// { id: 'e1-2', source: '1', target: '2', animated: true },
// { id: 'e2-3', source: '2', target: '3' },
// ];
const config = {};
const math = create(all, config);

function App() {
  let diameter = 600;
  let radius = diameter / 2;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // useEffect(() => {
  //   on("sort", () => );
  // });

  /*
Usage: Position.ellipse(n, rx, ry, so, wh, idd, cls, cw);

where n = number of divs,
      rx = radius along X-axis,
      ry = radius along Y-axis,
      so = startOffset,
      wh = width/height of divs,
      idd = id of main div(ellipse),
      cls = className of divs;
      cw = clockwise(true/false)
*/

  // Position(elements.length, 300, 300, 300, 120)

  // var Position = function(n, rx, ry, so, wh, idd, cls, cw) {

  //     ss[0].insertRule('#' + idd + ' { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; box-shadow: inset 0 0 ' + wh + 'px ' + wh/4 +'px black; background: rgba(0, 0, 0, 0.2); width: ' + String((rx * 2) + wh) + 'px; height: ' + String((ry * 2) + wh) + 'px; }', 1);
  //     ss[0].insertRule('.' + cls + '{ position: absolute; background: black; color: papayawhip; text-align: center; font-family: "Open Sans Condensed", sans-serif; transition: transform 0.2s ease; width: ' + wh + 'px; height: ' + wh + 'px; line-height: ' + wh + 'px;}', 1);
  //     ss[0].insertRule('.' + cls + ':hover { transform: scale(1.2); cursor: pointer; background: rgba(0, 0, 0, 0.8); }', 1);
  //     m.id = idd;
  //     for (var i = 0; i < n; i++) {
  //       var c = document.createElement('div');
  //       c.className = cls;
  //       c.innerHTML = i + 1;
  //       c.style.top = String(ry + -ry * Math.cos((360 / n / 180) * (i + so) * Math.PI)) + 'px';
  //       c.style.left = String(rx + rx * (cw ? Math.sin((360 / n / 180) * (i + so) * Math.PI) : -Math.sin((360 / n / 180) * (i + so) * Math.PI))) + 'px';
  //       m.appendChild(c);
  //     }
  //     document.body.appendChild(m);
  //   }

  // Position.ellipse(20, 150, 150, 0, 35, 'main', 'circle', true);

  const calculateCoordinates = (elements, index) => {
    var theta = (Math.PI * 2) / elements.length;
    var angle = theta * index;

    let x = radius * Math.cos(angle) + radius;
    let y = radius * Math.sin(angle) + radius;
    // electron.pivot.y = (r * Math.sin(angle));

    if (x < radius) {
      x = (radius + 0) * Math.cos(angle) + radius - 42;
    }

    // let x = math.multiply(
    //   radius * 0.8,
    //   math.cos(
    //     math.add(
    //       index,
    //       math.divide(
    //         math.multiply(2, math.pi),
    //         math.multiply(initialElements.length, math.i)
    //       )
    //     )
    //   )
    // ).im;

    // x < 0 ? (x = x - 112) : (x = x + 60);

    // let y =
    //   math.multiply(
    //     radius * 0.8,
    //     math.sin(
    //       math.add(
    //         index,
    //         math.divide(
    //           math.multiply(2, math.pi),
    //           math.multiply(initialElements.length, math.i)
    //         )
    //       )
    //     )
    //   ).im - 20;

    return [x, y];
  };

  const [elements, setElements] = useState(
    initialElements.map((el, index) => {
      let coordinates = calculateCoordinates(initialElements, index);
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
        sourcePosition: coordinates[0] < 0 ? "right" : "left",
        targetPosition: coordinates[0] < 0 ? "right" : "left",
        position: {
          // x: radius * Math.cos(i + (2 * Math.PI / initialElements.length * Math.sqrt(-1))),
          x: coordinates[0],
          y: coordinates[1],
          // y: radius * Math.sin(i + (2 * Math.PI / initialElements.length * Math.sqrt(-1)))
        },
      };
    })
  );

  const [rankedNodes, setRankedNodes] = useState(elements);
  const [inverseRankedNodes, setInverseRankedNodes] = useState(elements)

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    console.log(params);

    // trigger("sort");

    setInverseRankedNodes(
      elements.sort((x, y) => {
        var a = getIncomers(x, elements).length;
        var b = getIncomers(y, elements).length;
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      })
    );

    setRankedNodes(
      elements.sort((x, y) => {
        var a = getOutgoers(x, elements).length;
        var b = getOutgoers(y, elements).length;
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      })
    );

    setElements((els) =>
      addEdge(
        {
          ...params,
          type: "custom",
          style: { strokeWidth: "1px", stroke: "black", zIndex: 900 },
        },
        els
        )
      )



  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  // const nodeTypes = {

  // }



  useEffect(() => {
    setRankedNodes(
      elements.sort((x, y) => {
        var a = getOutgoers(x, elements).length;
        var b = getOutgoers(y, elements).length;
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      })
    );
  }, [elements]);

  useEffect(() => {
    setInverseRankedNodes(
      elements.sort((x, y) => {
        var a = getIncomers(x, elements).length;
        var b = getIncomers(y, elements).length;
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      })
    );
  }, [elements]);


  return (
    <div className="App">
      <div
        style={{
          display: "flex",
        }}
      >
      <div
          style={{
            margin: 0,
            flexShrink: 0,
            padding: 20,
            width: 200,
            marginRight: 20,
            height: 600,
            overflow: 'hidden',
            border: "1px solid #dedede",
            borderRadius: 6,
            backgroundColor: "white",
            boxShadow: "0px 4px 8px 0px rgb(22 33 74 / 5%)",
          }}
        >
          <h2 style={{ textAlign: "left", marginTop: 0, padding: 0 }}>
            Rapid Fire
          </h2>
          <input type="text" style={{
            width: 'calc(100% - 20px)',
            overflow: 'hidden',
            paddingLeft: 10,
            paddingRight: 0,
            height: 32,
            fontSize: 15,
            marginBottom: 10,
          }} placeholder="Add an item…"/>
          <div style={{
            borderTop: '1px solid #dee3e9',
            paddingTop: 10,
            width: '100%',
          }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={rankedNodes}
                strategy={verticalListSortingStrategy}
              >
                {rankedNodes
                  .map((node) => {
                    if (node.type === undefined) {
                      return <SortableItem key={node.id} node={node} id={node.id} />;
                    }
                  })
}
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <div
          style={{
            width: 800,
            height: 600,
            padding: 60,
            flexShrink: 0,
            marginRight: 20,
            border: "1px solid #dedede",
            borderRadius: 6,
            backgroundColor: "white",
            boxShadow: "0px 4px 8px 0px rgb(22 33 74 / 5%)",
          }}
        >
          <div
            style={{
              height: `${diameter}px`,
              width: `${diameter}px`,

              margin: "auto",
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
              // nodeExtent={[[-Math.abs(radius), -Math.abs(radius)], [radius, radius]]}
              nodesDraggable={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomActivationKeyCode={false}
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
                  border: "1px solid black",
                }}
              />
            </ReactFlow>
          </div>
        </div>


        <div style={{
            margin: 0,
            padding: 20,
            height: 600,
            flexShrink: 0,
            overflow: 'hidden',
            border: "1px solid #dedede",
            borderRadius: 6,
            backgroundColor: "white",
            boxShadow: "0px 4px 8px 0px rgb(22 33 74 / 5%)",
            display: 'flex',
            // width: 'fit-content'
          }}>
          <div style={{
            flexShrink: 0,
            flexGrow: 0,
            marginRight: 40,
            width: 200,
          }}
          >
            <h2 style={{ textAlign: "left", marginTop: 0, padding: 0 }}>
              High Input
            </h2>

            {inverseRankedNodes
              .map((node) => {
                if (node.type === undefined) {
                  return (
                    <div
                      key={Math.ceil(Math.random() * 100)}
                      className={node.id}
                      style={{
                        margin: 0,
                        padding: 10,
                        border: "1px solid #bec8d4",
                        borderRadius: 2,
                        marginBottom: 10,
                        textAlign: 'left',
                        boxShadow: 'rgba(22, 33, 74, 0.05) 0px 2px 0px 0px'
                      }}
                    >
                      {node.id}
                      {/* {getIn(node, elements).length} */}
                    </div>
                  );
                }
              }).reverse()
              }
          </div>
          <div style={{
            flexShrink: 0,
            flexGrow: 0,
          }}
          >
            <h2 style={{ textAlign: "left", marginTop: 0, padding: 0 }}>
              High Output
            </h2>
            {rankedNodes
              .map((node) => {
                if (node.type === undefined) {

                  return (
                    <div
                      key={node.id}
                      style={{
                        width: 200,
                        textAlign: 'left',
                        margin: 0,
                        padding: 10,
                        border: "1px solid #bec8d4",
                        borderRadius: 2,
                        marginBottom: 10,
                        boxShadow: 'rgba(22, 33, 74, 0.05) 0px 2px 0px 0px'

                      }}
                      className={`${node.id}-b`}
                    >
                      {node.id}
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div></div>
      </div>
      {/* {rankedNodes.map((el, i) => {
        if (rankedNodes[i] !== rankedNodes.reverse()[i]) {
          return (
          <LineTo borderColor="#dedede" from={el.id} to={`${el.id}-b`} fromAnchor="center right" toAnchor="center left"/>
        )
        }
      })} */}
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRankedNodes(() => {
        const oldIndex = rankedNodes.findIndex((node) => active.id === node.id);
        const newIndex = rankedNodes.findIndex((node) => over.id === node.id);

        return arrayMove(rankedNodes, oldIndex, newIndex);
      });

    setInverseRankedNodes(() => {
        const oldIndex = inverseRankedNodes.findIndex((node) => active.id === node.id);
        const newIndex = inverseRankedNodes.findIndex((node) => over.id === node.id);

        return arrayMove(inverseRankedNodes, oldIndex, newIndex);
      });
    }
  }
}

export default App;
