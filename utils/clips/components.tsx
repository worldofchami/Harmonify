"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { Modal } from "../global/components";

interface ClipBlockProps {
    clipId: string;
    owner: string;
    name: string;
    data: string;
}

const ClipBlock: FC<ClipBlockProps> = ({ clipId, owner, name, data }) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [user, setUser] = useState("");

    useEffect(() => {
        if(typeof window !== "undefined") {
            setAudio(new Audio(data));
            setUser(localStorage.getItem("username")!);
        }
    }, []);

    const handlePlay = async () => {
        audio?.play();
    }

    return (
        <>
        <div className="w-full h-16 mx-auto py-2 stdborder rounded-md flex justify-between items-center gap-x-8 px-4 lg:gap-x-24 bg-[#1a1a1a]">
            <Image
                src="logo.svg"
                alt="Harmon.ify Logo"
                width={40}
                height={40}
            />
            <span className="text-sm lg:text-base">Name: <span className="font-bold text-[#6F7Be8]">{name}</span> <br/> Owner: <span className="font-bold text-[#6F7Be8]">{owner}</span></span>
            <button className="h-full aspect-square p-1 grid place-content-center rounded-full bg-[#9900FF] hover:opacity-[.85]" onClick={handlePlay}>
                <Image
                    src="play.svg"
                    alt="Play Clip"
                    width={20}
                    height={20}
                />
            </button>
            {
                user === owner &&
                <>
                <Link href={`/edit/${clipId}`} className="h-full aspect-square p-1 grid place-content-center rounded-full bg-[#6F7BE8] hover:opacity-[.85]">
                    <Image
                        src="edit.svg"
                        alt="Edit Clip"
                        width={20}
                        height={20}
                    />
                </Link>
                </>
            }
        </div>
        </>
    )
}

export const ClipContainer = () => {
    const [clips, setClips] = useState([]);

    useEffect(() => {
        if(typeof window !== "undefined") {
            try {
                setClips(JSON.parse(localStorage.getItem("clips")!));
            }

            catch(e) {}
        }

    }, []);

    const clipBlocks = clips.map((clip: ClipBlockProps) => <ClipBlock { ...clip } />);

    return (
        <>
        <section className="w-full h-fit flex flex-col gap-y-4 justify-center px-4 lg:px-12">
            {clipBlocks}
        </section>
        </>
    )
}