import { Metadata } from 'next'

import Sidebar from '@components/sidebars/Sidebar'
import getUsers from '@actions/getUsers'
import { getConversations } from '@actions/getConversations'
import { ConversationList } from './components/ConversationList'

export const metadata: Metadata = {
	title: 'Conversation',
	description: 'clone',
	icons: '/images/logo.png'
}
export default async function conversationLayout({
	children
}: {
	children: React.ReactNode
}) {
	const conversations = await getConversations()
	const users = await getUsers()
	return (
		<Sidebar>
			<div className='h-full'>
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	)
}
