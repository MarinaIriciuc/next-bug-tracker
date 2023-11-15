"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useRouter} from "next/navigation";

export default function ProjectSelectSort() {

    const router = useRouter();


    return (
        <>
            <Select onValueChange={(e:any) => router.push(`?sort=${e}`)}>
                <SelectTrigger className="w-[180px] bg-black hover:bg-gray-800 transition border-0 outline-0 text-white">
                    <SelectValue placeholder="Sort by:"/>
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="new">The latest</SelectItem>
                    <SelectItem value="old">The oldest</SelectItem>
                </SelectContent>
            </Select>

        </>
    )
}