import { LoginForm } from "@/utils/home/components";
import Image from "next/image";

export default async function Page() {
	return (
		<>
		<main className="w-[34rem] max-w-[90%] h-4/5 py-8 fixed top-0 left-0 right-0 bottom-0 m-auto flex flex-col stdborder rounded-lg bg-[#181818]">
			<div className="w-fit h-fit mx-auto flex flex-col items-center">
				<Image
					src="logo.svg"
					alt="Harmon.ify Logo"
					width={100}
					height={100}
				/>
				<h1 className="font-black text-white text-4xl">Harmon.ify</h1>
			</div>
			<div className="w-full h-fit px-4 lg:px-8">
				<LoginForm />
			</div>
		</main>
		</>
	)
}
