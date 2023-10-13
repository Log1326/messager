import { NextResponse } from 'next/server'
import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { nextError } from '@libs/nextError'
import { pusherServer } from '@libs/pusher'

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser()
		const { message, image, conversationId } = await request.json()
		if (!currentUser?.id || !currentUser?.email)
			nextError('Unauthorized', { status: 401 })
		const newMessage = await prisma.message.create({
			data: {
				body: message,
				image,
				conversation: { connect: { id: conversationId } },
				sender: { connect: { id: currentUser?.id } },
				seen: { connect: { id: currentUser?.id } }
			},
			include: { seen: true, sender: true }
		})
		const updatedConversation = await prisma.conversation.update({
			where: { id: conversationId },
			data: {
				lastMessageAt: new Date(),
				messages: { connect: { id: newMessage.id } }
			},
			include: { users: true, messages: { include: { seen: true } } }
		})
		await pusherServer.trigger(conversationId, 'messages:new', newMessage)
		const lastMessage = updatedConversation.messages.at(-1)
		updatedConversation.users.map(user =>
			pusherServer.trigger(String(user?.email), 'conversation:update', {
				id: conversationId,
				messages: [lastMessage]
			})
		)
		return NextResponse.json(newMessage)
	} catch (err) {
		console.log(err, 'ERROR_MESSAGES')
		nextError('Internal Error', { status: 500 })
	}
}
