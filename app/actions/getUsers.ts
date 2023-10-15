import prisma from '@libs/prismadb'
import { getSession } from '@actions/getSession'

export default async function getUsers() {
	const session = await getSession()
	if (!session?.user?.email) return []
	try {
		const users = await prisma?.user.findMany({
			orderBy: { createdAt: 'asc' },
			where: {
				NOT: { email: session.user.email }
			}
		})
		if (!users) return []
		return users
	} catch (err) {
		console.log(err)
		return []
	}
}
