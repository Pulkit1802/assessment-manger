"use client";

import { useState, useEffect, use } from "react";
import { NavBar } from "../components/navbar";
import { SectionCard } from "../components/section/sectionCard";
import { getSerctions, getCourses } from "../api/query";
import { useRouter } from "next/navigation"

export default function Page() {

    const router = useRouter();

    const [role, setRole] = useState<any>()
    const [sections, setSections] = useState<any>([])
    const [user, setUser] = useState<any>({})
    const [courses, setCourses] = useState<any>([])

    const fetchSections = async () => {
        try {
            const res = await getSerctions()
            console.log(res)
            if (res.data.data && res.data.data.sections)
                setSections(res.data.data.sections)
        } catch (error) {
            console.log(error)
        }

    }

    const fetchCourses = async (role: string) => {
        try {

            if (role !== "cc") return;

            const res = await getCourses();
            if (res.data.data && res.data.data.courses) {
                setCourses(res.data.data.courses)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {


        const user = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(user);

        if (user) {
            setRole(user.role)
            fetchSections()
            fetchCourses(user.role)
        }

    }, [])

    return (
        <div className="min-h-screen bg-gray-300 ">
            <NavBar links={[{href: "create", name: "Add"}]} />
            <div className="mt-12 w-10/12 mx-auto">

            {
                role === "cc" && (
                    courses && courses.length > 0 && (
                        <div>
                            <p className="text-2xl font-medium mb-4">My Courses</p>
                            <div className="grid text-gray-800 grid-cols-4 gap-4">
                                {
                                    courses.map((course: any, index: number) => {
                                        return (
                                            
                                            <div key={index} onClick={() => router.push(`/course/${course.id}`)} className="py-4 text-lg px-6 flex flex-col rounded-md justify-start bg-gray-200 shadow-md 
                                            shadow-gray-800 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:cursor-pointer">
                                                <p className="text-lg font-medium">{course.name}</p>
                                                <p className="text-sm">{course.code}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )

                )
            }

            {
                sections && sections.length > 0 && (
                    <div>
                        <p className="text-2xl font-medium mb-4">My Sections</p>
                        <div className="grid text-gray-800 grid-cols-4 gap-4">
                            {
                                sections.map((section: any, index: number) => {
                                    return (
                                        <SectionCard key={index} sectionData={section} />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) 
            }
            </div>

        </div>
    )
}