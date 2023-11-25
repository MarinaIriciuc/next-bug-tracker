"use client"
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useState} from "react";

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    function validateRegisterForm() {
        if (formData.firstName.length < 3 || formData.firstName.length > 20) {
            setErrorMessage(errorMessage => ({...errorMessage, firstName: "Firstname must have at least 3 characters and at most 20 characters"}))
        }
        if (formData.lastName.length < 3 || formData.lastName.length > 20) {
            setErrorMessage(errorMessage => ({...errorMessage, lastName: "Lastname must have at least 3 characters and at most 20 characters"}))
        }
        if (formData.username.length < 10 || formData.username.length > 20) {
            setErrorMessage(errorMessage => ({...errorMessage, username: "Username must have at least 10 characters and at most 20 characters"}))
        }
        if (formData.email.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorMessage(errorMessage => ({...errorMessage, email: "Invalid email address. It must have at least 5 characters and be in a valid email format."}))
        }
        if (formData.password.length < 5 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)) {
            setErrorMessage(errorMessage => ({...errorMessage, password: "Password must have at least 10 characters and contain at least one special character"}))
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage(errorMessage => ({...errorMessage, confirmPassword: "The password are not the same."}))
        }
    }

    async function signUpWithCredentials(event: any) {
        event.preventDefault();
        setErrorMessage({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        })
        validateRegisterForm();
        await signIn("registerProvider", {
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            username: event.target.elements.username.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            redirect: false
            // password_confirmation: event.target.elements.confirmPassword.value,
        });
    }


    return (
        <>
            <form onSubmit={signUpWithCredentials}>
                <div
                    className="bg-white shadow-2xl p-6 mt-5 rounded text-black min-w-[600px] max-w-[600px] border-gray-200 border-2">
                    <h1 className="mb-8 text-3xl text-center font-semibold">Sign up</h1>
                    <div>
                        <p className="text-gray-600">Firstname</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, firstName: e.target.value}))}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="firstName"
                            placeholder="john"/>
                        <p className="error-message">{errorMessage.firstName}</p>
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-600">Lastname</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, lastName: e.target.value}))}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="lastName"
                            placeholder="doe"/>
                        <p className="error-message">{errorMessage.lastName}</p>
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-600">Username</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, username: e.target.value}))}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="username"
                            placeholder="johndoe"/>
                        <p className="error-message">{errorMessage.username}</p>
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-600">Email</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, email: e.target.value}))}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="email"
                            placeholder="johndoe@gmail.com"/>
                        <p className="error-message">{errorMessage.email}</p>

                    </div>
                    <div className="mt-3">
                        <p className="text-gray-600">Password</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, password: e.target.value}))}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="password"
                            placeholder="*******"/>
                        <p className="error-message">{errorMessage.password}</p>
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-600">Confirm Password</p>
                        <input
                            onChange={(e) => setFormData(prevState => ({...prevState, confirmPassword: e.target.value}))}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="confirmPassword"
                            placeholder="*******"/>
                        <p className="error-message">{errorMessage.confirmPassword}</p>
                    </div>
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
