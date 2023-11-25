"use client"
import DeleteProjectButton from "@/components/Projects/ProjectCard/DeleteProjectButton";
import {MdEdit} from "react-icons/md";
import UserAvatar from "@/components/UserAvatar";
import {useAtom} from "jotai";
import {currentProjectAtom, modalOpenedAtom} from "@/store";

export default function ProjectCard({project}: { project: any }) {

    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)
    const [openModal, setOpenModal] = useAtom(modalOpenedAtom)

    return (
        <>
            <div className="project-card">
                <div className="card-header">
                    <img src="https://i.ibb.co/FYPRZg8/hxfc-V5-V-e-In-X3jb-VUhj-At1su-B7z-B88u-Gd1j20b.webp"
                         className="rounded-t-xl dark:rounded-t-md" alt=""/>
                </div>
                <div className="card-body p-5 bg-gray-950 dark:bg-[#33354A]">
                    <p className="font-bold text-[15px] tracking-wide dark:text-gray-300">{project.name}</p>
                </div>
                <div className="card-footer bg-gray-950 rounded-b-md pb-5 ps-5 pe-5 flex justify-between dark:bg-[#33354A]">
                    <UserAvatar/>
                    <div className="flex items-center gap-2 dark:text-gray-300">
                        <div className="cursor-pointer" onClick={() => {
                            setOpenModal(true)
                            setCurrentProject(project)
                        }}>
                            <MdEdit size={18}/>
                        </div>
                        <DeleteProjectButton projectId={project.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}
