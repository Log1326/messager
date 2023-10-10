'use client'
import { SessionProvider } from 'next-auth/react'

interface AuthContextProps {
	children: React.ReactNode
}
export const AuthContext: React.FC<AuthContextProps> = ({
	children
}: AuthContextProps) => {
	return <SessionProvider>{children}</SessionProvider>
}
