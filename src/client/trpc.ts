import {createTRPCContext} from '@trpc/tanstack-react-query';
import {createTRPCClient, httpBatchLink} from '@trpc/client';
import type {AppRouter} from '../server/router';
import superjson from 'superjson';
export {useQuery, useMutation} from '@tanstack/react-query';

export type {AppRouter};

export const {TRPCProvider, useTRPC, useTRPCClient} = createTRPCContext<AppRouter>();

export const client = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: '/api',
			transformer: superjson,
		}),
	],
});
