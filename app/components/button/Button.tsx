'use client'
import clsx from 'clsx'

type ButtonType = 'button' | 'submit' | 'reset' | undefined
interface ButtonProps {
	type?: ButtonType
	fullWidth?: boolean
	children: React.ReactNode
	onClick?: () => void
	secondary?: boolean
	danger?: boolean
	disabled?: boolean
}
export const Button: React.FC<ButtonProps> = props => {
	const {
		danger = false,
		children,
		onClick,
		secondary = false,
		fullWidth = false,
		type = 'button',
		disabled = false
	} = props
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={clsx(
				`
			flex justify-center rounded-md
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
		</button>
	)
}
