import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SelectProjectModal() {
    return (
        <>
            <Select>
                <SelectTrigger className="w-[180px] p-0 mt-1">
                    <SelectValue placeholder="Choose a member"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dark">Iriciuc Marina</SelectItem>
                    <SelectItem value="system">Terinte Adrian</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}