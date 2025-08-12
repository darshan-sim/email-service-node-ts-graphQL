import { GraphQLError } from "graphql";
import type { UserResolvers } from "./../../types.generated";
import MailService from "../../../services/mail.service";
import errorMessage from "../../../constant/error";
export const User: UserResolvers = {
  sentEmails: (parent, _arg, { currentUser }) => {
    if (!currentUser || currentUser.id !== parent.id) {
      throw new GraphQLError(errorMessage.UNAUTHORIZED);
    }
    return MailService.sentEmails(parent.id);
  },
  receivedEmails: (parent, _args, { currentUser }) => {
    if (!currentUser || currentUser.id !== parent.id) {
      throw new GraphQLError(errorMessage.UNAUTHORIZED);
    }
    return MailService.receivedEmails(parent.id);
  },
};
