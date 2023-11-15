import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import React from "react";

export default function ProjectAlert(){
    return (
        <>

            <Alert className="bg-gray-300 text-gray-700 w-80">
                <AlertTitle>Great !</AlertTitle>
                <AlertDescription>
                    The project has added successfully !
                </AlertDescription>
            </Alert>

        </>
    )
}