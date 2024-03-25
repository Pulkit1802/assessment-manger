"use client";

import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TestCard } from "../../components/section/testCard";
import { ReportCard } from "../../components/section/reportCard";
import { getSectionCourse, getCourseReport } from "../../api/query";


export default function Page() {

    const params = useParams();

    const [course, setCourse] = useState<any>([]);
    const [tests, setTests] = useState<any>([]);
    const [reports, setReports] = useState<any>([]);

    const fetchSections = async () => {
        
        try {
            const res = await getSectionCourse(params.slug);
            console.log(res)
            if (res.data.data && res.data.data) {
                setCourse(res.data.data.course)
                setTests(res.data.data.course.tests);
            }
            const sectionReports = await getCourseReport(params.slug)
            // console.log(sectionReports)
            if (sectionReports.data.data && sectionReports.data.data.reports)
                setReports(sectionReports.data.data.reports)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if(params.slug) {
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
                                    return (
                                        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
                                        hover:shadow-lg hover:bg-gray-100">
                                            <div className="flex flex-col justify-start">
                                                <p>Name: {test.name}</p>
                                                <p>Marking Deadline: {test.markUploadDeadline}</p>
                                            </div>
                                        </div>
                                    )
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