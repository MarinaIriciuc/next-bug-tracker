"use client"
import {AiOutlineDelete} from "react-icons/ai";
import {deleteProject} from "@/utils/utils";

export default function DeleteCardButton({projectId}:{projectId:any}){
    return (
        <>
        <button onClick={()=>deleteProject(projectId)} className="flex items-center">
            <AiOutlineDelete/>
        </button>
        </>
    )
}