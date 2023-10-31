import { useState, useEffect } from "react";

import { approveUser } from "@/app/api/mutation";

export const ApprovalCard = ({user, setRefreshPendingUsers}: any) => {

    const handleApproval = async () => {
        console.log(user.id);

        const res = await approveUser(user.id);

        try {
            if (res.data.data && res.data.data.approveUser) {
                setRefreshPendingUsers((prev: number) => prev*-1)
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="w-full mb-4 py-2 px-6 bg-gray-200 shadow-sm shadow-gray-800 rounded-lg flex justify-between items-center">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.dept.name}</div>
            <div>{user.role}</div>
            <div className="py-2 px-4 border border-sky-600 rounded-lg text-blue-600 transition-all duration-300
            hover:cursor-pointer hover:bg-sky-600 hover:text-gray-200" onClick={handleApproval}>Approve</div>
        </div>
    )

}