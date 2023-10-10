import Sidebar from '@components/sidebars/Sidebar'
import getUsers from '@actions/getUsers'
import { UserList } from '@users/components/UserList'

export default async function userLayout({
	children
}: {
	children: React.ReactNode
}) {
	const users = await getUsers()
	return (
		<Sidebar>
			<div className='h-full'>
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	)
}
