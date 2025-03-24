import { appRouter } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });

export { handler as GET, handler as POST };
