import { prisma } from "@/prisma/prsima";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query((opts) => {
    console.log(opts.ctx, "hello procedure query");
    return {
      msg: "hello world",
    };
  }),
  userList: publicProcedure.query(async (opts) => {
    const users = prisma.user.findMany();
    return users;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
