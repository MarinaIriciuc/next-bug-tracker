"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProjectForm from "@/components/Projects/ProjectModal/ProjectForm";
import {Button} from "@/components/ui/button";
import {Project} from "@prisma/client";
import {useAtom} from "jotai";
import {currentProjectAtom, modalOpenedAtom} from "@/store";


export default function ProjectModal({buttonName, title}: {
    buttonName: any,
    title: any,
}) {

    const [open, setOpen] = useAtom(modalOpenedAtom)
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)

    return (
        <>
            <Dialog open={open} onOpenChange={(status) => {
                setOpen(status)
                setCurrentProject(null)
            }}>
                <DialogTrigger asChild>
                    <Button>{buttonName}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            <ProjectForm project={currentProject}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}