'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface SignInFormData {
    email: string;
    password: string;
}

const signInFormSchema = z.object({
    email: z.string().trim().email('Email must be valid'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters long').max(20, {
        message: 'Password cannot be longer than 20 characters'
    }).regex(/[a-zA-Z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
})

function SignInForm() {
    const [formData] = useState<SignInFormData>({
        email: '',
        password: ''
    })
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        values: {
            email: formData.email,
            password: formData.password
        }
    });

    const handleSubmit = (values: z.infer<typeof signInFormSchema>) => {
        console.log(values)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='flex flex-col gap-y-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-light text-md text-gray-500'>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className='shadow-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-light text-md text-gray-500'>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className='shadow-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <p className="underline text-sm mt-2">Forgot Password?</p>
                        <Button type="submit" className="px-5 my-4 w-full py-5 cursor-pointer hover:bg-gray-500 hover:text-white">
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="space-y-3">
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="p-0 w-full flex justify-center items-center">
                    <Link
                        className='w-full h-full items-center justify-center flex gap-x-2'
                        href="#"
                    >
                        <FcGoogle />
                        Sign in with Google
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default SignInForm