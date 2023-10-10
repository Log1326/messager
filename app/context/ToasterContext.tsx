'use client'
import { Toaster } from 'react-hot-toast'

interface ToasterContextProps {}
export const ToasterContext: React.FC<ToasterContextProps> = props => {
	const {} = props
	return <Toaster />
}
