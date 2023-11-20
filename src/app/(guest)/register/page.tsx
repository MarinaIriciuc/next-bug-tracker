import RegisterForm from "@/components/RegisterForm";


export default function Register() {


    return (
        <>
            <div className="min-h-screen flex flex-col bg-custom">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <RegisterForm/>
                </div>
            </div>
        </>
    )
}