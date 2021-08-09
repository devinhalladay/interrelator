import React from "react";

const ConnectionLine = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      <g>
        <line
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
          fill="none"
          stroke="#222"
          strokeWidth={1.5}
          className="animated"
          marker-end="url(#arrowhead)"
        />

        {/* <circle
          cx={targetX}
          cy={targetY}
          fill="#fff"
          r={3}
          stroke="#222"
          strokeWidth={1.5}
        /> */}
      </g>
    </>
  );
};

export default ConnectionLine;
