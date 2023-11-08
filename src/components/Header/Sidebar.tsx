"use client"
import {MdOutlineDashboardCustomize} from "react-icons/md";
import {useState} from "react";
import {AiOutlineBug} from "react-icons/ai";
import {GoProjectSymlink} from "react-icons/go";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Sidebar({open}: {open: boolean}) {

    const [activeIcon, setActiveIcon] = useState("");

    return (
        <>

            <div className={`flex flex-col w-[200px] bg-white border-r-2 border-gray-300 min-h-screen ${open ? 'show-sidebar' : ''} z-50 transition-all fixed top-0 lg:left-0  left-[-200px] overflow-hidden `}>
                <div className="flex justify-center font-bold text-center text-white bg-white border-b-2 border-gray-200 mt-4">
                   <Logo/>
                </div>
                <p className="text-gray-400 px-5 mt-10 font-medium uppercase text-[13px]">Menu</p>
                <a onClick={() => setActiveIcon("home")} href={"#home"} className="sidebar-item px-5 mt-2">
                    <MdOutlineDashboardCustomize size={21} className={activeIcon === "home" ? "text-primary-gray" : ""}/>
                    <p className={activeIcon === "home" ? "text-primary-gray sidebar-title" : "sidebar-title"}>Overview</p>
                </a>
                <a onClick={() => setActiveIcon("projects")} href={"#projects"} className="sidebar-item px-5">
                    <GoProjectSymlink size={21}
                                                 className={activeIcon === "projects" ? "text-primary-gray" : ""}/>
                    <p
                        className={activeIcon === "projects" ? "text-primary-gray sidebar-title" : "sidebar-title"}>Projects</p>

                </a>
                <a onClick={() => setActiveIcon("bugs")} href={"#bugs"} className="sidebar-item px-5">
                    <AiOutlineBug size={21} className={activeIcon === "bugs" ? "text-primary-gray" : ""}/><p
                    className={activeIcon === "bugs" ? "text-primary-gray sidebar-title" : "sidebar-title"}>Bugs</p>
                </a>

                <ThemeSwitcher/>
            </div>






            {/*<div className={` `}>*/}
        </>
    )
}



