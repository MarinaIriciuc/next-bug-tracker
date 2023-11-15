import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProjectForm from "@/components/Projects/ProjectModal/ProjectForm";


export default function ProjectModal() {
    
    return (
        <>
            <Dialog>
                <DialogTrigger className="custom-button">Add a project</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a project</DialogTitle>
                        <DialogDescription>
                            <ProjectForm/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}