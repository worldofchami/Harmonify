"use client"

import { Button, InputField } from "@/utils/global/components"
import Image from "next/image"
import { FC, useEffect, useState } from "react";

interface EditClipFormProps {
    clipId: string;
}

export const EditClipForm: FC<EditClipFormProps> = ({ clipId }) => {
    const [name, setName] = useState("");
    const [clips, setClips] = useState<any[]>([]);

    useEffect(() => {
        if(typeof window !== "undefined") {
            const clips = JSON.parse(localStorage.getItem("clips")!) as any[];
            setClips(clips);
            setName(clips.find(({ clipId: _clipId }: any) => clipId === _clipId).name);
        }

    }, []);

    const handleEdit = (formData: FormData) => {
        const name = formData.get("name");
        const idx = clips.findIndex(({ clipId: _clipId }: any) => clipId === _clipId);
        clips[idx] = { ...clips[idx], name };

        localStorage.setItem("clips", JSON.stringify(clips));

        window.location.replace("/clips");
    }
    
    return (
        <>
        <div className="w-full h-fit flex flex-col items-center gap-y-8">
            <Image
                src="/logo.svg"
                alt="Harmon.ify Logo"
                width={100}
                height={100}
            />
            <h1 className="text-3xl font-bold">Edit Clip</h1>
            <form className="w-full h-fit flex flex-col items-center gap-y-8">
                <InputField defaultValue={name} autoFocus label="Name" name="name" />
                <Button formAction={handleEdit} type="submit">Edit</Button>
            </form>
        </div>
        </>
    )
}