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
            <Input onChange={findProjects} className="w-[600px] border-b-gray-300 border-t-0 shadow dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"
                   placeholder="Search a project..."/>
        </>
    )

}
