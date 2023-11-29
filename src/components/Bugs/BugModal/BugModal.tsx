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
import {currentTaskAtom, modalOpenedAtom} from "@/store";


export default function BugModal({buttonName, title}: {
  buttonName: any,
  title: any,
  setShowModal?: any,
  showModal?: any
}) {

  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
  const [openModal, setOpenModal] = useAtom(modalOpenedAtom)


  return (
    <Dialog open={openModal} onOpenChange={(status) => {
      setOpenModal(status)
      setCurrentTask(null)
    }}>
      <DialogTrigger asChild>
        <Button className="dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]">{buttonName}</Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#20212C]">
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
