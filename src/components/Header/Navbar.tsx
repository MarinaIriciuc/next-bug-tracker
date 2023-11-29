"use client"
import {AiOutlineMenu} from "react-icons/ai";
import Logo from "@/components/Logo";

export default function Navbar({setOpen, open}: any) {
    return (
        <>
            <div className="fixed top-0 z-40 bg-white lg:hidden flex items-center w-full p-3 dark:bg-[#33354A]">
                <div className="font-semibold text-[20px] ms-2 text-primary-gray">
                    <Logo/>
                </div>
                <button onClick={() => setOpen(!open)} className="ms-auto bg-primary-gray p-1 me-2">
                    <AiOutlineMenu color="black" className="dark:bg-white" size={30}/>
                </button>
            </div>
        </>
    )
}
