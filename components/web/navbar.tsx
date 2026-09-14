import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
// bg-violet-400
export default function Navbar() {
    return (
        <header className="bg-nav text-white">
            <nav className="flex items-center gap-5 py-5 justify-between px-10">
                <div className="flex items-center gap-4 font-mono">
                    <Link href="/">
                        <h1 className="text-3xl font-bold">FindMyPet</h1>
                    </Link>
                </div>

                <div className="flex items-center gap-12 font-semibold">
                    <Link className="link-hover-effect" href="/">Home</Link>
                    <Link className="link-hover-effect" href="/ReportPet">Report Pet</Link>
                    <Link className="link-hover-effect" href="/LostPetGallery">Lost Pet Gallery</Link>
                    <Link className="link-hover-effect" href="/Dashboard">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignUpButton>
                            <button className="bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 sm:text-base lg:text-lg h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Create Account
                            </button>
                        </SignUpButton>

                        <SignInButton>
                            <button className="bg-light-red-1 text-white rounded-lg font-semibold hover:bg-light-red-2 sm:text-base lg:text-lgh-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
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