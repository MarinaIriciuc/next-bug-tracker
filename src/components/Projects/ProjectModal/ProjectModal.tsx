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


export default function ProjectModal() {
    
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add a project</Button>
                </DialogTrigger>
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