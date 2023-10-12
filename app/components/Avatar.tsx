'use client'
import { User } from '@prisma/client'
import Image from 'next/image'
import clsx from 'clsx'

interface AvatarProps {
	user: User
	classes?: string
}
export const Avatar: React.FC<AvatarProps> = ({ user, classes }) => {
	return (
		<div className={clsx('relative', classes)}>
			<div
				className='relative inline-block rounded-full overflow-hidden
				 h-9 w-9 md:h-11 md:w-11'
			>
				<Image
					src={user?.image ?? '/images/placeholder.jpg'}
					alt={user?.name ?? 'image'}
					fill
				/>
			</div>
			<span
				className='absolute block rounded-full bg-green-500 ring-2
				ring-white top-0 right-0 h-2 w-2 md:w-3 md:h-3
				'
			></span>
		</div>
	)
}
