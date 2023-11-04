import axios from "axios";


export const uploadFile = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(process.env.NEXT_PUBLIC_REST_API_URL+"/file", {"file": file}, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;

}

export const downloadFile = async (fileName: string) => {

    const response = await axios.get(process.env.NEXT_PUBLIC_REST_API_URL+`/file?fileName=${fileName}`
    , {
        responseType: "blob",
    }
    );

    return response.data;

}