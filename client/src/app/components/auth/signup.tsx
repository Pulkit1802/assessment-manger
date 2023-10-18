'use client';

import { useState } from 'react';
import { signupFields } from './formFields';
import FormAction from './formAction';
import Input from './input';

const fields = signupFields;
const fieldsState: any = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
	const [signupState, setSignupState] = useState(fieldsState);

	const handleChange = (e: any) =>
		setSignupState({ ...signupState, [e.target.id]: e.target.value });

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(signupState);
		createAccount();
	};

	//handle Signup API Integration here
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const createAccount = () => {};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div className="">
				{fields.map((field) => (
					<Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder} customClass={undefined}					/>
				))}
				<FormAction handleSubmit={handleSubmit} text="Signup" />
			</div>
		</form>
	);
}
