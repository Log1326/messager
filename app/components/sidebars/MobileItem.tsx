'use client'
import { DesktopDetails } from '@interface/desktop'
import Link from 'next/link'
import clsx from 'clsx'

interface MobileItemProps {}
export const MobileItem: React.FC<DesktopDetails> = props => {
	const { label, onClick, href, icon: Icon, active } = props
	const handleClick = () => onClick?.()

	return (
		<Link
			onClick={handleClick}
			href={href}
			className={clsx(
				`
		group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center
		p-4  text-gray-500 hover:text-black hover:bg-gray-400
		`,
				active && 'bg-gray-100 text-black'
			)}
		>
			<Icon className='h-6 w-6 ' />
		</Link>
	)
}
