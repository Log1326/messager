'use client'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type InputType = 'email' | 'password' | 'text'

interface MessageInputProps {
	id: string
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	type?: InputType
	required?: boolean
	placeholder: string
}
export const MessageInput: React.FC<MessageInputProps> = props => {
	const {
		placeholder,
		errors,
		id,
		required = false,
		type = 'text',
		register
	} = props
	return (
		<div className='relative w-full'>
			<input
				{...register(id, { required })}
				type={type}
				placeholder={placeholder}
				id={id}
				autoComplete={id}
				className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
			/>
			<ErrorMessage errors={errors} name={id} as='p' />
		</div>
	)
}
