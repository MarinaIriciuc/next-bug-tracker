"use client"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import SelectProjectModal from "@/components/Projects/ProjectModal/SelectProjectModal";
import {createProject} from "@/utils/utils";
import {ProjectSchema} from "@/schemas/ProjectSchema";

export default function ProjectForm() {

    async function addProject(event: any) {
        event.preventDefault();
        const data: ProjectSchema = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
        }
        try {
            await createProject(data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <form onSubmit={addProject}>
                <div>
                    <p className="text-black font-medium mt-5">Title</p>
                    <Input className="mt-2" placeholder="Add a title" name="name"/>
                </div>
                <div>
                    <p className="text-black font-medium mt-5">Description</p>
                    <Textarea className="mt-2" placeholder="Add a description" name="description"/>
                </div>
                <div>
                    <p className="text-black font-medium mt-5">Members</p>
                    <SelectProjectModal/>
                </div>
                <button type="submit" className="custom-button mt-10">Save and Close</button>
            </form>
        </>
    )
}