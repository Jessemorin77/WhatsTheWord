import { createTRPCRouter, protectedProcedure } from "../trpc";


export const profileRouter = createTRPCRouter({
    getById: protectedProcedure
    .query(({ctx}) => {
        const userId = ctx.session.user.id
        return ctx.db.user.findUnique({
            where: {
                id: userId
            }
        })
    })
})