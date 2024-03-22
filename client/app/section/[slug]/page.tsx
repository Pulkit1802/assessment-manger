"use client";

import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TestCard } from "../../components/section/testCard";
import { ReportCard } from "../../components/section/reportCard";
import { getSection, getSectionReports } from "../../api/query";

export default function Page() {

    const [sectionId, setSectionId] = useState<any>("");
    const [section, setSection] = useState<any>(null);
    const [tests, setTests] = useState<any>([]);
    const [reports, setReports] = useState<any>([]);
    const params = useParams();

    const fetchSections = async () => {
        
        try {
            const res = await getSection(params.slug);
            // console.log(res)
            if (res.data.data && res.data.data.section) {
                setSection(res.data.data.section)
                setTests(res.data.data.section.course.tests);
            }
            const sectionReports = await getSectionReports(params.slug)
            console.log(sectionReports)
            if (sectionReports.data.data && sectionReports.data.data.reports)
                setReports(sectionReports.data.data.reports)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if(params.slug) {
            setSectionId(params.slug);
            fetchSections();
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-300">
            <NavBar links={[{href: "/section", name: "Sections"}, {href: "/create", name: "Add"}]} />

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
                reports && reports.length > 0 && (
                    <>
                        <p className="text-2xl">Reports</p>
                        <div className="grid grid-cols-4 gap-4 p-4">

                            {
                                reports.map((report: any, index: number) => {
                                    // console.log(report)
                                    return <ReportCard key={index} reportData={report} />
                                })
                            }
                        </div>
                    </>
                    
                )
            }

            </div>

        </div>
    )

}