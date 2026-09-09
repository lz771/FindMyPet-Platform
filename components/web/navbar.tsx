import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
    return (
        <header>
            <nav className="flex items-center gap-5 py-3 justify-between border-b border-fuchsia-400">
                <div className="flex items-center gap-4 ">
                    <Link href="/">
                        <h1 className="text-3xl font-bold">FindMyPet</h1>
                    </Link>
                </div>

                <div className="flex items-center gap-10">
                    <Link className="link-hover-effect" href="/">Home</Link>
                    <Link className="link-hover-effect" href="/ReportPet">Report Pet</Link>
                    <Link className="link-hover-effect" href="/LostPetGallery">Lost Pet Gallery</Link>
                    <Link className="link-hover-effect" href="/Dashboard">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignInButton>
                            <button className="bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </nav>
        </header>
    )
}