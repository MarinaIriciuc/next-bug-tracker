import clsx from "clsx";
import React from "react";
import {IColumn} from "@/store";
import {Task} from "@prisma/client";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import TaskBoard from "@/components/Kanban/TaskBoard";

export default function ColumnBoard({column, tasks}: { column: IColumn, tasks: Task[] }) {
    const {
        setNodeRef,
        attributes,
        transform,
        transition,
    } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column
        }
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}
            className={clsx(
                'w-full min-w-[350px] min-h-full p-4 bg-gray-200 rounded-xl flex flex-col gap-y-4 dark:bg-[#33354A]',
            )}>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <h1 className="text-gray-800 text-xl font-semibold  dark:text-gray-300">{column.name}</h1>
                    <p className="text-gray-400 text-sm">{tasks.length} active tasks</p>
                </div>
            </div>

            <SortableContext items={tasks.map((task) => task.id)}>
                <div className="flex items-start flex-col gap-y-4">
                    {tasks.map((task) => (
                        <TaskBoard key={task.id} task={task}/>
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}
