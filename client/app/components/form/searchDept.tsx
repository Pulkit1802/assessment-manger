import {useState} from "react"
import { FormInput } from "./input"

export const SearchDept = () => {

    const [name, setName] = useState("")

    return (
        <form className="flex space-x-2">
            <input
                type="text"
                placeholder="Search for a department"

            >

            </input>
            <button type="submit">

            </button>
        </form>
    )
}