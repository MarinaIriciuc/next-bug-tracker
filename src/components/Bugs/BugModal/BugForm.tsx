"use client"
import {Textarea} from "@/components/ui/textarea";
import React, {useState} from "react";
import SelectProjectModal from "@/components/Projects/ProjectModal/SelectProjectModal";
import DatepickerBug from "@/components/Bugs/BugModal/DatepickerBug";
import {createTask} from "@/utils/utils";
import {useParams} from "next/navigation";


export default function BugForm() {

    const [deadline, setDeadline] = useState();
    const [priority, setPriority] = useState("");

    const {id} = useParams();

    function selectPriority(name: string) {
        setPriority(name)
    }

    async function addTask(event: any) {
        event.preventDefault();

        const data = {
            description: event.target.elements.description.value,
            deadline: String(deadline),
            priority: priority,
        }
        try {
            await createTask(data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <form onSubmit={addTask}>
            <div>
                <p className="text-black font-medium mt-5">Description</p>
                <Textarea className="mt-2" placeholder="Add a description" name="description"/>
            </div>
            <div>
                <p className="text-black font-medium mt-3">Priority</p>
                <div className="flex text-white mt-4 gap-3">
                    <button onClick={() => selectPriority("low")} type="button"
                            className="font-medium bg-red-400 p-1 rounded">Low priority
                    </button>
                    <button onClick={() => selectPriority("medium")} type="button"
                            className="font-medium bg-yellow-400 p-1 rounded">Medium priority
                    </button>
                    <button onClick={() => selectPriority("high")} type="button"
                            className="font-medium bg-green-500 p-1 rounded">High priority
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