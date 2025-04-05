import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TRPCProvider, client} from './trpc';
import {Test} from './Test';

function makeQueryClient() {
	return new QueryClient({
		/*
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
		*/
	});
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		browserQueryClient ??= makeQueryClient();
		return browserQueryClient;
	}
}

export const App = (): React.JSX.Element => {
	const queryClient = getQueryClient();
	// eslint-disable-next-line react/hook-use-state
	const [trpcClient] = useState(() => client);

	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
					<div className="app-container">
						<Test />
					</div>
				</TRPCProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
};
