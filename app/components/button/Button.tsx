'use client'
import clsx from 'clsx'
import { AiOutlineLoading } from 'react-icons/ai'

type ButtonType = 'button' | 'submit' | 'reset' | undefined
interface ButtonProps {
	type?: ButtonType
	fullWidth?: boolean
	children: React.ReactNode
	onClick?: () => void
	secondary?: boolean
	danger?: boolean
	disabled?: boolean
	isLoading?: boolean
}
export const Button: React.FC<ButtonProps> = props => {
	const {
		danger = false,
		children,
		onClick,
		secondary = false,
		fullWidth = false,
		type = 'button',
		disabled = false,
		isLoading = false
	} = props
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={clsx(
				`
			flex justify-center rounded-md gap-2
			px-3 py-2 test-sm font-semibold 
			focus-visible:outline
			focus-visible:outline-2
			focus-visible:outline-offset-2
			`,
				disabled && 'opacity-50 cursor-default',
				fullWidth && 'w-full',
				secondary ? 'text-gray-900' : 'text-white',
				danger &&
					'bg-rose-500 hover:bg-rose-600 focus-visible:outline-red-600',
				!secondary &&
					!danger &&
					'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
			)}
		>
			{children}
			{isLoading && <AiOutlineLoading className='h-6 w-6 animate-spin' />}
		</button>
	)
}
