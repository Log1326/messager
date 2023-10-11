import { FullConversationType } from '@/app/types'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

export function useOtherUser(
	conversation: FullConversationType | { users: User[] }
) {
	const session = useSession()
	return useMemo(() => {
		const currentUserEmail = session.data?.user?.email
		return conversation.users.filter(
			user => user.email !== currentUserEmail
		)[0]
	}, [conversation.users, session.data?.user?.email])
}
