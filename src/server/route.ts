import {publicProcedure} from './trpc.ts';
import {z} from 'zod';

export const getUsers = publicProcedure.query((opts) => {
	const {ctx} = opts;

	return ctx.database.get();
});

export const addUser = publicProcedure.input(z.string()).mutation((opts) => {
	const {input, ctx} = opts;

	ctx.database.add(input);
});
