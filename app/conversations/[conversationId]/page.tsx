import { getConversationById } from '@actions/getConversationById'
import { getMessages } from '@actions/getMessages'
import { EmptyState } from '@/app/components'
import { Body, Form, Header } from './components/index'

interface Params {
	conversationId: string
}
export default async function ConversationId({
	params: { conversationId }
}: {
	params: Params
}) {
	const conversation = await getConversationById(conversationId)
	const message = await getMessages(conversationId)
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
				<Body />
				<Form />
			</div>
		</div>
	)
}
