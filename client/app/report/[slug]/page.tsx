"use client";

import { NavBar } from "@/app/components/navbar";
import { useParams } from "next/navigation";
import { getReportById } from "@/app/api/query";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

export default function Page() {

    const params = useParams()
    const [report, setReport] = useState<any>(null);
    const [xAxis, setXAxis] = useState<any>([]);
    const [series, setSeries] = useState<any>([]);

    const fetchReport = async () => {
        const report = await getReportById({id: params.slug});
        console.log(report);
        if(report.data.data && report.data.data.report) {
            setReport(report.data.data.report);
        }
        
        processData(report.data.data.report)

    }

    const processData = (data: any) => {
        const xAxisData = data.questionsReport.map((question: any) => question.question.name + '_' + question.question.part.name);
        setXAxis([{ scaleType: 'band', data: xAxisData, label: 'Questions' }]);
        
        const studentAttempted = data.questionsReport.map((question: any) => question.studentsAttempted);
        const studentAboveReqPercentageData = data.questionsReport.map((question: any) => question.studentsAboveRequiredPercentage);

        const totalData = []

        for (let i in studentAboveReqPercentageData) {
            totalData.push(data.totalStudents)
        }

        console.log(totalData, studentAboveReqPercentageData);
        
        setSeries([
            { data: totalData, label: 'total_students'},
            { data: studentAttempted, label: 'attempted' },
            { data: studentAboveReqPercentageData, label: 'student_above_req_percentage' },
        // Add more series as needed
        ]);
    }
        
        

    useEffect(() => {
        if(params.slug) {
            fetchReport();
        }
    }, []);

    return (
        <div className="bg-gray-200 min-h-screen">
            <NavBar links={[{href: "/section", name:"Sections"}]} />

            {
                report && (
                    <BarChart
                        xAxis={xAxis}
                        series={series}
                        width={1500}
                        height={700}
                        tooltip={{ trigger: 'item'}}
                        yAxis={[
                            {
                                label: 'Students',
                            }
                        ]}
                    />
                )
            }

        </div>
    )
}