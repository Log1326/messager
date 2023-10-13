import { getConversationById } from '@actions/getConversationById'
import { getMessages } from '@actions/getMessages'
import { getCurrentUser } from '@actions/getCurrentUser'
import { Header } from '@/app/conversations/[conversationId]/components/Header'
import { Body } from '@/app/conversations/[conversationId]/components/Body'
import { Form } from '@/app/conversations/[conversationId]/components/Form'
import { EmptyState } from '@components/EmptyState'

type Params = {
	params: {
		conversationId: string
	}
}
export async function generateMetadata() {
	const user = await getCurrentUser()
	if (!user?.name) {
		return {
			title: 'User not found here'
		}
	}
	return {
		title: user.name,
		icons: user.image ?? '/images/user.png',
		description: 'This is the page of' + user.name
	}
}
export default async function ConversationId({
	params: { conversationId }
}: Params) {
	const conversation = await getConversationById(conversationId)
	const messages = await getMessages(conversationId)
	if (!conversation)
		return (
			<div className='lg:pl-80 h-full'>
				<div className='h-full flex flex-col'>
					<EmptyState />
				</div>
			</div>
		)
	return (
		<div className='lg:pl-80 h-full'>
			<div className='h-full flex flex-col'>
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	)
}
