export const TestCard = ({testData}: any) => {
    return (
        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
        hover:shadow-lg hover:bg-gray-100">
            <div className="flex flex-col justify-start">
                <p>Name: {testData.name}</p>
                <p>Marking Deadline: {testData.markUploadDeadline}</p>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Download Marking Sheet</button>

                {/* Create File Upload Button */}

            </div>
        </div>
    )
} 