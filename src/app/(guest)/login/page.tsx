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
            <div className="bg-custom h-screen">
                <div className="xl:px-20 md:px-10 sm:px-32 px-16 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-8 py-6">
                        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Login to your account
                        </p>
                        <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                            Dont have account?{" "}
                            <Link href="/register"
                                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                                Sign up here
                            </Link>
                        </p>
                        <LoginButton/>
                    </div>
                </div>
            </div>
        </>
    )
}
