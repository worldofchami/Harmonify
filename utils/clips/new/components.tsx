"use client"

import { Button, InputField } from "@/utils/global/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Clip {
    clipId: string;
    data: string;
}

export const NewClipForm = () => {
    const [clipFile, setClipFile] = useState<File | null>(null);

    const [clip, setClip] = useState<Clip>({
        clipId: uuidv4().toString(),
        data: ""
    });

    const [user, setUser] = useState("");

    const router = useRouter();

    useEffect(() => {
        if(typeof window !== "undefined") {
            // If not logged in
            if(!localStorage.getItem("username")) {
                window.location.replace("/");
                return;
            }
            
            setUser(localStorage.getItem("username")!);
        }
    }, []);

    const convertBase64 = (file: File): Promise<{ ok: boolean, data: string }> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve({
                    ok: true,
                    data: fileReader.result as string
                });
            }
    
            fileReader.onerror = () => {
                reject({
                    ok: false,
                    data: "Please upload a valid audio file"
                });
            }
        })
    }

    const handleUpload = async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
        try {
            setClipFile(files![0]);
            const { ok, data } = await convertBase64(files![0]);

            if(ok) {
                setClip(clip => ({ ...clip, data }));
            }
        }

        catch(e) {

        }
    }

    const handleCreate = (formData: FormData) => {
        const name = formData.get("name");

        const existingClips = JSON.parse(localStorage.getItem("clips")!) || [];

        localStorage.setItem("clips", JSON.stringify([...existingClips, {
            ...clip,
            owner: user,
            name
        }]));

        window.location.replace("/clips");
    }

    const handlePlay = () => {
        const audio = new Audio(clip.data);
        audio.play();
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
            <h1 className="text-3xl font-bold">New Clip</h1>
            <form className="w-full h-fit flex flex-col items-center gap-y-8">
                <div className="flex gap-x-4">
                    <div className="w-fit h-full relative">
                        <Button type="button">
                            <input type="file" onChange={handleUpload} accept="audio/*" className="opacity-0 absolute top-0 left-0 w-full h-full" />
                            <div className="flex gap-x-2 items-center">
                               Upload
                               <Image
                                   src="/upload.svg"
                                   alt="Upload Clip"
                                   width={30}
                                   height={30}
                               />
                            </div>
                        </Button>
                    </div>
                    {
                        clipFile &&
                        <Button type="button" onClick={handlePlay}>
                            <div className="flex gap-x-2 items-center">
                               Play
                               <Image
                                   src="/play.svg"
                                   alt="Play Clip"
                                   width={20}
                                   height={20}
                               />
                            </div>
                        </Button>
                    }
                </div>
                <InputField defaultValue={""} autoFocus label="Name" name="name" />
                <Button formAction={handleCreate} type="submit">Create</Button>
            </form>
        </div>
        </>
    )
}