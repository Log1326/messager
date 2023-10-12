'use client'
import { Conversation, User } from '@prisma/client'
import { useOtherUser } from '@hooks/useOtherUser'
import { Fragment, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { Avatar } from '@/app/components'
import { ConfirmModal } from './ConfirmModal'

interface ProfileDrawerProps {
	data: Conversation & {
		users: User[]
	}
	isOpen: boolean
	onClose: () => void
}
export const ProfileDrawer: React.FC<ProfileDrawerProps> = props => {
	const { onClose, isOpen, data } = props
	const [isConfirmModal, setIsConfirmModal] = useState(false)
	const otherUser = useOtherUser(data)
	const joinedDate = useMemo(
		() => format(new Date(otherUser.createdAt), 'PP'),
		[otherUser.createdAt]
	)
	const title = useMemo(
		() => data.name || otherUser.name,
		[data.name, otherUser.name]
	)
	const statusText = useMemo(() => {
		if (data.isGroup) return `${data.users.length} members`
		return 'Active'
	}, [data.isGroup, data.users.length])
	return (
		<>
			<ConfirmModal
				isOpen={isConfirmModal}
				onClose={() => setIsConfirmModal(false)}
			/>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-500'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-500'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-40' />
					</Transition.Child>

					<div className='pointer-events-none fixed inset-y-0 right-0 ring-0 flex max-w-full pl-10'>
						<Transition.Child
							as={Fragment}
							enter='transform transition ease-in-out duration-500'
							enterFrom='translate-x-full'
							enterTo='translate-x-0'
							leave='transform transition ease-in-out duration-500'
							leaveTo='translate-x-full'
						>
							<Dialog.Panel>
								<div className='pointer-events-auto w-[400px] flex flex-col h-full overflow-y-auto bg-white py-6 px-4 sm:px-6 shadow-xl'>
									<div className='flex justify-end'>
										<div className='flex h-7 items-center'>
											<button
												onClick={onClose}
												className='rounded-md bg-white text-gray-400
										 hover:text-gray-500 focus:outline-none
											 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
											>
												<span className='sr-only'>
													Close
												</span>
												<IoClose size={24} />
											</button>
										</div>
									</div>
									<div className='relative mt-6 flex-1 px-4 sm:px-6'>
										<div className='flex flex-col items-center'>
											<Avatar
												user={otherUser}
												classes='mb-2'
											/>
											<h3 className='capitalize'>
												{title}
											</h3>
											<div className='text-sm text-gray-500'>
												{statusText}
											</div>
											<div className='flex gap-10 my-8'>
												<div
													onClick={() =>
														setIsConfirmModal(true)
													}
													className='flex flex-col gap-3 items-center cursor-pointer hover:opacity-75'
												>
													<div className='w-10 h-10 bg-neutral-100 rounded-full grid place-content-center'>
														<IoTrash size={20} />
													</div>
													<div className='text-sm font-light text-neutral-600'>
														Delete
													</div>
												</div>
											</div>
											<div className='w-full py-5 sm:p-0'>
												<dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
													{!data.isGroup && (
														<div>
															<dt className='text-sm  font-medium text-gray-500 sm:40 sm:flex-shrink-0'>
																Email
															</dt>
															<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
																{
																	otherUser.email
																}
															</dd>
														</div>
													)}
													{!data.isGroup && (
														<>
															<hr />
															<div>
																<dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
																	Joined
																</dt>
																<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
																	<time
																		dateTime={
																			joinedDate
																		}
																	>
																		{
																			joinedDate
																		}
																	</time>
																</dd>
															</div>
														</>
													)}
												</dl>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}
