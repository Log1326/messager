'use client'
import { useActiveChannel } from '@/app/hooks'

export const ActiveStatus = () => {
	useActiveChannel()
	return null
}
