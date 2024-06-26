"use client";

import { FormInput } from "./input"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { getDepts } from "../../api/query";
import { register } from "@/app/api/mutation";

export const RegisterForm = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        deptId: ""
    });

    const [depts, setDepts] = useState<any>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await register(form)

        console.log(res)
    }

    const formInputs = Object.keys(form).map((key, index) => {

        if (key === "role" || key === "deptId")
            return <></>

        return (
            <div key={index} className="mb-4">
                <FormInput
                    type={key === "password" || key === "confirmPassword" ? "password" : key==="email" ? "email" : "text"}
                    name={key}
                    placeholder={key}
                    // @ts-ignore
                    value={form[key]}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>
        )
    });

    const handleDepts = async () => {
        const res = await getDepts();
        try {
            const depts = res.data.data.depts;
            console.log(depts)
            setDepts(depts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // fetch depts
        handleDepts();
    }, []);

    return (
        <div>
            <form className="py-8 px-16 2xl:px-20 bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>

                <p className="text-3xl font-semibold text-center text-[#227135] mb-8 ">Request An Account</p>

                {...formInputs}

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 text-[#227135] " name="role" onChange={handleInputChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="hod">Hod</option>
                    <option value="cc">Course Cordinator</option>
                    <option value="pc">Program Cordinator</option>
                    <option value="user">Faculty</option>
                </select>

                <select className="w-full py-2 px-6 rounded-lg text-[#227135] bg-gray-100 mt-4" name="deptId" onChange={handleInputChange}>
                    <option value="">Select Dept</option>
                    {
                        (depts && depts.length) > 0 ? (
                            <>
                                {
                                    depts.map((dept: any, index: number) => {
                                        return (
                                            <option key={index} value={dept.id}>{dept.name}</option>
                                        )
                                    })
                                }
                            </>
                        ) : 
                        <></>
                    }
                </select>

                <div className="w-full mt-4">
                    <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-[#227135] border border-[#227135] transition-all duration-300
                    hover:text-gray-100 hover:bg-[#227135] hover:border-[#227135]">Register</button>
                </div>
                <div className="mt-4">
                    <p className="text-gray-800 text-center">Have An Account? 
                        <Link href={'/login'} className="ml-2 text-[#227135]">LogIn</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}