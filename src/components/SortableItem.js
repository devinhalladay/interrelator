import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,

                        textAlign: 'left',
                        margin: 0,
                        padding: 10,
                        border: "1px solid #bec8d4",
                        borderRadius: 2,
                        marginBottom: 10,
                        boxShadow: 'rgba(22, 33, 74, 0.05) 0px 2px 0px 0px'
  };

  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* ... */}
      {props.node.id}
    </div>
  );
}