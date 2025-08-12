import { filter, pipe } from "graphql-yoga";
import { pubSub } from "../../../../pubsub";
import type { SubscriptionResolvers } from "./../../../types.generated";
export const newEmail: NonNullable<SubscriptionResolvers["newEmail"]> = {
  subscribe: async (_parent, { userId }, _ctx) =>
    pipe(
      pubSub.subscribe("NEW_EMAIL"),
      filter((event) => {
        return event.userId === userId;
      }),
    ),
  resolve: (payload) => {
    return payload.email;
  },
};
