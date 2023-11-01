
import {useState, useEffect} from "react";

export const ReportCard = ({reportData}: any) => {

    const [report, setReport] = useState<any>(null);

    const fetchReport = async () => {
        
    }

    return (
        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
        hover:shadow-lg hover:bg-gray-100">
            <div className="flex flex-col justify-start">
                <p>Name: {reportData.name}</p>
                <p>Objective: {reportData.objective}</p>
                <p>Average Marks: {reportData.avgMarks}</p>
                <p>Total Students: {reportData.totalStudents}</p>
                <p>Student Reaching Attainment: {reportData.studentsAboveRequiredPercentage}</p>
            </div>
        </div>
    )

}