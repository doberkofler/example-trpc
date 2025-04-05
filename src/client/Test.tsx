import React, {useState, useRef} from 'react';
import {useTRPC, useQuery, useMutation} from './trpc.ts';
import {InvalidParameter} from './InvalidParameter.tsx';
import {ThrowError} from './ThrowError.tsx';
import {ThrowTRPCError} from './ThrowTRPCError.tsx';

export type errorType = 'invalidParameter' | 'throwError' | 'throwTRPCError';
const errors: {value: errorType; title: string}[] = [
	{value: 'invalidParameter', title: 'Invalid parameter'},
	{value: 'throwError', title: 'Throw error'},
	{value: 'throwTRPCError', title: 'Throw tRPC error'},
];

const Error = ({error}: {error: string}): React.JSX.Element | null => {
	switch (error as errorType) {
		case 'invalidParameter':
			return <InvalidParameter />;

		case 'throwError':
			return <ThrowError />;

		case 'throwTRPCError':
			return <ThrowTRPCError />;

		default:
			return null;
	}
};

export const Test = (): React.JSX.Element => {
	const [username, setUsername] = useState('');
	const [selection, setSelection] = useState('');
	const selectRef = useRef<HTMLSelectElement>(null);

	const trpc = useTRPC();
	const {data, error, refetch} = useQuery(trpc.getUsers.queryOptions());
	const {mutate} = useMutation(
		trpc.addUser.mutationOptions({
			onSuccess: async () => {
				await refetch();
			},
		}),
	);

	const handleAddUsers = () => {
		if (username.length > 0) {
			mutate(username);
			setUsername('');
		}
	};

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<div className="paper">
				<h3>List of users</h3>
				{data?.map((e, i) => <div key={i}>{e}</div>)}
			</div>
			<div className="paper">
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<button style={{marginLeft: 10}} onClick={() => handleAddUsers()}>
					Add user
				</button>
			</div>
			<div className="paper">
				<select ref={selectRef}>
					{errors.map((e) => (
						<option key={e.value} value={e.value}>
							{e.title}
						</option>
					))}
				</select>
				<button style={{marginLeft: 10}} onClick={() => setSelection(selectRef.current?.value ?? '')}>
					Simulate error
				</button>
				<Error error={selection} />
			</div>
		</div>
	);
};
