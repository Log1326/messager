'use client'
import { Conversation, User } from '@prisma/client'
import { useOtherUser } from '@hooks/useOtherUser'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { EnumRouters } from '@/app/routes'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import { ProfileDrawer } from './ProfileDrawer'
import { AvatarGroup } from '@components/avatar/AvatarGroup'
import { Avatar } from '@components/avatar/Avatar'
import { useActiveList } from '@/app/hooks'

interface HeaderProps {
	conversation: Conversation & {
		users: User[]
	}
}
export const Header: React.FC<HeaderProps> = ({ conversation }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
	const otherUser = useOtherUser(conversation)
	const { members } = useActiveList()
	const isActive = members.indexOf(String(otherUser.email)) !== -1
	const statusText = useMemo(() => {
		if (conversation.isGroup) return `${conversation.users.length} members`
		return isActive ? 'Active' : 'Offline'
	}, [conversation.isGroup, conversation.users.length, isActive])
	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			/>
			<div
				className={`bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4
 lg:px-6 justify-between items-center shadow-sm`}
			>
				<div className='flex gap-3 items-center'>
					<Link
						href={EnumRouters.CONVERSATIONS}
						className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
					>
						<HiChevronLeft size={32} />
					</Link>
					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}
					<div className='flex flex-col'>
						<div>{conversation.name || otherUser.name}</div>
						<div className='text-sm font-light text-neutral-500'>
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={32}
					onClick={() => setIsDrawerOpen(true)}
					className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
				/>
			</div>
		</>
	)
}
