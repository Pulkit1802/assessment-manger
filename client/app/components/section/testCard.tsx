import { uploadFile, downloadFile } from "../../api/api"
import { useEffect, useState } from "react"
import { generateMarksheet, getSectionTestMarking } from "../../api/query"
import { generateReport, createReport } from "../../api/mutation";
import { useParams } from "next/navigation";
import Link from "next/link";

export const TestCard = ({testData}: any) => {

    const router = useParams()
    const [file, setFile] = useState<File | null>(null)
    const [downFile, setDownFile] = useState<File | null>(null)
    const [markings, setMarkings] = useState<any>([])
    const [refreshMarkings, setRefreshMarkings] = useState<number>(-1)

    const handleFileDownload = async () => {

        try {
            const res = await generateMarksheet(testData.id, router.slug)

            // console.log(res)

            if (res.data.data && res.data.data.downloadMarking) {
                const downFile = await downloadFile(res.data.data.downloadMarking)
                
                const href = URL.createObjectURL(downFile);

                const link = document.createElement('a')

                link.href = href;

                link.setAttribute('download', 'marking_sheet.xlsx');

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(href);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileUpload = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleFileFormSubmit = async (e: any) => {
        e.preventDefault()
        if (file) {

            console.log(router.slug)

            try {
                const uploaded_file = await uploadFile(file)
                // if (uploaded_file.status === 'success') 
                console.log(uploaded_file)
                const res = await generateReport({
                    sectionId: router.slug,
                    testId: testData.id,
                    fileUrl: uploaded_file.file.filename,
                });

                console.log(res)

                setRefreshMarkings(p => p*-1)

            } catch (err) {
                console.log(err)
            }            

        }
    }

    const getMarking = async () => {
        try {
            const markings = await getSectionTestMarking({
                sectionId: router.slug,
                testId: testData.id
            })

            // console.log(markings)

            if (markings.data.data && markings.data.data.markings)
                setMarkings(markings.data.data.markings)

        } catch (err: any) {

        }
    }

    const generateSectionReport = async () => {
        try {
            const report = await createReport({
                name: testData.name,
                type: "section",
                testId: testData.id,
                sectionId: router.slug,
            });
            
            console.log(report.data.data)

        } catch(err: any) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMarking();
    }, [refreshMarkings])

    return (
        <div className="bg-gray-200 text-lg text-gray-800 shadow-md py-8 px-6
        hover:shadow-lg hover:bg-gray-100">
            <div className="flex flex-col justify-start">
                <p>Name: {testData.name}</p>
                <p>Marking Deadline: {testData.markUploadDeadline}</p>
                {
                    markings && markings.length ? (
                        <>
                            <Link href={`/marking/${testData.id}`} className="bg-blue-500 text-center text-white px-4 py-2 rounded-lg mt-4"> See Marking Details </Link> 
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={generateSectionReport}>Generate Report</button>
                        </>
                    ) :(<>
                    {
                            downFile ? (
                                <a href="#" download={downFile} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Download Marking Sheet</a>
                            ) : (
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleFileDownload}>Get Marking Sheet</button>
                            )
                        }
                    
                    {/* Create File Upload Button */}

                    <form className="flex flex-col justify-start mt-4" onSubmit={handleFileFormSubmit}>
                        <input type="file" onChange={handleFileUpload}/>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Upload Marking Sheet</button>
                    </form>

                    </>)

                }
            </div>
        </div>
    )
} 