import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <section className="flex flex-col justify-center items-center gap-y-10">
    <div>
      <h1 className="customized-h1">Create FindMyPet Account</h1>
    </div>

    <div>
      <SignUp />
    </div>
  </section>
}