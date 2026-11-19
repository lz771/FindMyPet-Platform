import Link from "next/link"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import UserButton from "./UserButton"

export default function Navbar() {
    return (
        <header className="bg-nav text-white text-lg">
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
                            <button className="sign-up-btn">
                                Create Account
                            </button>
                        </SignUpButton>

                        <SignInButton>
                            <button className="orange-btn">
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