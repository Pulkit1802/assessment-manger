"use client"

import { FormEvent, useState, useEffect }from "react"
import { FormInput } from "./input"
import { createTest } from "@/app/api/mutation"

export const CreateTestForm = () => {

    const [test, setTest] = useState<any>({
        name: "",
        requiredPercentage: "",
        courseCode: "",
        maxMarks: "",
        totalParts: "",
        parts: []
    })

    const [part, setPart] = useState<any>({
        name: "",
        maxQuestions: "",
        requiredQuestions: "",
        maxMarks: "",
    })

    const [question, setQuestion] = useState({
        partName: "",
        name: "",
        objective: "",
        maxMarks: ""
    })

    const [testDetails, setTestDetails] = useState<any>([])

    const [partNames, setPartNames] = useState<any>([]);
    const [refreshPartNames, setRefreshPartNames] = useState<number>(1)
    const [refreshQuestionNames, setRefreshQuestionNames] = useState<number>(1)

    const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTest((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handlePartInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPart((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setQuestion((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const testFormInputs = Object.keys(test).map((key: string, index: number) => {
        if (key === "parts")
            return <></>

        return (
            <div key={index} className="mb-4">
                <FormInput
                    type={key === "password" || key === "confirmPassword" ? "password" : key==="email" ? "email" : "text"}
                    name={key}
                    placeholder={key}
                    // @ts-ignore
                    value={test[key]}
                    onChange={handleTestInputChange}
                    required={true}
                />
            </div>
        )
    })

    const partFormInput = Object.keys(part).map((key: string, index: number) => {
        if (key === "questions")
            return <></>

        return (
            <div key={index} className="mb-4">
                <FormInput
                    type={key === "password" || key === "confirmPassword" ? "password" : key==="email" ? "email" : "text"}
                    name={key}
                    placeholder={key}
                    // @ts-ignore
                    value={part[key]}
                    onChange={handlePartInputChange}
                    required={true}
                />
            </div>
        )
    })

    const questionFormInputs = Object.keys(question).map((key: string, index: number) => {

        if (key === "partName")
            return <></>

        return (
            <div key={index} className="mb-4">
                <FormInput
                    type={key === "password" || key === "confirmPassword" ? "password" : key==="email" ? "email" : "text"}
                    name={key}
                    placeholder={key}
                    // @ts-ignore
                    value={question[key]}
                    onChange={handleQuestionInputChange}
                    required={true}
                />
            </div>
        )
    })

    const addPartToTest = (e: FormEvent) => {
        e.preventDefault()
        
        setTest((prev: any) => {
            const existingPart = prev.parts.find((p: any) => p.name === part.name);
            if (existingPart) {
            console.log("Part with the same name already exists");
            return prev;
            }

            return {
            ...prev,
            parts: [...prev.parts, part]
            }
        })

        setTimeout(() => {
            console.log(test)
            setRefreshPartNames((p: number) => p*-1)
        }, 500)
    }

    const addQuestionToPart = (e: FormEvent) => {
        e.preventDefault()
        const partName = question.partName;
        console.log(partName);
        const newQuestion: any = question;
        newQuestion.maxMarks = parseInt(newQuestion.maxMarks);
        newQuestion.objective = parseInt(newQuestion.objective);
        const partInd = test.parts.findIndex((part: any) => part.name === partName);
        const thisQuestionPartName = newQuestion.partName;
        delete newQuestion.partName;
        const newQuestions = test.parts[partInd]?.questions || [];
        const existingQuestionIndex = newQuestions.findIndex((q: any) => q.name === newQuestion.name);
        if (existingQuestionIndex !== -1) {
            console.log("Question with the same name already exists in the part");
            return;
        }
        newQuestions.push(newQuestion);

        setTest((prev: any) => {
            const newTest = { ...prev };
            const updateParts = newTest.parts.map((part: any) => {
                if (part.name !== partName) return part;
                return {
                    ...part,
                    questions: newQuestions,
                };
            });
            console.log(updateParts);
            return {
                ...prev,
                parts: updateParts,
            };
        });

        setQuestion((prev: any) => {
            return {
                ...prev,
                partName: thisQuestionPartName
            }
        })

        setTimeout(() => {
            console.log(test);
        }, 500);

    }

    const createNewTest = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(test)
        const res = await createTest(test)
        console.log(res)
    }

    useEffect(() => {
        // console.log(test.parts)
        const parts = test.parts
        if (parts.length)
            setPartNames(parts.map((part: any) => part.name))
        // else
        //     setTimeout(() => setRefreshPartNames((p: number) => p*-1))
    }, [refreshPartNames])

    useEffect(() => {
        const parts = test.parts

        if (parts.length) {
            setTestDetails(parts)
        }
        
    }, [refreshQuestionNames])

    return (
        <div>
            {/* {
                testDetails && testDetails.length > 0 && (
                    <div className="bg-white flex flex-col space-x-1 justify-center py-4 px-6">
                        {
                            testDetails.map((part: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <p className="text-xl mb-2">{part.name}</p>
                                        <div className="grid grid-cols-6 text-center">
                                            { 
                                                part.questions.map((question: any, index: number) => {
                                                    <div className="grid grid-cols-2">
                                                        <p>{question.name}</p>
                                                        <p>{question.objective}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            } */}
            
            <form name="testForm" onSubmit={createNewTest}>
                {...testFormInputs}
                <button type="submit">Create Test</button>
            </form>
            <form name="partForm" onSubmit={addPartToTest} className="border-b-0 border pl-4 mt-4">
                    {...partFormInput}
                    <button type="submit">Add Part</button>
            </form>
            <form name="questionForm" onSubmit={addQuestionToPart} className="border pl-8 mt-4">
                <select name="partName" value={question.partName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuestion((prev: any) => {return {...prev, partName: e.target.value}})}>
                    <option value={""}>Select Part</option>
                    {
                        partNames && partNames.length > 0 && partNames.map((name: string, index: number) => {
                            return (
                                <option key={index} value={name}>{name}</option>
                            )
                        })
                    }
                </select>
                {...questionFormInputs}
                
                <button type="submit">Add Question</button>
            </form>
        </div>
    )

}