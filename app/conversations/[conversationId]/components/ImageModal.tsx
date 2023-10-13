'use client'
import { Modal } from '@components/Modal'
import Image from 'next/image'

interface ImageModalProps {
	src: string | null
	isOpen: boolean
	onClose: () => void
}
export const ImageModal: React.FC<ImageModalProps> = props => {
	const { src, isOpen, onClose } = props
	if (!src) return null

	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className='w-80 h-80'>
				<Image
					src={src}
					alt='ImageModal'
					fill
					className='object-cover'
				/>
			</div>
		</Modal>
	)
}
