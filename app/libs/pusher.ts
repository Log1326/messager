import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
	appId: String(process.env.PUSHER_APP_ID),
	key: String(process.env.NEXT_PUBLIC_PUSHER_APP_KEY),
	secret: String(process.env.PUSHER_SECRET),
	cluster: 'eu',
	useTLS: true
})
export const pusherClient = new PusherClient(
	String(process.env.NEXT_PUBLIC_PUSHER_APP_KEY),
	{
		channelAuthorization: {
			endpoint: '/api/pusher/auth',
			transport: 'ajax'
		},
		cluster: 'eu'
	}
)
