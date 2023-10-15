'use client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { signIn, SignInResponse, useSession } from 'next-auth/react'
import { EnumRouters } from '@/app/routes'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'
import { AuthSocialButton } from '@components/AuthSocialButton'
import { useHandlerSubmit } from '@hooks/useHandlerSubmit'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FieldValues } from 'react-hook-form'

type Variant = 'LOGIN' | 'REGISTER'
export const AuthForm = () => {
	const session = useSession()
	const router = useRouter()
	const [variant, setVariant] = useState<Variant>('LOGIN')
	const REGISTER = variant === 'REGISTER'
	const callback = (data: FieldValues) => {
		if (REGISTER) {
			axios
				.post('/api/register', data)
				.then(() => {
					signIn('credentials', { ...data, redirect: false }).then(
						thenFn
					)
				})
				.catch(() => toast.error('Something went wrong'))
				.finally(finallyFn)
			return
		}
		signIn('credentials', { ...data, redirect: false })
			.then(thenFn)
			.finally(finallyFn)
	}
	const {
		fn: { onSubmit, handleSubmit, setIsLoading, reset },
		state: { register, errors, isLoading }
	} = useHandlerSubmit({
		defaultValues: { name: '', email: '', password: '' },
		callback
	})
	const finallyFn = useCallback(() => {
		setIsLoading(false)
		reset()
	}, [reset, setIsLoading])
	const thenFn = useCallback(
		(callback: SignInResponse | undefined) => {
			if (callback?.error && !callback?.ok)
				toast.error('Invalid credentials')

			if (callback?.ok && !callback.error) {
				toast.success('Logged in!')
				router.push(EnumRouters.USERS)
			}
		},
		[router]
	)
	const socialAction = (action: string) => () => {
		setIsLoading(true)
		signIn(action, { redirect: false }).then(thenFn).finally(finallyFn)
	}
	const toggleVariant = useCallback(
		() => (REGISTER ? setVariant('LOGIN') : setVariant('REGISTER')),
		[REGISTER]
	)
	useEffect(() => {
		if (session.status === 'authenticated') router.push(EnumRouters.USERS)
	}, [router, session.status])
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
						label='Password'
						type='password'
						disabled={isLoading}
						register={register}
						errors={errors}
					/>
					<Button
						isLoading={isLoading}
						disabled={isLoading}
						fullWidth
						type='submit'
					>
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
					<div className='mt-6 flex items-center gap-2'>
						<AuthSocialButton
							image='/images/github.png'
							onClick={socialAction('github')}
						/>
						<AuthSocialButton
							image='/images/google.jpg'
							onClick={socialAction('google')}
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
