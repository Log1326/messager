'use client'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { EnumRouters } from '@routes/index'
import { Avatar } from '@components/Avatar'

interface UserBoxProps {
	data: User
}
export const UserBox: React.FC<UserBoxProps> = ({ data }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const handleClick = useCallback(() => {
		setIsLoading(true)
		axios
			.post('/api/conversations', { userId: data.id })
			.then(data => {
				router.push(`${EnumRouters.CONVERSATION}/${data.data.id}`)
			})
			.finally(() => setIsLoading(false))
	}, [data.id, router])
	return (
		<div
			onClick={handleClick}
			className='w-full relative flex items-center space-x-3 bg-white p-3
			 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
		>
			<Avatar user={data} />
			<div className='min-w-0 flex-1'>
				<div className='focus:outline-none'>
					<div className='flex justify-between items-center mb-1'>
						<p className='text-sm font-medium text-gray-900'>
							{data.name}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
