import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'

export const getConversations = async () => {
	const currentUser = await getCurrentUser()
	if (!currentUser?.id) return []
	try {
		return await prisma.conversation.findMany({
			orderBy: { lastMessageAt: 'desc' },
			where: { userIds: { has: currentUser.id } },
			include: {
				users: true,
				messages: { include: { sender: true, seen: true } }
			}
		})
	} catch (err) {
		console.log(err)
		return []
	}
}
