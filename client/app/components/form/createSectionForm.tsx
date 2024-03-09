import { useState, useEffect } from 'react';
import { FormInput } from './input';
import { getDepts, getPrograms } from '../../api/query';
import { createSection } from '../../api/mutation';

export const CreateSectionForm = (props: any) => {

    const [form, setForm] = useState({
        roomNo: "",
        batch: "",
        semester: "",
        facultyEmail: "",
        courseCode: "",
        programId: "",
    });

    const [programs, setPrograms] = useState<any>([])
    const [deptId, setDeptId] = useState<any>("")
    const [depts, setDepts] = useState<any>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => {
            console.log(e.target.name, e.target.value);
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const formInputs = Object.keys(form).map((key, index) => {

        if (key === "programId" || key === "deptId")
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
        
        try {
            const res = await createSection(form);
            console.log(res.data); 
        } catch (err) {
            console.log(err);
        }

    }

    const fetchPrograms = async (deptId: string) => {
        // TODO: get programs

        try {

            const res = await getPrograms(deptId);
            if(res.data.data && res.data.data.programs) {
                setPrograms(res.data.data.programs)
            }

        } catch (err) {
            console.log(err);
        }

    }

    const handleDeptIdSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeptId(e.target.value);
        fetchPrograms(e.target.value);
    }

    const fetchDepts = async () => {
        try {
            const res = await getDepts();
            if(res.data.data && res.data.data.depts) {
                setDepts(res.data.data.depts)
            }
        } catch (err) {
            console.log(err);
        }
    
    }

    useEffect(() => {
        fetchDepts();
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <form className="py-10 px-5  2xl:py-8 2xl:px-28 w-72 md:w-[40rem] xl:w-[60rem] bg-white rounded-2xl text-[#227135] flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>
                <p className="text-3xl font-semibold text-center mb-8 ">Add New Section</p>
                { ...formInputs}

                <div>

                    <select className="w-full py-2 px-6 rounded-lg bg-gray-100 mt-4" name="deptId" onChange={handleDeptIdSelect}>
                        <option value="">Select Dept</option>
                        {
                            depts && depts.length > 0 && (
                                <>
                                    {
                                        depts.map((dept: any, index: number) => {
                                            return (
                                                <option key={index} value={dept.id}>{dept.name}</option>
                                            )
                                        })
                                    }
                                </>
                            ) 
                        }
                    </select>

                    <select className="w-full py-2 px-6 rounded-lg bg-gray-100 mt-4" name="programId" onChange={handleInputChange}>
                        <option value="">
                            {deptId ? "Select Program" : "Select Department First"}
                        </option>
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

                </div>

            <div className="w-full mt-4">
                <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-[#227135] border border-[#227135] transition-all duration-300
                hover:text-white hover:bg-[#227135] hover:border-[#227135]">Create</button>
            </div>

            </form>

        </div>
    )
}