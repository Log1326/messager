import { NextResponse } from 'next/server'
import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { nextError } from '@libs/nextError'

type Params = {
	params: {
		conversationId?: string
	}
}
export async function POST(
	request: Request,
	{ params: { conversationId } }: Params
) {
	try {
		const currentUser = await getCurrentUser()
		if (!currentUser?.id || !currentUser?.email)
			nextError('Unauthorized', { status: 401 })
		const conversation = await prisma.conversation.findUnique({
			where: { id: conversationId },
			include: { messages: { include: { seen: true } }, users: true }
		})
		if (!conversation) nextError('Invalid ID', { status: 400 })
		const lastMessage = conversation?.messages.at(-1)
		if (!lastMessage) return NextResponse.json(conversation)
		const updatedMessage = await prisma.message.update({
			where: { id: lastMessage.id },
			include: { sender: true, seen: true },
			data: { seen: { connect: { id: currentUser?.id } } }
		})
		return NextResponse.json(updatedMessage)
	} catch (err) {
		console.log(err, 'ERROR_MESSAGE_SEEN')
		nextError('Internal Error', { status: 500 })
	}
}
