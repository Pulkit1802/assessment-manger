"use client";

import { FormInput } from "./input"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { getDepts } from "../../api/api";

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        console.log(form)
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
        const depts = res.data.data.depts;
        setDepts(depts)
    }

    useEffect(() => {
        // fetch depts
        handleDepts();
    }, []);

    return (
        <div>
            <form className="py-8 px-20 bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>

                <p className="text-3xl font-semibold text-center mb-8 ">Request An Account</p>

                {...formInputs}

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 " name="role" onChange={handleSelectChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="hod">Hod</option>
                    <option value="cc">Course Cordinator</option>
                    <option value="pc">Program Cordinator</option>
                    <option value="user">Faculty</option>
                </select>

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 mt-4" name="deptId" onChange={handleSelectChange}>
                    <option value="">Select Dept</option>
                    {
                        depts.length > 0 ? (
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
                    <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-sky-600 border border-sky-400 transition-all duration-300
                    hover:text-gray-100 hover:bg-sky-600 hover:border-sky-600">Register</button>
                </div>
                <div className="mt-4">
                    <p className="text-gray-800 text-center">Have An Account? 
                        <Link href={'/login'} className="ml-2 text-sky-600">LogIn</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}