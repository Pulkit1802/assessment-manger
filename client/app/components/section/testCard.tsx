"use client";

export const TestCard = ({testData}: any) => {
    return (
        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
        hover:shadow-lg hover:bg-gray-100">
            <div className="flex flex-col justify-start">
                <p>Name: {testData.name}</p>
                <p>Marking Deadline: {testData.markUploadDeadline}</p>

                

            </div>
        </div>
    )
} 