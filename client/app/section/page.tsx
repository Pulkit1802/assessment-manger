"use client";

import { useState, useEffect, use } from "react";
import { NavBar } from "../components/navbar";
import { SectionCard } from "../components/section/sectionCard";
import { getSerctions } from "../api/query";

export default function Page() {

    const [role, setRole] = useState<any>()
    const [sections, setSections] = useState<any>([])

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

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user") || "{}")

        if (user) {
            setRole(user.role)
            fetchSections()
        }

    }, [])

    return (
        <div className="min-h-screen bg-gray-300 ">
            <NavBar links={[{href: "create", name: "Add"}]} />
            <div className="mt-12 w-10/12 mx-auto">
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