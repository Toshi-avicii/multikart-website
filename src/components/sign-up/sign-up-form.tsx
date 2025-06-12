'use client'

import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

interface SignUpFormData {
    username: string;
    email: string;
    password: string;
}

const signUpFormSchema = z.object({
    username: z.string().trim().min(3, 'Username must be at least 3 characters long').max(12, {
        message: 'Username connot be longer than 12 characters'
    }),
    email: z.string().trim().email('Email must be valid'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters long').max(20, {
        message: 'Password cannot be longer than 20 characters'
    }).regex(/[a-zA-Z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
})

function SignUpForm() {
    const [formData] = useState<SignUpFormData>({
        email: '',
        password: '',
        username: ''
    })
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        values: {
            email: formData.email,
            password: formData.password,
            username: formData.username
        }
    });

    const handleSubmit = (values: z.infer<typeof signUpFormSchema>) => {
        console.log(values)
    }
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='flex flex-col gap-y-6'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-light text-md text-gray-500'>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" className='lg:py-5 shadow-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-light text-md text-gray-500'>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className='lg:py-5 shadow-none' {...field} />
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
                                        <Input type="password" className='lg:py-5 shadow-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <p className='font-light text-sm text-gray-400'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='my-4 lg:my-6 lg:w-7/12'>
                        <p className='text-gray-500 text-sm'>By creating an account, you agree to our
                            <span className='underline mx-1'>Terms of use</span> and <span className='underline'>Privacy Policy</span>
                        </p>
                    </div>

                    <div>
                        <Button type="submit" className="px-5 w-full py-5 cursor-pointer hover:bg-gray-500 hover:text-white">
                            Create an account
                        </Button>
                    </div>
                </form>

            </Form>
            <div className="space-y-3 mt-4">
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
                        Sign up with Google
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default SignUpForm