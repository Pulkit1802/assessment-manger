"use client";

import { NavBar } from "@/app/components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TestCard } from "@/app/components/section/testCard";
import { ReportCard } from "@/app/components/section/reportCard";

export default function Page() {

    const [sectionId, setSectionId] = useState<any>("");
    const [section, setSection] = useState<any>(null);
    const params = useParams();

    const getSection = async () => {
        
    }

    useEffect(() => {

        console.log(params)

        if(params.slug) {
            setSectionId(params.slug);
            getSection();
        }
    })

    return (
        <div className="min-h-screen bg-gray-300">
            <NavBar links={[{href: "/sections", name: "Sections"}, {href: "/create", name: "Add"}]} />

            <div className="w-10/12 mx-auto">
            {
                section && section.tests && section.tests.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        <p className="text-2xl">Tests</p>
                        {
                            section.tests.map((test: any, index: number) => {
                                return <TestCard key={index} testData={test} />
                            })
                        }
                    </div>
                )
            }

            {
                section && section.reports && section.reports.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        <p className="text-2xl">Reports</p>
                        {
                            section.reports.map((report: any, index: number) => {
                                return <ReportCard key={index} reportData={report} />
                            })
                        }
                    </div>
                )
            }

            </div>

        </div>
    )

}