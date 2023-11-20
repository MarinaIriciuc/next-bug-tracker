"use client"
import {IoClose} from "react-icons/io5";
import {deleteTask} from "@/utils/utils";

export default function DeleteBugButton({id}: {id:any}){


    return(
        <>
            <IoClose onClick={()=>deleteTask(id)}/>
        </>
    )
}