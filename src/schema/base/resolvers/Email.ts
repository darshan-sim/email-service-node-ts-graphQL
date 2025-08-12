import { GraphQLError } from "graphql";
import AuthService from "../../../services/auth.service";
import type { EmailResolvers } from "./../../types.generated";
import errorMessage from "../../../constant/error";
export const Email: EmailResolvers = {
  createdAt: ({ createdAt }, _arg, _ctx) => {
    return createdAt ? createdAt.toISOString() : null;
  },
  receiver: async (parent, _arg, _ctx) => {
    const receiver = await AuthService.user(parent.receiverId);
    if (!receiver) {
      throw new GraphQLError(errorMessage.EMAIL_RECEIVER_NOT_FOUND);
    }
    return receiver;
  },
  sender: async (parent, _arg, _ctx) => {
    const sender = await AuthService.user(parent.senderId);
    if (!sender) {
      throw new GraphQLError(errorMessage.EMAIL_SENDER_NOT_FOUND);
    }
    return sender;
  },
};
