"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {GrSystem} from "react-icons/gr";


export function ThemeSwitcher() {

    const {setTheme} = useTheme()


    return (
        <>
            <p className="text-gray-400 px-5 mt-10 font-medium uppercase text-[13px]">Choose theme</p>
            <div onClick={() => setTheme("light")} className="flex items-center gap-3 sidebar-item px-5">
                <Sun size={18}/>
                <p className="sidebar-title">Light</p>
            </div>
            <div onClick={() => setTheme("dark")} className="flex items-center gap-3 sidebar-item px-5">
                <Moon size={18}/>
                <p className="sidebar-title">Dark</p>
            </div>
            <div onClick={() => setTheme("dark")} className="flex items-center gap-3 sidebar-item px-5">
                <GrSystem size={15}/>
                <p className="sidebar-title">System</p>
            </div>
        </>
    )
}
