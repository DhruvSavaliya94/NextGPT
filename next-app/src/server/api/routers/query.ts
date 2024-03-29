import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const queryRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.findMany();
    }),

  create: publicProcedure
    .input(z.object({ content: z.string().min(1), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.query.create({
        data: {
          content: input.content,
          authorId: input.userId,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
