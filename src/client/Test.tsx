import React, {useState} from 'react';
import {useTRPC, useQuery, useMutation} from './trpc.ts';

export const Test = (): React.JSX.Element => {
	const [user, setUser] = useState('');

	const trpc = useTRPC();
	const {data, error, refetch} = useQuery(trpc.getUsers.queryOptions());
	const {mutate} = useMutation(
		trpc.addUser.mutationOptions({
			onSuccess: async () => {
				// Refetch the query after successful mutation
				await refetch();
			},
		}),
	);

	const handleAddUsers = () => {
		mutate(user);

		// Clear the input field
		setUser('');
	};

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<h2>Users:</h2>
			<ul>{data?.map((e) => <li key={e}>{e}</li>)}</ul>
			<div>
				User name:
				<input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
				&nbsp;
				<button onClick={() => handleAddUsers()}>Add user</button>
			</div>
		</div>
	);
};
