import {initTRPC, TRPCError} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson';
import {type Database} from './database.ts';

export {TRPCError};

export const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions, database: Database) => ({
	req,
	res,
	database,
});
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({transformer: superjson});

export const router = t.router;
export const publicProcedure = t.procedure;
