"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {GrSystem} from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function ThemeSwitcher() {

  const {setTheme} = useTheme()

  return (
    <>
      <p className="text-gray-400 px-5 mt-10 font-medium uppercase text-[13px]">Choose theme</p>
      <Select onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-full mt-5 outline-0 dark:bg-[#2B2C37]">
          <SelectValue placeholder="Select theme"/>
        </SelectTrigger>
        <SelectContent className="dark:bg-white dark:text-black">
          <SelectItem value="light" onChange={() => setTheme("light")} className="w-full hover:bg-gray-400 hover:text-gray-300 p-2">
            <div className="flex items-center gap-3 mt-0 ">
              <Sun size={18}/>
              <p className="text-[13px] uppercase font-medium tracking-wide">Light</p>
            </div>
          </SelectItem>
          <SelectItem value="dark" onChange={() => setTheme("dark")} className="w-full hover:bg-gray-400 hover:text-gray-300 p-2">
            <div className="flex items-center gap-3 mt-0 ">
              <Moon size={18}/>
              <p className="text-[13px] uppercase font-medium tracking-wide">Dark</p>
            </div>
          </SelectItem>
          <SelectItem value="system" onChange={() => setTheme("system")} className="w-full hover:bg-gray-400 hover:text-gray-300 p-2">
            <div className="flex items-center gap-3 mt-0 ">
              <GrSystem size={15}/>
              <p className="text-[13px] uppercase font-medium tracking-wide">System</p>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
