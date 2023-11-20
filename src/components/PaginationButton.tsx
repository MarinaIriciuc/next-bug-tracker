"use client"
import React, {useState} from "react";
import {Button, IconButton, ThemeProvider} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";

export default function PaginationButton() {

    const [active, setActive] = useState(1);
    const router = useRouter();
    function next() {
        if (active < 100) {
            router.push("/projects?page=" + (active + 1));
            setActive(active + 1);
        }
    }
    function prev() {
        if (active > 1) {
            router.push("/projects?page=" + (active - 1));
            setActive(active - 1);
        }
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                </Button>
                <div className="flex rounded-sm bg-black">
                    <IconButton className="flex items-center justify-center text-[14px]" onClick={() => router.push("/projects?page=" + active)}>{active}</IconButton>
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={next}>
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                </Button>
            </div>
        </>
    )
}