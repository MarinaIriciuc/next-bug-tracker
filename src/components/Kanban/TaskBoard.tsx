import clsx from "clsx";
import React, {useState} from "react";
import {Task} from "@prisma/client";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {IoClose} from "react-icons/io5";
import {deleteTask} from "@/utils/utils";
import {FiClock} from "react-icons/fi";
import UserAvatar from "@/components/UserAvatar";
import {HiOutlinePlusSm} from "react-icons/hi";
import {useAtom} from "jotai";
import {currentTaskAtom, modalOpenedAtom} from "@/store";
import {MdModeEdit} from "react-icons/md";
import {format} from "date-fns";

export default function TaskBoard({task}: { task: Task }) {


  const [isMouseOver, setIsMouseOver] = useState(false);
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: task.id,
    data: {type: "task", task},
    disabled: isMouseOver
  });

  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
  const [openModal, setOpenModal] = useAtom(modalOpenedAtom)
  const formattedDate = task.deadline ? format(new Date(task.deadline), 'MM/dd/yyyy') : "N/A";


  return (
    <div ref={setNodeRef} {...attributes} style={{transition, transform: CSS.Translate.toString(transform),}}
         className={clsx('bg-white shadow-md rounded-xl w-full border border-transparent dark:border-0 hover:border-gray-200 cursor-pointer', isDragging && 'opacity-50')}>
      <div {...listeners}
           className="card py-4 w-full rounded-xl px-4 border border-gray-200 bg-gray-100 dark:bg-[#20212C] hover:border-gray-200 transition dark:border-0 dark:shadow-none">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <p className={`${task.priority === "low" ? "bg-green-500" :
              task.priority === "medium" ? "bg-yellow-400" :
                "bg-red-400"} text-white rounded p-1 uppercase text-[14px] w-20 flex justify-center`}>{task.priority}</p>
            <div className="flex gap-1">
              <MdModeEdit onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}
                          onClick={() => {
                            setOpenModal(true)
                            setCurrentTask(task)
                          }} size={15}/>
              <div onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}>
                <IoClose onClick={() => deleteTask(task.id)}/>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="mt-5 tracking-wide dark:text-gray-300">{task.title}</p>
          <p className="text-gray-500 break-words flex items-start text-[14px]">{task.description}</p>
        </div>
        <div className="card-footer mt-3">
          <div className="flex justify-between text-[12px] tracking-wider text-gray-500 items-center">
            <div className="flex items-center gap-1">
              <FiClock/>
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <UserAvatar/>
              <HiOutlinePlusSm size={28} className="border rounded-full border-dashed border-gray-700"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}




