"use client";

import { FormInput } from "./input"
import { useState, useEffect } from "react"
import { getDepts } from "../../api/query";
import { newUser } from "@/app/api/mutation";

export const CreateUserForm = () => {

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

    const handleDepts = async () => {
        try {
            const res = await getDepts();

            if (res.data.data && res.data.data.depts.length > 0)
                setDepts(res.data.data.depts)
            else
                setDepts([])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // fetch depts
        handleDepts();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <form className="py-10 px-5  2xl:py-8 2xl:px-28 w-72 md:w-[40rem] xl:w-[60rem] bg-white rounded-2xl text-[#227135] flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>

                <p className="text-3xl font-semibold text-center mb-8 ">Create User</p>

                {...formInputs}

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 " name="role" onChange={handleInputChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="hod">Hod</option>
                    <option value="cc">Course Cordinator</option>
                    <option value="pc">Program Cordinator</option>
                    <option value="user">Faculty</option>
                </select>

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 mt-4" name="deptId" onChange={handleInputChange}>
                    <option value="">Select Dept</option>
                    <option value="DSBS">DSBS</option>
                    <option value="AIML">AIML</option>
                    <option value="CORE">CORE</option>
                    <option value="NWC">NWC</option>
                    <option value="CINTEL">CINTEL</option>
                    <option value="CTECH">CTECH</option>
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
                    hover:text-white hover:bg-[#227135] hover:border-[#227135]">Create</button>
                </div>
                
            </form>
        </div>
    )
}