import axios from "axios";


export const uploadFile = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/file", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;

}

export const downloadFile = async (fileName: string) => {

    const response = await axios.get(`/api/file?fileName=${fileName}`, {
        responseType: "blob",
    });

    return response.data;

}