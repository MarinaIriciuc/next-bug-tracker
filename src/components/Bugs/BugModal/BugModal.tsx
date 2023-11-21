"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BugForm from "@/components/Bugs/BugModal/BugForm";
import {Button} from "@/components/ui/button";
import {useAtom} from "jotai";
import {currentProjectAtom, currentTaskAtom, modalOpenedAtom} from "@/store";

export default function BugModal({buttonName, title}: { buttonName: any, title: any }) {

    const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
    const [openModal, setOpenModal] = useAtom(modalOpenedAtom)

    return (
        <Dialog open={openModal} onOpenChange={(status) => {
            setOpenModal(status)
            setCurrentTask(null)
        }}>
            <DialogTrigger asChild>
                <Button>{buttonName}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <BugForm task={currentTask}/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}