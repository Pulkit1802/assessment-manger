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
        <div>
            <form className="py-8 px-20 bg-white rounded-2xl text-sky-600 flex flex-col items-center justify-center" onSubmit={handleRegisterSubmit}>
                <p className="text-3xl font-semibold text-center mb-8 ">Add New Department</p>
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
                <button type="submit" className="w-full text-center py-2 rounded-lg font-medium text-xl text-sky-600 border border-sky-400 transition-all duration-300
                hover:text-gray-100 hover:bg-sky-600 hover:border-sky-600">Create</button>
            </div>

            </form>

        </div>
    )
}