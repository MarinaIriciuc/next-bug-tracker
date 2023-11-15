import ProjectModal from "@/components/Projects/ProjectModal/ProjectModal";
import SearchProject from "@/components/SearchProject";
import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import {searchProject, sortProject, sortProjectByLatest, sortProjectByOldest} from "@/utils/utils";
import Link from "next/link";
import ProjectSelectSort from "@/components/Projects/ProjectFilter/ProjectSelectSort";


export default async function Projects({searchParams}: {
    searchParams: { term: string, sort: string }
}) {

    let projects = await searchProject(searchParams.term);

    const {sort} = searchParams

    if (sort === "new") {
        projects = await sortProject("desc")
    } else if (sort === 'old'){
        projects = await sortProject("asc")
    }


    return (
        <>
            <div className="flex items-center gap-40 ">
                <ProjectModal/>
                <SearchProject/>
            </div>

            <div className="mt-16">
                <ProjectSelectSort/>
            </div>

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

        </>
    )
}