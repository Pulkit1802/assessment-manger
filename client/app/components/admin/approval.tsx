"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation";
import { NavBar } from "../../components/navbar";
import { waitlist } from "../../api/query";
import { ApprovalCard } from "../../components/admin/approvalCard";

export const Approval = () => {

    const [pendingUsers, setPeindingUsers] = useState<any>([]);
    const [refreshPendingUsers, setRefreshPendingUsers] = useState<number>(1);
    
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("user") || "{}");
    //     if (user.role !== "admin")
    //         redirect("/dashboard"+user.role)
    // }, [])

    const getPendingUsers = async () => {
        try {
            const res = await waitlist();
            // console.log(res.data);
            if (res.data.data) {
                const pendingUsers = res.data.data.userWatingForApproval;
                setPeindingUsers(pendingUsers);
            }

        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getPendingUsers();
    }, [refreshPendingUsers])

    return (
        
        <div className="bg-white w-full py-6">
            <div className="w-10/12 mx-auto bg-gray-100 py-6 px-8 shadow-md rounded-md text-gray-800">
            {
                pendingUsers && pendingUsers.length > 0 && (
                    <>
                        {
                            pendingUsers.map((user: any, index: number) => {
                                return (
                                    <ApprovalCard key={index} user={user} setRefreshPendingUsers={setRefreshPendingUsers} />
                                )
                            })
                        }
                    </>
                )
            }
            </div>
        </div>
            

    )

}