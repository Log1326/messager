import { nextError } from '@libs/nextError'
import { getCurrentUser } from '@actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser()
		const { name, image } = await request.json()
		if (!currentUser?.id) nextError('Unauthorized', { status: 401 })
		const updateUser = await prisma.user.update({
			where: { id: currentUser?.id },
			data: { image, name }
		})
		return NextResponse.json(updateUser)
	} catch (err) {
		console.log(err, 'ERROR_SETTINGS')
		nextError('Internal Error', { status: 500 })
	}
}
