import {router, createContext} from './trpc.ts';
import * as trpcExpress from '@trpc/server/adapters/express';
import {type Database} from './database.ts';
import {getUsers, addUser} from './route.ts';

export const appRouter = router({
	getUsers,
	addUser,
});

export type AppRouter = typeof appRouter;

export const trpcExpressMiddleware = (database: Database) =>
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: (opts) => createContext(opts, database),
	});
