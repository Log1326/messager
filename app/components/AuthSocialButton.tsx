'use client'
import { IconType } from 'react-icons'
import Image from 'next/image'

interface AuthSocialButtonProps {
	icon?: IconType
	onClick?: () => void
	image?: string
}
export const AuthSocialButton: React.FC<AuthSocialButtonProps> = props => {
	const { onClick, icon: Icon, image } = props
	return (
		<button
			type='button'
			onClick={onClick}
			className='
			inline-flex w-full justify-center rounded-md
			 bg-white px-4 py-2 text-gray-500 shadow-md
			 ring-1 ring-inset ring-gray-300 hover:bg-gray-20
			  focus:outline-offset-0 '
		>
			{Icon && <Icon />}
			{image && (
				<Image
					src={image ?? ''}
					alt={'image' + image}
					width={40}
					height={40}
					className='h-[35px]'
				/>
			)}
		</button>
	)
}
