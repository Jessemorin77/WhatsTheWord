
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
           description: z.string(),
           eventType: z.string(),
           imageUrl: z.string(),
           location: z.string(),
           school: z.string(),
           time: z.string(),
           title: z.string()
        }))
        .mutation(async ({ctx, input}) => {
          return ctx.db.event.create({
            data: {
              description: input.description,
              school: input.school,
            eventType: input.eventType,
              location: input.location,
              time: input.time,
              title: input.title,
              image: input.imageUrl,
              hostId: ctx.session.user.id,
            }
          })
        }),
        getall: protectedProcedure.query(({ctx}) => {
          const userId = ctx.session.user.id
            return ctx.db.event.findMany({
              where: {
                  hostId: userId
              }
            })
        }),
        getById: protectedProcedure
          .input(z.object({
            id: z.number()
          }))
          .query(({ctx, input}) => {
            return ctx.db.event.findUnique({
              where: {
                id: input.id
              }
            })
          })

})