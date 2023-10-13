'use client'

import { FullMessageType } from '@/app/types'
import { useEffect, useRef, useState } from 'react'
import { useConversation } from '@/app/hooks'
import { MessageBox } from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@libs/pusher'
import { find } from 'lodash'

interface BodyProps {
	initialMessages: FullMessageType[]
}
export const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages)
	const bottomRef = useRef<HTMLDivElement>(null)
	const { conversationId } = useConversation()
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`)
	}, [conversationId])
	useEffect(() => {
		pusherClient.subscribe(conversationId)
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

		const handleMessages = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`)
			setMessages(prevMessage => {
				if (find(prevMessage, { id: message.id })) return prevMessage
				return [...prevMessage, message]
			})
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
		const handleUpdateMessage = (newMessage: FullMessageType) => {
			setMessages(prevMessages =>
				prevMessages.map(currentMessage => {
					if (currentMessage.id === newMessage.id) return newMessage
					return currentMessage
				})
			)
		}

		pusherClient.bind('messages:new', handleMessages)
		pusherClient.bind('message:update', handleUpdateMessage)

		return () => {
			pusherClient.unsubscribe(conversationId)
			pusherClient.unbind('messages:new', handleMessages)
			pusherClient.unbind('message:update', handleUpdateMessage)
		}
	}, [conversationId])
	return (
		<div className='flex-1 overflow-y-auto'>
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={bottomRef} className='pt-24' />
		</div>
	)
}
