"use client";

import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TestCard } from "../../components/section/testCard";
import { ReportCard } from "../../components/section/reportCard";
import { getSection } from "../../api/query";

export default function Page() {

    const [sectionId, setSectionId] = useState<any>("");
    const [section, setSection] = useState<any>(null);
    const [tests, setTests] = useState<any>([]);
    const [reports, setReports] = useState<any>([]);
    const params = useParams();

    const fetchSections = async () => {
        
        try {
            const res = await getSection(params.slug);
            console.log(res)
            if (res.data.data && res.data.data.section) {
                setSection(res.data.data.section)
                setTests(res.data.data.section.course.tests);
                setReports(res.data.data.section.reports);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        console.log(params)

        if(params.slug) {
            setSectionId(params.slug);
            fetchSections();
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-300">
            <NavBar links={[{href: "/sections", name: "Sections"}, {href: "/create", name: "Add"}]} />

            <div className="w-10/12 mx-auto">
            {
                tests && tests.length > 0 && (
                    <>
                        <p className="text-2xl">Tests</p>
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {
                                tests.map((test: any, index: number) => {
                                    return <TestCard key={index} testData={test} />
                                })
                            }
                    </div>
                    </>

                )
            }

            {
                section && section.reports && section.reports.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 p-4">
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