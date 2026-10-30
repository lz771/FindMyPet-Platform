import Link from "next/link"
import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs"

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
                    <Link className="link-hover-effect" href="/report-pet">Report Pet</Link>
                    <Link className="link-hover-effect" href="/lost-pet-gallery">Lost Pet Gallery</Link>
                    <Link className="link-hover-effect" href="/dashboard">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignUpButton>
                            <button className="bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 sm:text-base lg:text-lg h-8 sm:h-10 px-4 sm:px-4 cursor-pointer">
                                Create Account
                            </button>
                        </SignUpButton>

                        <SignInButton>
                            <button className="bg-light-red-1 text-white rounded-lg font-semibold hover:bg-light-red-2 sm:text-base lg:text-lg h-8 sm:h-10 px-4 sm:px-4 cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <SignOutButton>
                            <button className="bg-light-red-1 text-white rounded-lg font-semibold hover:bg-light-red-2 sm:text-base lg:text-lg h-8 sm:h-10 px-4 sm:px-4 cursor-pointer">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </Show>
                </div>
            </nav>
        </header>
    )
}