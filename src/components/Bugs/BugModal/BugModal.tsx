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

export default function BugModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add bug</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a bug</DialogTitle>
                    <DialogDescription>
                        <BugForm/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}