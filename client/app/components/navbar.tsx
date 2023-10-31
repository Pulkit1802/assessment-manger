import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

export const NavBar = ({links=[]}: {links?: any}) => {

    const [user, setUser] = useState<any>({})

    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login")
    }

    useEffect(() => {
        // const user = localStorage.getItem("user");
        // if (!user)
        //     return redirect("/login")
        // setUser(JSON.parse(user))
    }, []);

    return (
        <div className="pt-4 text-lg">
            <div className="flex items-center justify-between px-12 py-4 top-4 shadow-md rounded-full bg-gray-300 shadow-gray-700 w-10/12 mx-auto">
            <div className="text-sky-800 font-semibold">
                {user.name || "User"}
            </div>
            
            <div className="flex space-x-3 items-center">
                {
                    links && links.length > 0 && (
                        <>
                            {
                                links.map((link: any, index: number) => {
                                    return (
                                        <Link key={index} href={link.href} className="text-sky-600 hover:text-sky-800 transition-all duration-300">{link.name}</Link>
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>

            <div>
                <div className="text-sky-700 font-medium py-1 px-4 rounded-xl transition-colors duration-300 border border-sky-700
                hover:bg-sky-700 hover:text-gray-200 hover:cursor-pointer" onClick={handleLogout}>Logout</div>
            </div>
        </div>
        </div>
    )
}