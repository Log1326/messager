'use client'
import { useRouter } from 'next/navigation'
import { useConversation } from '@/app/hooks'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { EnumRouters } from '@/app/routes'
import toast from 'react-hot-toast'
import { Modal } from '@components/Modal'
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from '@headlessui/react'
import { Button } from '@components/button/Button'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
}
export const ConfirmModal: React.FC<ConfirmModalProps> = props => {
	const { isOpen, onClose } = props
	const router = useRouter()
	const { conversationId } = useConversation()
	const [isLoading, setIsLoading] = useState(false)
	const onDelete = useCallback(() => {
		setIsLoading(true)
		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose()
				router.push(EnumRouters.CONVERSATIONS)
			})
			.catch(err => toast.error(err))
			.finally(() => setIsLoading(false))
	}, [conversationId, onClose, router])
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className='sm:flex sm:items-start'>
				<div
					className='mx-auto flex h-12 w-12 flex-shrink-0 items-center
				rounded-full bg-red-100 sm:mx- sm:h-10 sm:w-10 justify-center'
				>
					<FiAlertTriangle size={20} className='text-red-600' />
				</div>
				<div className='mt-3 text-center sm:ml-4 sm:mt-4 sm:text-left'>
					<Dialog.Title
						as='h3'
						className='text-base font-semibold leading-6 text-gray-600'
					>
						Delete conversation
					</Dialog.Title>
					<div className='mt-2'>
						<p className='text-sm text-gray-500'>
							are you sure you want to delete this conversation?
							This action cannot be undone
						</p>
					</div>
				</div>
			</div>
			<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				<Button
					isLoading={isLoading}
					onClick={onDelete}
					disabled={isLoading}
					danger
				>
					Delete
				</Button>
				<Button onClick={onClose} disabled={isLoading} secondary>
					Cancel
				</Button>
			</div>
		</Modal>
	)
}
