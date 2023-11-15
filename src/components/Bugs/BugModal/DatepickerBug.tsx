import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {CalendarDaysIcon} from "lucide-react";
import {cn} from "@/lib/utils"
import React, {useState} from "react";
import {format} from "url";

export default function DatepickerBug({deadline, setDeadline}: any) {

    const formatDate = new Date(deadline).toLocaleDateString();

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-[280px] justify-start text-left font-normal", !deadline && "text-muted-foreground")}
                    >
                        <CalendarDaysIcon className="mr-2 h-4 w-4"/>
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