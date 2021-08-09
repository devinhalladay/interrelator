import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="20"
          markerHeight="20"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" stroke="white" strokeWidth="4px" />
        </marker>
      </defs>
      <g>
        <line
        id={id} style={style} className="react-flow__edge-path"
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
}
