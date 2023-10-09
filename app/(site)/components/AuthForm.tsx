'use client'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AuthSocialButton, Button, Input } from '@/app/components'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'
type VariantIcon = 'google' | 'github'
export const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>('LOGIN')
	const [isLoading, setIsLoading] = useState(false)
	const REGISTER = variant === 'REGISTER'

	const toggleVariant = useCallback(
		() => (REGISTER ? setVariant('LOGIN') : setVariant('REGISTER')),
		[variant]
	)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})
	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)
		if (REGISTER) {
			//axios Register
		}
		//Next auth
	}
	const socialAction = (action: VariantIcon) => {
		setIsLoading(true)
	}
	return (
		<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
			<div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
				<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					{REGISTER && (
						<Input
							id='name'
							label='Name'
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id='email'
						label='Email'
						register={register}
						errors={errors}
						type='email'
						disabled={isLoading}
					/>
					<Input
						id='password'
						label='Passord'
						type='password'
						disabled={isLoading}
						register={register}
						errors={errors}
					/>
					<Button disabled={isLoading} fullWidth type='submit'>
						{REGISTER ? 'Register' : 'Sign in'}
					</Button>
				</form>
				<div className='mt-6'>
					<div className='relative'>
						<div className='absolute inset-0 flex  items-center'>
							<span className='w-full border-t border-gray-300' />
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='bg-white px-2 text-gray-500'>
								Or continue with
							</span>
						</div>
					</div>
					<div className='mt-6 flex gap-2'>
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction('github')}
						/>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction('google')}
						/>
					</div>
				</div>
				<div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
					<div>
						{REGISTER
							? 'Already have an account'
							: 'New to Messenger'}
					</div>
					<div
						onClick={toggleVariant}
						className='underline cursor-pointer'
					>
						{REGISTER ? 'Login' : 'Create new account'}
					</div>
				</div>
			</div>
		</div>
	)
}
