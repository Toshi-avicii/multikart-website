import SignInForm from "@/components/sign-in/sign-in-form"
import Link from "next/link"

function SignInPage() {
  return (
    <div className="bg-[url(/sign-in-gradient.jpg)] min-h-screen bg-cover flex justify-center items-center p-4 md:p-8">
        <div className="rounded-md shadow-sm p-4 bg-white lg:p-8 w-full md:w-[400px]">
            <div className="">
                <h1 className="text-2xl mb-2 font-semibold">Sign In</h1>
                <p className="text-gray-700 mb-2 text-sm">
                    <span className="text-gray-500">
                        Already have an account? 
                    </span>
                    <Link href="/sign-up" className="underline mx-1">
                        Sign Up
                    </Link>
                </p>
            </div>
            <div>
                <SignInForm />
            </div>
        </div>
    </div>
  ) 
}

export default SignInPage