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
import {Input} from "@/components/ui/input";


export default function BugForm({task}: { task: any }) {

  const [deadline, setDeadline] = useState();
  const [priority, setPriority] = useState("");
  const {id} = useParams();
  const [openModal, setOpenModal] = useAtom(modalOpenedAtom)
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    description: "",
    deadline: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    priority: "",
    description: "",
    deadline: "",
  });

  function selectPriority(name: string) {
    setPriority(name)
  }

  function validateTaskForm() {
    if (formData.title.length < 10 || formData.title.length > 30) {
      setErrorMessage(prevState => ({
        ...prevState,
        title: "The name must have at least 10 characters and at most 30 characters"
      }));
    }
    if (priority.length === 0) {
      setErrorMessage(prevState => ({...prevState, priority: "You must select a priority."}));
    }
    if (formData.description.length < 10 || formData.description.length > 80) {
      setErrorMessage(prevState => ({
        ...prevState,
        description: "The description must have at least 10 characters and at most 50 characters"
      }));
    }
    if (formData.deadline.length === 0) {
      setErrorMessage(prevState => ({...prevState, deadline: "The deadline field cannot be empty"}));
    }
  }

  async function createOrEditTask(event: any) {
    event.preventDefault();
    const data = {
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      deadline: String(deadline),
      priority: priority,
      projectId: id
    }
    setErrorMessage({
      title: "",
      priority: "",
      description: "",
      deadline: "",
    });
    validateTaskForm()
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
        <p className="text-black font-medium mt-5 dark:text-gray-300 text-start flex ">Title</p>
        <Input
          onChange={(e) => setFormData(prevState => ({...prevState, title: e.target.value}))}
          className="mt-2 dark:bg-[#33354A] dark:text-gray-300" placeholder="Add a title" name="title"/>
      </div>
      <p className="error-message">{errorMessage.title}</p>
      <div>
        <p className="text-black font-medium mt-5 dark:text-gray-300 text-start">Description</p>
        <Textarea
          onChange={(e) => setFormData(prevState => ({...prevState, description: e.target.value}))}
          className="mt-2 dark:bg-[#33354A] dark:text-gray-300 overflow-auto" placeholder="Add a description"
          name="description"/>
      </div>
      <p className="error-message mt-2">{errorMessage.description}</p>
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
      <p className="error-message mt-3">{errorMessage.priority}</p>
      <div className="mt-8 flex justify-between">
        {/*<div>*/}
        {/*  <p className="text-black font-medium mt-5 dark:text-gray-300 text-start">Members</p>*/}
        {/*  <SelectProjectModal/>*/}
        {/*</div>*/}
        <div>
          <p className="text-black font-medium mt-5 dark:text-gray-300 text-start">Due date</p>
          <DatepickerBug deadline={deadline} setDeadline={setDeadline} setFormData={setFormData}/>
        </div>
      </div>
      <p className="error-message">{errorMessage.deadline}</p>

      {/*<p className="error-message">{errorMessage.deadline}</p>*/}
      <button type="submit" className="custom-button mt-10 dark:bg-[#33354A] dark:text-gray-300">Add</button>
    </form>
  )

}



