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
                <SelectTrigger className="w-[180px] p-0 mt-1 dark:bg-[#33354A] dark:text-gray-300">
                    <SelectValue placeholder="Choose a member"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dark">X</SelectItem>
                    <SelectItem value="system">Y</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}
