"use client";

import { FormInput } from "./input"
import { useState, useEffect } from "react"
import { getDepts } from "../../api/query";
import { newUser } from "@/app/api/mutation";

export const CreateCourseForm = () => {

    const [form, setForm] = useState({
        name: "",
        code: ""
    });


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

        const res = await newUser(form)

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

    return (
        <div>
            <form className="py-8 px-20 bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>

                <p className="text-3xl font-semibold text-center mb-8 ">Create Program</p>

                {...formInputs}

                <div className="w-full mt-4">
                    <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-sky-600 border border-sky-400 transition-all duration-300
                    hover:text-gray-100 hover:bg-sky-600 hover:border-sky-600">Create</button>
                </div>
                
            </form>
        </div>
    )
}