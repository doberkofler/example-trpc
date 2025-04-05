import React from 'react';
import {useTRPC, useQuery} from './trpc.ts';
import {ErrorDisplay} from './ErrorDisplay';

export const InvalidParameter = (): React.JSX.Element | null => {
	const trpc = useTRPC();
	const {error, data} = useQuery(trpc.invalidParameter.queryOptions(0 as unknown as string));

	if (error) {
		return <ErrorDisplay error={error} />;
	}

	return data ? (
		<div className="block">
			<pre>{JSON.stringify(data, null, ' ')}</pre>
		</div>
	) : null;
};
