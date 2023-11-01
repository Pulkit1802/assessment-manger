"use client";

import { useState } from "react";
import { CreateUserForm } from "../form/createUserForm";
import { CreateDeptForm } from "../form/createDeptForm";
import { CreateProgramForm } from "../form/createProgramForm";
import { CreateCourseForm } from "../form/createCourseForm";
import { CreateSectionForm } from "../form/createSectionForm";
import { Approval } from "./approval";

export const CreationManager = () => {

    const [activity, setactivity] = useState("approval")

    const formChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setactivity(e.target.value)
    }

    return (
        <div className="w-10/12 mx-auto mt-8 bg-gray-100 text-gray-800 py-8">

            <div className="flex flex-col w-4/6 rounded-lg py-4 mx-auto justify-center items-center space-x-4 bg-white mb-4">
                <p className="text-2xl font-medium">Select Form</p>
                <select onChange={formChange} className="py-1 px-6 mx-auto bg-gray-200 rounded-lg">
                    <option value="approval">Reg Requests</option>
                    <option value="user">User</option>
                    <option value="dept">Department</option>
                    <option value="course">Course</option>
                    <option value="program">Program</option>
                    <option value="section">Section</option>
                </select>    
            </div>
            
            <div className="w-4/6 mx-auto">
                {
                    activity === "approval" && (
                        <Approval />
                    )
                }
                {
                    activity === "user" && (
                        <CreateUserForm />
                    )
                }
                {
                    activity === "dept" && (
                        <CreateDeptForm />
                    )
                }
                {
                    activity === "course" && (
                        <CreateCourseForm />
                    )
                }
                {
                    activity === "program" && (
                        <CreateProgramForm />
                    )
                }
                {
                    activity === "section" && (
                        <CreateSectionForm />
                    )
                }
            </div>
            
        </div>
    )
}