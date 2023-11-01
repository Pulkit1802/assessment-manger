import { useState, useEffect } from 'react';
import { FormInput } from './input';
import { createDept } from '../../api/mutation';

export const CreateSectionForm = (props: any) => {

    const [form, setForm] = useState({
        roomNo: "",
        batch: "",
        semester: "",
        facultyEmail: "",
        programId: "",
    });

    const [programs, setPrograms] = useState<any>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const formInputs = Object.keys(form).map((key, index) => {

        if (key === "programId")
            return <></>

        return (
            <div key={index} className="mb-4">
                <FormInput
                    type={key === "password" || key === "confirmPassword" ? "password" : key==="email" ? "email" : "text"}
                    name={key}
                    placeholder={key}
                    // @ts-ignore
                    value={form[key]}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>
        )
    });

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // try {
        //     const res = await createDept(dept)
        //     if(res.data.data && res.data.data.createDept) {
        //         console.log(res.data.data.createDept);
        //     }
        // } catch (err) {
        //     console.log(err);
        // }

    }

    const getPrograms = async () => {
        // TODO: get programs
    }

    useEffect(() => {
        getPrograms();
    }, [])

    return (
        <div>
            <form className="py-8 px-20 bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>
                <p className="text-3xl font-semibold text-center mb-8 ">Add New Department</p>
                { ...formInputs}

                <select className="w-full py-2 px-6 rounded-lg bg-gray-100 mt-4" name="deptId" onChange={handleInputChange}>
                    <option value="">Select Program</option>
                    {
                        (programs && programs.length) > 0 ? (
                            <>
                                {
                                    programs.map((program: any, index: number) => {
                                        return (
                                            <option key={index} value={program.id}>{program.name}</option>
                                        )
                                    })
                                }
                            </>
                        ) : 
                        <></>
                    }
                </select>

            <div className="w-full mt-4">
                <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-sky-600 border border-sky-400 transition-all duration-300
                hover:text-gray-100 hover:bg-sky-600 hover:border-sky-600">Create</button>
            </div>

            </form>

        </div>
    )
}