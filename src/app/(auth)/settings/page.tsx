import React from "react";
import {BiSolidLock} from "react-icons/bi";
import {IoMdClose} from "react-icons/io";
import SettingsForm from "@/components/Settings/SettingsForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";

export default async function Settings() {

    const session = await getServerSession(authOptions)


    return (
        <>
            <div className="px-5 flex items-center justify-center">
                <div className="w-full">
                    <p className="text-xl mt-5">Hello, <span
                        className="text-orange-400 font-semibold">{session?.user.name || session?.user.username}</span>
                    </p>
                    <div className="bg-gray-200 py-3 rounded-lg flex items-center justify-between mt-7 dark:bg-[#33354A]">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 ms-3 dark:text-gray-300">
                                <BiSolidLock size={30}/>
                            </div>
                            <p className="text-sm text-gray-800 pl-3 dark:text-gray-300">We take privacy issues seriously. You can be
                                sure that your personal data is securely protected.</p>
                        </div>
                        <button className="md:block hidden mx-3 focus:outline-none focus:ring-2 focus:ring-gray-700 rounded dark:bg-gray-500">
                            <IoMdClose/>
                        </button>
                    </div>
                    <SettingsForm/>
                </div>
            </div>
        </>
    );
}

