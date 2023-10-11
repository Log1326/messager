import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'

export const getConversationById = async (conversationId: string) => {
	try {
		const currentUser = await getCurrentUser()
		if (!currentUser?.email) return null
		return await prisma.conversation.findUnique({
			where: { id: conversationId },
			include: { users: true }
		})
	} catch (err) {
		return null
	}
}
