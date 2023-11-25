"use client"
import {signOut} from "next-auth/react";
import {LuLogOut} from "react-icons/lu";

export default function LogoutButton() {
    return (
        <>
            <button onClick={() => signOut()} className="mt-auto mb-6 items-center justify-center flex gap-2 sidebar-title uppercase dark:text-gray-300">
                <LuLogOut/>
                Logout
            </button>
        </>
    )
}
