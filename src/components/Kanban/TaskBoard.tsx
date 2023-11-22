import clsx from "clsx";
import React from "react";
import {Task} from "@prisma/client";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function TaskBoard({task}: {task:Task}){
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task
    }
  });


  return(
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-center justify-between">
        {task.description}
        <button
          {...listeners}
          className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
        >
          Drag Handle
        </button>
      </div>
    </div>
  )
}
