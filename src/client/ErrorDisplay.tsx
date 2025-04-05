import React from 'react';
import {TRPCClientError} from './trpc.ts';

const ErrorLine = ({name, value}: {name: string; value: string}): React.JSX.Element | null =>
	value.length > 0 ? (
		<div className="error-line">
			<span className="error-name">{name}</span>
			<span className="error-value">{value}</span>
		</div>
	) : null;

export const ErrorDisplay = ({error}: {error: unknown}): React.JSX.Element => {
	const result = {
		type: '',
		message: '',
		stack: '',
	};

	if (error instanceof TRPCClientError) {
		result.type = 'TRPCClientError';
		result.message = error.message;
		result.stack = error.stack ?? '';
	} else if (error instanceof Error) {
		result.type = 'Error';
		result.message = error.message;
		result.stack = error.stack ?? '';
	} else if (typeof error === 'string') {
		result.type = 'string';
		result.message = error;
	} else {
		result.type = 'object';
		try {
			result.message = JSON.stringify(error);
		} catch (e) {
			result.message = 'Unable to stringify error';
		}
	}

	return (
		<div className="block">
			<ErrorLine name="Type" value={result.type} />
			<ErrorLine name="Message" value={result.message} />
			<ErrorLine name="Stack" value={result.stack} />
		</div>
	);
};
