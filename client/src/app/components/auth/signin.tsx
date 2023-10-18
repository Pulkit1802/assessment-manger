"use client"

import { useState } from 'react';
import { loginFields } from './formFields';
import Input from './input';
import FormAction from './formAction';

const fields = loginFields;
const fieldsState: any = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
	const [loginState, setLoginState] = useState(fieldsState);

	const handleChange = (e:any) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

  const handleSubmit=(e: any)=>{
    e.preventDefault();
    authenticateUser();
}

//Handle Login API Integration here
// eslint-disable-next-line @typescript-eslint/no-empty-function
const authenticateUser = () =>{

}

	return (
		<form className="space-y-6">
			<div className="-space-y-px">
				{fields.map((field) => (
					<Input
						key={field.id}
						handleChange={handleChange}
						value={loginState[field.id]}
						labelText={field.labelText}
						labelFor={field.labelFor}
						id={field.id}
						name={field.name}
						type={field.type}
						isRequired={field.isRequired}
						placeholder={field.placeholder}
						customClass={undefined}
					/>
				))}
			</div>
      <FormAction handleSubmit={handleSubmit} text="Login"/>
		</form>
	);
}
