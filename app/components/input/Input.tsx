'use client'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'

type InputType = 'email' | 'password' | 'text'
interface InputProps {
	label: string
	id: string
	type?: InputType
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	disabled?: boolean
}
export const Input: React.FC<InputProps> = props => {
	const {
		disabled = false,
		errors,
		label,
		register,
		required = false,
		id,
		type = 'text'
	} = props
	return (
		<div>
			<label
				className='block text-sm font-medium leading-6 text-gray-900'
				htmlFor={id}
			>
				{label}
			</label>
			<div className='mt-2'>
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						`
					form-input block w-full rounded-md
					border-0 py-1.5 text-gray-900 shadow-md
					ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
					focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
					`,
						errors[id] && 'focus:ring-red-500',
						disabled && 'opacity-50 cursor-default'
					)}
				/>
			</div>
		</div>
	)
}
