"use client"
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";

export default function RegisterForm() {
    async function signUpWithCredentials(event: any) {
        event.preventDefault();
        await signIn("registerProvider", {
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            username: event.target.elements.username.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            // password_confirmation: event.target.elements.confirmPassword.value,
        });
    }


    return (
        <>
            <form onSubmit={signUpWithCredentials} method="POST">
                <div className="bg-white shadow-2xl px-6 py-8 rounded text-black w-full border-gray-200 border-2">
                    <h1 className="mb-8 text-3xl text-center font-semibold">Sign up</h1>
                    <div className="flex">
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="firstName"
                            placeholder="john"/>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lastName"
                            placeholder="doe"/>
                    </div>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="johndoe"/>

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="johndoe@gmail.com"/>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="*******"/>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirmPassword"
                        placeholder="*******"/>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-purple-400 text-white hover:bg-purple-500 transition focus:outline-none my-1"
                    >Create Account
                    </button>
                </div>
                <div className="text-[14px] mt-6 flex items-center justify-center gap-2 text-white">
                    <p>Already have an account?</p>
                    <Link href="/login" className="hover:underline">
                        Log in
                    </Link>
                </div>
            </form>
        </>
    )
}