import { MobileFooter } from './MobileFooter'
import { getCurrentUser } from '@actions/getCurrentUser'
import { DesktopSidebar } from '@components/sidebars/DesktopSidebar'

export async function Sidebar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()
	return (
		<div className='h-full'>
			<DesktopSidebar currentUser={currentUser!} />
			<MobileFooter />
			<main className='lg:pl-20 h-full'>{children}</main>
		</div>
	)
}
