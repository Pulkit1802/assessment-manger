"use client";

import { NavBar } from "../components/navbar"
import { CreationManager } from "../components/admin/creationManger";

export default function Page() {
    return (
        <div className="bg-gray-200 min-h-screen">
            <NavBar links={[{href: "/section", name:"Sections"}]} />
            <CreationManager />
        </div>
    )
}