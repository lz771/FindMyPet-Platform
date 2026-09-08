import Link from "next/link"
import { buttonVariants } from "../ui/button"

export default function Navbar() {
    return (
        <nav className="flex items-center gap-4 py-5 justify-between mx-8">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <h1 className="text-3xl font-bold">FindMyPet</h1>
                </Link>
            </div>

            <div className="flex items-center gap-10 text-xl">
                <Link href="/">Home</Link>
                <Link href="/ReportPet">Report Pet</Link>
                <Link href="/LostPetGallery">Lost Pet Gallery</Link>
                <Link href="/Dashboard">Dashboard</Link>
            </div>

            {/* Need to change the link reference */}
            <div className="flex items-center gap-4 text-xl">
                <Link className={buttonVariants({size:"lg"})} href="/sign-in">Sign In</Link> 
            </div>
        </nav>
    )
}