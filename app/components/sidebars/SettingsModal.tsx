'use client'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Modal } from '@components/Modal'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import { Button } from '@components/button/Button'
import { Input } from '@components/input/Input'
import { useHandlerSubmit } from '@hooks/useHandlerSubmit'

interface SettingsModalProps {
	currentUser: User
	isOpen: boolean
	onClose: () => void
}
export const SettingsModal: React.FC<SettingsModalProps> = props => {
	const { onClose, isOpen, currentUser } = props
	const router = useRouter()
	const callback = (data: FieldValues) => {
		axios
			.post(`/api/settings`, data)
			.then(() => {
				router.refresh()
				onClose()
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => fn.setIsLoading(false))
	}
	const { fn, state } = useHandlerSubmit({
		defaultValues: { name: currentUser.name, image: currentUser.image },
		callback
	})
	const image = state.watch('image')
	const handleUpload = (result: any) =>
		fn.setValue('image', result.info?.secure_url, { shouldValidate: true })

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={fn.handleSubmit(fn.onSubmit)}>
				<div className='space-y-12 w-[350px]'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Profile
						</h2>
						<p className='mt-1 test-sm  leading-6 text-gray-600'>
							Edit your public information
						</p>
						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								register={state.register}
								errors={state.errors}
								label='Name'
								id='name'
								disabled={state.isLoading}
							/>
							<div>
								<label className='block test-sm font-medium leading-6 text-gray-900'>
									Photo
								</label>
								<div className='mt-2 flex items-center gap-x-3'>
									<Image
										src={
											image ||
											currentUser?.image ||
											'/images/placeholder.jpg'
										}
										alt='Avatar'
										width={48}
										height={48}
										className='rounded-full'
									/>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset='oqufbyrh'
									>
										<Button
											disabled={state.isLoading}
											isLoading={state.isLoading}
											secondary
											type='button'
										>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Button
							disabled={state.isLoading}
							secondary
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button disabled={state.isLoading} type='submit'>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	)
}
