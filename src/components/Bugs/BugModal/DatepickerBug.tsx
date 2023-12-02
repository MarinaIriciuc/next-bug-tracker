import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {CalendarDaysIcon} from "lucide-react";
import {cn} from "@/lib/utils"
import React from "react";

export default function DatepickerBug({deadline, setDeadline, setFormData}: any) {

    const formatDate = new Date(deadline).toLocaleDateString();


    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-[280px] justify-start text-left font-normal dark:bg-[#33354A] dark:text-gray-300", !deadline && "text-muted-foreground")}
                    >
                        <CalendarDaysIcon
                            onChange={(e:any) => setFormData((prevState: any) => ({...prevState, deadline: e.target.value}))}
                            className="mr-2 h-4 w-4"/>
                        {deadline ? formatDate : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}
