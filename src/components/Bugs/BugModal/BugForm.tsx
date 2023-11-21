"use client"
import {Textarea} from "@/components/ui/textarea";
import React, {useState} from "react";
import SelectProjectModal from "@/components/Projects/ProjectModal/SelectProjectModal";
import DatepickerBug from "@/components/Bugs/BugModal/DatepickerBug";
import {createProject, createTask, editProject, editTask} from "@/utils/utils";
import {useParams} from "next/navigation";
import {ToastAction} from "@/components/ui/toast";
import {toast, useToast} from "@/components/ui/use-toast";
import {useAtom} from "jotai";
import {modalOpenedAtom} from "@/store";


export default function BugForm({task}: { task: any }) {

    const [deadline, setDeadline] = useState();
    const [priority, setPriority] = useState("");
    const {id} = useParams();
    const [openModal, setOpenModal] = useAtom(modalOpenedAtom)


    function selectPriority(name: string) {
        setPriority(name)
    }

    async function createOrEditTask(event: any) {
        event.preventDefault();
        const data = {
            description: event.target.elements.description.value,
            deadline: String(deadline),
            priority: priority,
            projectId: id
        }

        try {
            if (!task) {
                await createTask(data)
            } else {
                await editTask(task.id, data)
            }
            setOpenModal(false)
            toast({
                title: `Project ${task ? "edited" : "created"} successfully`,
                description: data.description,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <form onSubmit={createOrEditTask}>
            <div>
                <p className="text-black font-medium mt-5">Description</p>
                <Textarea className="mt-2" placeholder="Add a description" name="description"/>
            </div>
            <div>
                <p className="text-black font-medium mt-3">Priority</p>
                <div className="flex text-white mt-4 gap-3">
                    <button onClick={() => selectPriority("low")} type="button"
                            className="font-medium bg-green-500  p-1 rounded">Low priority
                    </button>
                    <button onClick={() => selectPriority("medium")} type="button"
                            className="font-medium bg-yellow-400 p-1 rounded">Medium priority
                    </button>
                    <button onClick={() => selectPriority("high")} type="button"
                            className="font-medium bg-red-400 p-1 rounded">High priority
                    </button>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <div>
                    <p className="text-black font-medium mt-5">Members</p>
                    <SelectProjectModal/>
                </div>
                <div>
                    <p className="text-black font-medium mt-5">Due date</p>
                    <DatepickerBug deadline={deadline} setDeadline={setDeadline}/>
                </div>
            </div>
            <button type="submit" className="custom-button mt-10">Add</button>
        </form>
    )

}



