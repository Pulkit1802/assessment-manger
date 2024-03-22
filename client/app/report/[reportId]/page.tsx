"use client";

import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSectionTestMarking } from "@/app/api/mutation";

import { BarChart, PieChart } from "@mui/x-charts";


export default function Page() {

    const [xAxis, setXAxis] = useState<any>([]);
    const [series, setSeries] = useState<any>([]);
    const [subparts, setSubparts] = useState<any>([]);

    const params = useParams();

    const getMarkingData = async () => {
        const res = await getSectionTestMarking({ "id": params.slug });
        console.log(res.data.data.markings);
        if (res.data.data && res.data.data.markings) {
            processData(res.data.data.markings);
        }
    }

    function processData(markings: any[]) {
        // Get unique questions
        const questions = Array.from(new Set(markings.flatMap(mark => mark.questionWiseMarksObtained.map(q => q.question.name + '_' + q.question.part.name))));
        
        // Get series data
        const series = markings.map(mark => {
            const data = Array(questions.length).fill(null);
            mark.questionWiseMarksObtained.forEach(q => {
            const questionIndex = questions.findIndex(question => question === q.question.name + '_' + q.question.part.name);
            data[questionIndex] = q.marksObtained;
            });
            return {
            data,
            label: mark.student.name,
            };
        });

        const result = []

        for (let question of questions) {
            result.push({
                question_name: question,
                subparts: [
                    {label: '1-4',
                    value: 0},
                    {label: '5-8',
                    value: 0},
                    {label: '9-12',
                    value: 0},
                    {label: '13-16',
                    value: 0},
                    {label: '17-20',
                    value: 0},
                ]
            })
        }

        for (let mark of markings) {
            for (let question of mark.questionWiseMarksObtained) {
                const questionIndex = questions.findIndex(q => q === question.question.name + '_' + question.question.part.name);
                const marks = question.marksObtained;
                if (marks >= 1 && marks <= 4) {
                    result[questionIndex].subparts[0]['value'] += 1;
                } else if (marks >= 5 && marks <= 8) {
                    result[questionIndex].subparts[1]['value'] += 1;
                } else if (marks >= 9 && marks <= 12) {
                    result[questionIndex].subparts[2]['value'] += 1;
                } else if (marks >= 13 && marks <= 16) {
                    result[questionIndex].subparts[3]['value'] += 1;
                } else if (marks >= 17 && marks <= 20) {
                    result[questionIndex].subparts[4]['value'] += 1;
                }
            }
        }

        console.log(result);

        setSubparts(result);

        setXAxis([{ scaleType: 'band', data: questions }]);
        setSeries(series);
        
        // return { xAxis: [{ scaleType: 'band', data: questions }], series };
    }

    useEffect(() => {
        getMarkingData();
    }, []);

    return (
        <section className="min-h-screen bg-white">
            <NavBar />

            <div className="mt-24">

                <BarChart
                    xAxis={xAxis}
                    series={series}
                    width={1500}
                    height={700}
                    tooltip={{ trigger: 'item'}}
                />

            </div>
            

            <div className="flex items-center justify-center">
                <div className="w-2/3 grid grid-cols-2 gap-y-8">
                    {
                        subparts.map((subpart: any, index: number) => {
                            return (
                                <div key={index} className="flex flex-col justify-center items-center justify-center text-black">
                                    <PieChart
                                        series={[{ data: subpart.subparts }]}
                                        width={300}
                                        height={300}
                                        tooltip={{ trigger: 'item'}}
                                    />
                                    <p className="text-xl">{subpart.question_name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            

            {
                subparts.length > 0 && (subparts.forEach((subpart: any, index: number) => {
                    return (
                        <div className="flex items-center space-y-4 text-black">
                            

                        </div>
                    )
                }))
            }

            {/* "markings": [
                {
                    "id": "clu30hymm0005g0qyd5m0ev1w",
                    "questionWiseMarksObtained": [
                    {
                        "marksObtained": 1,
                        "question": {
                            "maxMarks": 1,
                            "name": "Q1",
                            "objective": "1"
                        }
                    }
                    ],
                    "student": {
                    "regNo": "RA2011003010002"
                    }
                },
            ] */}

        </section>
    )
}