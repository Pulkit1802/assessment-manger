import { useState } from 'react';
import { FormInput } from './input';
import { createDept } from '../../api/mutation';

export const CreateDeptForm = (props: any) => {

    const [dept, setDept] = useState({
        name: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDept(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {
            const res = await createDept(dept)
            if(res.data.data && res.data.data.createDept) {
                console.log(res.data.data.createDept);
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <form className="py-10 px-5  2xl:py-8 2xl:px-28 w-72 md:w-[40rem] xl:w-[60rem]   bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>
                <p className="text-3xl font-semibold text-center mb-8 text-[#227135]">Add New Department</p>
                <FormInput
                    type={"text"}
                    name={"name"}
                    placeholder={"Department Name"}
                    // @ts-ignore
                    value={dept.name}
                    onChange={handleInputChange}
                    required={true}
                />

            <div className="w-full mt-4">
                <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-[#227135] border border-[#227135] transition-all duration-300
                hover:text-white hover:bg-[#227135] hover:border-[#227135]">Create</button>
            </div>

            </form>

        </div>
    )
}