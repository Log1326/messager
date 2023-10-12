import { nextError } from '@libs/nextError'
import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server'

type Params = {
	params: {
		conversationId?: string
	}
}
export async function DELETE(
	request: Request,
	{ params: { conversationId } }: Params
) {
	try {
		const currentUser = await getCurrentUser()
		if (!currentUser?.id) nextError('Unauthorized', { status: 401 })
		const existingConversation = await prisma.conversation.findUnique({
			where: { id: conversationId },
			include: { users: true }
		})
		if (!existingConversation) nextError('Invalid ID', { status: 400 })
		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: { hasSome: [String(currentUser?.id)] }
			}
		})
		return NextResponse.json(deletedConversation)
	} catch (err) {
		console.log(err, 'ERROR_MESSAGE_DELETE_CONVERSATION')
		nextError('Internal Error', { status: 500 })
	}
}
