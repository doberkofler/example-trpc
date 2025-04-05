import {router, createContext} from './trpc.ts';
import * as trpcExpress from '@trpc/server/adapters/express';
import {type Database} from './database.ts';
import {getUsers, addUser, invalidParameter, throwError, throwTRPCError} from './route.ts';

export const appRouter = router({
	getUsers,
	addUser,
	invalidParameter,
	throwError,
	throwTRPCError,
});

export type AppRouter = typeof appRouter;

export const trpcExpressMiddleware = (database: Database) =>
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: (opts) => createContext(opts, database),
	});
