import { buttonVariants } from "@/components/ui/button";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto min-h-screen space-y-50">
      <section className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-bold">Report Missing Pet</h1>
        <p className="text-lg">Click the following button to report your missing pet in FindMyPet</p>
        <Link className={buttonVariants({ size: "xl" })} href="/ReportPet">Report Pet</Link> 
      </section>

      <section className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-bold">Help Find Lost Pets In Your Area</h1>
        <p className="text-lg">Click the following button to browse reported cases in FindMyPet</p>
          <Link className={buttonVariants({ size: "xl" })} href="/LostPetGallery">Go to Gallery</Link>
      </section>
    </div>

  );
}
