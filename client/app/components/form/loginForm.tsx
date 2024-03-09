"use client";
import Image from "next/image";
import university from "@/public/university.png"
import university2 from "@/public/university2.png"
import { useState, useEffect } from "react";
import {redirect, useRouter} from 'next/navigation'
import { FormInput } from "./input";
import { login } from "../../api/query";
import Link from 'next/link'

export const LoginForm = () => {
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = await login(form.email, form.password);
        const user = userData.data.data
        try {
            if (user) {
                // @ts-ignore
                localStorage.setItem("token", user.login.token);
                // @ts-ignore
                localStorage.setItem("user", JSON.stringify(user.login.user));
                // setTimeout(() => {
                    // console.log("Login Success");
                router.push("/section")
                // }, 1000)
            } else {
                console.log("Login Failed");
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) 
            redirect("/dashboard/"+JSON.parse(user).role.toLowerCase())
    })
    
    return (
        <div className="flex-col md:flex-row  flex justify-center items-center p-4">
            <Image alt="university" src={university} className="2xl:w-[60rem] xl:w-[40rem] md:block md:w-96 2xl:mr-48 sm:mr-12  hidden" />
            <Image alt="university" src={university2} className="2xl:w-[60rem] md:hidden w-72 md:w-96 " />
            <form className="py-16 fold:px-2  csp:px-8 px-8 sm:px-12 bg-white rounded-2xl text-sky-600" onSubmit={handleLoginFormSubmit}>

                <p className="text-3xl font-semibold text-center mb-10 text-[#227135]">Welcome Back!</p>

                <div className="mb-6 flex flex-col items-center">
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleInputChange}
                        required={true}
                    />                
                </div>
                <div className="flex flex-col items-center">
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>
                <div>
                    <button type="submit" className="w-full text-center mt-6 py-2 rounded-lg font-medium text-xl text-[#227135] border border-[#227135] transition-all duration-300
                    hover:text-gray-100 hover:bg-[#227135] hover:border-[#227135]">Login</button>
                </div>
                <div className="mt-8">
                    <p className="text-gray-800 text-center">Don't Have An Account? 
                        <Link href={'/register'} className="ml-2 text-[#227135]">Register</Link>
                    </p>
                </div>
            </form>
        </div>
        
    )
}