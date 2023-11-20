"use client"

import DeleteBugButton from "@/components/Bugs/BugCard/DeleteBugButton";
import UserAvatar from "@/components/UserAvatar";
import {format} from 'date-fns';
import {HiOutlinePlusSm} from "react-icons/hi";
import {MdModeEdit} from "react-icons/md";
import {FiClock} from "react-icons/fi";

export default function BugCard({task}: { task: any }) {

    const formattedDate = task.deadline ? format(new Date(task.deadline), 'MM/dd/yyyy') : "N/A";


    return (
        <>
            <div className="card mb-5 w-52 rounded-md px-4 py-2 shadow-2xl bg-gray-200 hover:bg-gray-300">
                <div className="card-header">
                    <div className="flex items-center justify-end">
                        <MdModeEdit size={13}/>
                        <DeleteBugButton id={task.id}/>
                    </div>
                </div>
                <div className="card-body">
                    <p className={`${task.priority === "low" ? "bg-green-500" :
                        task.priority === "medium" ? "bg-yellow-400" :
                            "bg-red-400"} text-white rounded p-1 uppercase text-[14px] w-20 flex justify-center`}>{task.priority}</p>
                    <p className="mt-2 text-gray-700 break-words">{task.description}</p>
                </div>
                <div className="card-footer mt-3 ">
                    <div className="flex justify-between text-[12px] tracking-wider text-gray-500 items-center">
                       <div className="flex items-center gap-1">
                           <FiClock />
                           <p>{formattedDate}</p>
                       </div>
                        <div className="flex items-center gap-2">
                            <UserAvatar/>
                            <HiOutlinePlusSm size={32} className="border rounded-full border-dashed border-gray-700"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}