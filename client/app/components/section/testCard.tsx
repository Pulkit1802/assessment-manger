import { uploadFile, downloadFile } from "../../api/api"
import { useState } from "react"

export const TestCard = ({testData}: any) => {

    const [file, setFile] = useState<File | null>(null)

    const handleFileUpload = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleFileFormSubmit = async (e: any) => {
        e.preventDefault()
        if (file) {

            try {
                const uploaded_file = await uploadFile(file)
                

            } catch (err) {
                console.log(err)
            }            

        }
    }

    return (
        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
        hover:shadow-lg hover:bg-gray-100">
            <div className="flex flex-col justify-start">
                <p>Name: {testData.name}</p>
                <p>Marking Deadline: {testData.markUploadDeadline}</p>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Download Marking Sheet</button>

                {/* Create File Upload Button */}

                <form className="flex flex-col justify-start mt-4" onSubmit={handleFileFormSubmit}>
                    <input type="file" onChange={handleFileUpload}/>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Upload Marking Sheet</button>
                </form>


            </div>
        </div>
    )
} 