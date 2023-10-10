import { IconType } from 'react-icons'

export interface DesktopDetails {
	label: string
	href: string
	icon: IconType
	active?: boolean
	onClick?: () => void
}
