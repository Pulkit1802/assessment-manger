export const FormInput = (
    {type, name, placeholder, value, onChange, required=false}: {
        type: string,
        name: string,
        placeholder: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        required?: boolean
    }
) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="outline-none py-2 px-6 border border-sky-600 rounded-xl focus:outline-none"
            required={required}
        />
    )
}