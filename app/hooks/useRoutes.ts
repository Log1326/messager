import { usePathname } from 'next/navigation'
import { useConversation } from '@hooks/index'
import { useMemo } from 'react'
import { EnumRouters } from '@routes/index'
import { HiChat, HiUser } from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { DesktopDetails } from '@interface/desktop'
import { signOut } from 'next-auth/react'

export function useRoutes() {
	const pathname = usePathname()
	const { conversationId } = useConversation()
	return useMemo<DesktopDetails[]>(
		() => [
			{
				label: 'Chat',
				href: EnumRouters.CONVERSATIONS,
				icon: HiChat,
				active:
					pathname !== EnumRouters.CONVERSATIONS || !!conversationId
			},
			{
				label: 'Users',
				href: EnumRouters.USERS,
				icon: HiUser,
				active: pathname !== EnumRouters.USERS
			},
			{
				label: 'Logout',
				href: EnumRouters.LOGOUT,
				icon: HiArrowLeftOnRectangle,
				onClick: signOut
			}
		],
		[conversationId, pathname]
	)
}
