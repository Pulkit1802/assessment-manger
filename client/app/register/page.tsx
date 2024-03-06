import { RegisterForm } from "../components/form/registerForm";
import Image from "next/image";
import uni from "@/public/university.png"
export default function Page () {
    return (
        <div className="h-screen bg-gray-200 p-14 flex 2xl:gap-28 flex-col sm:flex-row justify-center items-center">
            <Image src={uni} alt="university" className="2xl:w-[55rem] hidden sm:block " />
            <RegisterForm />
        </div>
    )
}