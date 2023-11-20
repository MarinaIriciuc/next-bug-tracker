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
                        className="text-purple-400 font-semibold uppercase">{session?.user.username}</span></p>
                    <div className="bg-gray-200 py-3 rounded-lg flex items-center justify-between mt-7">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BiSolidLock size={30}/>
                            </div>
                            <p className="text-sm text-gray-800 pl-3">We take privacy issues seriously. You can be
                                sure that your personal data is securely protected.</p>
                        </div>
                        <button className="md:block hidden focus:outline-none focus:ring-2 focus:ring-gray-700 rounded">
                            <IoMdClose/>
                        </button>
                    </div>
                    <SettingsForm/>
                </div>
            </div>
        </>
    );
}

