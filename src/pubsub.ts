import { Email } from "@prisma/client";
import { createPubSub } from "graphql-yoga";

export const pubSub = createPubSub<{
  NEW_EMAIL: [Payload: { userId: string; email: Email }];
}>();
