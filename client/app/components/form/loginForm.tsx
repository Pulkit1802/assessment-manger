"use client";
import { useState, useEffect } from "react";
import {redirect} from 'next/navigation'
import { FormInput } from "./input";
import { login } from "../../api/api";
import Link from 'next/link'

export const LoginForm = () => {
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = login(form.email, form.password);
        if (userData) {
            // @ts-ignore
            localStorage.setItem("token", userData.token);
            // @ts-ignore
            localStorage.setItem("user", JSON.stringify(userData.user));
            redirect("/dashboard")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            redirect("/dashboard")
    })
    
    return (
        <div>
            <form className="py-16 px-12 bg-white rounded-2xl text-sky-600" onSubmit={handleLoginFormSubmit}>

                <p className="text-3xl font-semibold text-center mb-10 ">Welcome Back!</p>

                <div className="mb-6">
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleInputChange}
                        required={true}
                    />                
                </div>
                <div>
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
                    <button type="submit" className="w-full text-center mt-6 py-2 rounded-lg font-medium text-xl text-sky-600 border border-sky-400 transition-all duration-300
                    hover:text-gray-100 hover:bg-sky-600 hover:border-sky-600">Login</button>
                </div>
                <div className="mt-8">
                    <p className="text-gray-800 text-center">Don't Have An Account? 
                        <Link href={'/register'} className="ml-2 text-sky-600">Register</Link>
                    </p>
                </div>
            </form>
        </div>
        
    )
}