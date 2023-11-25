"use client"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React, {useState} from "react";
import SelectProjectModal from "@/components/Projects/ProjectModal/SelectProjectModal";
import {createProject, editProject} from "@/utils/utils";
import {ProjectSchema} from "@/schemas/ProjectSchema";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/components/ui/use-toast";
import {Project} from "@prisma/client";
import {useAtom} from "jotai";
import {modalOpenedAtom} from "@/store";
import {ZodError} from "zod";

export default function ProjectForm({project}: { project: Project | null }) {

    const {toast} = useToast();
    const [, setOpenModal] = useAtom(modalOpenedAtom)
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        description: ""
    });

    function validateProjectForm(){
        if (formData.name.length < 10 || formData.name.length > 30) {
            setErrorMessage(prevState => ({...prevState, name: "The name must have at least 10 characters and at most 30 characters"}));
        }
        if (formData.description.length < 10 || formData.description.length > 80) {
            setErrorMessage(prevState => ({...prevState, description: "The description must have at least 10 characters and at most 80 characters"}));
        }
    }

    async function addOrEditProject(event: any) {
        event.preventDefault();
        const data: ProjectSchema = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
        }
        setErrorMessage({
            name: "",
            description: ""
        });
        validateProjectForm()
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

        }
    }


    return (
        <>
            <form onSubmit={addOrEditProject}>
                <div>
                    <p className="text-black font-medium mt-5 dark:text-gray-300">Title</p>
                    <Input
                        onChange={(e) => setFormData(prevState => ({...prevState, name: e.target.value}))}
                        className="mt-2 dark:bg-[#33354A] dark:text-gray-300" placeholder={project?.name ?? "Add title"} name="name"/>
                </div>
                <p className="ms-2 error-message">{errorMessage.name}</p>
                <div>
                    <p className="text-black font-medium mt-5 dark:text-gray-300">Description</p>
                    <Textarea
                        onChange={(e) => setFormData(prevState => ({...prevState, description: e.target.value}))}
                        className="mt-2 dark:bg-[#33354A] dark:text-gray-300" placeholder="Add a description" name="description"/>
                </div>
                <p className="ms-2 error-message">{errorMessage.description}</p>
                <button type="submit" className="custom-button mt-10 dark:bg-[#33354A] dark:text-gray-300">Save and Close</button>
            </form>
        </>
    )
}
