"use client"
import { useRouter } from "next/navigation";
import "../../app/globals.css";

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, InputHTMLAttributes, PropsWithChildren, useId } from "react"

interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

export const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
    const id = `${label}-${useId()}`;

    return (
        <>
        <div className="w-full h-fit flex flex-col gap-y-2 text-white">
            <label htmlFor={id} className="pl-1 font-semibold text-sm">{label}</label>
            <input
                type="text"
                id={id}
                className="w-full h-12 stdborder bg-[#171717] rounded-md pl-2 placeholder:text-[#515151]"
                {...props}
            />
        </div>
        </>
    )
}

export const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <>
        <button { ...props } className="w-fit h-fit bg-[#9900FF] hover:opacity-[.85] duration-200 text-lg py-2 px-4 sdborder rounded-md font-bold text-white">{children}</button>
        </>
    )
}

export const Modal = ({ children }: PropsWithChildren) => {
    let clicked = false;

    const handleBack = () => {
        if(!clicked) {
            clicked = true;
            window.location.replace("/clips");
        }
    }

    return (
        <>
        <div onClick={handleBack} className="w-full h-full fixed top-0 left-0 backdrop-blur-lg z-[10]">

        </div>
        <div className="w-[80vw] h-fit fixed m-auto top-0 bottom-0 left-0 right-0 p-8 z-[999] max-w-[1500px] bg-black stdborder rounded-lg">
            {children}
        </div>
        </>
    )
}