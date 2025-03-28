import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router";

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc'
    })
  ]
})