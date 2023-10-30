export const FormLabel = (
    {text, htmlFor}: {text: string, htmlFor: string}
) => {
    return (
        <label className="text-xl mr-4 text-gray-800" htmlFor={htmlFor}>
            {text}
        </label>
    )
}