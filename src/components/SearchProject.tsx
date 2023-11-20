"use client"
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

export default function SearchProject() {

    const router = useRouter()

    async function findProjects(e: any) {
        router.push("/projects?term=" + e.target.value)
    }


    return (
        <>
            <Input onChange={findProjects} className="w-96 border-b-gray-300 border-t-0 shadow"
                   placeholder="Search a project..."/>
        </>
    )

}