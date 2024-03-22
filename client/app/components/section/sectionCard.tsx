
import { useRouter } from "next/navigation"

export const SectionCard = ({sectionData}: any) => {
    
    const router = useRouter();

    const handleSectionClick = () => {
        router.push(`/section/${sectionData.id}`)
    }
    
    return (
        <div 
        onClick={handleSectionClick}
        className="py-4 text-lg px-6 flex flex-col rounded-md justify-start bg-gray-200 shadow-md 
        shadow-gray-800 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:cursor-pointer">
            <div>
                Room: {sectionData.roomNo}
            </div>
            <div>
                Batch: {sectionData.batch}
            </div>
            <div>
                Semester: {sectionData.semester}
            </div>
        </div>
    )
}