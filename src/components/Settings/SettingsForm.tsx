"use client"
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {updateUserProfile} from "@/utils/utils";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";

export default function SettingsForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  function validateSettingsForm() {
    if (formData.firstName.length < 3 || formData.lastName.length > 20) {
      setErrorMessage(prevState => ({
        ...prevState,
        firstName: "Firstname must have at least 3 characters and at most 20 characters."
      }));
    }
    if (formData.lastName.length < 3 || formData.lastName.length > 20) {
      setErrorMessage(prevState => ({
        ...prevState,
        lastName: "Lastname must have at least 3 characters and at most 20 characters."
      }));
    }
    if (formData.email.length < 5) {
      setErrorMessage(prevState => ({...prevState, email: "The email must have at least 5 characters"}))
    }
    if (formData.username.length < 10 || formData.username.length > 20) {
      setErrorMessage(prevState => ({
        ...prevState,
        username: "Username must have at least 10 characters and at most 20 characters"
      }));
    }
  }

  async function updateProfile(event: any) {
    event.preventDefault();
    const userInfo = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      username: event.target.elements.username.value,
      // password: event.target.elements.password.value,
    }
    setErrorMessage({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    });
    validateSettingsForm()
    try {
      await updateUserProfile(userInfo);
      toast({
        title: "Update successful",
        description: "The information has been updated successfully",
      })
    } catch (e) {
      console.log(e)
    }

  }

  const session = useSession();


  return (
    <>
      <form onSubmit={updateProfile}>
        <div className="mt-10 flex flex-col pb-16">
          <div className="w-full md:block hidden">
            <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800 dark:text-gray-300">Personal
              Information</h1>
            <p className="mt-2 text-sm leading-5 text-gray-500">Information about the section could
              go here and a brief description of how this might be used.</p>
          </div>
          <div className="md:mt-8">
            <div className="md:flex items-center lg:mt-0">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800 dark:text-white">First name
                </label>
                <input type="text"
                       onChange={(e) => setFormData(prevState => ({...prevState, firstName: e.target.value}))}
                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"
                       placeholder="John"
                       name="firstName" defaultValue={session.data?.user.firstName}/>
                <p className="error-message">{errorMessage.firstName}</p>
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-5">
                <label className="text-sm leading-none text-gray-800 dark:text-white">Last
                  name
                </label>
                <input type="text"
                       onChange={(e) => setFormData(prevState => ({...prevState, lastName: e.target.value}))}
                       className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"
                       name="lastName" placeholder="Doe" defaultValue={session.data?.user.lastName}/>
                <p className="error-message">{errorMessage.lastName}</p>

              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800 dark:text-white">
                  Email address
                </label>
                <input type="email"
                       name="email"
                       className="w-full p-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"
                       placeholder="youremail@example.com"
                       onChange={(e) => setFormData(prevState => ({...prevState, email: e.target.value}))}
                />
                <p className="error-message">{errorMessage.email}</p>
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-5">
                <label className="text-sm leading-none text-gray-800 dark:text-white">Username</label>
                <input type="text"
                       onChange={(e) => setFormData(prevState => ({...prevState, username: e.target.value}))}
                       className="w-full p-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"
                       name="username" placeholder="johndoe"
                />
                <p className="error-message">{errorMessage.username}</p>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="flex flex-col pb-8">*/}
        {/*  <div className="w-full md:block hidden">*/}
        {/*    <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800 dark:text-white ">*/}
        {/*      Security*/}
        {/*    </h1>*/}
        {/*    <p className="mt-2 text-sm leading-5 text-gray-500">Information about the section could*/}
        {/*      go here and a brief description of how this might be used.</p>*/}
        {/*  </div>*/}
        {/*  <div className="md:mt-10">*/}
        {/*    <div className="md:flex items-center lg:mt-0">*/}
        {/*      <div className="md:w-64">*/}
        {/*        <label className="text-sm leading-none text-gray-800 dark:text-white"*/}
        {/*        >Password*/}
        {/*        </label>*/}
        {/*        <input type="password"*/}
        {/*               className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 dark:text-gray-300 dark:border-0 dark:bg-[#2B2C37]"*/}
        {/*               name="password"*/}
        {/*               placeholder="*******"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Button type="submit" className="dark:bg-[#33354A] dark:text-gray-300">
          Edit your profile
        </Button>
      </form>
    </>
  )
}
