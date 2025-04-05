import {publicProcedure, TRPCError} from './trpc.ts';
import {z} from 'zod';

export const getUsers = publicProcedure.query((opts) => {
	const {ctx} = opts;

	return ctx.database.get();
});

export const addUser = publicProcedure.input(z.string()).mutation((opts) => {
	const {input, ctx} = opts;

	ctx.database.add(input);
});

export const invalidParameter = publicProcedure.input(z.string()).query(() => '');

export const throwError = publicProcedure.query(() => {
	throw new Error('throwError');
});

export const throwTRPCError = publicProcedure.query(() => {
	throw new TRPCError({
		code: 'INTERNAL_SERVER_ERROR',
		message: 'An unexpected error occurred, please try again later.',
		cause: new Error('cause'),
	});
});
