"use client"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import SelectProjectModal from "@/components/Projects/ProjectModal/SelectProjectModal";
import {createProject, editProject} from "@/utils/utils";
import {ProjectSchema} from "@/schemas/ProjectSchema";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/components/ui/use-toast";
import {Project} from "@prisma/client";
import {useAtom} from "jotai";
import {modalOpenedAtom} from "@/store";

export default function ProjectForm({project}: { project: Project | null }) {

    const {toast} = useToast()

    const [, setOpenModal] = useAtom(modalOpenedAtom)

    async function addOrEditProject(event: any) {
        event.preventDefault();
        const data: ProjectSchema = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
        }
        try {
            if (!project) {
                await createProject(data);

            } else {
                await editProject(project.id, data)
            }

            setOpenModal(false)
            toast({
                title: `Project ${project ? "edited" : "created"} successfully`,
                description: data.name,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <form onSubmit={addOrEditProject}>
                <div>
                    <p className="text-black font-medium mt-5">Title</p>
                    <Input className="mt-2" placeholder={project?.name ?? "Add title"} name="name"/>
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
