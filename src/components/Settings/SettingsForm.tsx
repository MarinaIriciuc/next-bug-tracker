"use client"
import {Button} from "@/components/ui/button";
import React from "react";
import {updateUserProfile} from "@/utils/utils";
import {toast} from "@/components/ui/use-toast";

export default function SettingsForm() {


    async function updateProfile(event: any) {
        event.preventDefault();
        const userInfo = {
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            email: event.target.elements.email.value,
            username: event.target.elements.email.value,
            password: event.target.elements.password.value,
        }
        await updateUserProfile(userInfo);
        toast({
            title: "Update successful",
            description: "The information has been updated successfully",
        })
    }


    return (
        <>
            <form onSubmit={updateProfile}>
                <div className="mt-10 flex flex-col pb-16">
                    <div className="w-full">
                        <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Personal
                            Information</h1>
                        <p className="mt-2 text-sm leading-5 text-gray-500">Information about the section could
                            go here and a brief description of how this might be used.</p>
                    </div>
                    <div className="mt-10">
                        <div className="md:flex items-center lg:mt-0">
                            <div className="md:w-64">
                                <label className="text-sm leading-none text-gray-800">First
                                    name</label>
                                <input type="text"
                                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                       name="firstName" placeholder="John"/>
                            </div>
                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                <label className="text-sm leading-none text-gray-800">Last
                                    name</label>
                                <input type="text"
                                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                       name="lastName" placeholder="Doe"/>
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="md:w-64">
                                <label className="text-sm leading-none text-gray-800">Email address
                                </label>
                                <input type="email"
                                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                       name="email" placeholder="youremail@example.com"/>
                            </div>
                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                <label className="text-sm leading-none text-gray-800">Username</label>
                                <input type="text"
                                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                       name="username" placeholder="johndoe"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 flex flex-col pb-16">
                    <div className="w-full">
                        <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                            Security</h1>
                        <p className="mt-2 text-sm leading-5 text-gray-500">Information about the section could
                            go here and a brief description of how this might be used.</p>
                    </div>
                    <div className="mt-10">
                        <div className="md:flex items-center lg:mt-0">
                            <div className="md:w-64">
                                <label className="text-sm leading-none text-gray-800"
                                >Password</label>
                                <input type="password"
                                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                       name="password"
                                       placeholder="*******"/>
                            </div>
                        </div>
                    </div>
                </div>
                <Button type="submit">
                    Edit your profile
                </Button>
            </form>
        </>
    )
}