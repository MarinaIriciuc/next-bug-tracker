import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {redirect} from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";


export default async function Login() {

    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/")
    }

    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen">
                <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
                        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Login to your account
                        </p>
                        <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                            Dont have account?{" "}
                            <Link href="/register"
                                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                                {" "}
                                Sign up here
                            </Link>
                        </p>
                        <LoginButton/>
                        <div className="w-full flex items-center justify-between py-5">
                            <hr className="w-full bg-gray-400"/>
                            <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>
                            <hr className="w-full bg-gray-400"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium leading-none text-gray-800">
                                {" "}
                                Email{" "}
                            </label>
                            <input id="email" type="email"
                                   className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                                   placeholder="e.g: john@gmail.com "/>
                        </div>
                        <div className="mt-6 w-full">
                            <label htmlFor="myInput" className="text-sm font-medium leading-none text-gray-800">
                                {" "}
                                Password{" "}
                            </label>
                            <input id="password" type="password"
                                   className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                                   placeholder="**********"/>
                        </div>
                        <div className="mt-8">
                            <button type="button"
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                Create my account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}