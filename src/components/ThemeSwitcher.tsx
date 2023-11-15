"use client"
import {useEffect, useState} from "react";
import {BsSun} from "react-icons/bs";
import {FaMoon} from "react-icons/fa";

export default function ThemeSwitcher(){
    const { setTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState('')

    useEffect(() => {
        setCurrentTheme(localStorage.getItem('theme'))
    }, [])

    function changeTheme(theme) {
        setTheme(theme)
        setCurrentTheme(theme)
    }
    return(
        <>
            {currentTheme !== "light" ?
                <div onClick={() => changeTheme('light')} className="mt-auto mb-3 items-center justify-center flex gap-2 cursor-pointer">
                    <BsSun size={25}/>
                    <span className="sm:text-[14px] text-[10px] tracking-[2px] sm:font-medium font-bold">Light</span>
                </div>
                :
                <div onClick={() => changeTheme('dark')} className="mt-auto mb-3 items-center justify-center flex flex-col cursor-pointer">
                    <FaMoon size={25}/>
                    <span className="sm:text-[14px] text-[10px] tracking-[2px] sm:font-medium font-bold">Dark</span>
                </div>
            }
        </>
    )
}