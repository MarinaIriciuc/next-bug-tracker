"use client"
import {MdOutlineDashboardCustomize} from "react-icons/md";
import {useState} from "react";
import {AiOutlineBug} from "react-icons/ai";
import {GoProjectSymlink} from "react-icons/go";
import Logo from "@/components/Logo";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import {Settings} from "lucide-react";

export default function Sidebar({open}: { open: boolean }) {

  const [activeIcon, setActiveIcon] = useState("");

  return (
    <>

      <div className={`flex flex-col w-[200px] bg-white border-r-2 border-gray-300 dark:border-gray-500 min-h-screen dark:border-0 dark:bg-[#33354A]  ${open ? 'show-sidebar' : ''} z-50 transition-all fixed top-0 lg:left-0  left-[-200px] overflow-hidden `}>
        <div className="flex justify-center items-center gap-4 font-bold text-center text-white border-b-2 border-gray-200 dark:border-0 mt-4">
          <Logo/>
        </div>
        <p className="text-gray-400 px-5 mt-10 font-medium uppercase text-[13px] ">Menu</p>
        <Link href="/" onClick={() => setActiveIcon("home")} className="sidebar-item px-5 mt-2 dark:hover:text-[#33354A]">
          <MdOutlineDashboardCustomize size={21} className={activeIcon === "home" ? "text-primary-gray" : ""}/>
          <p className={activeIcon === "home" ? "text-primary-gray sidebar-title" : "sidebar-title"}>Overview</p>
        </Link>
        <Link href="/projects" onClick={() => setActiveIcon("projects")} className="sidebar-item px-5 dark:hover:text-[#33354A]">
          <GoProjectSymlink size={21} className={activeIcon === "projects" ? "text-primary-gray " : ""}/>
          <p className={activeIcon === "projects" ? "text-primary-gray sidebar-title " : "sidebar-title "}>Projects</p>
        </Link>
        <Link href="/settings" onClick={() => setActiveIcon("settings")} className="sidebar-item px-5 dark:hover:text-[#33354A]">
          <Settings size={21} className={activeIcon === "settings" ? "text-primary-gray" : ""}/><p
          className={activeIcon === "bugs" ? "text-primary-gray sidebar-title" : "sidebar-title"}>Settings</p>
        </Link>
        <ThemeSwitcher/>
        <LogoutButton/>
      </div>
    </>
  )
}



