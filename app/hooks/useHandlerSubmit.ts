import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface UseHandlerSubmitProps {
	defaultValues: object
	callback: (data: FieldValues) => void
}
export function useHandlerSubmit({
	defaultValues,
	callback
}: UseHandlerSubmitProps) {
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues
	})
	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)
		callback(data)
	}
	return {
		state: { register, errors, isLoading, watch },
		fn: { onSubmit, handleSubmit, setIsLoading, reset, setValue }
	}
}
