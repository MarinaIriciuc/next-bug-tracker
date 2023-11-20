import ProjectModal from "@/components/Projects/ProjectModal/ProjectModal";
import SearchProject from "@/components/SearchProject";
import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import {getProjects, searchProject, sortProject} from "@/utils/utils";
import ProjectSort from "@/components/Projects/ProjectSort/ProjectSort";
import Link from "next/link";
import PaginationButton from "@/components/PaginationButton";
import prisma from "@/lib/prisma";


export default async function Projects({searchParams}: {
    searchParams: {
        term: string,
        sort: string,
        page: number
    }
}) {

    let projects = await searchProject(searchParams.term);
    const {sort, page} = searchParams;


    // let projects
    if (sort === "new") {
        projects = await getProjects(searchParams.page,"desc", "")
    } else if (sort === 'old') {
        projects = await getProjects(searchParams.page,"asc", "")
    }

    // projects = await getProjects(searchParams.page)


    return (
        <>

            <div className="flex items-center gap-40 ">
                <ProjectModal buttonName="Create a project" title="Create a project"/>
                <SearchProject/>
            </div>

            {projects.length > 0 && (
                <div className="mt-16">
                    <ProjectSort/>
                </div>
            )}

            <div className="grid grid-cols-4 gap-x-32 mt-10 ">
                {projects.map(function (project) {
                    return (
                        <>
                            <Link href={`/projects/${project.id}`} key={project.id}>
                                <ProjectCard project={project}/>
                            </Link>
                        </>
                    )
                })}
            </div>

            <div className="flex justify-center">
                {projects.length === 0 && (
                    <>
                        <p className="font-extrabold text-[30px]">There is no project with the name:<span
                            className="text-purple-400"> {searchParams.term} </span></p>
                    </>
                )}
            </div>
            <div className="flex justify-center items-center mt-24">
                <PaginationButton/>
            </div>
        </>
    )
}