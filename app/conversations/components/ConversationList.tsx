'use client'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useConversation } from '@/app/hooks'
import { FullConversationType } from '@/app/types'
import { ConversationBox } from './ConversationBox'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { GroupChatModal } from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@libs/pusher'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'
import { EnumRouters } from '@/app/routes'

interface ConversationListProps {
	initialItems: FullConversationType[]
	users: User[]
}
export const ConversationList: React.FC<ConversationListProps> = ({
	initialItems,
	users
}) => {
	const [items, setItems] = useState(initialItems)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const router = useRouter()
	const session = useSession()
	const { conversationId, isOpen } = useConversation()
	const pusherKey = useMemo(
		() => session.data?.user?.email,
		[session.data?.user?.email]
	)
	useEffect(() => {
		if (!pusherKey) return
		pusherClient.subscribe(pusherKey)
		const handleConversation = (conversation: FullConversationType) => {
			setItems(prevItems => {
				if (find(prevItems, { id: conversationId })) return prevItems
				return [conversation, ...prevItems]
			})
		}
		const handleUpdateConversation = (
			updateConversation: FullConversationType
		) =>
			setItems(prevItems =>
				prevItems.map(currentConversation => {
					if (currentConversation.id === updateConversation.id)
						return {
							...currentConversation,
							messages: updateConversation.messages
						}
					return currentConversation
				})
			)
		const handleRemoveConversation = (
			removeConversation: FullConversationType
		) => {
			setItems(prevItems => [
				...prevItems.filter(
					currentConversation =>
						currentConversation.id !== removeConversation.id
				)
			])
			router.push(EnumRouters.CONVERSATIONS)
		}
		pusherClient.bind('conversation:new', handleConversation)
		pusherClient.bind('conversation:update', handleUpdateConversation)
		pusherClient.bind('conversation:remove', handleRemoveConversation)
		return () => {
			pusherClient.unsubscribe(pusherKey)
			pusherClient.unbind('conversation:new', handleConversation)
			pusherClient.unbind('conversation:update', handleUpdateConversation)
			pusherClient.unbind('conversation:remove', handleRemoveConversation)
		}
	}, [conversationId, pusherKey, router])
	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<aside
				className={clsx(
					`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80
			lg:block overflow-y-auto border-r border-gray-200
			`,
					isOpen ? 'hidden' : 'block w-full left-0'
				)}
			>
				<div className='px-5'>
					<div className='flex justify-between mb-4 pt-4'>
						<div className='text-2xl font-bold text-neutral-800'>
							Messages
						</div>
						<div
							onClick={() => setIsModalOpen(true)}
							className='rounded-full p-2 bg-gray-100 text-gray-600
					cursor-pointer hover:opacity-75 transition'
						>
							<MdOutlineGroupAdd size={20} />
						</div>
					</div>
					{items.map(item => (
						<ConversationBox
							key={item.id}
							data={item}
							selected={conversationId === item.id}
						/>
					))}
				</div>
			</aside>
		</>
	)
}
