import prisma from '@libs/prismadb'

export const getMessages = async (conversationId: string) => {
	try {
		return await prisma.message.findMany({
			where: { conversationId },
			include: { sender: true, seen: true },
			orderBy: { createdAt: 'asc' }
		})
	} catch (err) {
		return []
	}
}
