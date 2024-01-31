import { ClipContainer } from "@/utils/clips/components";
import { Button } from "@/utils/global/components";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    return (
        <>
        <main className="w-full h-full pt-12 flex flex-col items-center gap-y-8">
            <h1 className="text-4xl text-center text-white font-black">Welcome to Harmon.ify</h1>
            <Link href="/clips/new">
                <Button>
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
            </Link>
            <ClipContainer />  
        </main>
        </>
    )
}