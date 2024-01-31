"use client"

import { useState } from "react"
import { Button, InputField } from "../global/components"
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const username = formData.get("username");

        if(!username) {
            setError("Please enter a valid username.")
            return;
        }

        // Sometimes this component tries to render on the server and throws an error when using global variable "window"
        if(typeof window !== "undefined") {
            window.localStorage.setItem("username", username as string);

            router.push("/clips");
        }
    }

    return (
        <>
        <form className="flex flex-col gap-y-4">
            <InputField label="Username" name="username" placeholder="johndoe" />
            <span className="text-white opacity-50 text-sm">{error}</span>
            <InputField label="Password" name="password" type="password" placeholder="Very Secure Password" />
            <Button formAction={handleSubmit} type="submit">Login</Button>
        </form>
        </>
    )
}