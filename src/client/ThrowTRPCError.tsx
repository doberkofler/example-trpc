import React from 'react';
import {useTRPC, useQuery} from './trpc.ts';
import {ErrorDisplay} from './ErrorDisplay';

export const ThrowTRPCError = (): React.JSX.Element | null => {
	const trpc = useTRPC();
	const {error, data} = useQuery(trpc.throwTRPCError.queryOptions());

	if (error) {
		return <ErrorDisplay error={error} />;
	}

	return data ? (
		<div className="block">
			<pre>{JSON.stringify(data, null, ' ')}</pre>
		</div>
	) : null;
};
