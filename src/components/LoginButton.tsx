"use client"
import {signIn, useSession} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";

export default function LoginButton() {

    const session = useSession();

    async function signInWithCredential(event: any) {
        event.preventDefault();
        await signIn("loginProvider", {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
        })
    }


    return (
        <>
            <button onClick={() => signIn("google")} aria-label="Continue with google" type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100">
                <FcGoogle size={23}/>
                <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
            </button>
            <button onClick={() => signIn("github")} aria-label="Continue with github" type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-4 hover:bg-gray-100">
                <BsGithub size={23}/>
                <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
            </button>

            <div className="w-full flex items-center justify-between py-5">
                <hr className="w-full bg-gray-400"/>
                <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>
                <hr className="w-full bg-gray-400"/>
            </div>
            <form onSubmit={signInWithCredential}>
                <div>
                    <label htmlFor="email" className="text-sm font-medium leading-none text-gray-800">
                        Email
                    </label>
                    <input type="email" name="email"
                           className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                           placeholder="e.g: john@gmail.com "/>
                </div>
                <div className="mt-6 w-full">
                    <label htmlFor="myInput" className="text-sm font-medium leading-none text-gray-800">
                        Password
                    </label>
                    <input type="password"
                           name="password"
                           className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                           placeholder="**********"/>
                </div>
                <div className="mt-8">
                    <button type="submit"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                        Create my account
                    </button>
                </div>
            </form>


        </>
    )


}