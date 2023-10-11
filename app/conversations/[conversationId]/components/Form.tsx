'use client'
import axios from 'axios'
import { useConversation } from '@/app/hooks'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhone } from 'react-icons/hi2'
import { MessageInput } from './MessageInput'

export const Form = () => {
	const { conversationId } = useConversation()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: { message: '' }
	})
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		setValue('message', '', { shouldValidate: true })
		await axios.post('/api/messages', {
			...data,
			conversationId
		})
	}
	return (
		<div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
			<HiPhone size={30} className='text-sky-500' />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex items-center gap-2 lg:gap-4 w-full'
			>
				<MessageInput
					id='message'
					register={register}
					errors={errors}
					required
					placeholder='Write a message'
				/>
				<button
					type='submit'
					className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
				>
					<HiPaperAirplane size={19} className='text-white' />
				</button>
			</form>
		</div>
	)
}
