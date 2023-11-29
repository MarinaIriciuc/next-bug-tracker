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

export default function ProjectForm({project}: {
  project: Project | null
}) {

  const {toast} = useToast();
  const [, setOpenModal] = useAtom(modalOpenedAtom)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: ""
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    description: "",
    priority: ""
  });
  const [priority, setPriority] = useState("");


  function selectPriority(name: string) {
    setPriority(name)
  }

  function validateProjectForm() {
    if (formData.name.length < 10 || formData.name.length > 30) {
      setErrorMessage(prevState => ({
        ...prevState,
        name: "The name must have at least 10 characters and at most 30 characters"
      }));
    }
    if (formData.description.length < 10 || formData.description.length > 80) {
      setErrorMessage(prevState => ({
        ...prevState,
        description: "The description must have at least 10 characters and at most 80 characters"
      }));
    }
    if (priority.length === 0) {
      setErrorMessage(prevState => ({...prevState, priority: "You must select a priority."}));
    }
  }

  async function addOrEditProject(event: any) {
    event.preventDefault();
    const data: ProjectSchema = {
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      priority: priority
    }
    setErrorMessage({
      name: "",
      description: "",
      priority: ""
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
            className="mt-2 dark:bg-[#33354A] dark:text-gray-300" placeholder={project?.name ?? "Add title"}
            name="name"/>
          <p className="ms-2 error-message">{errorMessage.name}</p>
        </div>
        <div>
          <div>
            <p className="text-black font-medium mt-3 dark:text-gray-300 text-start">Priority</p>
            <div className="flex text-white mt-4 gap-3">
              <button onClick={() => selectPriority("low")} type="button"
                      className={`${priority === "low" ? "animate-bounce" : ""} font-medium bg-green-500 p-1 rounded`}>
                Low priority
              </button>
              <button onClick={() => selectPriority("medium")} type="button"
                      className={`${priority === "medium" ? "animate-bounce" : ""} font-medium bg-yellow-400 p-1 rounded`}>
                Medium priority
              </button>
              <button onClick={() => selectPriority("high")} type="button"
                      className={`${priority === "high" ? "animate-bounce" : ""} font-medium bg-red-500 p-1 rounded`}>
                High priority
              </button>
            </div>
          </div>
          <p className="ms-2 error-message">{errorMessage.priority}</p>
        </div>
        <div>
          <p className="text-black font-medium mt-5 dark:text-gray-300">Description</p>
          <Textarea
            onChange={(e) => setFormData(prevState => ({...prevState, description: e.target.value}))}
            className="mt-2 dark:bg-[#33354A] dark:text-gray-300" placeholder="Add a description"
            name="description"/>
          <p className="ms-2 error-message">{errorMessage.description}</p>
        </div>
        <div>
          <p className="text-black font-medium mt-5 dark:text-gray-300">Image - <span
            className="text-gray-400">optional</span></p>
          <Input type="file" className="mt-4"/>
        </div>
        <button type="submit" className="custom-button mt-10 dark:bg-[#33354A] dark:text-gray-300">Save and
          Close
        </button>
      </form>
    </>
  )
}
