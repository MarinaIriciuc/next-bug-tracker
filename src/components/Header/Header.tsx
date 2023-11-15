"use client"
import Navbar from "@/components/Header/Navbar";
import Sidebar from "@/components/Header/Sidebar";
import {useState} from "react";

export default function Header() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Navbar open={open} setOpen={setOpen}/>
            <Sidebar open={open}/>
        </>
    )
}