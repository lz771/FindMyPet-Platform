import Link from "next/link"
import { buttonVariants } from "../ui/button"

export default function Navbar() {
    return (
        <nav className="flex items-center gap-5 py-3 justify-between border-b border-fuchsia-400">
            <div className="flex items-center gap-4 ">
                <Link href="/">
                    <h1 className="text-4xl font-bold">FindMyPet</h1>
                </Link>
            </div>

            <div className="flex items-center gap-10">
                <Link className="link-hover-effect" href="/">Home</Link>
                <Link className="link-hover-effect" href="/ReportPet">Report Pet</Link>
                <Link className="link-hover-effect" href="/LostPetGallery">Lost Pet Gallery</Link>
                <Link className="link-hover-effect" href="/Dashboard">Dashboard</Link>
            </div>

            {/* Need to change the link reference */}
            <div className="flex items-center gap-4 text-xl">
                <Link className={buttonVariants({variant:"secondary", size:"xl"})} href="/sign-in">Sign In</Link> 
            </div>
        </nav>
    )
}