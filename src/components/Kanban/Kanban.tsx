"use client"
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent, DragOverlay, DragMoveEvent, DragOverEvent
} from "@dnd-kit/core";
import {useAtom} from "jotai";
import {activeTaskAtom, columnsAtom} from "@/store";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import ColumnBoard from "@/components/Kanban/ColumnBoard";
import {Task} from "@prisma/client";
import TaskBoard from "@/components/Kanban/TaskBoard";
import {useEffect, useState} from "react";

export default function Kanban({defaultTasks}: { defaultTasks: Task[] }) {

  // const sensors = useSensors(useSensor(PointerSensor));

  const [columns, setColumns] = useAtom(columnsAtom);
  const [activeTask, setActiveTask] = useAtom(activeTaskAtom);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)


  useEffect(() => {
    setTasks(defaultTasks)
  }, [defaultTasks])

  function onDragStart(event: DragStartEvent) {
    const task = event.active.data.current?.task;
    setActiveTask(task);
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null)
  }

  function onDragOver(event: DragOverEvent) {
    const {active, over} = event;

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeId = active.data.current?.task.id
      const overId = over.data.current?.column.id
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        tasks[activeIndex].columnId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }


  return (
    <DndContext id={"kanban"} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}
                onDragOver={onDragOver}>
      <SortableContext items={columns.map(column => column.id)}>
        {columns.map(function (column) {
          return (
            <ColumnBoard
              key={column.id}
              column={column}
              tasks={tasks?.filter(task => task.columnId === column.id)!}
            />
          )
        })}
      </SortableContext>

      <DragOverlay>
        {activeTask && (
          <TaskBoard task={activeTask}/>
        )}
      </DragOverlay>
    </DndContext>
  )
}
