"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useRouter} from "next/navigation";

export default function ProjectSort() {

    const router = useRouter();


    return (
        <>
            <Select onValueChange={(e:any) => router.push(`?sort=${e}`)}>
                <SelectTrigger className="w-[180px] border-gray-300 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37] ">
                    <SelectValue placeholder="Sort by:"/>
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-200 dark:border-0 dark:text-black mt-3">
                    <SelectItem value="new">The latest</SelectItem>
                    <SelectItem value="old">The oldest</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}
